<script lang="ts">
	import FlexImg from '/src/assets/svg/cogwheel.svg?component';
</script>

<div class="imgHero">
	<div class="wrap">
	<FlexImg width="50%" className="cogwheel" />
	</div>
</div>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">
  .wrap {
    display: flex;
    justify-content: center;
    transition: transform 0.5s ease-out;
  }

  :global(section.postSnippet) {
  .wrap {
    animation: rotate 3s linear infinite paused;
  }

  &:hover .wrap {
    animation-play-state: running;
  }

  &:not(:hover) .wrap {
    animation-play-state: paused;
  }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
