<script lang="ts">
	import { browser } from '$app/environment';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Footer from '$lib/components/Footer.svelte';
	import { setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { navigationIsDelayed } from '$lib/utils/delayedNavigation';
	import '@fontsource-variable/inter';
	import '@fontsource/frank-ruhl-libre/700.css';
	import '../app.scss';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();

	const GRID_STATE = 'gridState';
	let initialGridState = true;
	if (browser && localStorage.getItem(GRID_STATE) !== null) {
		initialGridState = JSON.parse(localStorage.getItem(GRID_STATE) ?? 'false');
	}

	let isGridOn = $state(initialGridState);
	const toggleGrid = () => {
		isGridOn = !isGridOn;
		localStorage.setItem(GRID_STATE, JSON.stringify(isGridOn));
	};

	const layoutActions = $state({
		isGridOn: true,
		toggleGrid
	});

	setContext('layout-actions', layoutActions);

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	let isDelayed = $state(false);
	$effect(() => {
		const unsubscribe = navigationIsDelayed.subscribe(value => {
			isDelayed = value;
		});

		return unsubscribe;
	});
</script>

<svelte:head>
	<title>{page.data.title ?? 'fallback title'}</title>
</svelte:head>

<div class="page">
	<div class="container">
		{#if isDelayed}
			<div class="loader" transition:fade={{duration:200}}></div>
		{/if}
		<div class="gridLines" class:gridOff={!isGridOn}>
			<Header />
			<!--<div class="content">-->
			{@render children()}
			<!--</div>-->
			<Footer />
		</div>
	</div>
</div>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss" global>
  :global(body) {
    font-family: "Inter Variable", sans-serif;
  }

  :global(.frankTitle) {
    font-family: "Frank Ruhl Libre", serif;
  }

  header {
    border-bottom: 1px dotted var(--grid-color);
  }

  .gridOff {
    background-image: none;

    &:after {
      display: none;
    }
  }

  .loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: #4c432b;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 4px;
      width: 100%;
      background: #ffb300;
      transform: translate3d(-100%, 0, 0);
      animation: 10s moveSlide forwards;
    }
  }

  @keyframes moveSlide {
    0% {
      transform: translate3d(-100%, 0, 0);
    }

    30% {
      transform: translate3d(-90%, 0, 0);
    }

    60% {
      transform: translate3d(-50%, 0, 0);
    }

    80% {
      transform: translate3d(-40%, 0, 0);
    }

    100% {
      transform: translate3d(0%, 0, 0);
    }
  }
</style>
