<script lang="ts">
	import { base } from '$app/paths';
	import PostList from '$lib/blog/logic/PostList.svelte';
	import { onMount } from 'svelte';
	import type { CategoryType } from '$lib/utils/categoryColors';
	import { TrOutlineArrowNarrowRight } from 'svelte-icons-pack/tr';
	import { Icon } from 'svelte-icons-pack';
	import Header from '$lib/components/Header.svelte';

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
	<Header />
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
			<article>
				<h3>Friday Issue #125</h3>
				<time datetime="2024-12-06">06/12/2024</time>
				<p>React Router 7, Vite 6, and Astro 5 are the latest and greatest for the last two weeks. Also, the new
					animation
					library Motion and TanStack ditching adapters.</p>
			</article>
		</main>
	</section>
</div>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss" global>
	.blog {
		div {
			background: purple;
		}
	}

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

  :global(.gridOff) header {
    border-bottom-color: rgba(0, 0, 0, 0);
  }

  .blog {
    border-top: 1px dotted var(--grid-color);
  }

  :global(.gridOff) .blog {
    border-top-color: rgba(0, 0, 0, 0);
  }

  .news {
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
</style>
