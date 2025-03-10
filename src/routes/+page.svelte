<script lang="ts">
	import { base } from '$app/paths';
	import PostList from '$lib/blog/logic/PostList.svelte';
	import { onMount } from 'svelte';
	import type { CategoryType } from '$lib/utils/categoryColors';
	import { TrOutlineArrowNarrowRight } from 'svelte-icons-pack/tr';
	import { Icon } from 'svelte-icons-pack';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { getColor } from '$lib/components/snippets/getColor';
	import { page } from '$app/state';
	import type { PostsData } from '$lib/types/types';

	const { data } = $props();
	const posts = $derived(data.posts as Promise<PostsData>);

	let compact = $state(false);
	let checked = $state(false);
	let selectedFilter = $state<CategoryType | null>(null);

	onMount(() => {
		const savedState = localStorage.getItem('themeCompactState');
		checked = savedState === 'true';
		compact = checked;
	});

	const title = page?.data?.title ?? 'Frontend blog by Andris.';
	const description = page?.data?.description ?? 'Stories about CSS, HTML, animation and all around Frontend.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content="{title}">
	<meta name="description" content="{description}">
	<meta property="og:title" content="{title}">
	<meta property="og:description" content="{description}">
	<meta property="twitter:title" content="{title}">
	<meta property="twitter:description" content="{description}">
	<meta name="robots" content="index,follow">
</svelte:head>

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
			{#await posts}
				<div class="loader">Loading posts...</div>
			{:then postsData}
				{#if Array.isArray(postsData.posts)}
					{#each postsData.posts as post (post.id)}
						<article>
							<Tooltip color={getColor(1)}>
								<a href="{base}/news-archive/{post.slug}" title={post.title}>
									<h3>{post.title}</h3>
									<time datetime={post.fullItem.properties['Due Date'].date.start}>
										{new Date(post.fullItem.properties['Due Date'].date.start).toLocaleDateString()}
									</time>
									<p>{post.summary}</p>
								</a>
							</Tooltip>
						</article>
					{/each}
				{:else}
					<p>Error: {postsData.message}</p>
				{/if}
			{:catch error}
				<p>Error loading posts: {error.message}</p>
			{/await}
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
    font-size: var(--step-3);
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
    border-color: rgba(0, 0, 0, 0);
  }

  .news {
    margin-bottom: 4rem;

    main {
      display: grid;
      gap: 1.5rem;
      grid-template-columns: 1fr;
    }

		article {
			border-top: 1px dotted var(--grid-color);
			border-bottom: 1px dotted var(--grid-color);
			padding-bottom: 1.5rem;

			&:first-child {
				margin-top: 1.5rem;
			}
		}

    h3 {
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

			article {
				border-bottom: none;
				margin-top: 1.5rem;
				padding: 0;
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
		padding-bottom: 1.5rem;
    border-top: 1px dotted var(--grid-color);
    border-bottom: 1px dotted var(--grid-color);

    a {
      padding: 2px;
      border-radius: 2px;
      font-size: var(--step--1);
      vertical-align: middle;
      color: var(--link-color);
      background: var(--link-bg);
			transition: background-color 0.2s;

      &:hover, &:focus {
        background-color: var(--link-bg-hover);
      }
    }
  }

  :global(.gridOff) :is(header, .bookmarks, article, .book) {
    border-color: rgba(0, 0, 0, 0);
  }
</style>
