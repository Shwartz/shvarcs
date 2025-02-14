<script lang="ts">
	import FlexImg from '/src/assets/svg/flexBox.svg?component';
</script>

<div class="imgHero">
	<FlexImg width="100%" className="test1" />
</div>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">
  /*.imgHero :global(.path1) {
    fill: #8383e7;
    stroke: purple;
    stroke-width: 1px;
  }*/

  .imgHero :global(.path2) {
    filter: blur(2px);
    transform: rotate3d(12, 1, 1, -83deg);
    opacity: 0;
    transition: all 0.5s;
  }

	/* Not ideal, taking global section.post to make hover on the whole section */
  :global(section.postSnippet):hover .imgHero :global(.path2) {
    transform: rotate3d(1, 1, 1, 0);
    filter: blur(0px);
    opacity: 1;
  }
</style>
