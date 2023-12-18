<script>
  import {base} from "$app/paths";
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

<div class='wrap'>
    <section class="medium">
        <div>
            <h1>Thoughts</h1>
            <p>
                <a href="{base}/thoughts/svelte-vs-reactjs">Svelte vs ReactJS | September, 2022</a>
            </p>
        </div>
    </section>
</div>

<style lang='scss'>

</style>
