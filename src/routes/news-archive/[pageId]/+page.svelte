<script>
  import {base} from '$app/paths';
  import Block from '$lib/components/Block.svelte';

  export let data;
  console.log('DATA: ----', data);
  const {blocks} = data;
</script>

<a href='{base}/news-archive'>Back to news</a>
{#each blocks as block}
    <Block {block}/>
{/each}

<style lang='scss'>
    h2 {
      color: red;
    }
</style>
