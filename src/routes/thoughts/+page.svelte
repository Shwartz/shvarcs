<script lang="ts">
	import { onMount } from 'svelte';
	import ToggleCompact from '$lib/components/ToggleCompact.svelte';
	import type { CategoryType } from '$lib/utils/categoryColors';
	import Tag from '$lib/components/snippets/Tag.svelte';
	import PostList from '$lib/blog/logic/PostList.svelte';
	import { postsArr } from '$lib/blog/logic/postsConfig';

	let compact = $state(false);
	let checked = $state(false);
	let selectedFilter = $state<CategoryType | null>(null);
	let postCount = $state(postsArr.length);

	// Get unique tags from all posts and asset them as cats type
	const allTags = [...new Set(postsArr.flatMap(post => post.tags))] as CategoryType[];

	onMount(() => {
		const savedState = localStorage.getItem('themeCompactState');
		checked = savedState === 'true';
		compact = checked;
	});

	$effect(() => {
		const savedState = localStorage.getItem('themeCompactState');
		checked = savedState === 'true';
	});

	function handleFilterClick(tag: CategoryType) {
		selectedFilter = selectedFilter === tag ? null : tag;
	}

	function toggleCompact() {
		checked = !checked;
		localStorage.setItem('themeCompactState', checked.toString());
		toggleView();
	}

	function handlePostCountChange(count: number) {
		postCount = count;
	}

	function toggleView() {
		/* Fallback if no support for transition and can do something else */
		if (!document.startViewTransition) {
			compact = checked;
			return;
		}

		document.startViewTransition(() => {
			compact = checked; // this is how I can trigger transition
		});
	}
	const title = 'Front-end | Blog';
	const description = 'Mostly Front-end related topics, but it could be whatever amuses me';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content="{title}" />
	<meta name="description" content="{description}" />
	<meta property="og:title" content="{title}" />
	<meta property="og:description" content="{description}" />
	<meta property="twitter:title" content="{title}" />
	<meta property="twitter:description" content="{description}" />
	<meta name="robots" content="index,follow" />
</svelte:head>

<div class="posts">
	<h1 class="frankTitle">blog</h1>
	<p class="intro">Usually, I'm too busy chatting with Rubber Duck and Perplexity, but when I have some free time, I
		write down whatever is essential. Mostly front-end related, but it could be about my aquarium and The Fish.</p>
	<div class="headerTags">
		<div class="flex">
			<div class="counter">{postCount} {postCount === 1 ? 'item' : 'items'}</div>
			<div class="filter">
				{#each allTags as tag}
					<button
						onclick={() => handleFilterClick(tag)}
						class="btnTag"
					>
						<Tag active={selectedFilter === tag} blogCategory={tag} />
					</button>
				{/each}
			</div>
		</div>
		<ToggleCompact {checked} toggleCompact={toggleCompact} />
	</div>

	<PostList {compact} {selectedFilter} onCountChange={handlePostCountChange} />
</div>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">
  .posts {
    flex-grow: 1;
  }

  .headerTags {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: space-between;
    padding: 4rem 0 1.5rem;
    border-bottom: 1px dotted var(--grid-color);
  }

  :global(.gridOff) .headerTags {
    border-color: rgba(0, 0, 0, 0);
  }

  .flex {
    display: flex;
    flex-direction: column-reverse;
    gap: 1rem;

    /* 768 */
    @media(min-width: 48rem) {
			flex-direction: row;
		}
  }

  .counter {
    min-width: px-to-rem(68px);
    text-align: left;
  }

  .frankTitle {
    margin: 4.5rem 0 1.5rem;
    font-size: 5.75rem;
    line-height: normal;
    color: var(--textLight);

    /* 768 */
    @media(min-width: 48rem) {
      margin: 6.5rem 0 1.5rem;
      font-size: 9rem;
    }
  }

  .intro {
    width: 100%;
  }

  .btnTag {
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  :global(.btnTag:hover > *) {
    border: 1px solid var(--textLight);
  }

  .filter {
    display: flex;
		flex-wrap: wrap;
    gap: 4px;
  }

  @media (min-width: 600px) {
    .intro {
      width: 75%;
    }
  }

  @media (min-width: 1200px) {
    .intro {
      width: 50%;
    }
  }
</style>

