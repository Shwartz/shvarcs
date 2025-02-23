<script>
	import { base } from '$app/paths';
	import { TrOutlineArrowBackUp } from 'svelte-icons-pack/tr';
	import { Icon } from 'svelte-icons-pack';
	import ArrowUp from '../../assets/svg/ArrowUp.svelte';

	const { linkBack } = $props();
</script>

<div class="postFooter">
	<a href="{base}/{linkBack}" class="back">
		<Icon size="20" color="var(--text)" src={TrOutlineArrowBackUp} />
		<span>back</span>
	</a>
	<a class="up" href="#mainTitle" title="Go to top">
		<ArrowUp />
		<span>up</span>
	</a>
</div>

<style lang="scss">
  .postFooter {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
		padding-top: 1.5rem;
    margin-inline: auto;
    max-width: var(--post-width);
		border-top: 1px solid var(--text);
  }

  .back {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    transform: translate3d(0, 0, 0);
    transition: transform 200ms;

    &:hover,
    &:focus {
      transform: translate3d(-4px, 0, 0);
    }
  }

  .up {
    display: flex;
    gap: 0.5rem;
    text-decoration: none;

    :global(svg) {
      transform: translate3d(0, 0, 0);
      transition: transform 200ms;
    }

    &:hover :global(svg),
    &:focus :global(svg) {
      transform: translate3d(0, -4px, 0);
    }
  }

	.back, .up {
    color: var(--text);
		background: none;

		&:hover,
		&:focus {
			background: none;
		}
	}
</style>
