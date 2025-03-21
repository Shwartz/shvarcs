<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { pushState } from '$app/navigation';
	import { createImgUrl } from '$lib/utils/snippets';

	const title = 'Lifespan | Post';
	const description = "Visualise your life's journey in months. This tiny app shows you a shocking perspective on your time in this world.";

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

	const convertToReadableDate = (num: number) => {
		const years = Math.floor(num / 12);
		const months = num % 12;

		let result = '';

		if (years > 0) {
			result += `${years} year${years !== 1 ? 's' : ''}`;
		}

		if (months > 0) {
			if (result.length > 0) result += ', ';
			result += `${months} month${months !== 1 ? 's' : ''}`;
		}

		return result || '0 months';
	};

	type Dot = {
		id: number;
		isLived: boolean;
	};

	// Function to chunk the dots into decades
	const chunkIntoDecades = (dots: Dot[]): Dot[][] => {
		const decades: Dot[][] = [];
		for (let i = 0; i < dots.length; i += 120) {
			decades.push(dots.slice(i, i + 120));
		}
		return decades;
	};

	const decades = $derived(chunkIntoDecades(dots));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content="{title}" />
	<meta name="description" content="{description}" />
	<meta property="og:title" content="{title}" />
	<meta property="og:description" content="{description}" />
	<meta property="twitter:title" content="{title}" />
	<meta property="twitter:description" content="{description}" />
	<meta property="og:type" content="article">
	<meta property="og:image" itemprop="image" content="{createImgUrl('9b1fb70c-d376-4c62-554a-05513a0a0100', '1024w')}">
	<meta property="og:image:width" content="994">
	<meta property="og:image:height" content="576">
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
		<main class="life-container">
			{#each decades as decade, index}
				<div class="life" title={`${index + 1}0 years`}>
					{#each decade as dot}
						<div
							style="background-color: hsl({dot.id % 360}deg {dot.id > 639 ? '40%' : dot.id < 320 ? '30%' : '35%'} 50%);"
							class="dot"
							class:lived={dot.isLived}
							title={convertToReadableDate(dot.id + 1)}
						></div>
					{/each}
				</div>
			{/each}
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
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  input {
    padding: 0.5rem;
  }

  .life-container {
    border: 1px solid var(--orange);
    max-width: 26rem;
    padding: 1rem;
    margin: auto;
    background: var(--background-color);

    .life {
      display: grid;
      grid-template-columns: repeat(24, 1fr);
      gap: 4px;
      position: relative;
      margin-bottom: 1rem;

      &::after {
        display: none;
        content: attr(title);
        position: absolute;
        color: var(--orange);
        font-size: clamp(0.1813rem, calc(0.1813rem + ((7vw - 3px) * 0.4147)), 0.7813rem);
        right: -44px;
        /* 16 - 28 */
        top: clamp(16px, -6px + 7vw, 28px);
        transform: rotate(90deg);
      }
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

    @media(min-width: 300px) {
      padding: 1rem 2rem 1rem 1rem;

      .life::after {
        display: block;
      }
    }
  }
</style>
