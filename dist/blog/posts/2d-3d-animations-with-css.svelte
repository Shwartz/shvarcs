<script>
  import HighLightWrap from "../../components/HighLightWrap.svelte";

  const source1 =
    `transform: translate(20px, 50px),
transform: translate(10%, -50px),
transform: translateX(2em),
transform: translateY(-1rem)`;
  const source2 =
    `<div class="panel">
    <div class="face front">This is front</div>
    <div class="face back">This is back</div>
</div>`;
  const source4 =
    `.panel {
  position: relative;
  height: 200px;
  width: 200px;
}`;
  const source5 =
    `.face {
  position: absolute;
  backface-visibility: hidden;
  transition: transform 1s;
}`;
  const source6 =
    `.front {
  transform: perspective(400px) rotateY(0);
  background: var(--accent);
}

.back {
  transform: perspective(400px) rotateY(179.9deg);
  background: var(--code);
}

&:hover, &:focus {
  .front {
    transform: rotateY(-179.9deg);
  }

  .back {
    transform: rotateY(0);
  }
}`;


  let hasPercentToggle = $state(false);
  let ex1BoxWidth = $state(0);
  let ex1BoxHeight = $state(0);
  let x1Val = $state(50);
  let y1Val = $state(50);
  let x1Perc = $derived(hasPercentToggle ? `${x1Val}%` : `${(ex1BoxWidth - 48) * x1Val / 100}px`);
  let y1Perc = $derived(hasPercentToggle ? `${y1Val}%` : `${(ex1BoxHeight - 48) * y1Val / 100}px`);
  let ex1Style = $derived(`transform: translate(${x1Perc}, ${y1Perc})`);
  let ex1BgStyle = $derived(hasPercentToggle ? `background-size: 48px 48px` : `background: none`);

  /* Exercise 2 */
  let x2Val = $state(0);
  let ex2Style = $derived(`transform: translate(0, ${x2Val}%)`);

  /* Exercise 3 */
  let x3SkewX = $state(0);
  let x3SkewY = $state(0);
  let x3ScaleX = $state(1);
  let x3ScaleY = $state(1);
  let x3RotateZ = $state(0);
  let x3RotateX = $state(0);
  let x3RotateY = $state(0);

  function resetEx3() {
      x3SkewX = 0;
      x3SkewY = 0;
      x3ScaleX = 1;
      x3ScaleY = 1;
      x3RotateZ = 0;
      x3RotateX = 0;
      x3RotateY = 0;
  }

  let ex3Style = $derived(`transform: skew(${x3SkewX}deg, ${x3SkewY}deg)
    scale(${x3ScaleX}, ${x3ScaleY})
    rotateZ(${x3RotateZ}deg) rotateX(${x3RotateX}deg) rotateY(${x3RotateY}deg)`);

  const source3 =
    $derived(`transform:
    skew(${x3SkewX}deg, ${x3SkewY}deg)
    scale(${x3ScaleX}, ${x3ScaleY})
    rotateZ(${x3RotateZ}deg) rotateX(${x3RotateX}deg) rotateY(${x3RotateY}deg)`);

  /* Exercise 4 */
  let x4trX = $state(0);
  let x4trY = $state(0);
  let x4trZ = $state(0);
  let ex4Style = $derived(`transform: perspective(500px) translate3d(${x4trX}px, ${x4trY}px, ${x4trZ}px) rotate(45deg)`);

  /* Exercise 5 */
  let x5trX = $state(1);
  let x5trY = $state(1);
  let x5trZ = $state(1);
  let x5deg = $state(40);
  let ex5Style = $derived(`transform: rotate3d(${x5trX}, ${x5trY}, ${x5trZ}, ${x5deg}deg);`);

  function resetEx6() {
      x5trX = 1;
      x5trY = 1;
      x5trZ = 1;
      x5deg = 40;
  }


  const title = "2D and 3D animations using CSS | Post";
  const description = "2D and 3D animations using CSS with interactive examples";
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
<!-- svelte-ignore css-unused-selector -->
<section class="post">
    <div>

        <p>2D and 3D animations provide developers with tools to manipulate an element on the screen, including
            <code>position</code>, <code>size</code>, <code>perspective</code> and <code>rotation</code>. </p>

        <h2>2D CSS Transform</h2>

        <p>To use 2D animation, you must apply the <code>Transform</code> property to an element.</p>

        <HighLightWrap source={source1}/>

        <p>As you can see from example above, you can use positive and negative values and different length
            units.</p>

        <h3>Examples of 2D animation</h3>
        <p>Box width: {ex1BoxWidth}px, height: {ex1BoxHeight}px, <span
                style="display:inline-block">Circle: 48px x 48px</span></p>
        <div class="toggle">
            <input type="checkbox" id="toggle" bind:checked={hasPercentToggle}>
            <label for="toggle">Toggle between <span class:active={!hasPercentToggle}>px</span> and <span
                    class:active={hasPercentToggle}>%</span>.</label>
        </div>
        <div>TEST: transform: translate({x1Perc}, {y1Perc});</div>


        <pre>
<code>

&#123;
<span>  position: absolute;
  transition: transform 0.3s;
  width: 48px;
  height: 48px;
  border: 2px solid var(--code);
  background: var(--accent);
  border-radius: 50%;</span>
&#125;
</code>
</pre>

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

input[type=range] {
  cursor: pointer;
}

input[type=range][orient=horizontal] {
  appearance: slider-horizontal;
  width: 175px;
  height: 8px;
}

input[type=range][orient=vertical] {
  appearance: slider-vertical;
  width: 8px;
  height: 175px;
}

.active {
  color: var(--code);
}

code span {
  font-size: 0.8rem;
}

figure {
  position: relative;
  width: 100%;
  margin: 0;
  border: 1px solid var(--accent);
  color: var(--text-light);
  height: 250px;
}

.toggle input[type=checkbox] {
  display: none;
}
.toggle label {
  position: relative;
  margin-left: 80px;
  cursor: pointer;
}
.toggle input[type=checkbox] + label::before {
  content: " ";
  display: block;
  height: 18px;
  width: 45px;
  border: 1px solid var(--accent);
  border-radius: 9px;
  position: absolute;
  top: 8px;
  left: -65px;
  background: var(--accent);
}
.toggle input[type=checkbox] + label::after {
  content: " ";
  display: block;
  height: 30px;
  width: 30px;
  border: 1px solid var(--code);
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: -75px;
  background: var(--code);
  transition: all 0.3s ease-in;
}
.toggle input[type=checkbox]:checked + label::after {
  left: -40px;
  transition: all 0.3s ease-in;
}

.example1 {
  margin-top: 3rem;
}
.example1 figure {
  background-image: linear-gradient(to right, rgba(203, 213, 225, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(203, 213, 225, 0.5) 1px, transparent 1px);
  background-size: 48px 48px;
  background-position: -1px -1px;
}
.example1 input {
  margin: 0;
}
.example1 label {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 0;
  flex-wrap: wrap;
}
.example1 label span {
  display: block;
}
.example1 .horizontal label {
  margin-left: 30px;
}
.example1 .horizontal .value {
  width: 60px;
  text-align: right;
  color: var(--code);
}
.example1 .vertical {
  display: flex;
}
.example1 .vertical .value {
  color: var(--code);
  position: absolute;
  bottom: 0;
  height: 24px;
}
.example1 .vertical label {
  transform: rotate(180deg);
  writing-mode: vertical-lr;
  margin-bottom: -30px;
}
.example1 .vertical input {
  height: 140px;
}
.example1 #circleEx1 {
  position: absolute;
  top: 0;
  left: 0;
  border: 2px solid var(--code);
  background: var(--accent);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  transition: transform 0.3s;
}

.ex2Wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.ex2Wrap label {
  display: flex;
  align-items: center;
  position: relative;
  margin: 1rem 0;
}
.ex2Wrap label input {
  margin: 0;
}

.example2 figure {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, rgba(203, 213, 225, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(203, 213, 225, 0.5) 1px, transparent 1px);
  background-size: 50% 50%;
  background-position: -1px -1px;
}
.example2 div.movable {
  border: 1px solid var(--accent);
  transform: translate(0, 0);
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
}
.example2 div.shadow {
  border: 1px dotted var(--accent);
  position: absolute;
  padding: 1rem;
  opacity: 0.5;
}

.example3 figure {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}
.example3 .flex {
  --min: 35ch;
  --gap: 1rem;
  display: grid;
  grid-gap: var(--gap);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
  margin-top: 3rem;
}
.example3 .transformable {
  position: relative;
  height: 100px;
  width: 100px;
  border: 1px solid var(--accent);
  background-image: linear-gradient(to right, rgba(203, 213, 225, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(203, 213, 225, 0.5) 1px, transparent 1px);
  background-size: 10px 10px;
  background-position: -1px -1px;
}
.example3 .transformable:before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(216, 27, 96, 0.4) 0%, rgba(73, 137, 237, 0.4) 100%);
}

.example4 figure {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
}
.example4 .panel {
  position: relative;
  height: 200px;
  width: 200px;
}
.example4 .panel .face {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  inset: 0;
  color: var(--accent-bg);
  border: 1px solid gold;
  backface-visibility: hidden;
  transition: transform 1s;
}
.example4 .panel .front {
  transform: perspective(400px) rotateY(0);
  background: var(--accent);
}
.example4 .panel .back {
  transform: perspective(400px) rotateY(179.9deg);
  background: var(--code);
}
.example4 .panel .back h3 {
  margin: 1rem 0;
  font-size: 1.4rem;
  font-weight: bold;
}
.example4 .panel .back p {
  margin: 0;
  padding: 0 8px;
  text-align: left;
  width: 100%;
  font-size: 0.8rem;
}
.example4 .panel:hover .front, .example4 .panel:focus .front {
  transform: rotateY(-179.9deg);
}
.example4 .panel:hover .back, .example4 .panel:focus .back {
  transform: rotateY(0);
}

.example5 figure {
  display: flex;
  justify-content: center;
  align-items: center;
}
.example5 .transformable {
  width: 100px;
  height: 100px;
  border: 1px solid purple;
  transform-style: preserve-3d;
  transition: transform 200ms linear;
  background: var(--code);
}

.example6 figure {
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 500px;
}
.example6 .cube {
  position: relative;
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
  transition: transform 200ms linear;
}
.example6 .face {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100px;
  height: 100px;
  background-image: repeating-linear-gradient(0deg, rgba(70, 70, 70, 0.2) 0px, rgba(70, 70, 70, 0.2) 1px, transparent 1px, transparent 21px), repeating-linear-gradient(90deg, rgba(70, 70, 70, 0.2) 0px, rgba(70, 70, 70, 0.2) 1px, transparent 1px, transparent 21px), linear-gradient(90deg, rgb(255, 255, 255), rgb(255, 255, 255));
  font-size: 3rem;
  color: var(--code);
  border: 1px solid purple;
}
.example6 .top {
  transform: rotateX(90deg) translateZ(50px);
}
.example6 .bottom {
  transform: rotateX(-90deg) translateZ(50px);
}
.example6 .right {
  transform: rotateY(90deg) translateZ(50px);
}
.example6 .left {
  transform: rotateY(-90deg) translateZ(50px);
}
.example6 .front {
  transform: rotateX(0deg) translateZ(50px);
}
.example6 .back {
  transform: rotateX(-180deg) translateZ(50px);
}

.demo p {
  margin-top: 2rem;
}
.demo .panel1 {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: perspective(500px) translate3d(0px, 0px, -50px) rotateX(35deg);
  height: 200px;
  width: 200px;
  margin: 1rem auto 0;
  background: rgb(255, 255, 255);
  border-radius: 1rem;
  border: 2px solid var(--accent);
  box-shadow: 0 30px 20px -10px var(--shadow);
  transition: transform 1s;
}
.demo .panel1:hover, .demo .panel1:focus {
  transform: translate3d(0px, 0px, 0px);
}
.demo .panel2 {
  position: relative;
  display: flex;
  align-items: center;
  height: 300px;
  max-width: 400px;
  margin: 1rem auto 0;
  border-radius: 1rem;
  border: 2px solid var(--code);
  perspective: 500px;
  background-color: silver;
  color: black;
  background-image: radial-gradient(circle at 100% 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent), radial-gradient(circle at 0 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent), radial-gradient(circle at 50% 100%, white 10%, silver 10%, silver 23%, white 23%, white 30%, silver 30%, silver 43%, white 43%, white 50%, silver 50%, silver 63%, white 63%, white 71%, transparent 71%, transparent), radial-gradient(circle at 100% 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent), radial-gradient(circle at 0 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent);
  background-size: 100px 50px;
  background-position: 50%;
}
.demo .panel2 span {
  position: relative;
  display: block;
  margin: 0;
  width: 100px;
  color: purple;
  transform: translate(clamp(25%, 4vw, 50%), 0%) rotate(45deg);
  line-height: 2rem;
  text-align: center;
  font-weight: bold;
  font-size: clamp(1rem, 4vw, 2rem);
  z-index: -1;
}
.demo .panel2:before {
  position: absolute;
  content: "";
  width: 50%;
  left: 50%;
  height: 100%;
  transform-origin: top left;
  transform: rotateY(-180deg);
  transition: transform 1s;
  border-radius: 0 1rem 1rem 0;
  background-color: silver;
  background-image: radial-gradient(circle at 100% 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent), radial-gradient(circle at 0 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent), radial-gradient(circle at 50% 100%, white 10%, silver 10%, silver 23%, white 23%, white 30%, silver 30%, silver 43%, white 43%, white 50%, silver 50%, silver 63%, white 63%, white 71%, transparent 71%, transparent), radial-gradient(circle at 100% 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent), radial-gradient(circle at 0 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent);
  background-size: 100px 50px;
  background-position: 50%;
  outline: 1px solid var(--code);
}
.demo .panel2:hover:before, .demo .panel2:focus:before {
  transform: rotateY(0);
}
.demo .demo3 {
  display: block;
  margin: 0 auto;
  padding: 2ch 4ch;
  border: 1px solid grey;
  color: #282828;
  transition: box-shadow 300ms;
  border-radius: 2rem;
  background-image: linear-gradient(to top, #d3d3d5 0%, #fff 80%, #f8f6f6 100%);
  box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 3px 0 #CECFD1;
  font-size: 0.8rem;
  cursor: pointer;
}
.demo .demo3:hover {
  background-image: linear-gradient(to top, #d3d3d5 0%, #fff 80%, #f8f6f6 100%);
  box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 3px 3px #CECFD1;
  filter: none;
}
.demo .demo3:active {
  box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 4px 3px #999, inset 0 0 20px #bbb;
}

.panel3 div {
  margin: 1rem auto 0;
}

[data-theme=dark] .panel3 div {
  width: clamp(160px, 50%, 300px);
  margin: 1rem auto 0;
  padding: 2rem 2rem;
  border-radius: 1rem;
  background: white;
}</style>
