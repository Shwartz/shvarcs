<script lang="ts">
	import Header from '$lib/components/Header.svelte';

	const { data } = $props();
	const {post} = data;
</script>

<div class="post">

	{#if !post || !post?.content}
		<p>Something went wrong, no posts</p>
	{/if}

	<h1>{post.title}</h1>
	<p class="date">{post.fullItem.properties['Due Date'].date.start}</p>
	<div class="content">
		<!-- Render post content here -->
		{#each post.content as block}
			<!-- Render different block types -->
			{#if block.type === 'paragraph'}
				<p>{block.paragraph.rich_text[0]?.plain_text}</p>
			{/if}
			<!-- Add more block type renderings as needed -->
		{/each}
	</div>
</div>
