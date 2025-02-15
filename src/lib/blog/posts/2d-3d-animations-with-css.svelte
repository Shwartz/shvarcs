<script>
  import HighLightWrap from "$lib/components/HighLightWrap.svelte";

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
<!-- svelte-ignore css_unused_selector -->
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

<style lang='scss'>
  input[type="range"] {
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

  .toggle {
    $toggle-bg-color: var(--accent);
    $toggle-nub-color: var(--code);

    input[type="checkbox"] {
      display: none;
    }

    label {
      position: relative;
      margin-left: 80px;
      cursor: pointer;
    }

    input[type="checkbox"] + label::before {
      content: ' ';
      display: block;
      height: 18px;
      width: 45px;
      border: 1px solid $toggle-bg-color;
      border-radius: 9px;
      position: absolute;
      top: 8px;
      left: -65px;
      background: $toggle-bg-color;
    }

    input[type="checkbox"] + label::after {
      content: ' ';
      display: block;
      height: 30px;
      width: 30px;
      border: 1px solid $toggle-nub-color;
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: -75px;
      background: $toggle-nub-color;
      transition: all 0.3s ease-in;
    }

    input[type="checkbox"]:checked + label::after {
      left: -40px;
      transition: all 0.3s ease-in;
    }
  }

  .example1 {
    margin-top: 3rem;

    figure {
      background-image: linear-gradient(to right, rgba(203, 213, 225, 0.5) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(203, 213, 225, 0.5) 1px, transparent 1px);
      background-size: 48px 48px;
      background-position: -1px -1px;
    }

    input {
      margin: 0;
    }

    label {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      margin: 0;
      flex-wrap: wrap;

      span {
        display: block;
      }
    }

    .horizontal {
      label {
        margin-left: 30px;
      }

      .value {
        width: 60px;
        text-align: right;
        color: var(--code);
      }
    }

    .vertical {
      display: flex;

      .value {
        color: var(--code);
        position: absolute;
        bottom: 0;
        height: 24px;
      }

      label {
        transform: rotate(180deg);
        writing-mode: vertical-lr;
        margin-bottom: -30px;
      }

      input {
        height: 140px;
      }
    }

    #circleEx1 {
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
  }

  .ex2Wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    label {
      display: flex;
      align-items: center;
      position: relative;
      margin: 1rem 0;

      input {
        margin: 0;
      }
    }
  }

  .example2 {
    figure {
      display: flex;
      justify-content: center;
      align-items: center;

      background-image: linear-gradient(to right, rgba(203, 213, 225, 0.5) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(203, 213, 225, 0.5) 1px, transparent 1px);
      background-size: 50% 50%;
      background-position: -1px -1px;
    }

    div.movable {
      border: 1px solid var(--accent);
      transform: translate(0, 0);
      padding: 1rem;
      background: rgba(0, 0, 0, 0.2)
    }

    div.shadow {
      border: 1px dotted var(--accent);
      position: absolute;
      padding: 1rem;
      opacity: 0.5;
    }
  }

  .example3 {
    figure {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 2rem;
    }

    .flex {
      --min: 35ch;
      --gap: 1rem;
      display: grid;
      grid-gap: var(--gap);
      grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
      margin-top: 3rem;
    }

    .transformable {
      position: relative;
      height: 100px;
      width: 100px;
      border: 1px solid var(--accent);

      background-image: linear-gradient(to right, rgba(203, 213, 225, 0.5) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(203, 213, 225, 0.5) 1px, transparent 1px);
      background-size: 10px 10px;
      background-position: -1px -1px;

      &:before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(0deg, rgba(216, 27, 96, 0.4) 0%, rgba(73, 137, 237, 0.4) 100%);
      }
    }
  }

  .example4 {
    figure {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      margin-top: 2rem;
    }

    .panel {
      position: relative;
      height: 200px;
      width: 200px;

      .face {
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

      .front {
        transform: perspective(400px) rotateY(0);
        background: var(--accent);
      }

      .back {
        transform: perspective(400px) rotateY(179.9deg);
        background: var(--code);

        h3 {
          margin: 1rem 0;
          font-size: 1.4rem;
          font-weight: bold;
        }

        p {
          margin: 0;
          padding: 0 8px;
          text-align: left;
          width: 100%;
          font-size: 0.8rem;
        }
      }

      &:hover, &:focus {
        .front {
          transform: rotateY(-179.9deg);
        }

        .back {
          transform: rotateY(0);
        }
      }
    }
  }

  .example5 {
    figure {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .transformable {
      width: 100px;
      height: 100px;
      border: 1px solid purple;
      transform-style: preserve-3d;
      transition: transform 200ms linear;
      background: var(--code);
    }
  }

  .example6 {
    figure {
      display: flex;
      justify-content: center;
      align-items: center;
      perspective: 500px;
    }

    .cube {
      position: relative;
      width: 100px;
      height: 100px;
      transform-style: preserve-3d;
      transition: transform 200ms linear;
    }

    .face {
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

    .top {
      transform: rotateX(90deg) translateZ(50px);
    }

    .bottom {
      transform: rotateX(-90deg) translateZ(50px);
    }

    .right {
      transform: rotateY(90deg) translateZ(50px);
    }

    .left {
      transform: rotateY(-90deg) translateZ(50px);
    }

    .front {
      transform: rotateX(0deg) translateZ(50px);
    }

    .back {
      transform: rotateX(-180deg) translateZ(50px);
    }
  }

  .demo {
    p {
      margin-top: 2rem;
    }

    .panel1 {
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

      &:hover,
      &:focus {
        transform: translate3d(0px, 0px, 0px);
      }
    }

    .panel2 {
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
      background-image: radial-gradient(circle at 100% 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),
      radial-gradient(circle at 0 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),
      radial-gradient(circle at 50% 100%, white 10%, silver 10%, silver 23%, white 23%, white 30%, silver 30%, silver 43%, white 43%, white 50%, silver 50%, silver 63%, white 63%, white 71%, transparent 71%, transparent),
      radial-gradient(circle at 100% 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent),
      radial-gradient(circle at 0 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent);
      background-size: 100px 50px;
      background-position: 50%;

      span {
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


      &:before {
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
        background-image: radial-gradient(circle at 100% 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),
        radial-gradient(circle at 0 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),
        radial-gradient(circle at 50% 100%, white 10%, silver 10%, silver 23%, white 23%, white 30%, silver 30%, silver 43%, white 43%, white 50%, silver 50%, silver 63%, white 63%, white 71%, transparent 71%, transparent),
        radial-gradient(circle at 100% 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent),
        radial-gradient(circle at 0 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent);
        background-size: 100px 50px;
        background-position: 50%;
        outline: 1px solid var(--code);
      }

      &:hover:before,
      &:focus:before {
        transform: rotateY(0);
      }
    }

    .demo3 {
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

      &:hover {
        background-image: linear-gradient(to top, #d3d3d5 0%, #fff 80%, #f8f6f6 100%);
        box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 3px 3px #CECFD1;
        filter: none;
      }

      &:active {
        box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 4px 3px #999, inset 0 0 20px #bbb;
      }
    }
  }

  .panel3 div {
    margin: 1rem auto 0;
  }

  [data-theme="dark"] .panel3 div {
    width: clamp(160px, 50%, 300px);
    margin: 1rem auto 0;
    padding: 2rem 2rem;
    border-radius: 1rem;
    background: white;
  }
</style>
