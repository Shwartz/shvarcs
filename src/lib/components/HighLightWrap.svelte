<script lang="ts">
  import {HighlightSvelte, LineNumbers} from "svelte-highlight";
  import theme from '$lib/stores/theme';

  import github from "svelte-highlight/styles/github";
  import monokai from "svelte-highlight/styles/monokai";
  export let source;
</script>

<div class="wrap">
    <HighlightSvelte code={source} let:highlighted>
        <LineNumbers {highlighted}/>
    </HighlightSvelte>
</div>

<svelte:head>
    {#if $theme === 'dark'}
        {@html monokai}
    {:else}
        {@html github}
    {/if}
</svelte:head>

<style lang='scss'>
  .wrap {
    margin: 2rem 0;
    font-size: 0.8rem;
  }
</style>

<!--
Usage
<HighLightWrap source={source1} />
-->
