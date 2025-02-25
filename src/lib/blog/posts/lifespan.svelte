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

<style lang="scss">
  p {
    max-width: 43.2rem;
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

    .life {
      display: grid;
      grid-template-columns: repeat(24, 1fr);
      gap: 4px;
      margin-bottom: 1rem;
    }

    .dot {
      aspect-ratio: 1;
      border-radius: 50%;
      background-color: var(--text);
      opacity: 0.2;

      &.lived {
        opacity: 1;
      }
    }

    .info {
      text-align: center;
      font-size: 0.9rem;
      opacity: 0.8;
    }
  }

  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
  }
</style>
