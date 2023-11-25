<script lang="ts">
  import type {CodeBlockObjectResponse} from "@notionhq/client/build/src/api-endpoints";

  function escapeHtmlEntities(inputString) {
    return inputString.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function wrapCodeTags(inputString) {
    const escapedString = escapeHtmlEntities(inputString);
    return escapedString.replace(/&lt;[\s\S]*(&gt;)+/g, match => `<code>${match}</code>`);
  }

  export let code: CodeBlockObjectResponse;
  // console.log('--- code: ', code);
  let initialText = "";
  $: paraText = code?.code?.rich_text?.reduce((accumulator, para) => {
    return para.href ? accumulator + `<a href='${para.href}' target='_blank'>${para.plain_text}</a>` : accumulator + `<code><pre>${escapeHtmlEntities(para.plain_text)}</pre></code>`;
  }, initialText);
</script>

{#if paraText}
    <p>{@html paraText}</p>
{/if}
