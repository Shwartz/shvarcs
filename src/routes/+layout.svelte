<script lang="ts">
	import { browser } from '$app/environment';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import '@fontsource-variable/inter';
	import '@fontsource/frank-ruhl-libre/700.css';
	import Footer from '$lib/components/Footer.svelte';
	import { setContext } from 'svelte';
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
</script>

<svelte:head>
	<title>{$page.data.title ?? 'fallback title'}</title>
</svelte:head>

<div class="page">
	<div class="container">
		<div class='gridLines' class:gridOff={!isGridOn}>
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

  .gridLines {
    display: flex;
    flex-direction: column;
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
</style>
