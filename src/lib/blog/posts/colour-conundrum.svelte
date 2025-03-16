<script lang="ts">
	import { onMount } from 'svelte';
	import { createImgUrl } from '$lib/utils/snippets';
	import HighLightWrap from '$lib/components/HighLightWrap.svelte';
	import Tag from '$lib/components/snippets/Tag.svelte';
	import { base } from '$app/paths';

	const title = 'Colour Conundrum | Post';
	const description = 'Colour exploration';

	let xLightness = $state(90);
	let xChroma = $state(0.084);
	let xHue = $state(75);


	onMount(() => {

	});

	const source1 = `--pastel-orange: #FFD79F;
--pastel-cream: #F0EBD5;
--pastel-mint: #D1E2CF;
--pastel-yellow: #FCF3A4;
--pastel-rose: #FFA3B6;`;

	const source2 = `a {
  color: #7a2c41;
  background: #ffc9d3;

  &:hover {
    background: #ffeef0;
  }
}

/** Dark theme */
a {
  color: #ffe0f3;
  background: #573f44;

  &:hover {
    background: #6e4d53;
  }
}
`;

	const source3 = `.link {
  transition: background-color 0.2s;

  background: oklch(from var(--link-color) l c h / 0.6);
  color: oklch(from var(--link-color) calc(l - 0.4) c h);

  &:hover, &:focus {
    background: oklch(from var(--link-color) l c h / 0.2);
  }
}

/** For the dark theme, all I need to do is adjust lightness and opacity */
[data-theme="dark"] .link {
  background: oklch(from var(--link-color) l c h / 0.3);
  color: oklch(from var(--link-color) calc(l + 0.2) c h);
}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content="{title}" />
	<meta name="description" content="{description}" />
	<meta property="og:title" content="{title}" />
	<meta property="og:description" content="{description}" />
	<meta property="twitter:title" content="{title}" />
	<meta property="twitter:description" content="{description}" />
	<meta property="og:type" content="article">
	<meta property="og:image" itemprop="image" content="{createImgUrl('9b1fb70c-d376-4c62-554a-05513a0a0100', '1024w')}">
	<meta property="og:image:width" content="994">
	<meta property="og:image:height" content="576">
	<meta name="robots" content="index,follow" />
</svelte:head>

<section class="post">
	<div>
		<p>Do you ever wonder why there are so many ways to declare the colours?</p>

		<p>Some (long) while ago, I was reading posts about new colours, you know, those HSL, OKLCH, HWB, LAB, and LCH.
			Also, there is the Color() function as well as Relative colours.</p>

		<p>That made me think - why? Why do we need all those different ways to declare the colour? For the last 15 years, I
			have happily used RGB, RGBA, hex, or even by names like purple, orange or <code>#bada55</code>. I have never had
			any issues. Why all the fuss?</p>

		<p>Until that one day, I finally realised.</p>

		<h2>Component with colourful link</h2>

		<p>I had a simple component or widget, if you like, with a Title, Description and Link. Something like this:</p>

		<div id="ex-1" class="ex-1">
			<h3>Component title</h3>
			<p>Lovely description for the component </p>
			<p>
				<a href="#ex-1">The colour and background of the link could be improved.</a>
			</p>
		</div>

		<p>There is not much there, but those simple snippets are many and assigned to categories, which have defined colour
			schemas, exactly like those backgrounds on the buttons below.</p>

		<div class="buttonList">
			<Tag blogCategory="CSS" active={false} />
			<Tag blogCategory="Fonts" active={false} />
			<Tag blogCategory="JavaScript" active={false} />
			<Tag blogCategory="Development" active={false} />
			<Tag blogCategory="Tools" active={false} />
		</div>

		<HighLightWrap source={source1} />

		<p>So, my next thought is: how about I apply the same colour schema for the links? That way, I would make it easy to
			distinguish between different snippets.</p>

		<p>This is where I realised that I’m in trouble. Suddenly, I need three colours:</p>

		<ul>
			<li>Link background colour</li>
			<li>Link background hover colour</li>
			<li>Link text colour, which should be strong against the background but keep the same colour</li>
		</ul>

		<p>Oh, did I mention that I also need something for a light/dark theme? That means I need six colours from one
			pre-defined colour.</p>

		<p>Here is an example of what I would need to create with one colour:</p>

		<div id="ex-2" class="ex-2">
			<h3>Component | light theme</h3>
			<p>This widget uses Tools category colours for link</p>
			<p>
				<a href="#ex-2">Light version link for Tools category</a>
			</p>
		</div>

		<div id="ex-3" class="ex-3">
			<h3>Component | dark theme</h3>
			<p>This widget uses Tools category colours for link</p>
			<p>
				<a href="#ex-3">Dark version link for Tools category</a>
			</p>
		</div>

		<p>So, the Tools category uses <code>--pastel-rose: #FFA3B6;</code> colour, and I would need to create six colours
			from that colour. There are three colours for each theme and 10 categories. That's like 60 colours to define in
			variables and reuse. It feels wrong.</p>

		<HighLightWrap source={source2} />

		<h2>Discovering the power of oklch()</h2>

		<p>While I was tinkering with the problem (well, actually randomly browsing blueSky) I stumbled upon Ahmad Shadeed's
			post on relative colours: <a href="https://ishadeed.com/article/css-relative-colors/">CSS relative colors</a>.<br>
			This, in turn, led me to the post from Evil Martians:
			<a href="https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl">OKLCH in CSS</a> and that's when I
			realised I want to rewrite all the colours in my blog to use <code>OKLCH</code> (someday).</p>

		<p>Anyway, back to the problem above. Once I realise the power of <code>OKLCH</code> and <code>relative
			colours</code>, the answer is simple.</p>

		<p>I can take one colour and create multiple colours in turn. Actually, I can take any colour and reuse that colour
			to create corresponding colours in CSS. Simple.</p>

		<p>In my case, each snippet loops through the config file and gets assigned a colour. Instead of assigning colour
			directly like <code>color: var(--pastel-orange)</code>, I assign a new variable to hold the current snippets
			colour value, like this <code>&lt;a style="--link-color: var(--pastel-orange)"&gt;link here&lt;/a&gt;</code></p>

		<p>This is important. Instead of assigning a colour to the link, I assigned a variable with the current colour.
			Because of that, I can get this value and use it in the CSS later! Very nifty!</p>

		<p>Now, the magical part in CSS:</p>

		<HighLightWrap source={source3} />

		<p>If you freak out when looking at this code, that's normal. But let's go step by step. Honestly, it is all very
			simple.</p>

		<p>Let's look at line 4: <code>background: oklch(from var(--link-color) l c h / 0.6);</code></p>

		<p>I assign background colour and use relative colour <code>oklch</code></p>

		<p>I created that colour from <code>var(--link-color)</code> which I assigned for the element. Remember this line:
			<br>
			<code>&lt;a style="--link-color: var(--pastel-orange)"&gt;link here&lt;/a&gt;</code><br>
			so, I assign <code>var(--pastel-orange</code> to <code>--link-color</code> and use it in <code>oklch</code>.
		</p>

		<p>The <code>oklch</code> has three values Lightness, Chroma, Hue and the last value (0.6) is opacity. Basically, I
			take
			<code>--link-color</code> and pass it in relative color in the same way but with opacity 0.6. That's it.</p>

		<p>For line 5<br> <code>color: oklch(from var(--link-color) calc(l - 0.4) c h);</code>, <br>I change the lightness.
		</p>

		<p>The value range for the lightness is from 0 to 0.37. When I create OKLCH, it simply assigns all values to the
			respective channel. Then I use <code>calc(l - 0.4)</code> to reduce lightness to my liking.</p>

		<p>The beauty of this approach is that I do not need to know the exact colour; I can simply change one of the
			parameters, and it will adjust colour by lightness, hue, or opacity. You can't simply do that with RGB() or hex
			colours, well, apart from opacity.</p>

		<p>I use exactly this approach in <a href="{base}/good-read">Bookmarks</a>. Try to open the dev tools and inspect
			yourself.</p>
	</div>
	<div>
		<div class="example-1">
			<div class="config">
				<label class="horizontal" for="lightness">
					<input orient="horizontal" bind:value={xLightness} name="lightness" type="range" min="0" max="100" step="1" />
					<span class="value">{xLightness}%</span>
					<span>Lightness</span>
				</label>
				<label class="horizontal" for="lightness">
					<input orient="horizontal" bind:value={xChroma} name="chroma" type="range" min="0" max="0.37" step="0.001" />
					<span class="value">{xChroma}</span>
					<span>Chroma (Saturation)</span>
				</label>
				<label class="horizontal" for="hue">
					<input orient="horizontal" bind:value={xHue} name="hue" type="range" min="0" max="360" step="5" />
					<span class="value">{xHue}</span>
					<span>Hue</span>
				</label>
				<div class="vertical">
					<figure style="background: oklch({xLightness}% {xChroma} {xHue})"></figure>
				</div>
			</div>
		</div>
		<pre class="fullWidth">
<code>
&#123;
  background: oklch({xLightness}% {xChroma} {xHue});
&#125;
	&nbsp;
</code>
</pre>
	</div>
</section>

<section class="post">
	<div>
		<h2>Practicalities</h2>
		<p>Ok, you maybe still not convince, but let me you give another example.</p>
		<p>Imagine you have text and a background. You want the text to always be easy to read against the background and
			keep both colours similar to each other. How would you do it with RGB() or hex colours? You would need to declare
			every background and every prime colour for the text, right? I'm too lazy to do that, so here is how I would do it
			with oklch().</p>

		<p>In the example below, I assign only one colour to the <code>—-figure-main</code> and reuse it in both examples.
		</p>
	</div>

	<div>
		<div class="example-2">
			<div class="config">
				<label class="horizontal" for="hue">
					<input orient="horizontal" bind:value={xHue} name="hue" type="range" min="0" max="360" step="5" />
					<span class="value">{xHue}</span>
					<span>Hue</span>
				</label>
				<div class="vertical" style="--figure-main: oklch(0.9 0.084 {xHue})">
					<figure style="background: oklch(from var(--figure-main) l c h)">
						<p style="color: oklch(from var(--figure-main) calc(l - 0.4) c h)">Always prominent text against
							background</p>
					</figure>
					<p style="font-size: var(--step--1); text-align: left; margin-top: 1rem;">Here it is the same but with reverse
						colours.</p>
					<figure style="background: oklch(from var(--figure-main) calc(l - 0.4) c h)">
						<p style="color: oklch(from var(--figure-main) l c h)">Always prominent text against background</p>
					</figure>
				</div>
			</div>
		</div>
	</div>
	<div class="large">
		<pre class="fullWidth">
<code>
&lt;div style="--figure-main: oklch(0.9 0.084 {xHue})"&gt;
  &lt;figure style="background: oklch(from var(--figure-main) l c h)"&gt;
    &lt;p style="color: oklch(from var(--figure-main) calc(l - 0.4) c h)"&gt;Text&lt;/p&gt;
  &lt;/figure&gt;

  &lt;figure style="background: oklch(from var(--figure-main) calc(l - 0.4) c h)"&gt;
    &lt;p style="color: oklch(from var(--figure-main) l c h)"&gt;Text&lt;/p&gt;
  &lt;/figure&gt;
&lt;/div&gt;

</code>
</pre>
	</div>
	<div>
		<p>Here you have it! Finally, it clicked for me, and I can see fantastic opportunities to use OKLCH for design
			systems and reuse one colour for dark/light themes with reversed lightning. I'm also pretty sure I only scratched
			the surface of all the possibilities.</p>

		<p>Let me know your thoughts on BlueSky or Mastodon.</p>

		<p style="font-size: var(--step--1)">P.S. This post was written by a human, and no AI was harmed in the process.</p>
	</div>
</section>

<style lang="scss">
  h2 {
    font-size: var(--step-2);
    margin-top: 2rem;
  }

	.large {
		display: flex;
		justify-content: center;
	}

  pre {
    margin-top: 1rem;
  }

  figure {
    width: 100%;
    min-height: 100px;
    background: pink;
  }

  .config {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }

  input[type=range][orient=horizontal] {
    appearance: slider-horizontal;
    width: 175px;
    height: 8px;
  }

  [class*="ex-"] {
    --example-bg: oklch(from var(--grid-color) calc(l - 0.3) c h / 0.7);
    position: relative;
    margin: 1rem 0;
    padding: 1rem;
    box-shadow: 0 0 1px 1px oklch(from var(--example-bg) l c h / 0.2);
    background: var(--background-color);
    overflow: hidden;

    &:before {
      content: 'Example';
      position: absolute;
      right: -44px;
      top: 22px;
      transform: rotate(45deg);
      padding: 0.2rem 3rem;
      background: var(--example-bg);
      font-size: var(--step--1);
      color: var(--clr-white);
    }

    h3 {
      margin: 0;
      font-size: var(--step-1);
    }
  }


  pre {
    overflow: auto;
    padding-top: 1px;
  }


  .example-2 {
    figure {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }

    p {
      margin: 0;
      font-size: var(--step-1);
      text-align: center;
    }
  }

  .ex-2 {
    background: var(--clr-white);

    h3, p {
      color: var(--black);
    }

    a {
      color: #7a2c41;
      background: #ffc9d3;

      &:hover {
        background: #ffeef0;
      }
    }
  }

  .ex-3 {
    background: var(--black);

    h3, p {
      color: var(--clr-white);
    }

    a {
      color: #ffe0f3;
      background: #573f44;

      &:hover {
        background: #6e4d53;
      }
    }
  }

  .buttonList {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

</style>
