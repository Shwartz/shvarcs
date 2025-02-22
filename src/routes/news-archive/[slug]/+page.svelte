<script lang="ts">
	import { base } from '$app/paths';
	import { TrOutlineArrowBackUp } from 'svelte-icons-pack/tr';
	import { Icon } from 'svelte-icons-pack';
	import Block from '$lib/notionCMS/Block.svelte';

	const { data } = $props();
	const { post } = data;
</script>

<section class="post">

	{#if !post || !post?.content}
		<div>
			<p>Something went wrong, no posts</p>
		</div>

	{:else}

		<div>
			<h1>{post.title}</h1>
			<div class="meta first">
				<p class="date">{post.fullItem.properties['Due Date'].date.start}</p>
				<a href="{base}/news-archive" class="back">
					<Icon size="20" color="var(--text)" src={TrOutlineArrowBackUp} />
					<span>back</span>
				</a>
			</div>
		</div>
		<div class="content">
			<!-- Render post content here -->
			{#each post.content as block (block.id)}
				<Block block={block} />
			{/each}
		</div>
	{/if}
</section>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">
  .post :global {
    flex-grow: 1;


    h1 {
      margin-top: 2rem;
      padding: 2rem 0;
    }

    h2 {
			margin-top: 3rem;
      border-bottom: 1px solid var(--text);
      font-size: var(--step-2);
    }

    h3 {
			font-size: var(--step-1);
    }
  }

  .meta {
    display: flex;
    max-width: var(--post-width);
    align-items: center;
    gap: 1rem;
    margin-inline: auto;
    padding: 1rem 0;
    border-top: 1px solid var(--text);
    border-bottom: 1px solid var(--text);

    p {
      margin: 0;
    }
  }

  .first {
    justify-content: space-between;
  }

  .back {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
		background: none;
		color: var(--text);
		transform: translate3d(0,0,0);
		transition: transform 200ms;

		&:hover,
    &:focus  {
      transform: translate3d(4px,0,0);
		}
  }
</style>
