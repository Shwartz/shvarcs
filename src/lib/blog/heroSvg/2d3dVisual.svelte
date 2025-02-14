<script lang="ts">
	import FlexImg1 from '/src/assets/svg/2d.svg?component';
	import FlexImg2 from '/src/assets/svg/3d.svg?component';
</script>

<div class="imgHero">
	<div class="img1">
		<FlexImg1 width="60%" />
	</div>
	<div class="img2">
		<FlexImg2 width="60%" />
	</div>
</div>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">
	.imgHero {
		display: grid;
	}

	.img1, .img2 {
		grid-area: 1 / 1;
    transition: 0.5s transform;
		display: flex;
		justify-content: center;
	}

  .img1 {
  	transform: perspective(400px) rotateX(0deg);
		opacity: 1;
	}

  .img2 {
    transform: perspective(400px) rotateX(90deg);
  }

	/* Not ideal, taking global section.post to make hover on the whole section */
  :global(section.postSnippet):hover .imgHero  {
    .img1 {
      transform: perspective(400px) rotateX(-75deg);
    }

    .img2 {
      transform: perspective(400px) rotateX(0deg);
    }
  }
</style>
