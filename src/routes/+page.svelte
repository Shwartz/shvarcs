<script lang="ts">
	import { base } from '$app/paths';
	import PostList from '$lib/blog/logic/PostList.svelte';
	import { onMount } from 'svelte';
	import type { CategoryType } from '$lib/utils/categoryColors';
	import { TrOutlineArrowNarrowRight } from 'svelte-icons-pack/tr';
	import { Icon } from 'svelte-icons-pack';

	let compact = $state(false);
	let checked = $state(false);
	let selectedFilter = $state<CategoryType | null>(null);

	onMount(() => {
		const savedState = localStorage.getItem('themeCompactState');
		checked = savedState === 'true';
		compact = checked;
	});
</script>

<div class="content">
	<section class="hero">
		<p>A product-minded deep dive into design, accessibility and SEO topics</p>
	</section>
	<div class="blog">
		<header>
			<h2>Blog</h2>
			<a href="{base}/thoughts" aria-label="Read all blog posts">Read all
				<Icon size="24" color="var(--text)" src={TrOutlineArrowNarrowRight} />
			</a>
		</header>
		<PostList {compact} {selectedFilter} numberOfPosts={3} />
	</div>
	<section class="news">
		<header>
			<h2>News</h2>
			<a href="{base}/news-archive" aria-label="Read all news articles">Read all
				<Icon size="24" color="var(--text)" src={TrOutlineArrowNarrowRight} />
			</a>
		</header>
		<main>
			<article>
				<h3>Friday Issue #129</h3>
				<time datetime="2025-02-07">07/02/2025</time>
				<p>How long is a second? A new fetch mocker, update from Svelte 5, good thoughts on CSS nesting and CSS design
					mistakes. Updates on Tailwindcss 4 and good read about Electron</p>
			</article>
			<article>
				<h3>Friday Issue #128</h3>
				<time datetime="2025-01-24">24/01/2025</time>
				<p>Loads of reading this week. Here is an Angular strategy for 2025, a checklist for tsconfig.json, Rising Stars
					2024, and Threlte 8,and that's only from JS updates, Accessibility, the ARIA tool, the latest WP saga and the
					British summer simulator.</p>
			</article>
			<article>
				<h3>Friday Issue #127</h3>
				<time datetime="2025-01-10">10/01/2025</time>
				<p>Epic programming principles, HTMX as jQuery, CSS text-box-trim and balanced text, new Front-end features,
					Tailwind 4 and good read Perfection is the enemy post.</p>
			</article>
			<article>
				<h3>Friday Issue #126</h3>
				<time datetime="2024-12-20">20/12/2024</time>
				<p>The last newsletter of 2024 is loaded with great posts! TanStack, RockPack, ApexCharts, State of JS, a Svelte
					advent calendar, CSS one-liners to save the day, and many more good reads.</p>
			</article>
		</main>
	</section>
	<section class="bookmarks">
		<header>
			<h2>Good Read</h2>
			<a href="{base}/good-read" aria-label="Read all bookmarks">Read all
				<Icon size="24" color="var(--text)" src={TrOutlineArrowNarrowRight} />
			</a>
		</header>
		<div>
			<div class="book">
				<h3>CSS Flexbox Guide</h3>
				<p>
					<a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">css-tricks.com</a>
				</p>
				<p>I don’t even know how many times I come to this resource for help. One is for sure: the naming of the props
					for
					the Flexbox is pretty confusing. Luckily, it is super easy to find an answer in this post, which comes with
					great visuals, too.</p>
			</div>
			<div class="book">
				<h3>Type Scale Generator</h3>
				<p>
					<a href="https://landin.gs/tools/type-scale-generator/">landin.gs</a>
				</p>
				<p>A handy tool to sort out fonts for your project in an easy way and export as CSS, SCSS, Tailwind or even as a
					JSON for WordPress.</p>
			</div>
			<div class="book">
				<h3>GridStack</h3>
				<p>
					<a href="https://gridstackjs.com/">gridstackjs</a>
				</p>
				<p>Pure TypeScript library, no external dependencies and can work with any framework. Very easy to use and
					create beautiful draggable, resizable, responsive layouts with few lines of code.</p>
			</div>
			<div class="book">
				<h3>Component Party</h3>
				<p>
					<a href="https://github.com/matschik/component-party.dev">github.com</a>
				</p>
				<p>This is a place where you can quickly compare other libraries side by side. Really fun to see how skinny and
					easy to read Svelte is. I know I am biased. 🙂</p>
			</div>
		</div>
	</section>
</div>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss" global>
  .content {
    flex-grow: 1;
  }

  .hero {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
  }

  .hero p {
    font-size: px-to-rem(40px);
    line-height: px-to-rem(56px);
    max-width: 960px;
    text-align: center;
    padding: 1rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0 1rem;
    border-bottom: 1px dotted var(--grid-color);

    h2 {
      font-size: px-to-rem(32px);
    }

    a {
      display: flex;
      gap: 0.5rem;
      color: var(--text);
      text-decoration: none;

      :global(svg) {
        transition: transform 300ms;
        transform: translate3d(0, 0, 0);
      }

      &:hover :global(svg) {
        transform: translate3d(0.5rem, 0, 0);
      }
    }
  }

  .blog {
    border-top: 1px dotted var(--grid-color);
  }

  :global(.gridOff) .blog {
    border-top-color: rgba(0, 0, 0, 0);
  }

  .news {
		margin-bottom: 4rem;

    main {
      display: grid;
      gap: 1.5rem;
      grid-template-columns: 1fr;
    }

    h3 {
      margin-top: 1.5rem;
      font-size: px-to-rem(24px);
    }

    time {
      display: block;
      margin-top: 0.2rem;
    }

    p {
      margin-top: 1rem;
    }

    @media (min-width: px-to-rem(600px)) {

      main {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (min-width: px-to-rem(1200px)) {

      main {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }

  .bookmarks {
    border-top: 1px dotted var(--grid-color);

		 > div {
			 display: grid;
			 grid-template-columns: repeat(1, 1fr);
			 gap: 1.5rem;
			 margin-top: 2rem;

       @media (min-width: px-to-rem(600px)) {
         grid-template-columns: repeat(2, 1fr);
			 }
		 }

		h3 {
			margin-bottom: 1rem;
		}

		p {
			margin-top: 1rem;
		}
  }

	.book {
    a {
      padding: 2px;
      border-radius: 2px;
      color: var(--black);
      background:
              linear-gradient(to right, var(--pastel-lime), var(--pastel-lime), var(--pastel-lime)) 100% 100% no-repeat,
              linear-gradient(to right, var(--pastel-lime), var(--pastel-yellow), var(--pastel-lime)) 0 100% no-repeat;
      background-size: 100% 100%, 0 100%;
      transition: background-size 400ms;
      font-size: var(--step--1);
      vertical-align: middle;

      &:hover, &:focus {
        background-size: 0 100%, 100% 100%;
      }
    }
	}

  :global(.gridOff) :is(header, .bookmarks) {
    border-top-color: rgba(0, 0, 0, 0);
    border-bottom-color: rgba(0, 0, 0, 0);
  }
</style>
