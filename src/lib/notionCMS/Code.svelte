<script lang="ts">
	import type { CodeBlockObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
	import HighLightWrap from '$lib/components/HighLightWrap.svelte';

	const { block } = $props<{ block: CodeBlockObjectResponse }>();

	console.log({block});

	function formatCode(richText: RichTextItemResponse[]) {
		return richText.map(item => item.plain_text).join('').toString();
	}

	// const language = block.code.language;
	const codeContent = formatCode(block.code.rich_text);
</script>

<HighLightWrap source={codeContent} />
