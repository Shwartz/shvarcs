<script>
  import {base} from '$app/paths';
  import Block from '$lib/components/Block.svelte';
  import Footer from "$lib/components/Footer.svelte";

  export let data;
  // console.log('DATA: ----', data);
  const {blocks} = data;
  const title = blocks[0]['heading_1']['rich_text'][0]['plain_text'];
  const description = blocks[1]['paragraph']['rich_text'][0]['plain_text'];
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="title" content="{title}"/>
    <meta name="description" content="{description}"/>
    <meta property="og:title" content="{title}"/>
    <meta property="og:description" content="{description}"/>
    <meta property="twitter:title" content="{title}"/>
    <meta property="twitter:description" content="{description}"/>
    <meta name="robots" content="index,follow"/>
</svelte:head>

<section class="medium">
    <div class="newsArchivePost">
        <a class="back" href='{base}/news-archive'>Back to all news</a>
        <h1 class="pageTitle">Front-end News Archive</h1>
        {#each blocks as block}
            <Block {block}/>
        {/each}
        <Footer/>
    </div>
</section>

<style lang='scss'>
  .newsArchivePost {
    position: relative;
    padding-top: 2rem;

    .back {
      position: absolute;
      top: 0;
      left: 0;
    }

    .pageTitle {
      line-height: 1.1;
      font-size: 3rem;
      font-weight: normal;
      margin: 0;
    }

    :global(h1) {
      font-size: 1.4rem;
      font-weight: bold;
      margin-top: 1.5rem;
      margin-bottom: 1rem;
    }

    :global(h2) {
      color: var(--text-light);
      border-bottom: 1px solid var(--text-light);
    }

    :global(h3) {
      margin: 2.6rem 0 0.8rem;
      font-size: 1.6rem;
    }

    :global(p) {
      margin: 0.5rem 0 0;
    }

  }
</style>
