<script>
	export let data;
	import { base } from '$app/paths';
</script>

<div>
	<h1>News Archive</h1>
	<ul>
		{#each data.res as item}
			<li>
				<h3><a href='{base}/news-archive/{item.slug}'>{item.title}</a></h3>
				<p>{item.summary}</p>
				<p>ID: {item.id}</p>
				{console.log('fullItem: ', item.fullItem)}
			</li>
		{/each}
	</ul>
</div>

<style lang='scss'>
	li {
		border-bottom: 1px solid grey;
	}

	a {
		color: blue;
	}
</style>
