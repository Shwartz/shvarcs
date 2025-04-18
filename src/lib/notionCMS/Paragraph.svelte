<script lang="ts">
	import type { ParagraphBlockObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
	import { base } from '$app/paths';
	import { escapeHtml } from '$lib/utils/snippets';

	const { block } = $props<{ block: ParagraphBlockObjectResponse }>();

	function renderRichText(textItem: RichTextItemResponse) {
		let content = textItem.plain_text;

		// Escape HTML FIRST before any annotations
		if (textItem.annotations.code) {
			content = escapeHtml(content);  // ← Crucial: Escape before wrapping in <code>
		}

		if (textItem.href) {
			const isInternalLink = textItem.href.startsWith('/');
			const href = isInternalLink ? `${base}${textItem.href}` : textItem.href;
			content = `<a href="${href}" ${isInternalLink ? 'data-sveltekit-preload-data' : 'target="_blank" rel="noopener noreferrer"'}>${content}</a>`;
		}

		if (textItem.annotations.bold) content = `<strong>${content}</strong>`;
		if (textItem.annotations.italic) content = `<em>${content}</em>`;
		if (textItem.annotations.strikethrough) content = `<s>${content}</s>`;
		if (textItem.annotations.underline) content = `<u>${content}</u>`;
		if (textItem.annotations.code) content = `<code>${content}</code>`;

		return content;
	}
</script>

<p>
	{#each block.paragraph.rich_text as textItem}
		{@html renderRichText(textItem)}
	{/each}
</p>

