<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { pushState } from '$app/navigation';

	const title = 'Lifespan | Post';
	const description = 'Visual representation of life based on average 80 years';

	const years = 80;
	const months = years * 12;
	let today = new Date();
	let defaultBirthday = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
	let birthday = $state(new Date());

	let livedMonths = $derived(calculateLivedMonths(birthday));
	let dots = $derived(Array.from({ length: months }, (_, i) => ({
		id: i,
		isLived: i < livedMonths
	})));

	function calculateLivedMonths(birthDate: Date) {
		const today = new Date();
		const months = (today.getFullYear() - birthDate.getFullYear()) * 12 +
			(today.getMonth() - birthDate.getMonth());
		return Math.max(0, months);
	}

	function setCookie(name: string, value: string, days: number) {
		const expires = new Date(Date.now() + days * 864e5).toUTCString();
		document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
	}

	function getCookie(name: string) {
		return document.cookie.split('; ').reduce((r, v) => {
			const parts = v.split('=');
			return parts[0] === name ? decodeURIComponent(parts[1]) : r;
		}, '');
	}

	function updateUrlParams(date: string) {
		const url = new URL(window.location.href);
		url.searchParams.set('birthday', date);
		pushState(url.toString(), {});
	}

	function handleDateChange(e: Event) {
		const newDate = new Date((e.target as HTMLInputElement).value);
		birthday = newDate;
		const dateString = newDate.toISOString().split('T')[0];
		updateUrlParams(dateString);
		setCookie('birthday', dateString, 365);
	}

	onMount(() => {
		if (browser) {
			const urlParams = new URLSearchParams(window.location.search);
			const urlBirthday = urlParams.get('birthday');
			const cookieBirthday = getCookie('birthday');

			if (urlBirthday) {
				birthday = new Date(urlBirthday);
			} else if (cookieBirthday) {
				birthday = new Date(cookieBirthday);
				updateUrlParams(cookieBirthday);
			} else {
				birthday = defaultBirthday;
				updateUrlParams(defaultBirthday.toISOString().split('T')[0]);
			}
		}
	});

</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content="{title}" />
	<meta name="description" content="{description}" />
	<meta property="og:title" content="{title}" />
	<meta property="og:description" content="{description}" />
	<meta property="twitter:title" content="{title}" />
	<meta property="twitter:description" content="{description}" />
	<meta name="robots" content="index,follow" />
</svelte:head>

<section class="medium">
	<!--<div>
		<time datetime="01-2025">January, 2025</time>
	</div>-->
</section>
<section class="post">
	<div>
	<p>
		Ever wondered how far you've come?
		<br />
		Enter your birthday and see for yourself in a sea of vibrant circles!
		Each dot represents 1 month, and there are 960 dots (or 80 years)</p>
	<div class="bDaySelect">
		<label for="birthday">Enter your birthday</label>
		<input
			id="birthday"
			name="birthday"
			type="date"
			value={birthday.toISOString().split('T')[0]}
			oninput={handleDateChange}
			max={new Date().toISOString().split('T')[0]}
		/>
	</div>
	<main>
		<div class="life">
			{#each dots as dot}
				<div
					style="background-color: hsl({dot.id % 360}deg 30% 50%);"
					class="dot"
					class:lived={dot.isLived}
					title={`Month ${dot.id + 1}`}
				></div>
			{/each}
		</div>

		<div class="info">
			{Math.round((months - livedMonths) / months * 100)}% remaining
		</div>
	</main>
	</div>
</section>

<style>/* svelte-ignore css-unused-selector */
/** Kudos to Josh Comeau: https://www.joshwcomeau.com/css/custom-css-reset/ */
/* 1. Use a more-intuitive box-sizing model */
*, *::before, *::after {
  box-sizing: border-box;
}

/* 2. Remove default margin */
* {
  margin: 0;
}

body {
  /* 3. Add accessible line-height */
  line-height: 1.5;
  /* 4. Improve text rendering */
  -webkit-font-smoothing: antialiased;
}

/* 5. Improve media defaults */
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

/* 6. Inherit fonts for form controls */
input, button, textarea, select {
  font: inherit;
}

/* 7. Avoid text overflows */
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

/* 8. Improve line wrapping */
p {
  text-wrap: pretty;
}

h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}

/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}

:root {
  /** colors */
  --clr-white: white;
  --lime: lime;
  --_sudo-private-property-example: red;
  --pastel-cream: #F0EBD5;
  --pastel-yellow: #FCF3A4;
  --pastel-orange: #FFD79F;
  --pastel-pink: #FFC9C9;
  --pastel-rose: #FFA3B6;
  --pastel-purple: #8f172e;
  --pastel-blue: #CCDFFD;
  --pastel-aqua: #B8DFE6;
  --pastel-mint: #D1E2CF;
  --pastel-lime: #D6F1BB;
  --grid-color: #FF060033;
  --background-color: #FFF;
  --text: #222;
  --textLight: rgba(34, 34, 34, 0.4);
  --code-color: #9f3d51;
  --post-width: 40.125rem;
  --post-l-width: 64rem;
  --pastel-cream-light-mode: #F0EBD580;
  --pastel-cream-dark-mode: #F0EBD505;
  --table-row-bg: var(--pastel-cream-light-mode);
  /** fonts */
  --step--2: clamp(0.7813rem, 0.7747rem + 0.0326vi, 0.8rem);
  --step--1: clamp(0.9375rem, 0.9158rem + 0.1087vi, 1rem);
  --step-0: clamp(1.125rem, 1.0815rem + 0.2174vi, 1.25rem);
  --step-1: clamp(1.35rem, 1.2761rem + 0.3696vi, 1.5625rem);
  --step-2: clamp(1.62rem, 1.5041rem + 0.5793vi, 1.9531rem);
  --step-3: clamp(1.944rem, 1.771rem + 0.8651vi, 2.4414rem);
  --step-4: clamp(2.3328rem, 2.0827rem + 1.2504vi, 3.0518rem);
  --step-5: clamp(2.7994rem, 2.4462rem + 1.7658vi, 3.8147rem);
  --ff-family: Blanco,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  --ff-code: Consolas, Menlo, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
}

/** theme dark */
html[data-theme=dark] {
  color-scheme: dark;
  --background-color: #222;
  --text: #FFF;
  --textLight: rgba(255, 255, 255, 0.4);
  --code-color: var(--pastel-purple);
  --table-row-bg: var(--pastel-cream-dark-mode);
}

p {
  max-width: 43.2rem;
  line-height: 1.75rem;
  margin: 0 auto 1rem;
}

.bDaySelect {
  text-align: center;
  margin: 2rem 0 1rem;
}

main {
  border: 1px solid var(--text);
  max-width: 24rem;
  padding: 1rem;
  margin: auto;
  background: var(--background-color);
}
main .life {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  gap: 4px;
  margin-bottom: 1rem;
}
main .dot {
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--text);
  opacity: 0.2;
}
main .dot.lived {
  opacity: 1;
}
main .info {
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.8;
}

input {
  margin-bottom: 1rem;
  padding: 0.5rem;
}</style>
