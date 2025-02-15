<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { Icon } from 'svelte-icons-pack';
	import { TrOutlineGrid3x3, TrOutlineMenu2, TrOutlineX } from 'svelte-icons-pack/tr';
	import { debounce } from '../utils/debounce.js';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import type { LayoutActions } from '../types/layout-context';

	// Retrieve context from any parent layout, routes/+layout.svelte
	const { toggleGrid, isGridOn } = getContext<LayoutActions>('layout-actions');
	let isHamburgerOn = $state(false);
	let isAnimated = $state(false);
	let isDesktop = $state(false);
	let windowWidth = $state(0);
	let isTabbingAvailable = $derived(isDesktop ? true : isHamburgerOn);

	const menuId = 'main-nav-menu';

	const toggleHamburger = () => {
		if (!isAnimated) {
			isAnimated = !isAnimated; // invoke once
		}
		isHamburgerOn = !isHamburgerOn;
	};

	afterNavigate(() => {
		isHamburgerOn = false;
	});

	$effect(() => {
		if (isHamburgerOn) {
			const menu = document.getElementById(menuId);
			menu?.focus();
		}
	});

	$effect(() => {
		isDesktop = windowWidth >= 768;
		// Update your menu state or other UI elements based on isDesktop
	});

	onMount(() => {
		windowWidth = window.innerWidth;

		const handleResize = debounce(() => {
			windowWidth = window.innerWidth;
		}, 250);

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest('#topHead')) {
				isHamburgerOn = false;
			}
		};
		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isHamburgerOn) {
				isHamburgerOn = false;
			}
		};
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.addEventListener('keydown', handleKeydown);
		};
	});
</script>

<header>
	<div id="topHead" class='headerWrap' class:slideMenuIn={isHamburgerOn}>
		<a href="{base}/" class="me">Andris Švarcs</a>
		<div class="hamburger">
			<button
				onclick={toggleHamburger}
				type="button"
				class="clean"
				aria-expanded={isHamburgerOn}
				aria-controls={menuId}
				aria-label={isHamburgerOn ? "Close menu" : "Open menu"}
			>
				{#if isHamburgerOn}
					<Icon size="16" color="var(--text)" src={TrOutlineX} />
				{:else}
					<Icon size="16" color="var(--text)" src={TrOutlineMenu2} />
				{/if}
			</button>
		</div>
		<div class="menu" class:isAnimated>
			<nav
				id={menuId}
				aria-label="Main menu"
				class={isHamburgerOn ? 'slideMenuIn' : ''}
				aria-hidden={!isHamburgerOn && !isDesktop}
			>
				<a
					href="{base}/thoughts"
					tabindex={isTabbingAvailable ? 0 : -1}
					aria-current={$page.url.pathname === '/thoughts' ? 'page' : undefined}
				>blog</a>
				<a
					href="{base}/news-archive"
					tabindex={isTabbingAvailable ? 0 : -1}
					aria-current={$page.url.pathname === '/news-archive' ? 'page' : undefined}
				>news archive</a>
				<a
					href="{base}/good-read"
					tabindex={isTabbingAvailable ? 0 : -1}
					aria-current={$page.url.pathname === '/good-read' ? 'page' : undefined}
				>good read</a>
			</nav>

			<div class="settings">
				<button
					type="button"
					class={`clean ${isGridOn ? 'on' : ''}`}
					onclick={toggleGrid}
					tabindex={isTabbingAvailable ? 0 : -1}
				>
						<span>
							<Icon size="14" color="var(--text)" src={TrOutlineGrid3x3} />
						</span>
				</button>
				<ThemeSwitcher isMenuOpen={isTabbingAvailable} />
			</div>
		</div>
	</div>
</header>

<!-- svelte-ignore css_unused_selector -->
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

/* HEADER MENU */
.headerWrap {
  display: grid;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px dotted var(--grid-color);
  grid-template-areas: "a c" "b b";
}
.headerWrap a {
  color: var(--text);
  text-decoration: none;
}
.headerWrap a:hover, .headerWrap a:focus {
  text-decoration: underline;
}
.headerWrap .me {
  font-weight: bold;
}

:global(.gridOff) :is(header, .headerWrap) {
  border-bottom-color: rgba(0, 0, 0, 0);
}

.me {
  grid-area: a;
}

.menu {
  grid-area: b;
}

.hamburger {
  grid-area: c;
  justify-self: right;
  align-self: center;
}

/* HEADER MENU: MOBILE*/
.headerWrap {
  --navTop: 56px;
  position: relative;
}
.headerWrap .menu {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 0 0 1rem;
  transform: translate3d(110%, var(--navTop), 0);
  transition: none;
  background: var(--background-color);
  box-shadow: 0 0 1px 0 var(--text);
  visibility: hidden;
}
.headerWrap .menu.isAnimated {
  visibility: visible;
  z-index: 1;
}
.headerWrap.slideMenuIn .menu {
  animation: slideInWithBounce 0.5s forwards;
}
.headerWrap:not(.slideMenuIn) .menu {
  animation: slideOutWithBounce 0.5s forwards;
}

nav {
  display: flex;
  flex-direction: column;
}
nav a {
  display: block;
  padding: 0.4rem 0;
}

.settings {
  display: flex;
}
.settings button {
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
}
.settings button span {
  display: flex;
  padding: 2px;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid var(--text);
  will-change: transform;
}
.settings button :global(svg) {
  display: none;
}
.settings button.on :global(svg) {
  display: block;
}
.settings button > * {
  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.settings button:hover > * {
  transform: scale(1.2);
}

.hamburger button {
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
}

/* HEADER MENU: > 500 | 31.25rem */
@media (min-width: 31.25rem) {
  .menu {
    --navTop: 24px;
  }
  nav {
    flex-direction: row;
    gap: 2rem;
  }
}
/* HEADER MENU: Full Size > 768 | 48rem */
@media (min-width: 48rem) {
  .headerWrap {
    grid-template-areas: "a b";
  }
  .headerWrap .menu {
    --navTop: 24px;
    position: relative;
    padding: 0;
    visibility: visible;
    transform: none;
    background: none;
    animation: none;
    box-shadow: none;
  }
  .headerWrap.slideMenuIn .menu {
    animation: none;
  }
  .headerWrap:not(.slideMenuIn) .menu {
    animation: none;
  }
  nav {
    flex-direction: row;
    gap: 2rem;
  }
  .hamburger {
    display: none;
  }
}
nav[aria-hidden=false] {
  visibility: visible;
  opacity: 1;
}

@keyframes slideInWithBounce {
  0% {
    transform: translate3d(-110%, var(--navTop), 0);
  }
  60% {
    transform: translate3d(4%, var(--navTop), 0);
  }
  80% {
    transform: translate3d(-2%, var(--navTop), 0);
  }
  100% {
    transform: translate3d(0, var(--navTop), 0);
  }
}
@keyframes slideOutWithBounce {
  0% {
    transform: translate3d(0, var(--navTop), 0);
  }
  20% {
    transform: translate3d(4%, var(--navTop), 0);
  }
  40% {
    transform: translate3d(-2%, var(--navTop), 0);
  }
  100% {
    transform: translate3d(-110%, var(--navTop), 0);
  }
}</style>
