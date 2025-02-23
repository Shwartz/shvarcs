<script lang="ts">
	import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
	import Paragraph from './Paragraph.svelte';
	import Code from '$lib/notionCMS/Code.svelte';

	const { block } = $props<{ block: BlockObjectResponse }>();
</script>

{#if block.type === 'paragraph'}
	<Paragraph block={block} />
<!--{:else if block.type === 'heading_1'}
	<h1>{block.heading_1.rich_text[0]?.plain_text}</h1>-->
{:else if block.type === 'heading_2'}
	<h2>{block.heading_2.rich_text[0]?.plain_text}</h2>
{:else if block.type === 'heading_3'}
	<h3>{block.heading_3.rich_text[0]?.plain_text}</h3>
{:else if block.type === "code"}
	<Code block={block} />
{/if}

<!--{#if block.type === "heading_1"}-->
<!--	<Heading heading={block} />-->
<!--{:else if block.type === "heading_2"}-->
<!--	<Heading heading={block} />-->
<!--{:else if block.type === "heading_3"}-->
<!--	<Heading heading={block} />-->
<!--{:else if block.type === "paragraph"}-->
<!--	<Paragraph paragraph={block} />-->
<!--{:else if block.type === "code"}-->
<!--	<Code code={block} />-->
<!--{:else if block.type === "numbered_list_item"}-->
<!--	<NumberedList {block} />-->
<!--{:else if block.type === "bulleted_list_item"}-->
<!--	<BulletList {block} />-->
<!--{:else if block.type === "image"}-->
<!--	<ImageBlock {block} />-->
<!--{/if}-->
