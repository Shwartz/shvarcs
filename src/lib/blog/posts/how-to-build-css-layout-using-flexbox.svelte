<script>
	import mockup from '$lib/images/p5-CSS-Layout-mockup.jpg';
	import HighLightWrap from '$lib/components/HighLightWrap.svelte';
	import { CodePen } from 'sveltekit-embed';

	import mockupDivided from '$lib/images/p5-CSS-Layout-mockup-divided.jpg';
	import purHTMLex from '$lib/images/p5-html-without-css.jpg';
	import nav from '$lib/images/p5-nav.png';
	import fourCols from '$lib/images/p5-four-cols.jpg';
	import {
		ex1,
		ex2,
		ex3,
		ex4,
		ex5,
		ex6,
		ex7,
		ex8,
		ex9,
		ex10,
		ex11,
		ex12,
		ex13,
		ex14,
		ex15,
		ex16,
		ex17,
		ex18,
		ex19,
		ex20,
		ex21,
		ex22,
		ex23
	} from '$lib/blog/2024-06-css-layout/sourceExamples.js';

	const title = 'How to create CSS Layout using Flexbox | Post';
	const description = 'Explaining advanced layout techniques with step-by-step simple examples using CSS Flexbox';
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

<section class="post">
	<div>
		<p>So, you have your first mockup or design in your hands, but how do you translate it to HTML and CSS? Should you
			rely on CSS frameworks like Bootstrap, TailwindCSS, or others? No matter your choice, it would benefit you to
			understand the mechanics behind the layout.</p>
		<p>If you are in a hurry, here is a <a href="#scrollFinalResult">demo</a> with the end result</p>
		<p>Let's say we have a standard mockup with a Header, Footer and a few sections.
			Before diving into code, I usually look at the mockup and figure out how many different sections I have. Let’s do
			that.
		</p>
	</div>
	<div>
		<p id="scrollMockupImg">
			<img
				src={mockup}
				alt="Example of simple home page mockup with Navigation, Hero section, two and four column section and a footer">
		</p>
	</div>
	<div>
		<p>Here are our Sections:</p>
		<ol>
			<li>Main navigation</li>
			<li>Hero section</li>
			<li>Two column Section</li>
			<li>Four column Section</li>
			<li>Two-column Section, the same as (3) but reversed</li>
			<li>The Footer, which looks like it is attached to the bottom</li>
		</ol>
		<p>
			We do not have Mobile view, but we can assume that Two Col section would stack image below and Four column would
			nicely collapse into one column.</p>
		<p>I made visual adjustments to see each section.</p>
		<p>
			<img src={mockupDivided} alt="Website Homepage mockup divided by sections">
		</p>
		<p>Let’s add some colours we can use for our design. I use this colour palette: <a
			href="https://coolors.co/1e1e24-92140c-fff8f0-ffcf99-111d4a">coolors.co</a>
		</p>
	</div>
	<div class="large">
		<div class="color-palette">
			<div class="raisin-black">
				<span>1E1E24</span>
				<span>Raisin Black</span>
			</div>
			<div class="penn-red">
				<span>92140C</span>
				<span>Penn red</span>
			</div>
			<div class="floral-white">
				<span>FFF8F0</span>
				<span>Floral white</span>
			</div>
			<div class="sunset">
				<span>FFCF99</span>
				<span>Sunset</span>
			</div>
			<div class="space-cadet">
				<span>111D4A</span>
				<span>Space cadet</span>
			</div>
		</div>
	</div>
	<div>
		<h3>Setting up HTML structure</h3>
		<p>Setting up the basic HTML structure and using it semantically correctly is essential to get going. Semantic HTML
			has many benefits. It improves SEO and makes it more accessible for users with disabilities. Also, it makes code
			maintenance better, as you can read and understand the purpose of the elements.</p>
		<p>Let's start with the basic HTML structure.</p>
		<HighLightWrap source={ex1} />

		<p class="imgWrap">
			<img src={purHTMLex}
					 alt="HTML example without CSS added">
			<span>We use the following tags: <code>nav</code>, <code>section</code> and <code>footer</code> to highlight their
      semantic purpose.<br />
      As you see, even though we didn’t add any CSS, the code above produces HTML with added style. The Browser has its own CSS stylesheet, the "User-Agent-Stylesheet.” This is why Title tags have different sizes and links have a default colour.</span>
		</p>

		<p>You can see this example in the <a href="https://codepen.io/Shvarcs/pen/rNgGjwe">CodePen</a>.</p>
		<h3>CSS Reset</h3>
		<p>To remove inconsistencies and differences in rendering between browsers, we can use CSS Reset.</p>
		<p>In the CodePen examples, I used built-in CSS Reset. However, there are plenty you can find. For example, <a
			href="https://github.com/elad2412/the-new-css-reset">The new CSS reset</a>.</p>
		<p>What does it do? Well, each browser has its own stylesheet for title sizes, list styling, body margins and
			paddings and many other things. Basically, reset.css zeroes all those values between browsers and makes all
			elements look the same. So, you can start your styling with a blank canvas.</p>
		<p>Take a look at the pen below. All elements on the page look the same, although they represent titles, links,
			sections and paragraphs. To demonstrate this, I added The New CSS reset, but in the following examples, I will use
			CodePen's built-in Reset to reduce cluttering.</p>
		<p>Now we have a clean blank and are ready to add some styles.</p>
	</div>

	<div class="large">
		<div class="codePen">
			<CodePen clickToLoad={false} codePenId="ExzmOVw" />
		</div>
	</div>

	<div>
		<h3>Fonts</h3>

		<p>Typography itself is a massive topic. There are font sizes, weight, line height, how text interacts with titles,
			and so on. At a minimum, we need to decide on a font family and define font sizes.</p>

		<p>For font family, I will use probably the most known font family from <a href="https://getbootstrap.com/">Bootstrap</a>
		</p>
		<p><code>font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation
			Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";</code></p>

		<p>I will use the <a
			href="https://utopia.fyi/type/calculator/?c=320,18,1.2,1240,20,1.25,5,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12">Utopia</a>
			website's handy tool to calculate the font sizes.
		</p>

		<p>Let’s add basic fonts for titles, links and paragraph tags which will be used for all website.</p>
		<HighLightWrap source={ex2} />

		<p>What is that <code>:root</code> part? The Root represents the document, or in HTML, it actually represents HTML.
			Somehow, it is a tradition to define CSS variables to the <code>:root</code> element, and that’s exactly what I
			did as well. I defined all font sizes; I won’t use all of them in the current example. However, colours will be
			used fully. On the body tag, I defined the background colour and font family, and the rest is self-explanatory.
		</p>

		<h3>Layout Techniques</h3>

		<p>There are different techniques for approaching layout. A long time ago, when the grass was greener, I used the
			Floating technique to build websites. That was quite challenging and involved clearing after elements to get them
			aligned. The differences between browsers were massive, and IE6 was a real pain.</p>

		<p>Currently, I mostly use CSS Flexbox and CSS Grid for CSS layouts. For our Mockup, I will use Flexbox. Here is a
			great resource if you need to refresh on a Flexbox: <a
				href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">CSS Tricks</a>. I also use it quite often myself.
		</p>

		<p>I usually start from the top to the bottom and style each section one by one. Based on the Mockup, each section
			should be full width; however, the content itself is restricted to a maximum width. Also, the background colour
			for some sections should cover the full width of the element.</p>

		<p>That means we can’t wrap the whole page in one <code>div</code> tag and add max width. If we did, we wouldn’t be
			able to add a
			full-width background colour for a few sections.</p>

		<h3>Navigation</h3>

		<p>Let’s figure out what is needed for Navigation. We have a max-width for navigation; we want it in the middle of
			the screen, and all but the last item should be on the left side.</p>

		<p><img src={nav} alt="Nav example with max width and the last item on the right"></p>
		<HighLightWrap source="{ex3}" />

		<p>So, we have the <code>&lt;nav/&gt;</code> tag as a wrap and the first <code>&lt;div/&gt;</code> tag as the
			container, which will hold max-width. If we look at the mockup, we notice that the same pattern is for each
			section.</p>

		<p>In that case, we can write something like that in CSS:<br />
			<code>nav > div &#123; <br />width: 100%; <br />max-width: 1200px;<br /> margin: auto &#125; </code>
		</p>

		<p>However, we need the same for the Hero, Footer, and every Section. For that, we can use <code>is()</code>
			selector
			to grab all sections and define the same structure for each of them.</p>

		<HighLightWrap source="{ex4}" />

		<p>Let’s define Navigation’s styles.</p>

		<HighLightWrap source="{ex5}" />

		<p>Adding <code>1rem</code> to the Nav I set some breathing space between items and Nav. </p>

		<p><code>nav > div</code> defines flex with the 1rem gap and chooses the font size for the items inside the nav.
			<br>The align-items center define the vertical alignment for the items.</p>

		<p>Since we want the last item to be pushed to the far right, we add <code>margin-left: auto</code>, which will do
			exactly what we want. This feels a bit like a magic trick and probably is. When we apply margin auto to the flex
			child, it will fill that space and push the item in the opposite direction.</p>

		<p>This should setup our Navigation in place. The only thing I want to add is the “logo”. For that, I will use
			Iconify website and choose the lighthouse from here: <a
				href="https://icon-sets.iconify.design/icon-park-solid/light-house/">Icons</a>. I choose it as SVG and replace
			the first item</p>

		<p>That’s it. Our navigation is sorted using a few lines of CSS.</p>

		<p>To simplify CSS, I use the built-in Pen CSS reset. So, if you copy HTML and CSS from the pen, remember to add
			your favourite reset CSS to replicate the example.</p>
	</div>
	<div class="large">
		<div class="codePen">
			<CodePen clickToLoad={true} codePenId="LYoyoMO" />
		</div>
	</div>
	<div>

		<h3>Hero Section</h3>
		<p>The Hero section is really simple. I want the background gradient to be filled full size and the text to stay
			max-width
			600px. Why 600px? Because it is the comfortable width for reading. </p>

		<HighLightWrap source="{ex6}" />

		<p>For HTML, there is not much. I added a <code>section</code> with the class name <code>hero</code>, followed by
			an inner wrapper div to fix the content and then the content itself. Instead of a background gradient, there could
			be a background image. You also have to be careful with font colour as you have to think about accessibility.</p>

		<HighLightWrap source={ex7} />
	</div>
	<div class="large">
		<div class="codePen">
			<CodePen clickToLoad={true} codePenId="BaeZZvo" />
		</div>
	</div>
	<div>

		<h3>Footer</h3>

		<p>In the <a href="#scrollMockupImg">mockup</a> the footer seems to stick to the bottom of the page. Let’s add the
			footer now before we have too much content to test it.</p>

		<p>Again, with the same principle as above, we will use <code>footer</code> tag with inner wrapper for content.</p>

		<HighLightWrap source={ex8} />

		<p>We want the last item to be on the right side, away from the rest, so I will reuse <br>
			<code>margin-left: auto</code> technique. <br>
			Since the footer background is dark, I will use reverse colours for the links.</p>
		<HighLightWrap source={ex9} />

		<p>Remember, I defined body tag like this.</p>

		<HighLightWrap source={ex10} />

		<p>Before we use the magic power of margin auto, we need to set the page height to 100%. This is important!</p>

		<HighLightWrap source={ex11} />

		<p>Now, when I define <code>margin-top: auto</code> on the footer, it will use that Flexbox magic and create a space
			between other elements, and that’s how we get the footer to stick to the bottom.</p>
	</div>
	<div class="large">
		<div class="codePen">
			<CodePen clickToLoad={true} codePenId="VwOzmOM" />
		</div>
	</div>
	<div>
		<h3>Two column sections</h3>

		<p>So, by looking at the <a href="#scrollMockupImg">mockup</a>, we can see that there are two columns, and the size
			is roughly 2:1. I take a 12-col grid approach, so it is like 8:4. We will use the same approach as with the rest
			of the site. We will use a Section and an inside div wrapper.</p>

		<HighLightWrap source={ex12} />

		<p>I’m using an article tag for the main part and an aside tag for the sidebar where I will keep the image.</p>

		<p>The rest is straightforward. Firstly, I will give 2rems for the section.</p>

		<p>For the inner <code>&lt;div&gt;</code> I will use the flex and direction column for mobile, and from the screen
			size 600px, I want to switch to flex-direction: row.</p>

		<p>I will use gap: 1rem. Why gap? That way, I can switch in reverse and don’t need to adjust margins between
			elements. The gap is awesome!</p>

		<p>The article and the aside will both use flex, as I want to use flex size. So, the end result will look something
			like this.</p>

		<HighLightWrap source={ex13} />

		<p>It's worth noting that I use <code>@media</code> query to accommodate different screen sizes. First, I define
			content direction as a column.</p>

		<HighLightWrap source={ex14} />

		<p>Once the screen size is above 600px, I will use the flex-direction row:</p>

		<HighLightWrap source={ex15} />

		<p>Ok, great. Now, we have two columns implemented.</p>

		<p>However, the second column looks very similar to the first one. The only difference is that the text and image
			are switched around. With Flex, it is super easy to reverse those two columns.</p>

		<p><code>flex-direction: row-reverse</code> and that’s it. <br>We want to use reverse only for screens above 600px.
		</p>

		<HighLightWrap source={ex16} />

		<p>Of course, for a reverse column, I use the additional class name <code>reverse</code>.</p>
	</div>
	<div class="large">
		<div class="codePen">
			<CodePen clickToLoad={true} codePenId="wvbeeRM" />
		</div>
	</div>
	<div>

		<h3>Four column section</h3>

		<p> To make things more fun, I want different content in those columns. Let's say I would add text in some and an
			image in others, which would fill the container fully. Also, I want those columns to start at mobile size and
			magically grow and expand with the screen size.</p>

		<p> Let’s start with HTML and use the same pattern as before.</p>

		<HighLightWrap source={ex17} />

		<p>Now, the fun part!</p>

		<p>For those columns, I want to use a CSS grid. SmolCSS fully inspired me, and you should be, too!
			<a href="https://smolcss.dev/#smol-css-grid">smolcss.dev</a>
		</p>

		<p>First, we wrap the usual bit in a section and give background colour and paddings.</p>

		<p>The next part is the fun bit. I use the arbitrary value of 28ch, which takes the character zero-O width of the
			font. The gap between the columns is 1 rem. The fancy bit is the last line.</p>

		<p>I define one unit as taking 1 fraction of space and define the min/max values for that space.</p>

		<p>Although I define it as a four-column layout, in reality, I could add more or remove some columns. I simply
			calculated that <code>28ch</code>, in this case, would take one row with four items. Nothing will break if I
			remove or add
			more items; however, at some screen sizes, it could leave some empty space.
		</p>

		<HighLightWrap source={ex18} />

		<p>Ok, let’s define text size. Since I use dark blue, I want the font a bit smaller but with added letter
			spacing.</p>

		<HighLightWrap source={ex19} />

		<p>To style each column container, I can use a direct child selector, which is very handy as I don’t need to add any
			classes. I use overflow hidden as I don’t want the image to leave the container. You will see that in a bit.</p>

		<HighLightWrap source={ex20} />

		<p>This is the result. It's not good. The text is very close to the edge of the container. If we add padding for the
			text, we will push the image away, too. We want the images to be full height and width. Also, there is this silly
			4px gap for the last image. Let's fix all this nonsense!</p>

		<p><img src={fourCols} alt="screenshot of four columns layout showing empty spaces, missing paddings"></p>

		<p>Let’s add 1rem padding for the container, but only if there is no image.</p>

		<HighLightWrap source={ex21} />

		<p>Let’s remove the 4px gap and make the image fill the container's space completely. Adding more text in the next
			column will push the image container, too, so to avoid the empty gap, we use <code>object-fit: cover</code>. </p>

		<HighLightWrap source={ex22} />

		<p>The last thing I want to add is underline for all but Navigation links.</p>

		<HighLightWrap source={ex23} />

		<h3 id="scrollFinalResult">Final result</h3>
		<p><a href="#scrollTop">Back to top</a></p>

		<p><a href="https://codepen.io/collection/zxQKQO?grid_type=list">CodePen list of examples</a></p>

		<p>Here is the final result. It took less than 200 lines of CSS, including colours and font styling.</p>
	</div>
	<div class="large">
		<div class="codePen">
			<CodePen clickToLoad={true} codePenId="GRavrWw" />
		</div>
	</div>
	<div>

		<p>Do we really need a CSS framework? For big projects with multiple members, it makes sense to use the CSS
			framework as it sets the basic rules. For an in-house project with 2-3 developers, if they agree on an approach,
			it might be better to build it from scratch.</p>

		<h3>Conclusion</h3>
		<p>Do you think I missed something or got something wrong? Do you have a better solution? If you have any questions
			or comments, please feel free to contact me on <a href="https://fosstodon.org/@shvarcs">Mastodon</a> or <a
				href="https://www.linkedin.com/in/shvarcs/">LinkedIn</a></p>
		<p>Happy Coding!</p>

		<p>PS. <i>This article is written by a human.</i></p>
	</div>
</section>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">
  .color-palette {
    --min: 10ch;
    --gap: 0;
    display: grid;
    grid-gap: var(--gap);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
    margin-top: 1rem;

    span + span {
      font-size: 0.9rem;
    }

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 8rem;
    }

    .raisin-black {
      background: #1E1E24;
      color: white;
    }

    .penn-red {
      background: #92140C;
      color: white;
    }

    .floral-white {
      background: #FFF8F0;
      color: black;
    }

    .sunset {
      background: #FFCF99;
      color: black;
    }

    .space-cadet {
      background: #111D4A;
      color: white;
    }
  }

  .imgWrap {
    display: flex;
    flex-direction: column;

    img {
      max-width: 300px;
      margin-bottom: 1rem;
    }

    @media only screen and (min-width: 800px) {
      flex-direction: row;

      img {
        margin-right: 1rem;
      }
    }
  }
</style>
