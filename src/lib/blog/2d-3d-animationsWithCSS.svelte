<script>
  import HighLightWrap from "$lib/components/HighLightWrap.svelte";

  const source1 =
    `transform: translate(20px, 50px),
transform: translate(10%, -50px),
transform: translateX(2em),
transform: translateY(-1rem)`

  // fullWidth
  // 100        10

  let ex1BoxWidth = 0;
  let ex1BoxHeight = 0;
  let x1Val = 50;
  let y1Val = 50;
  $:x1Perc = (ex1BoxWidth - 48) * x1Val / 100;
  $:y1Perc = (ex1BoxHeight - 48) * y1Val / 100;
  $:ex1Style = `transform: translate(${x1Perc}px, ${y1Perc}px)`;


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

        <div class="example1 codeExample">
            <label for="x1">
                <span>x-axis</span>
                <input bind:value={x1Val} name="x1" type="range" min="0" max="100" step="10"/>
                <span class="value horizontal">{x1Val}%</span>
            </label>
            <div class="vertical">
                <label for="y1">
                    <span>y-axis</span>
                    <input bind:value={y1Val} name="y1" type="range" min="0" max="100" step="10"/>
                    <span class="value vertical">{y1Val}%</span>
                </label>
                <figure bind:clientWidth={ex1BoxWidth} bind:clientHeight={ex1BoxHeight}>
                    <span style={ex1Style} id="ex1"></span>
                </figure>
            </div>

        </div>
        <pre>
<code>
&#123;
  position: absolute;
  transform: translate({x1Perc}px, {y1Perc}px);
  transition: transform 0.3s;
  top: 0;
  left: 0;
  width: 48px;
  height: 48px;
  border: 2px solid var(--code);
  background: var(--accent);
  border-radius: 50%;
&#125;
</code>
</pre>
    </div>
</section>


<style lang='scss'>
  .codeExample {
    margin-top: 3rem;

    figure {
      position: relative;
      width: 100%;
      margin: 0;
      padding: 1rem;
      border: 1px solid var(--accent);
      color: var(--text-light);
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

      span {
        display: block;
      }

      .value.horizontal {
        width: 60px;
        text-align: right;
        color: var(--code);
      }

      .value.vertical {
        color: var(--code);
      }
    }

    .vertical {
      display: flex;

      label {
        transform: rotate(180deg);
        writing-mode: vertical-lr;
      }
    }
  }

  .example1 figure {
    height: 250px;
    width: 100%;

    #ex1 {
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
</style>
