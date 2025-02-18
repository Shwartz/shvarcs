<script lang="ts">
	import { onMount } from 'svelte';
	import { bookmarkArr } from './bookmarksConfig';
	import { getFirstTagColour } from '$lib/utils/categoryColors';
	import { extractMainDomain } from '$lib/utils/regexHelpers';

	interface Bookmark {
		id: string;
		title: string;
		date: string;
		category: Array<string>;
		description: string;
		url: string;
	}

	interface SortedBookmarks {
		[category: string]: Bookmark[];
	}

	let sortedList = $state<SortedBookmarks>({});

	onMount(() => {
		sortedList = bookmarkArr.reduce<SortedBookmarks>((acc, bookmark) => {
			bookmark.category.forEach(category => {
				if (!acc[category]) {
					acc[category] = [];
				}
				acc[category].push(bookmark);
			});
			return acc;
		}, {});
	});

	/*
	// Leaving this to remind on how to see the state
	$effect(() => {
		console.log($state.snapshot(sortedList));
	});*/
</script>

<div class="bookCollection">
	{#each Object.entries(sortedList) as [category, bookmarks]}
		<h2 style="background-color: {getFirstTagColour([category])}">{category}</h2>
		<div class="book">
		{#each bookmarks as bookmark}
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
	{/each}
</div>

<style lang="scss">
	.bookCollection {
		h2 {
			padding: 1rem;
			margin-bottom: 1rem;
			color: var(--black);
		}
	}
	.book {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 1.5rem;

    @media (min-width: 37.5rem) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 75rem) {
      grid-template-columns: repeat(4, 1fr);
    }
	}

	.url {
		font-size: var(--step--1);
	}

	.description {
		margin-top: 1rem;
	}


</style>
