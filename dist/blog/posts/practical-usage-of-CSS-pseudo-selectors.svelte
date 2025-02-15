<script>
  import {CodePen} from "sveltekit-embed";
  import HighLightWrap from "../../components/HighLightWrap.svelte";


  const source1 =
    `h1 + p,
h2 + p,
h3 + p,
h4 + p,
h5 + p,
h6 + p {
    color: lime;
}
`;
  const source2 =
    `:is(h1, h2, h3, h4, h5, h6) + p {
    color: lime;
}`;
  const source3 =
    `p:has(img) {
    outline: 1px solid pink;
    padding: 1rem;
}`;
  const source4 =
    `
:is(h1, h2, h3, h4):has(+ :is(h2, h3, h4, h5)) {
    color: red;
}
`;

  const source5 =
    `
/** Only when both tags em AND code are in the div tag */
div:has(em):has(code) {
    outline: 1px solid red;
}

/** When one of the tags em OR code are in the div tag */
div:has(em, code) {
    outline: 1px solid red;
}
    `;

  const source6 =
    `
figure:has(.theme:checked) {
    background: salmon;
    color: white;
}

figure:has(.theme:checked):has(img) {
    background: limegreen;
}

figure:has(.theme:checked):has(img):has(h3)  {
    background: plum;
}
/** Not only target the figure but also get the element inside and apply the needed style */
figure:has(.theme:checked):has(img):has(h3) img {
    box-shadow: 3px 3px 4px rgba(0,0,0,0.8);
}
`;
  const source7 =
    `
ul :not(li:first-child, li:last-child) {
    color: red;
}

a:not([href = "https://shvarcs.com"]) {
    color: green;
}
`

  const title = "Practical usage on pseudo-class selectors | Post";
  const description = "Practical usage of CSS pseudo-class selectors is(), where(), has() and not()";
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
        <p>If you like me, you might come to get a quick overview to solve your specific problem, so here is a quick
            summary.</p>

        <p><code>:is()</code> and <code>:where()</code> are the same apart of one detail, their specificity is
            different. The <code>:where()</code> has a specificity value of 0 and <code>:is()</code> would take the
            most specific argument.
        </p>

        <p>Both selectors can simplify your code. Let's say you want to highlight the first paragraph following any
            header title, but only if it is a paragraph and if it is following the header title. </p>

        <HighLightWrap source={source1}/>

        <p>Here is an example of the same code using :is() selector.</p>

        <HighLightWrap source={source2}/>

        <p>Here is how I would read those rules, starting from right to left: "Any P tag followed directly after any of
            H1..H6 tags will have color: lime".</p>

        <p>Below is an example of a fancy way to target HTML elements which follow other elements</p>

        <CodePen clickToLoad={false} codePenId="zYbpeKb"/>

        <p>Fun fact: Apparently the original name for :is() was :matches(), which may give a hint as to what this
            selector does.</p>
        <p>To summarise, the main benefit is that we can significantly improve the code by removing repetitive and long
            lists of selectors. Chaining and combining <code>:is()</code>, <code>:where()</code> and <code>:not()</code>
            we can select specific elements and reduce CSS boilerplate.</p>

        <h3>:has() and :not() selectors</h3>

        <p>Firstly, <code>:has()</code> can select a parent or previous sibling element which is simply amazing. It does
            this by taking a selector list as an argument. </p>
        <p>The specificity for <code>:has()</code> is the same as per <code>:is()</code>
            and <code>:not()</code></p>
        <p>Usage is similar to <code>:is()</code>selector. Here is an example which adds special styling for paragraph
            if it has an <code>img</code> tag.</p>
        <HighLightWrap source={source3}/>
        <p>Simply put, this selector can select any parent element by the argument you pass into it. <br/>
            For example, you can select any <code>div</code> only if it has <code>img</code> tag.
        </p>
        <p>Also, you can combine it with <code>:is()</code> and make powerful oneliners.</p>
        <p>Below is an example where we select h1-h4 tags, and if the next direct sibling is from the has() list, it
            would
            receive a red colour.</p>
        <HighLightWrap source={source4}/>

        <p>Try to create this without <code>:has()</code>.</p>

        <h3>Logical operations</h3>
        <p>Who said that CSS is not a programming language?</p>
        <p>Let's say you want to style the <code>div</code> tag in special way, but only when there are <code>em</code>
            and
            <code>code</code> tags. Not sure why you would do that, but for the sake of example, this is how you do it.
        </p>
        <HighLightWrap source={source5}/>
        <p>To iterate, the first example is when both of the tags are available (AND), and the second is when any of the
            tags are available (OR)</p>

        <p>Could we have self-aware boxes which would change the design based on the content? Oh, but we can! Take a
            look at the CSS example:</p>

        <HighLightWrap source={source6}/>

        <p>Each of those boxes will receive a different background colour based on the content in the boxes.</p>

        <div class="codeExample">
            <figure>
                <label>
                    <input class="theme" type="checkbox">
                </label>
                <h3>Some title</h3>
                <p>One lonely paragraph</p>
            </figure>
            <figure>
                <label>
                    <input class="theme" type="checkbox">
                </label>
                <p>Not a title</p>
                <p>Paragraph with image</p>
                <img src="https://picsum.photos/id/29/350/350" alt="Mountain view with clouds and blue sky">
            </figure>
            <figure>
                <label>
                    <input class="theme" type="checkbox">
                </label>
                <h3>Foo title</h3>
                <p>Paragraph with image</p>
                <img src="https://picsum.photos/id/29/350/350" alt="Mountain view with clouds and blue sky">
            </figure>
        </div>

        <h3>:not()</h3>
        <p>The <code>:not()</code> is a negation pseudo-class and is probably most confusing from this post. There are
            a few quirks to keep in mind.</p>
        <p>Specificity is similar to <code>:is()</code> but can increase as well. As per MDN: <br/>
            <i>"For example, #foo:not(#bar) will match the same element as the simpler #foo, but has the higher
                specificity of two id selectors."</i></p>
        <p>Usage is similar to <code>:has()</code>. Add all the selectors you want to negate against as a comma-separated
            list.</p>
        <p>If you use it globally like this <code>:not(.foo)</code>, it will match anything that is not <code>.foo</code>
            including <b>HTML</b> and <b>body</b> tags</p>

        <p>Example of <code>:not()</code> usage.</p>

        <HighLightWrap source={source7}/>

        <div class="codeExample">
            <figure>
                <p>Select all but the first and last element.</p>
                <ul>
                    <li>First element</li>
                    <li>Next element</li>
                    <li>Next element</li>
                    <li>Next element</li>
                    <li>Last element</li>
                </ul>
            </figure>
            <figure>
                <p>Add green styling for any link tag except if it is shvarcs.com, which will receive global styling from
                    the website.</p>
                <a href="https://google.com">www.google.com</a><br>
                <a href="https://shvarcs.com">www.shvarcs.com</a><br>
                <a href="https://developer.mozilla.org/en-US/">MDN</a>
            </figure>
        </div>
        <h3>References</h3>
        <ul>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:is">Mozilla MDN :is()</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:where">Mozilla MDN :where()</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:has">Mozilla MDN :has()</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:not">Mozilla MDN :not()</a></li>
        </ul>
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
}

.codeExample {
  --min: 20ch;
  --gap: 1rem;
  display: grid;
  grid-gap: var(--gap);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
  margin-top: 3rem;
}
.codeExample figure {
  position: relative;
  margin: 0;
  padding: 1rem;
  border: 1px solid var(--accent);
  color: var(--text-light);
}
.codeExample figure > * {
  margin: 1rem 0 0;
}
.codeExample figure:has(.theme:checked) {
  color: white;
  background: salmon;
}
.codeExample figure:has(.theme:checked):has(img) {
  background: limegreen;
}
.codeExample figure:has(.theme:checked):has(img):has(h3) {
  background: plum;
}
.codeExample figure:has(.theme:checked):has(img):has(h3) img {
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.8);
}
.codeExample label:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  cursor: pointer;
}
.codeExample ul :not(li:first-child, li:last-child) {
  color: red;
}
.codeExample a:not([href="https://shvarcs.com"]) {
  color: green;
}</style>
