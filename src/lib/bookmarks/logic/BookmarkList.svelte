<script lang="ts">
	import type { Bookmark } from '$lib/types/types';
	import { extractMainDomain } from '$lib/utils/regexHelpers';

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

		a {
      text-decoration: none;
      padding-bottom: 1px; /* Underline distance from the text */
      color: var(--black);
      background:
              linear-gradient(to right, var(--pastel-lime), var(--pastel-lime), var(--pastel-lime)) 100% 100% no-repeat,
              linear-gradient(to right, var(--pastel-lime), var(--pastel-yellow), var(--pastel-lime)) 0 100% no-repeat;
      background-size: 100% 100%, 0 100%;
      transition: background-size 400ms;
      font-size: var(--step--1);
      vertical-align: middle;

      &:hover, &:focus {
        background-size: 0 100%, 100% 100%;
      }
		}
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
