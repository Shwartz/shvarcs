<script lang="ts">
  import type {ParagraphBlockObjectResponse} from "@notionhq/client/build/src/api-endpoints";

  function escapeHtmlEntities(inputString) {
    return inputString.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function wrapCodeTags(inputString) {
    const escapedString = escapeHtmlEntities(inputString);
    return escapedString.replace(/&lt;[\s\S]*(&gt;)+/g, match => `<code>${match}</code>`);
  }

  export let paragraph: ParagraphBlockObjectResponse;
  let initialText = "";
  $: paraText = paragraph.paragraph?.rich_text?.reduce((accumulator, para) => {
    return para.href ? accumulator + `<a href='${para.href}' target='_blank'>${para.plain_text}</a>` : accumulator + wrapCodeTags(para.plain_text);
  }, initialText);
</script>

{#if paraText}
    <p>{@html paraText}</p>
{/if}
