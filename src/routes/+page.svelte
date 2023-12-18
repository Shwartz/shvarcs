<script>
  import imgAndris from '$lib/images/andris-svarcs.jpg';
  // import Meta from "$lib/components/Meta.svelte";
  const title = "Andris Švarcs | Frontend developer";
  const description = "I'm a front-end developer from London, focusing on CSS, HTML, ReactJS, and SvelteKit. I mostly find myself as a translator between designers and developers";
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

<section class='medium'>
    <div>
        <p>
            <img src={imgAndris}
                 alt="Andris Švarcs proudly kept a hand on the Cessna plane, which he partly flew above Surrey.">
            Hi, I'm Andris Švarcs, a front-end developer currently residing in London
        </p>

        <p>Embarking on my third attempt to redesign my personal website, I recall my last live blog back in 2013.
            The life of the front-end developer is pretty busy, compounded by the delightful "side project" of raising
            two active boys engaged in clubs and school adventures.</p>

        <p>Much like my fellow developers, I stay up-to-date on the latest in the tech world. I utilize Notion to
            capture my musings, and over the past few years, I've compiled many ideas waiting to be shared with the
            world.</p>

        <p>Determined to transform my Notion notes into tangible blog posts, I've adopted a different approach.
            Rather than striving for perfection before going live, as I have done in the past, this time, everything is
            live, and I'm refining and enhancing as I progress.</p>
    </div>
</section>

<style lang='scss'>
  img {
    display: block;
    max-width: 500px;
    margin: 0 auto 1rem;


    @media only screen and (min-width: 800px) {
      margin: 0.5rem 0 0 1rem;
      max-width: 400px;
      float: right;
    }
  }
</style>
