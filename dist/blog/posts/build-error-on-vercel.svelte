<script>
  import HighLightWrap from "../../components/HighLightWrap.svelte";

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

<section class="post">
    <div>
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


<style>/* svelte-ignore css-unused-selector */
/** Kudos to Josh Comeau: https://www.joshwcomeau.com/css/custom-css-reset/ */
/* 1. Use a more-intuitive box-sizing model */
*, *::before, *::after {
  box-sizing: border-box;
}

/* 2. Remove default margin */
* {
  margin: 0;
}

body {
  /* 3. Add accessible line-height */
  line-height: 1.5;
  /* 4. Improve text rendering */
  -webkit-font-smoothing: antialiased;
}

/* 5. Improve media defaults */
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

/* 6. Inherit fonts for form controls */
input, button, textarea, select {
  font: inherit;
}

/* 7. Avoid text overflows */
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

/* 8. Improve line wrapping */
p {
  text-wrap: pretty;
}

h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}

/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}

:root {
  /** colors */
  --clr-white: white;
  --lime: lime;
  --_sudo-private-property-example: red;
  --pastel-cream: #F0EBD5;
  --pastel-yellow: #FCF3A4;
  --pastel-orange: #FFD79F;
  --pastel-pink: #FFC9C9;
  --pastel-rose: #FFA3B6;
  --pastel-purple: #8f172e;
  --pastel-blue: #CCDFFD;
  --pastel-aqua: #B8DFE6;
  --pastel-mint: #D1E2CF;
  --pastel-lime: #D6F1BB;
  --grid-color: #FF060033;
  --background-color: #FFF;
  --text: #222;
  --textLight: rgba(34, 34, 34, 0.4);
  --code-color: #9f3d51;
  --post-width: 40.125rem;
  --post-l-width: 64rem;
  --pastel-cream-light-mode: #F0EBD580;
  --pastel-cream-dark-mode: #F0EBD505;
  --table-row-bg: var(--pastel-cream-light-mode);
  /** fonts */
  --step--2: clamp(0.7813rem, 0.7747rem + 0.0326vi, 0.8rem);
  --step--1: clamp(0.9375rem, 0.9158rem + 0.1087vi, 1rem);
  --step-0: clamp(1.125rem, 1.0815rem + 0.2174vi, 1.25rem);
  --step-1: clamp(1.35rem, 1.2761rem + 0.3696vi, 1.5625rem);
  --step-2: clamp(1.62rem, 1.5041rem + 0.5793vi, 1.9531rem);
  --step-3: clamp(1.944rem, 1.771rem + 0.8651vi, 2.4414rem);
  --step-4: clamp(2.3328rem, 2.0827rem + 1.2504vi, 3.0518rem);
  --step-5: clamp(2.7994rem, 2.4462rem + 1.7658vi, 3.8147rem);
  --ff-family: Blanco,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  --ff-code: Consolas, Menlo, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
}

/** theme dark */
html[data-theme=dark] {
  color-scheme: dark;
  --background-color: #222;
  --text: #FFF;
  --textLight: rgba(255, 255, 255, 0.4);
  --code-color: var(--pastel-purple);
  --table-row-bg: var(--pastel-cream-dark-mode);
}</style>
