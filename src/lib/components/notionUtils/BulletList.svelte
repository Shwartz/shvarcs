<script lang="ts">
	import type { BulletedListItemBlockObjectResponse, NumberedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
	import Text from "./Text.svelte";
    export let block: BulletedListItemBlockObjectResponse;
</script>

{#if block && block.bulleted_list_item?.rich_text.length > 0}
    <ul>
    {#each  block.bulleted_list_item.rich_text as item }
        <li><Text text={item} /></li>
    {/each}
    </ul>
{/if}

<style lang='scss'>
    li {
      list-style: square outside none;
      margin-left: 1rem;
    }

</style>
