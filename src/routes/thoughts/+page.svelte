<script>
  import {base} from "$app/paths";
  // import Meta from "$lib/components/Meta.svelte";
  const title = "Random thoughts";
  const description = "Mostly Front-end thoughts, but it might be quite random posts on anything that triggers my interest";
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
                <a href="{base}/thoughts/my-findings-on-CSS-pseudo-selectors">My findings on :is(), :where(), :has() and :not() |
                    February, 2024</a>
            </p>
            <p>
                <a href="{base}/thoughts/how-to-deal-with-CSS">How to deal with CSS | May, 2023</a>
            </p>
            <p>
                <a href="{base}/thoughts/svelte-vs-reactjs">Svelte vs ReactJS | September, 2022</a>
            </p>
        </div>
    </section>
</div>

<style lang='scss'>

</style>
