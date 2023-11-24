<script lang='ts'>
	import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
	import Heading from './Heading.svelte';
	import Paragraph from './Paragraph.svelte';
	import Code from "$lib/components/Code.svelte";
	import ImageBlock from './ImageBlock.svelte';
	import NumberedList from './NumberedList.svelte';
	import BulletList from './BulletList.svelte';

	export let block: BlockObjectResponse;
	//$: console.log("type",block.type);
</script>


{#if block.type === "heading_1"}
	<Heading heading={block} />
{:else if block.type === "heading_2"}
	<Heading heading={block} />
{:else if block.type === "heading_3"}
	<Heading heading={block} />
{:else if block.type === "paragraph"}
	<Paragraph paragraph={block} />
{:else if block.type === "code"}
	<Code code={block} />
{:else if block.type === "numbered_list_item"}
	<NumberedList {block} />
{:else if block.type === "bulleted_list_item"}
	<BulletList {block} />
{:else if block.type === "image"}
	<ImageBlock {block} />
{/if}
