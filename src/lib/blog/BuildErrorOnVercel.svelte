<script>
  import HighLightWrap from "$lib/components/HighLightWrap.svelte";

  const title = "Build error on Vercel | Post";
  const description = "SvelteKit build fails on Vercel and how to fix it";

  const source1 =
    `Warning: The following modules failed to locate dependencies that may (or may not) be required for your app to work:
  node_modules/node-fetch/lib/index.js
    - encoding
  ✔ done
✓ built in 12.25s
Build Completed in /vercel/output [22s]
Deploying outputs...
Error: The following Serverless Functions contain an invalid "runtime":
  - fn (nodejs18.x). Learn More: https://vercel.com/guides/serverless-function-contains-invalid-runtime-error
`;

  const source2 =
    `"engines": {
    "node": ">=18.0.0"
},`;

  const source3 =
    `"engines": {
    "node": ">=18.18.0 <19.0.0"
},`;
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
    <div>
        <time datetime="03-2024">March, 2024</time>
        <h1>Build error on Vercel</h1>

        <p>I’m a front-end developer and not very fancy on the server side. That being said, I spent some ten years
            managing my own Linux on DigitalOcean with WP blogs. When I say managing, it was more like doing some
            updates and maintenance only.</p>
        <p>Then, I discovered SvelteKit, which was when I finally decided to go wild with my own blog.</p>

        <p>So far, I am enjoying my ride until suddenly, after doing minor updates, I got this error on Vercel. </p>

        <HighLightWrap source={source1}/>

        <p>What is going on? All I did, was to change an image in one of the posts. I double checked, that there are no
            any changes in package nor lock files.</p>

        <p>Luckily, after some discussion on <a href="https://fosstodon.org/@shvarcs/112107236724573898">Mastodon</a> it hit me! </p>

        <p>In my package.json I use </p>

        <HighLightWrap source={source2}/>

        <p>I guess, Vercel some days ago added Node v.20 as well. So, it automatically build project with the latest Node and that broke the build. </p>

        <p>For now I set it to version 18 like so</p>

        <HighLightWrap source={source3}/>

        <p>Hopefully this will give a hint for somebody else for similar error in Vercel.</p>
    </div>
</section>


<style lang='scss'>

</style>
