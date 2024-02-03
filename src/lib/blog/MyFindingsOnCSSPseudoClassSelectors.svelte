<script>
  import {CodePen} from "sveltekit-embed";
  import HighLightWrap from "$lib/components/HighLightWrap.svelte";


  const source1 = `    h3:is(h1 + *) {
        color: red;
    }

    p {
        color: green;
    }

    p:is(p + *) {
        color: black;
    }

    p:has(+ img) {
        color: violet;
    }`
  const sourc2 = `<script>
  import Hightlight, { LineNumbers } from "svelte-highlight";
  import typescript from "svelte-highlight/languages/typescript";
  import monokai from "svelte-highlight/styles/monokai";

  const code = "const add = (a: number, b: number) => a + b";
<\/script>

<svelte:head>
  {@html atomOneDark}
</svelte:head>

  <Highlight language={typescript} {code} />`;


  const title = "My findings on :is(), :where(), :has() and :not() | Post";
  const description = "Some description";
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
        <time datetime="02-2024">February, 2024</time>
        <h1>My findings on CSS pseudo-class selectors :is(), :where(), :has() and not()</h1>
        <h3>Summary</h3>
        <p>If you like me, you might come to get a quick overview to solve your specific problem, so here is a quick
            summary.</p>

        <h3>Code highlight method</h3>


        <HighLightWrap source={source1} />
        <HighLightWrap source={sourc2} />


        <p><code>:is()</code> and <code>:where()</code> are the same apart of one detail, their specificity is
            different. The <code>:where()</code> has a specificity value of 0 and <code>:is()</code> would consider the
            most specific argument.
        </p>
        <p>Here is an example with the basic usage.</p>
        <CodePen clickToLoad={false} codePenId="zYbpeKb"/>

    </div>
</section>
<section class="medium">
    <div>
        <h3>What else can we do with pseudo-class selectors?</h3>
        <p>Fun fact: The original name for :is() was :matches(), which may give a hint as to what this selector can
            do.</p>
        <p>You can greatly simplify long list of of selectors by using <code>:is()</code> and <code>:where()</code></p>

        <p>[Add image of screenshot example maybe? or CODE]</p>

    </div>
</section>


<style lang='scss'>
  img {
    max-width: 519px;
    margin: 0 auto;
    display: block;
  }

  li {
    list-style: outside disc;
    margin-left: 1rem;
  }
</style>
