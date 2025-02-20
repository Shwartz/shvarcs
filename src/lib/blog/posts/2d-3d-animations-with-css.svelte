<script>
	import HighLightWrap from '$lib/components/HighLightWrap.svelte';
	import { ex18 } from '$lib/blog/2024-06-css-layout/sourceExamples.js';

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
  background: var(--pastel-blue);
}

.back {
  transform: perspective(400px) rotateY(179.9deg);
  background: var(--pastel-purple);
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
	let ex1BgStyle = $derived(hasPercentToggle ? `background-size: 48px 48px` : `background: white`);

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


	const title = '2D and 3D animations using CSS | Post';
	const description = '2D and 3D animations using CSS with interactive examples';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content="{title}" />
	<meta name="description" content="{description}" />
	<meta property="og:title" content="{title}" />
	<meta property="og:description" content="{description}" />
	<meta property="twitter:title" content="{title}" />
	<meta property="twitter:description" content="{description}" />
	<meta name="robots" content="index,follow" />
</svelte:head>
<!-- svelte-ignore css_unused_selector -->
<section class="post">
	<div>

		<p>2D and 3D animations provide developers with tools to manipulate an element on the screen, including
			<code>position</code>, <code>size</code>, <code>perspective</code> and <code>rotation</code>. </p>

		<h2>2D CSS Transform</h2>

		<p>To use 2D animation, you must apply the <code>Transform</code> property to an element.</p>

		<HighLightWrap source={source1} />

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


		<div class="example1 codeExample">
			<label class="horizontal" for="x1">
				<span>x-axis</span>
				<input orient="horizontal" bind:value={x1Val} name="x1" type="range" min="0" max="100" step="10" />
				<span class="value">{x1Perc}</span>
			</label>
			<div class="vertical">
				<label for="y1">
					<span>y-axis</span>
					<input orient="vertical" bind:value={y1Val} name="y1" type="range" min="0" max="100" step="10" />
					<span class="value vertical">{y1Perc}</span>
				</label>
				<figure style={ex1BgStyle} bind:clientWidth={ex1BoxWidth} bind:clientHeight={ex1BoxHeight}>
					<span style={ex1Style} id="circleEx1"></span>
				</figure>
			</div>
		</div>
		<pre class="fullWidth">
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
				that height is 250px (-2px of the border) and the Circle's width/height is 48px, so the formula is<br />
				(boxWidth - 48) * currentStep / 100 <br />
				where currentStep is 10, 20 ... or 100</p>
			<p>Why don't I use % for length? Wouldn't that be simpler? <br />
				<code>transform: translate(50%, 50%)</code></p>
			<p>That is the fun part. The Circle knows only its own dimensions but nothing about the parent box.
				Instead, it uses the element size itself. So, when we translate for 100%, it would move precisely at the
				element's size, in this case 48px, to whatever direction.</p>
			<p>Toggle between px and % to see the difference. So, when a Circle is pushed by a percentage, it will move
				in a direction based on its own size. 100% right would mean "moving right exactly the size of
				itself."</p>
			<p>This is a powerful part of the translate()! It is probably the only way to move an element exactly 50% in
				any direction without knowing its size.</p>

			<p class="ex2Wrap">
				<span>transform: translate(0, <code>{x2Val}%</code>)</span>
				<label class="horizontal" for="x2">
					<input orient="horizontal" bind:value={x2Val} name="x2" type="range" min="-100" max="100" />
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
			<p>Why not bend some elements, right? If you want to do that, Skew will probably help you most but play with
				all of them and see how they change an element.</p>
			<p>You can apply Skew, scale and rotate rules into one rule like so:</p>
			<HighLightWrap source={source3} />

			<div class="flex">
				<div>
					<code>transform: skew({x3SkewX}deg, {x3SkewY}deg)</code>
					<input orient="horizontal" bind:value={x3SkewX} name="x3SkewX" type="range" min="-50"
								 max="50" /> {x3SkewX} deg<br />
					<input orient="horizontal" bind:value={x3SkewY} name="x3SkewY" type="range" min="-50"
								 max="50" /> {x3SkewY} deg<br />
				</div>
				<div>
					<code>transform: scale({x3ScaleX}, {x3ScaleY})</code>
					<input orient="horizontal" bind:value={x3ScaleX} name="x3ScaleX" type="range" min="-2" max="2"
								 step="0.1" /> {x3ScaleX}<br />
					<input orient="horizontal" bind:value={x3ScaleY} name="x3ScaleY" type="range" min="-2" max="2"
								 step="0.1" /> {x3ScaleY}<br />
				</div>
				<div>
					<code>transform: rotateZ({x3RotateZ}deg) rotateX({x3RotateX}deg) rotateY({x3RotateY}deg)</code>
					<input orient="horizontal" bind:value={x3RotateZ} name="x3RotateX" type="range" min="-180"
								 max="180" /> {x3RotateZ} deg<br />
					<input orient="horizontal" bind:value={x3RotateX} name="x3RotateX" type="range" min="-180"
								 max="180" /> {x3RotateX} deg<br />
					<input orient="horizontal" bind:value={x3RotateY} name="x3RotateX" type="range" min="-180"
								 max="180" /> {x3RotateY} deg<br />
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

<section class="post">
	<div>
		<h2>3D CSS (kind of)</h2>
		<p>By combining different techniques, we can create 3D effects. The best part? The example below doesn't use any
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
		<p>Here is an example of how to implement such a card:</p>
		<HighLightWrap source={source2}/>

		<p>There is a bit more to CSS. First, we define a Panel, which would keep two divs for the Front and Back.</p>
		<HighLightWrap source={source4}/>

		<p>There, I defined shared props. The main thing is that I hide <code>backface-visibility</code>, because I
			don't want to
			show it; instead, I will show the other div's part. I removed designs like colours and flex boxes to
			simplify implementation. I also added animation with 1s duration.</p>
		<HighLightWrap source={source5}/>

		<p>The last bit is to make that "magical" swap between the front and the back face</p>
		<p>So, both of those faces are defined as position absolute. That means the top part is visible by default, and
			the other is hidden. Now I tell that the front is <code>rotateY(0)</code>, which means - do nothing.</p>

		<p>The back face is set to <code>rotateY(179.9)</code>, which means that that side is rotated away for now.</p>

		<p>Why 179.9? Well, the browser will always turn on the shortest route. That way I make sure it will always turn
			in
			the one possible way.</p>

		<p>The last part I do opposite for when the user Hovers or Focus on the Panel. So, Front face is turned away
			while
			the Back face is turned to the front. I should probably mention that I use SCSS for simplicity.</p>
		<HighLightWrap source={source6}/>

		<h2>3D with translate3d(x, y, z)</h2>
		<p>All modern devices have a CPU and a GPU (Graphical Processing Unit). The GPU's purpose is to tackle graphical
			rendering and remove some of the CPU tasks. What does this mean? Basically, if you use CSS3 transitions, 3D
			transforms, or Canvas Drawing, it would trigger GPU acceleration. Animation becomes very smooth.</p>
		<p>Instead of using <code>translateX(10px)</code> use <code>translate3d(10px, 0, 0)</code>. The result is the
			same, but the latter would use GPU acceleration, which improves animation.</p>
		<p><code>translate3d()</code> lets you reposition elements in 3D space</p>
		<div class="example5">
			<div class="flex">
				<div>
					<code>transform: translate3d({x4trX}px, {x4trY}px, {x4trZ}px)</code><br/>
					<input orient="horizontal" bind:value={x4trX} name="x4trX" type="range" min="-100"
								 max="100"/> X: {x4trX} px<br/>
					<input orient="horizontal" bind:value={x4trY} name="x4trY" type="range" min="-100"
								 max="100"/> Y: {x4trY} px<br/>
					<input orient="horizontal" bind:value={x4trZ} name="x4trY" type="range" min="-100"
								 max="100"/> Z: {x4trZ} px
				</div>
			</div>
			<figure>
				<div style={ex4Style} class="transformable"></div>
			</figure>
		</div>
		<p>Not much happens above, but let's add rotate and draw a cube with CSS using translate3d</p>
		<div class="example6">
			<div class="flex">
				<div>
					<code>transform: rotate3d({x5trX}, {x5trY}, {x5trZ}, {x5deg}deg)</code><br/>
					<input orient="horizontal" bind:value={x5trX} name="x5trX" type="range" min="-10"
								 max="10"/> X: {x5trX}<br/>
					<input orient="horizontal" bind:value={x5trY} name="x5trY" type="range" min="-10"
								 max="10"/> Y: {x5trY}<br/>
					<input orient="horizontal" bind:value={x5trZ} name="x5trY" type="range" min="-10"
								 max="10"/> Z: {x5trZ}<br/>
					<input orient="horizontal" bind:value={x5deg} name="x5deg" type="range" min="-180"
								 max="180"/> deg: {x5deg}
				</div>
				<div>
					<button type="button" on:click={resetEx6}>Reset</button>
				</div>
			</div>
			<figure>
				<div style={ex5Style} class="cube">
					<div class="face front">1</div>
					<div class="face back">2</div>
					<div class="face right">3</div>
					<div class="face left">4</div>
					<div class="face top">5</div>
					<div class="face bottom">6</div>
				</div>
			</figure>
		</div>
		<p>Here is an example how to create a cube with CSS: <a
			href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transforms/Using_CSS_transforms#setting_perspective">MDN:
			CSS Perspective</a></p>
	</div>
</section>

<section class="post">
	<div class="demo">
		<h2>CSS3 Examples</h2>
		<p class="center">Card demo</p>
		<div class="panel1">
			Card demo
		</div>

		<p class="center">Book effect</p>
		<div class="panel2">
			<span>Purple secret here</span>
		</div>

		<div class="panel3">
			<p class="center">Skeuomorphic Button</p>
			<div>
				<button class="demo3" type="button">I'm a button</button>
			</div>
		</div>
		<p>The post is written by a human and you can comment it on the <a href="https://fosstodon.org/@shvarcs/112070128710363156">Mastodon</a></p>
	</div>
</section>


<style lang="scss">
	h2 {
		font-size: var(--step-3);
		margin-top: 2rem;
	}
  input[type="range"] {
    cursor: pointer;
  }

	:is(.example5, .example6, .flex) {
		margin: 1rem 0;
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
    color: var(--pastel-purple);
  }

  code span {
    font-size: 0.8rem;
  }

  figure {
    position: relative;
    width: 100%;
    margin: 0;
    border: 1px solid var(--pastel-blue);
    color: var(--text-light);
    height: 250px;
  }

  .fullWidth {
    margin: 1rem 0;

    > * {
      width: 100%;
    }
  }

  .toggle {
    $toggle-bg-color: var(--pastel-blue);
    $toggle-nub-color: var(--pastel-purple);

    height: 40px;
    display: flex;
    align-items: center;

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
      top: 4px;
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
      top: -2px;
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
      border: 1px solid var(--code-border-color);
      background-color: var(--background-color);
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
        color: var(--pastel-purple);
      }
    }

    .vertical {
      display: flex;

      .value {
        color: var(--pastel-purple);
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
      border: 2px solid var(--pastel-purple);
      background: var(--pastel-blue);
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
      background-color: var(--background-color);

      background-image: linear-gradient(to right, rgba(203, 213, 225, 0.5) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(203, 213, 225, 0.5) 1px, transparent 1px);
      background-size: 50% 50%;
      background-position: -1px -1px;
    }

    div.movable {
      border: 1px solid var(--pastel-blue);
      transform: translate(0, 0);
      padding: 1rem;
      background: rgba(0, 0, 0, 0.2)
    }

    div.shadow {
      border: 1px dotted var(--pastel-blue);
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
      --min: 30ch;
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
      border: 1px solid var(--pastel-blue);

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
        background: var(--pastel-blue);
      }

      .back {
        transform: perspective(400px) rotateY(179.9deg);
        background: var(--pastel-purple);

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
      background: var(--pastel-purple);
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
      color: var(--pastel-purple);
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
      border: 2px solid var(--pastel-blue);
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
      border: 2px solid var(--pastel-purple);
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
        outline: 1px solid var(--pastel-purple);
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
