<script>
  import HighLightWrap from "$lib/components/HighLightWrap.svelte";

  const source1 =
    `transform: translate(20px, 50px),
transform: translate(10%, -50px),
transform: translateX(2em),
transform: translateY(-1rem)`;
  /* Exercise 1 */
  /* Exercise 4 */
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


  let hasPercentToggle = false;
  let ex1BoxWidth = 0;
  let ex1BoxHeight = 0;
  let x1Val = 50;
  let y1Val = 50;
  $:x1Perc = hasPercentToggle ? `${x1Val}%` : `${(ex1BoxWidth - 48) * x1Val / 100}px`;
  $:y1Perc = hasPercentToggle ? `${y1Val}%` : `${(ex1BoxHeight - 48) * y1Val / 100}px`;
  $:ex1Style = `transform: translate(${x1Perc}, ${y1Perc})`;
  $:ex1BgStyle = hasPercentToggle ? `background-size: 48px 48px` : `background: none`;

  /* Exercise 2 */
  $:x2Val = 0;
  $:ex2Style = `transform: translate(0, ${x2Val}%)`;

  /* Exercise 3 */
  let x3SkewX = 0;
  let x3SkewY = 0;
  let x3ScaleX = 1;
  let x3ScaleY = 1;
  let x3RotateZ = 0;
  let x3RotateX = 0;
  let x3RotateY = 0;

  function resetEx3() {
    x3SkewX = 0;
    x3SkewY = 0;
    x3ScaleX = 1;
    x3ScaleY = 1;
    x3RotateZ = 0;
    x3RotateX = 0;
    x3RotateY = 0;
  }

  $:ex3Style = `transform: skew(${x3SkewX}deg, ${x3SkewY}deg)
    scale(${x3ScaleX}, ${x3ScaleY})
    rotateZ(${x3RotateZ}deg) rotateX(${x3RotateX}deg) rotateY(${x3RotateY}deg)`;

  const source3 =
    `transform:
    skew(${x3SkewX}deg, ${x3SkewY}deg)
    scale(${x3ScaleX}, ${x3ScaleY})
    rotateZ(${x3RotateZ}deg) rotateX(${x3RotateX}deg) rotateY(${x3RotateY}deg)`;


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

        <h3>Examples with 2D animation</h3>
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
        <div class="example3">
            <h3>Skew, Size and Rotation</h3>
            <p>Why not to bend some elements, right? If you want to do that then probably Skew will help you most, but
                play with all of them and see how they change element in 2D</p>
            <p>You can apply skew, scale and rotate rules into one rule like so:</p>
            <HighLightWrap source={source3}/>


            <div class="flex">
                <div>
                    <code>transform: skew({x3SkewX}deg, {x3SkewY}deg)</code>
                    <input orient="horizontal" bind:value={x3SkewX} name="x3SkewX" type="range" min="-50"
                           max="50"/> {x3SkewX} deg<br/>
                    <input orient="horizontal" bind:value={x3SkewY} name="x3SkewY" type="range" min="-50"
                           max="50"/> {x3SkewY} deg<br/>
                </div>
                <div>
                    <code>transform: scale({x3ScaleX}, {x3ScaleY})</code>
                    <input orient="horizontal" bind:value={x3ScaleX} name="x3ScaleX" type="range" min="-2" max="2"
                           step="0.1"/> {x3ScaleX}<br/>
                    <input orient="horizontal" bind:value={x3ScaleY} name="x3ScaleY" type="range" min="-2" max="2"
                           step="0.1"/> {x3ScaleY}<br/>
                </div>
                <div>
                    <code>transform: rotateZ({x3RotateZ}deg) rotateX({x3RotateX}deg) rotateY({x3RotateY}deg)</code>
                    <input orient="horizontal" bind:value={x3RotateZ} name="x3RotateX" type="range" min="-180"
                           max="180"/> {x3RotateZ} deg<br/>
                    <input orient="horizontal" bind:value={x3RotateX} name="x3RotateX" type="range" min="-180"
                           max="180"/> {x3RotateX} deg<br/>
                    <input orient="horizontal" bind:value={x3RotateY} name="x3RotateX" type="range" min="-180"
                           max="180"/> {x3RotateY} deg<br/>
                </div>
                <div>
                    <button type="button" on:click={resetEx3}>Reset</button>
                </div>
            </div>
            <figure>
                <div style={ex3Style} class="transformable"></div>
            </figure>
            <p>Dive deeper with MDN and learn more about <a
                    href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform">transform</a>.</p>

        </div>
    </div>
</section>
<section class="medium">
    <div>
        <h2>3D CSS</h2>
        <p>By combining different techniques we can make a 3D effects. The best part? The example below doesn't use any
            JavaScript.</p>
        <div class="example4">
            <figure>
                <div class="panel">
                    <div class="face front">This is front</div>
                    <div class="face back">This is back</div>
                </div>
                <div class="panel">
                    <div class="face front">
                        <svg class="svg-icon"
                             style="width: 100%; height: 100%; vertical-align: middle;fill: currentColor;overflow: hidden;"
                             viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M511.784594 62.907749c-247.25636 0-447.696462 200.421682-447.696462 447.696462 0 247.27478 200.440102 447.696462 447.696462 447.696462 247.27478 0 447.696462-200.421682 447.696462-447.696462C959.481056 263.329431 759.05835 62.907749 511.784594 62.907749zM827.316967 772.669858c-40.914852-17.087167-137.518027-50.604538-197.287295-68.238151-5.119601-1.603521-5.90243-1.859347-5.90243-23.099091 0-17.524119 7.195889-35.157731 14.228049-50.096978 7.631818-16.250102 16.667611-43.537586 19.891026-68.02121 9.090029-10.530844 21.441335-31.29782 29.364795-70.864978 6.975878-34.901905 3.717671-47.583738-0.893346-59.492976-0.490164-1.276063-1.000793-2.515287-1.346671-3.75451-1.74883-8.159844 0.638543-50.677193 6.612605-83.653235 4.136204-22.623253-1.038656-70.715575-32.18912-110.539582-19.674085-25.13854-57.326637-56.033178-126.078487-60.334133l-37.709857 0.037862c-67.583235 4.263094-105.236809 35.157731-124.910894 60.296271-31.151487 39.824007-36.325323 87.916329-32.208563 110.539582 5.993504 32.975019 8.378831 75.492368 6.667863 83.507926-0.38374 1.38351-0.892323 2.622734-1.38351 3.89982-4.607948 11.909238-7.869225 24.591071-0.893346 59.492976 7.92346 39.567157 20.274766 60.334133 29.365818 70.864978 3.223415 24.483624 12.259208 51.771107 19.893072 68.02121 5.592368 11.876492 8.197706 28.018124 8.197706 50.860365 0 21.242813-0.782829 21.49557-5.573949 22.991644-61.827137 18.254759-160.235424 53.81158-196.922998 69.87851-60.353576-71.444169-96.841605-163.697269-96.841605-264.361947 0-226.288816 184.099948-410.387741 410.388764-410.387741 226.288816 0 410.387741 184.097902 410.387741 410.387741C922.172335 610.178043 886.503974 701.5511 827.316967 772.669858z"/>
                        </svg>
                        <p>Thomas C. Green</p>
                    </div>
                    <div class="face back">
                        <h3>Thomas C. Green</h3>
                        <p>4007 Elliott Street</p>
                        <p>Center Ossipee, NH 03814</p>
                    </div>
                </div>
            </figure>
        </div>
        <p>Here is example on how to implement such card</p>
        <HighLightWrap source={source2}/>

        <p>There is a bit more for CSS. First, we define a Panel which would keep two divs for a Front and Back.</p>
        <HighLightWrap source={source4}/>

        <p>There I defined shared props. The main thing is that I hide <code>backface-visibility</code>, because I don't
            want to show it and instead i will show other div's part. I removed design like colours and flex boxes to
            simplify implementation. I also added animation with 1s duration.</p>
        <HighLightWrap source={source5}/>

        <p>The last bit is to make that "magical" swap between the front and the back face</p>
        <p>So, both of those faces are defined as position absolute. That means that the top part is visible by default
            and other is hidden. Now I tell that front is <code>rotateY(0)</code>, which means - do nothing.</p>
        <p>The back face is set to <code>rotateY(179.9)</code>, which means that that side is rotated away for now.<br/>
            Why 179.9? Well, browser will turn always on the shortest route. That way I make sure it will always turn in
            the one possible way.</p>
        <p>The last part I do opposite for when user Hovers or Focus on the Panel. So, Front face is turned away while
            the Back face is turned to the front. I should probably mention that I use SCSS for simplicity.</p>
        <HighLightWrap source={source6}/>

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
