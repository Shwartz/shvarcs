<script>
  import {base} from '$app/paths';
  import Block from '$lib/components/Block.svelte';
  import Footer from "$lib/components/Footer.svelte";

  export let data;
  console.log('DATA: ----', data);
  const {blocks} = data;
</script>

<div class="newsArchivePost">
    <a href='{base}/news-archive'>Back to news</a>
    {#each blocks as block}
        <Block {block}/>
    {/each}
    <Footer/>
</div>

<style lang='scss'>
  .newsArchivePost {
    padding-top: 2rem;

    :global(h1) {
      font-size: 1.4rem;
      font-weight: bold;
      margin-top: 1rem;
    }

    :global(h2) {
      color: var(--text-light);
      border-bottom: 1px solid var(--text-light);
    }

    :global(h3) {
      font-size: 1.6rem;
      margin-top: 2rem;
    }

    :global(p) {
      margin: 0.5rem 0 0;
    }

  }
</style>
