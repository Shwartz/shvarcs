<script lang="ts">
	const { isGridOn } = $props();

	let rect = $state('var(--text)');
	let path = $state('var(--text)');

	$effect(() => {
		// Little hack I discovered. If pass empty this let rect be filled with colour
		path = isGridOn ? 'var(--text)' : '';
	});

</script>
<span>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="{rect}"
				stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	<path d="M2 12H22" stroke="{path}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	<path d="M8.25 12V21.5" stroke="{path}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	<path d="M15.75 22V12" stroke="{path}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	<path d="M8.25 12V2" stroke="{path}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	<path d="M15.75 12V2.54" stroke="{path}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
	</span>

<style lang="scss">
  svg {
    transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);

		&:hover {
			transform: scale(1.2);
		}
  }
</style>
