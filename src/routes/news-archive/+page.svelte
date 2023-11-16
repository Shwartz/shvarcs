<script lang="ts">
	import type { ActionData, PageData } from './$types';
	export let data: PageData;
	export let form: ActionData;
	import { base } from '$app/paths';

	console.log({data});
	console.log({form});
</script>

<div>
	<h1>News Archive</h1>

	<form method='POST' action='?/search'>
		<input
			type='text'
			name='search'
			autocomplete='off'
			placeholder='Search for the post'/>
		<button type='submit'>Search</button>
	</form>

	<p>Search results</p>

	<ul>
		{#each data.posts as post}
			<li>
				<h4><a href='{base}/news-archive/{post.slug}'>{post.title}</a></h4>
				<p>{post.summary}</p>
			</li>
		{/each}
	</ul>
</div>

<style lang='scss'>
	li {
		border-bottom: 1px solid grey;
	}
</style>
