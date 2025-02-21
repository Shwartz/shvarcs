<script lang="ts">
	import { base } from '$app/paths';
	import PostList from '$lib/blog/logic/PostList.svelte';
	import { onMount } from 'svelte';
	import type { CategoryType } from '$lib/utils/categoryColors';
	import { TrOutlineArrowNarrowRight } from 'svelte-icons-pack/tr';
	import { Icon } from 'svelte-icons-pack';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { getColor } from '$lib/components/snippets/getColor';

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
		<p>Welcome to my digital sandbox, where I break things so you don't have to</p>
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
				<Tooltip color={getColor(1)}>
					<a title="Friday Issue #130" href="{base}/friday-issue-130-21-02-2025-1985804e-702d-8073-bc7b-c93654393f3a">
						<h3>Friday Issue #130</h3>
						<time datetime="2025-02-21">21/02/2025</time>
						<p>How to start a React project in 2025? Which RTE to choose from? Is NPM enough? There are loads of
							questions this week. My favourites are AbortController and CSS functions.</p>
					</a>
				</Tooltip>
			</article>
			<article>
				<Tooltip color={getColor(3)}>
					<a title="Friday Issue #129"
						 href="{base}/news-archive/friday-issue-129-07-02-2025-1855804e-702d-801f-9158-fcbc20c15b8f">
						<h3>Friday Issue #129</h3>
						<time datetime="2025-02-07">07/02/2025</time>
						<p>How long is a second? A new fetch mocker, update from Svelte 5, good thoughts on CSS nesting and CSS
							design
							mistakes. Updates on Tailwindcss 4 and good read about Electron</p>
					</a>
				</Tooltip>
			</article>
			<article>
				<Tooltip color={getColor(6)}>
					<a title="Friday Issue #128"
						 href="{base}/news-archive/friday-issue-128-24-01-2024-9e7a8873-8b99-4a4a-a657-7b6479379fb1">
						<h3>Friday Issue #128</h3>
						<time datetime="2025-01-24">24/01/2025</time>
						<p>
							Loads of reading this week. Here is an Angular strategy for 2025, a checklist for tsconfig.json, Rising
							Stars 2024, and Threlte 8,and that's only from JS updates, Accessibility, the ARIA tool, the latest WP
							saga and the British summer simulator.</p>
					</a>
				</Tooltip>
			</article>
			<article>
				<Tooltip color={getColor(8)}>
					<a title="Friday Issue #127"
						 href="{base}/news-archive/friday-issue-127-10-01-2025-1625804e-702d-80bb-a99b-d0d682b8e810">
						<h3>Friday Issue #127</h3>
						<time datetime="2025-01-10">10/01/2025</time>
						<p>Epic programming principles, HTMX as jQuery, CSS text-box-trim and balanced text, new Front-end features,
							Tailwind 4 and good read Perfection is the enemy post.</p>
					</a>
				</Tooltip>
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
				<p class="url">
					<a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">css-tricks.com</a>
				</p>
				<p>I don’t even know how many times I come to this resource for help. One is for sure: the naming of the props
					for
					the Flexbox is pretty confusing. Luckily, it is super easy to find an answer in this post, which comes with
					great visuals, too.</p>
			</div>
			<div class="book">
				<h3>Type Scale Generator</h3>
				<p class="url">
					<a href="https://landin.gs/tools/type-scale-generator/">landin.gs</a>
				</p>
				<p>A handy tool to sort out fonts for your project in an easy way and export as CSS, SCSS, Tailwind or even as a
					JSON for WordPress.</p>
			</div>
			<div class="book">
				<h3>GridStack</h3>
				<p class="url">
					<a href="https://gridstackjs.com/">gridstackjs</a>
				</p>
				<p>Pure TypeScript library, no external dependencies and can work with any framework. Very easy to use and
					create beautiful draggable, resizable, responsive layouts with few lines of code.</p>
			</div>
			<div class="book">
				<h3>Component Party</h3>
				<p class="url">
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
    line-height: 1.5;
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
      font-size: var(--step-1);
    }

    time {
      display: block;
      margin-top: 0.2rem;
    }

    p {
      margin-top: 1rem;
    }

    a {
      text-decoration: none;
      cursor: url('/src/assets/svg/cursor.svg') 16 16, auto;
    }

    a:hover {
      cursor: url('/src/assets/svg/cursor.svg') 16 16, pointer;
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

		.url {
			margin: 0;
		}

    h3 {
			font-size: var(--step-1);
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
      background: var(--pastel-lime);
      font-size: var(--step--1);
      vertical-align: middle;

      &:hover, &:focus {
        background: var(--pastel-lime-hover);
      }
    }
  }

  :global(.gridOff) :is(header, .bookmarks) {
    border-top-color: rgba(0, 0, 0, 0);
    border-bottom-color: rgba(0, 0, 0, 0);
  }
</style>
