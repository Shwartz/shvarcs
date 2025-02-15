<script lang="ts">
	import { postsArr } from './postsConfig';
	import { TrOutlineCalendarMonth, TrOutlineClock, TrOutlineHeart } from 'svelte-icons-pack/tr';
	import Tag from '../../components/snippets/Tag.svelte';
	import { Icon } from 'svelte-icons-pack';
	import { type CategoryType, getCategoryColor } from '../../utils/categoryColors';
	import Tooltip from '../../components/Tooltip.svelte';

	interface PostListProps {
		selectedFilter: string | null;
		compact: boolean;
		onCountChange?: (count: number) => void;
		numberOfPosts?: number;
	}

	let { selectedFilter, compact, onCountChange, numberOfPosts }: PostListProps = $props();

	const filteredPosts = $derived(() => {
		if (numberOfPosts) {
			return postsArr.slice(0, numberOfPosts);
		}
		return selectedFilter
			? postsArr.filter(post => post.tags.includes(selectedFilter!))
			: postsArr;
	});

	$effect(() => {
		if (onCountChange) {
			onCountChange(filteredPosts().length);
		}
	});

	const getFirstTagColour = (tags: CategoryType[]): string => {
		if (tags.length > 0) {
			return getCategoryColor(tags[0] as CategoryType);
		}
		return 'var(--pastel-cream)'; // Fallback colour
	};
</script>

<div class="blog" class:compact={compact} class:expanded={!compact}>
	{#each filteredPosts() as { url, title, description, tags, publishedDate, readingTime, likes, Visual, id }}
		<Tooltip color={getFirstTagColour(tags as CategoryType[])}>
			<a href="{url}" title="{title}">
				<section class="postSnippet" style="view-transition-name: post-{id}">
					<div class="visualWrap">
						<div class="visual"
								 style="background-color: {getFirstTagColour(tags as CategoryType[])}; view-transition-name: visual-{id}">
							<Visual />
						</div>
					</div>
					<div class="content" style="view-transition-name: content-{id}">
						<div class="icons" style="view-transition-name: icons-{id}">
							<div>
								<Icon size="16" color="777777" src={TrOutlineCalendarMonth} />
								<span>{publishedDate}</span>
							</div>
							<div>
								<Icon size="16" color="777777" src={TrOutlineClock} />
								<span>{readingTime}</span>
							</div>
							<div>
								<Icon size="16" color="777777" src={TrOutlineHeart} />
								<span>{likes}</span>
							</div>
						</div>
						<h1 class="title" style="view-transition-name: title-{id}">{title}</h1>
						<p class="intro truncate">{description}</p>
						<div class="tags">
							{#each tags as tag}
								<Tag blogCategory={tag as CategoryType} />
							{/each}
						</div>
					</div>
				</section>
			</a>
		</Tooltip>
	{/each}
</div>

<!-- svelte-ignore css_unused_selector -->
<style>/* svelte-ignore css-unused-selector */
/** Kudos to Josh Comeau: https://www.joshwcomeau.com/css/custom-css-reset/ */
/* 1. Use a more-intuitive box-sizing model */
*, *::before, *::after {
  box-sizing: border-box;
}

/* 2. Remove default margin */
* {
  margin: 0;
}

body {
  /* 3. Add accessible line-height */
  line-height: 1.5;
  /* 4. Improve text rendering */
  -webkit-font-smoothing: antialiased;
}

/* 5. Improve media defaults */
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

/* 6. Inherit fonts for form controls */
input, button, textarea, select {
  font: inherit;
}

/* 7. Avoid text overflows */
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

/* 8. Improve line wrapping */
p {
  text-wrap: pretty;
}

h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}

/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}

:root {
  /** colors */
  --clr-white: white;
  --lime: lime;
  --_sudo-private-property-example: red;
  --pastel-cream: #F0EBD5;
  --pastel-yellow: #FCF3A4;
  --pastel-orange: #FFD79F;
  --pastel-pink: #FFC9C9;
  --pastel-rose: #FFA3B6;
  --pastel-purple: #8f172e;
  --pastel-blue: #CCDFFD;
  --pastel-aqua: #B8DFE6;
  --pastel-mint: #D1E2CF;
  --pastel-lime: #D6F1BB;
  --grid-color: #FF060033;
  --background-color: #FFF;
  --text: #222;
  --textLight: rgba(34, 34, 34, 0.4);
  --code-color: #9f3d51;
  --post-width: 40.125rem;
  --post-l-width: 64rem;
  --pastel-cream-light-mode: #F0EBD580;
  --pastel-cream-dark-mode: #F0EBD505;
  --table-row-bg: var(--pastel-cream-light-mode);
  /** fonts */
  --step--2: clamp(0.7813rem, 0.7747rem + 0.0326vi, 0.8rem);
  --step--1: clamp(0.9375rem, 0.9158rem + 0.1087vi, 1rem);
  --step-0: clamp(1.125rem, 1.0815rem + 0.2174vi, 1.25rem);
  --step-1: clamp(1.35rem, 1.2761rem + 0.3696vi, 1.5625rem);
  --step-2: clamp(1.62rem, 1.5041rem + 0.5793vi, 1.9531rem);
  --step-3: clamp(1.944rem, 1.771rem + 0.8651vi, 2.4414rem);
  --step-4: clamp(2.3328rem, 2.0827rem + 1.2504vi, 3.0518rem);
  --step-5: clamp(2.7994rem, 2.4462rem + 1.7658vi, 3.8147rem);
  --ff-family: Blanco,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  --ff-code: Consolas, Menlo, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
}

/** theme dark */
html[data-theme=dark] {
  color-scheme: dark;
  --background-color: #222;
  --text: #FFF;
  --textLight: rgba(255, 255, 255, 0.4);
  --code-color: var(--pastel-purple);
  --table-row-bg: var(--pastel-cream-dark-mode);
}

.blog a {
  cursor: url("/src/assets/svg/cursor.svg") 16 16, auto;
}
.blog a:hover {
  cursor: url("/src/assets/svg/cursor.svg") 16 16, pointer;
}
.blog a {
  text-decoration: none;
}

/* MOBILE VIEW: for all the same */
.postSnippet {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.visualWrap {
  width: 100%;
}

.content {
  width: 100%;
}

@media (min-width: 37.5rem) {
  .visualWrap {
    width: 74%;
    align-self: flex-start;
  }
}
@media (min-width: 48rem) {
  .postSnippet {
    flex-direction: row;
    align-items: normal;
  }
  .content {
    width: 50%;
  }
  .visualWrap {
    width: 50%;
  }
  /* Slightly hacky way to grab every even postSnippets to toggle Visual/Text positions */
  :global([role="tooltip"]):nth-child(even) .postSnippet {
    flex-direction: row-reverse;
  }
  /* revert above for the compact mode */
  div.blog.compact .postSnippet {
    flex-direction: row;
  }
}
/* EXPANDED: General styles, Expand as default */
.postSnippet {
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-top: 1px dotted var(--grid-color);
  border-bottom: 1px dotted var(--grid-color);
}
.postSnippet:nth-child(even) {
  flex-direction: row-reverse;
}

/* Toggle background grid lines */
:global(.gridOff) .postSnippet {
  border-top-color: rgba(0, 0, 0, 0);
  border-bottom-color: rgba(0, 0, 0, 0);
}

.visual {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 13/8;
  /*background: #f9e4b2;*/
}

.content {
  display: grid;
  align-items: start;
  gap: 1rem;
  grid-template-areas: "a" "b" "c" "d";
  padding: 1.5rem 0;
}
.content h1, .content p {
  margin: 0;
}

.icons {
  grid-area: a;
}

.title {
  grid-area: b;
}

.intro {
  grid-area: c;
}

.tags {
  grid-area: d;
}

/* Icons */
.icons {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.icons > div {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}
.icons > div span {
  display: block;
}

.tags {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

/* EXPANDED or COMFORTABLE specific styles */
/* COMPACT */
.blog.compact {
  /* Icons */
}
.blog.compact .content {
  width: 100%;
  display: grid;
  padding-top: 0;
  gap: 1rem 1.5rem;
  grid-template-columns: 1fr auto;
  grid-template-areas: "a" "b" "c" "d";
}
.blog.compact .icons {
  display: flex;
  flex-direction: row;
}
@media (min-width: 48rem) {
  .blog.compact .content {
    grid-template-areas: "b b" "c a" "d d";
  }
  .blog.compact .visualWrap {
    width: 32%;
    min-width: 250px;
  }
  .blog.compact .icons {
    flex-direction: column;
    justify-content: center;
    width: 9rem;
  }
}
.blog.compact h1 {
  font-size: 2.25rem;
  line-height: 2.5rem;
  margin-top: 0;
}
.blog.compact .visual {
  align-self: center;
  flex: 0 0 21rem;
}
.blog.compact .tags {
  display: flex;
  margin-top: 0;
}
.blog.compact .intro {
  width: 100%;
}
.blog.compact .icons {
  align-items: flex-start;
  gap: 0.2rem;
  flex: 0 0 160px;
}
.blog.compact .icons > div {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}
.blog.compact .icons > div span {
  display: block;
  text-wrap: nowrap;
}

/* Fallback for no JS solution */
/*   no-js Expanded version */
:global(.no-js:has(input#toggleCompact[type="checkbox"])) .blog .postSnippet {
  flex-direction: row;
}
:global(.no-js:has(input#toggleCompact[type="checkbox"])) .blog .visual {
  width: 50%;
}
:global(.no-js:has(input#toggleCompact[type="checkbox"])) .blog .content {
  display: grid;
  align-items: start;
  width: 50%;
  grid-template-areas: "a" "b" "c" "d";
  padding: 1.5rem 0;
}
:global(.no-js:has(input#toggleCompact[type="checkbox"])) .blog .content h1, :global(.no-js:has(input#toggleCompact[type="checkbox"])) .blog .content p {
  margin: 0;
}
:global(.no-js:has(input#toggleCompact[type="checkbox"])) .blog .tags {
  display: flex;
}

/*   no-js Compact version */
:global(.no-js:has(input#toggleCompact[type="checkbox"]:checked)) .blog .postSnippet {
  flex-direction: row;
}
:global(.no-js:has(input#toggleCompact[type="checkbox"]:checked)) .blog .visual {
  align-self: center;
  flex: 0 0 21rem;
}
:global(.no-js:has(input#toggleCompact[type="checkbox"]:checked)) .blog .content {
  width: 100%;
  display: grid;
  gap: 0.5rem 1rem;
  grid-template-columns: 1fr auto;
  grid-template-areas: "b b" "c a" "d d";
}
:global(.no-js:has(input#toggleCompact[type="checkbox"]:checked)) .blog .tags {
  display: flex;
}

.truncate {
  display: -webkit-box; /* Enables the use of the line-clamp property */
  -webkit-line-clamp: 3; /* Specifies the number of lines to display */
  -webkit-box-orient: vertical; /* Defines the box orientation as vertical */
  overflow: hidden; /* Hides overflowing content */
  text-overflow: ellipsis; /* Adds an ellipsis (...) to truncated content */
}</style>
