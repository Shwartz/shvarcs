<script>
  import imgAndris from '$lib/images/andris-svarcs-230106-3.jpg';
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
                 alt="A picture of the Owner of the website, where he is trying to look intelligent and welcoming">
            I have been working as a web developer for over 15 years. I call myself a <em>Product-minded</em> engineer.
            I worked
            in small agencies and enterprise-level companies during my career. The products I built or worked on as a
            team include domains like finance, tourism, health, dashboard web apps and more. </p>

        <p>I like to understand products beyond the code. I like to ask lots of <em>Why questions</em>. Why this feature
            is
            important? How will this improve the customer journey? Because of this interest, I also deep dive into
            <em>design</em>, <em>accessibility</em> and <em>SEO</em> topics.</p>

        <p>Much like my fellow developers, I stay up-to-date on the latest in the tech world. I utilise Notion to
            capture my musings, and over the past few years, I've compiled many ideas waiting to be shared with the
            world. Also, this is my third attempt to redesign my website. I recall my last live blog back in 2013, which
            means it took me ten years to finally produce this rushed version. </p>

    </div>
</section>

<style lang='scss'>
  img {
    display: block;
    max-width: 264px;
    margin: 0 auto 1rem;

    @media only screen and (min-width: 800px) {
      margin: 0.5rem 0 0 2rem;
      float: right;
    }
  }

  em {
    background: var(--marked);
    color: var(--marked-text);
    margin-left: 2px;
    padding: 2px 0;
    border-radius: 2px;
  }
</style>
