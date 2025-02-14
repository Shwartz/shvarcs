<script lang="ts">
	import FlexImg from '/src/assets/svg/vercelError.svg?component';
</script>

<div class="imgHero">
	<FlexImg width="100%" className="test1" />
</div>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">
  .imgHero :global(.path1),
  .imgHero :global(.path2) {
    fill: #f2f2f2;
    stroke: #000000;
    stroke-width: 5px;
  }

  .imgHero :global(.path2) {
    transform: rotate3d(1, 1, 1, 0) translate(-1px, 0px);
  }

	/* Not ideal, taking global section.post to make hover on the whole section */
  :global(section.postSnippet):hover .imgHero :global(.path2) {
    animation: 0.8s alternate cracking;
  }

  @keyframes cracking {
    0% {
      transform: rotate3d(1, 1, 1, 0) translate(-1px, 0px);
    }

    25% {
      stroke: #000000;
    	transform: translate(-2px, 2px);
    }

		50% {
      stroke: #0a1bde;
		}

    75% {
      transform: rotate3d(0, 0, 1, 2deg) translate(5px, -1px);
      stroke: #e80f0f;
    }

    100% {
      transform: rotate3d(1, 1, 1, 0) translate(-1px, 0px);
      stroke: #000000;
    }
  }
</style>
