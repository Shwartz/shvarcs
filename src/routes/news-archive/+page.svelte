<script>
	export let data;
</script>

<div>
	<h1>News Archive</h1>
	<ul>
		{#each data.res as item}
			{console.log('fullItem: ', item.fullItem)}
			<li>
				<p>TITLE: {item.title}</p>
				<p>URL: {item.url}</p>
				<p>ID: {item.id}</p>
			</li>
		{/each}
	</ul>
</div>
