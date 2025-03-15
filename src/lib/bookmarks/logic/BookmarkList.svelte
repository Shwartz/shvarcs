<script lang="ts">
	import type { Bookmark } from '$lib/types/types';
	import { extractMainDomain } from '$lib/utils/regexHelpers';
	import { getCategoryColor } from '$lib/utils/categoryColors.js';

	interface SortedBookmarks {
		filteredBookmarks: Bookmark[];
		selectedFilter: string |  null;
	}

	const { filteredBookmarks, selectedFilter } : SortedBookmarks = $props();
</script>

<h1>{selectedFilter ? selectedFilter : 'All'}</h1>
<div class="bookCollection">
		<div class="book">
		{#each filteredBookmarks as bookmark}
			<div>
			<h3>{bookmark.title}</h3>
			<p class="url">
				<a
					class="link"
					style="--link-color: {getCategoryColor(bookmark.tags[0])}"
					title="{bookmark.url}"
					href="{bookmark.url}">{extractMainDomain(bookmark.url)}
				</a>
			</p>
			<p class="description">{bookmark.description}</p>
			</div>
		{/each}
</div>
</div>

<style lang="scss">
	.book {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 1.5rem;
		margin-bottom: 3rem;

		> div {
			padding-bottom: 2.5rem;
      border-bottom: 1px dotted var(--grid-color);
      border-top: 1px dotted var(--grid-color);
		}

    @media (min-width: 37.5rem) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 75rem) {
      grid-template-columns: repeat(4, 1fr);
    }

		.link {
      text-decoration: underline;
      padding-bottom: 1px; /* Underline distance from the text */
      font-size: var(--step-0);
      vertical-align: middle;
      transition: background-color 0.2s;

      background: oklch(from var(--link-color) l c h / 0.6);
      color: oklch(from var(--link-color) calc(l - 0.4) c h);

      &:hover, &:focus {
        background: oklch(from var(--link-color) l c h / 0.2);
      }
		}
	}

  :global([data-theme="dark"]) .link {
    background: oklch(from var(--link-color) l c h / 0.3);
    color: oklch(from var(--link-color) calc(l + 0.2) c h);
  }

  :global(.gridOff) .book > div {
    border-color: rgba(0, 0, 0, 0);
  }

	h1 {
		font-size: var(--step-4);
		margin-bottom: 2rem;
	}

	h3 {
		font-size: var(--step-1);
	}

	.url {
		font-size: var(--step--1);
	}

	.description {
		margin-top: 1rem;
	}
</style>
