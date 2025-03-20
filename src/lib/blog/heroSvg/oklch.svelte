<script lang="ts">
	import { onMount } from 'svelte';

	let containerWidth = $state(0);
	let fontSize = $state(4);

	onMount(() => {
		const container = document.getElementById('imgHero')?.parentElement;
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				containerWidth = entry.contentRect.width;
			}
			fontSize = containerWidth * 4 / 180;
		});
		if (container) {
			observer.observe(container);
		}
	});
</script>

<div class="wrap">
	<div id="imgHero" class="imgHero">
		<div class="frankTitle" style="font-size: {fontSize}rem; line-height: {fontSize}rem">
			<span>o</span>
			<span>k</span>
			<span>l</span>
			<span>c</span>
			<span>h</span>
		</div>
	</div>
</div>

<style lang="scss">
	.wrap {
    height: 100%;
    width: 100%;
	}

  .imgHero {
    height: 100%;
    width: 100%;
    background: url('https://imagedelivery.net/OsbYeWCzhRDS5xpqlDmBXA/a7ca7924-dcd2-4155-bc98-9491c614c300/1024w') no-repeat center;
    background-size: cover;
		overflow: hidden;
  }

  .frankTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    font-size: 4rem;
		color: var(--black);
    background: var(--pastel-orange);
		transition: color 500ms;
  }

  .frankTitle span {
    transition: transform 0.5s ease-in-out;
  }

  .frankTitle span:nth-child(1) {
    transform: translate3d(5px, 10px, 0) scale(0.8);
  }

  .frankTitle span:nth-child(2) {
    transform: translate3d(-3px, -5px, 0) rotate(10deg);
  }

  .frankTitle span:nth-child(3) {
    transform: translate3d(2px, 8px, 0) scale(1.1);
  }

  .frankTitle span:nth-child(4) {
    transform: translate3d(-1px, -2px, 0) rotate(-5deg);
  }

  .frankTitle span:nth-child(5) {
    transform: translate3d(4px, -6px, 0) scale(0.7);
  }

  :global(.postSnippet):hover .frankTitle {
    mix-blend-mode: multiply;
		background: black;
		color: white;

		span {
      transform: translate3d(0, 0, 0) scale(1) rotate(0);
		}
  }
</style>
