<script lang="ts">
	import BookmarkList from '$lib/bookmarks/logic/BookmarkList.svelte';
	import Tag from '$lib/components/snippets/Tag.svelte';
	import { bookmarkArr } from '$lib/bookmarks/logic/bookmarksConfig';
	import { type CategoryType } from '$lib/utils/categoryColors';
	import type { Bookmark } from '$lib/types/types';

	let selectedFilter = $state<CategoryType | null>(null);
	const allTags = [...new Set(bookmarkArr.flatMap(post => post.tags))] as CategoryType[];
	let filteredBookmarks = $state<Bookmark[]>([]);


	function handleFilterClick(tag: CategoryType) {
		selectedFilter = selectedFilter === tag ? null : tag;
	}

	$effect(() => {
		const reverseBookmarks = [...bookmarkArr].reverse();
		if (selectedFilter) {
			filteredBookmarks = reverseBookmarks.filter(book => book.tags.includes(selectedFilter as CategoryType));
		} else {
			filteredBookmarks = reverseBookmarks;
		}
	});

	const title = 'Good Read | Bookmarks'
	const description = 'Bookmarks from my goto pages about development, tools, howto and whatever I visit frequently'
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

<div class="goodRead">
	<h1 class="frankTitle">good read</h1>
	<p class="intro">Good Read is just a fancy name for my bookmarks. It's where I stash valuable tools, go-to posts, and
		other web development goodies I frequently revisit.</p>

	<div class="headerTags">
		<div class="flex">
			<div class="counter">{filteredBookmarks.length} {filteredBookmarks.length === 1 ? 'item' : 'items'}</div>
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
	</div>

	<section class="bookmarks">
		<BookmarkList filteredBookmarks={filteredBookmarks} selectedFilter={selectedFilter} />
	</section>
</div>

<style lang="scss">
  .goodRead {
    flex-grow: 1;
  }

  .frankTitle {
    margin: 4.5rem 0 1.5rem;
    font-size: 5.75rem;
    color: var(--textLight);
    line-height: normal;

    /* 768 */
    @media(min-width: 48rem) {
      margin: 6.5rem 0 1.5rem;
      font-size: 9rem;
    }
  }

  .intro {
    width: 100%;
  }

  .bookmarks {
    margin-top: 1.5rem;
    padding-top: 2rem;
    border-top: 1px dotted var(--grid-color);
  }

  .headerTags {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: space-between;
    padding: 4rem 0 1.5rem;
    border-bottom: 1px dotted var(--grid-color);
  }

  .flex {
    display: flex;
    gap: 1rem;
    flex-direction: column-reverse;

    /* 768 */
    @media(min-width: 48rem) {
      flex-direction: row;
    }
  }

  .counter {
    min-width: px-to-rem(68px);
    text-align: left;
  }

  .btnTag {
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  .filter {
    display: flex;
		flex-wrap: wrap;
    gap: 4px;
  }

  :global(.btnTag:hover > *) {
    border: 1px solid var(--textLight);
  }

  :global(.gridOff) :is(.headerTags, .bookmarks) {
    border-color: rgba(0, 0, 0, 0);
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
