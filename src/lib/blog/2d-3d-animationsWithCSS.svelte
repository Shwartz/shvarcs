<script>
  import HighLightWrap from "$lib/components/HighLightWrap.svelte";

  const source1 =
    `transform: translate(20px, 50px),
transform: translate(10%, -50px),
transform: translateX(2em),
transform: translateY(-1rem)`

  let hasPercentToggle = false;
  let ex1BoxWidth = 0;
  let ex1BoxHeight = 0;
  let x1Val = 50;
  let y1Val = 50;
  $:x1Perc = hasPercentToggle ? `${x1Val}%` : `${(ex1BoxWidth - 48) * x1Val / 100}px`;
  $:y1Perc = hasPercentToggle ? `${y1Val}%` : `${(ex1BoxHeight - 48) * y1Val / 100}px`;
  $:ex1Style = `transform: translate(${x1Perc}, ${y1Perc})`;
  $:ex1BgStyle = hasPercentToggle ? `background-size: 48px 48px` : `background: none`;

  $:x2Val = 0;
  $:ex2Style = `transform: translate(0, ${x2Val}%)`;


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

<section class="medium">
    <div>
        <time datetime="03-2024">March, 2024</time>
        <h1>2D and 3D animations using CSS with interactive examples</h1>

        <p>2D and 3D animations provide developers with tools to manipulate an element on the screen. That includes
            <code>position</code>, <code>size</code>, <code>perspective</code> and <code>rotation</code>. </p>

        <h2>2D CSS Transform</h2>

        <p>To use 2D animation, you must apply <code>Transform</code> property to an element.</p>

        <HighLightWrap source={source1}/>

        <p>As you can see from example above, you can use positive, negative values as well as different length
            units.</p>

        <h3>Example with 2D animation</h3>
        <p>Box width: {ex1BoxWidth}px, height: {ex1BoxHeight}px, <span
                style="display:inline-block">Circle: 48px x 48px</span></p>
        <div class="toggle">
            <input type="checkbox" id="toggle" bind:checked={hasPercentToggle}>
            <label for="toggle">Toggle between <span class:active={!hasPercentToggle}>px</span> and <span
                    class:active={hasPercentToggle}>%</span>.</label>
        </div>

        <div class="example1 codeExample">
            <label class="horizontal" for="x1">
                <span>x-axis</span>
                <input orient="horizontal" bind:value={x1Val} name="x1" type="range" min="0" max="100" step="10"/>
                <span class="value">{x1Perc}</span>
            </label>
            <div class="vertical">
                <label for="y1">
                    <span>y-axis</span>
                    <input orient="vertical" bind:value={y1Val} name="y1" type="range" min="0" max="100" step="10"/>
                    <span class="value vertical">{y1Perc}</span>
                </label>
                <figure style={ex1BgStyle} bind:clientWidth={ex1BoxWidth} bind:clientHeight={ex1BoxHeight}>
                    <span style={ex1Style} id="circleEx1"></span>
                </figure>
            </div>

        </div>
        <pre>
<code>
&#123;
  transform: translate({x1Perc}, {y1Perc});
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
        <div>
            <p>In the example above, I'm using <code>px</code> values to move yellow circle around the box. So, I know
                that height is 250px (-2px of
                the border) and the circle's width/height is 48px so, the formula is<br/>
                (boxWidth - 48) * currentStep / 100 <br/>
                where currentStep is 10, 20 ... or 100</p>
            <p>Why don't I use % for length? Wouldn't that be simpler? <br/>
                <code>transform: translate(50%, 50%)</code></p>
            <p>That is the fun part, the Circle knows only its own dimensions, but knows nothing about the parent box.
                Instead it uses the element size itself. So, for 100% translate would happened exactly at the size of
                the element, in this case 48px to whatever direction.</p>
            <p>Toggle between px and % to see the difference. So, when Circle is pushed by percentage it will move to
                direction based on its own size. 100% right would mean - "moving right exactly the size of itself".</p>
            <p>This is the most amazing and powerful part of the translate()! Probably the only one way where you can
                move an element exactly for 50% to any directions without knowing the size of the element.</p>

            <p class="ex2Wrap">
                <span>transform: translate(0, <code>{x2Val}%</code>)</span>
                <label class="horizontal" for="x2">
                    <input orient="horizontal" bind:value={x2Val} name="x2" type="range" min="-100" max="100"/>
                </label>
            </p>

            <div class="example2 codeExample">
                <figure>
                    <div class="shadow">Some block</div>
                    <div style={ex2Style} class="movable">Some block</div>
                </figure>
            </div>
        </div>
        <div>
            <h3>Size, Perspective and Rotation</h3>
        </div>
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
      background: rgba(0,0,0,0.2)
    }
    div.shadow {
      border: 1px dotted var(--accent);
      position: absolute;
      padding: 1rem;
      opacity: 0.5;
    }
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
</style>
