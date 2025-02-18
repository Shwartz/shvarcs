<script lang="ts">
	import { onMount } from 'svelte';
	import { bookmarkArr } from './bookmarksConfig';

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

	/*$effect(() => {
		console.log($state.snapshot(sortedList));
	});*/
</script>

<div>
	<p>start</p>
	{#each Object.entries(sortedList) as [category, bookmarks]}
		<h2>{category}</h2>
		{#each bookmarks as bookmark}
			<p>{bookmark.title}</p>
		{/each}
	{/each}
	<p>end</p>
</div>
