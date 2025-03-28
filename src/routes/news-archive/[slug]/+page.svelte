<script lang="ts">
	import { base } from '$app/paths';
	import { TrOutlineArrowBackUp, TrOutlineCalendarMonth } from 'svelte-icons-pack/tr';
	import { Icon } from 'svelte-icons-pack';
	import Block from '$lib/notionCMS/Block.svelte';
	import PostFooter from '$lib/components/PostFooter.svelte';
	import { createImgUrl } from '$lib/utils/snippets';

	const { data } = $props();
	const { post } = data;

	const title = post?.title;
	const description = post?.summary;
	const dueDate = post?.dueDate;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content="{title}" />
	<meta name="description" content="{description}" />
	<meta property="og:title" content="{title}" />
	<meta property="og:description" content="{description}" />
	<meta property="twitter:title" content="{title}" />
	<meta property="twitter:description" content="{description}" />
	<meta property="og:type" content="article">
	<meta property="og:image" itemprop="image" content="{createImgUrl('6264affc-9b6f-4e52-c8be-ffef4d2f0100', '1024w')}">
	<meta property="og:image:width" content="1024">
	<meta property="og:image:height" content="497">
	<meta name="robots" content="index,follow" />
</svelte:head>

<section class="post">
	{#if !post || !post?.content}
		<div>
			<p>Something went wrong, no posts</p>
		</div>
	{:else}
		<div>
			<h1 id="mainTitle">{post.title}</h1>
			<div class="meta first">
				<p class="date">
					<Icon size="16" color="var(--text)" src={TrOutlineCalendarMonth} />
					<span>{dueDate}</span>
				</p>
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
	<PostFooter linkBack="news-archive" />
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
      border-bottom: 1px solid var(--grey-text);
      font-size: var(--step-2);
    }

    h3 {
      font-size: var(--step-1);
    }
  }

  .date {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: var(--step--1);

    :global(svg) {
      position: relative;
      top: -0.5px;
    }
  }

  .meta {
    display: flex;
    max-width: var(--post-width);
    align-items: center;
    gap: 1rem;
    margin-inline: auto;
    padding: 1rem 0;
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
    transform: translate3d(0, 0, 0);
    transition: transform 200ms;

    &:hover,
    &:focus {
      transform: translate3d(-4px, 0, 0);
    }
  }

  .back {
    background: none;

    &:hover,
    &:focus {
      background: none;
    }
  }
</style>
