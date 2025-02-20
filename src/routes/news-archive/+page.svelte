<script lang="ts">
	// src/routes/news-archive/+page.svelte
	import { base } from '$app/paths';
	import ToggleListGrid from '$lib/components/ToggleListGrid.svelte';
	import { onMount } from 'svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';

	const { data } = $props();
	const { news } = data;

	const newsCount = news.posts.length;
	let checked = $state(false);
	let compact = $state(false);

	// console.log({ news });

	// console.log('props: ', news.posts[0].fullItem.properties['Due Date'].date.start);

	onMount(() => {
		const savedState = localStorage.getItem('themeNewsListGrid');
		checked = savedState === 'true';
		compact = checked;
		localStorage.setItem('themeNewsListGrid', checked.toString());
	});

	function toggleCompact() {
		checked = !checked;
		localStorage.setItem('themeNewsListGrid', checked.toString());
		toggleView();
	}

	function toggleView() {
		/* Fallback if no support for transition and can do something else */
		if (!document.startViewTransition) {
			compact = checked;
			return;
		}

		document.startViewTransition(() => {
			compact = checked; // This is to trigger transition
		});
	}

	const colors = [
		'var(--pastel-cream)',
		'var(--pastel-yellow)',
		'var(--pastel-orange)',
		'var(--pastel-pink)',
		'var(--pastel-rose)',
		'var(--pastel-purple)',
		'var(--pastel-blue)',
		'var(--pastel-aqua)',
		'var(--pastel-mint)',
		'var(--pastel-lime)'
	];

	const getColor = (index: number) => {
		return colors[index % 10];
	};
</script>

<div class="news">
	<h1 class="frankTitle">news</h1>
	<p class="intro">Welcome to my Front-end news archive. I curate this collection from across the web,
		<a href="https://bsky.app/profile/andrissvarcs.bsky.social">BlueSky</a> and various newsletters, capturing the
		latest trends and useful articles. Originally a personal <a href="https://www.notion.com/">Notion</a> database, I'm
		now sharing it here using <a href="https://svelte.dev/">SvelteKit</a></p>

	<div class="headerTags">
		<div>{newsCount} items</div>
		<div>
			<ToggleListGrid {checked} toggleCompact={toggleCompact} />
		</div>
	</div>

	<div class="newsList">
		<ul class={checked ? `list` : `grid`}>
			{#each news.posts as post, index}
				<li>
					<Tooltip color={getColor(index)}>
						<a title="{post.title.substring(0, post.title.indexOf('|')).trim()}" href="{base}/news-archive/{post.slug}">
							<h3>{post.title.substring(0, post.title.indexOf('|')).trim()}</h3>
							<p class="date">{post.fullItem.properties['Due Date'].date.start}</p>
							<p class="summary">{post.summary}</p>
						</a>
					</Tooltip>
				</li>
			{/each}
		</ul>
	</div>
</div>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">
  .news {
    flex-grow: 1;

    h3, p {
      line-height: 1.5;
    }

    h3 {
      font-size: var(--step-1);
    }
  }

  .frankTitle {
    font-size: 9rem;
    color: var(--textLight);
    line-height: normal;
  }

  .intro {
    width: 100%;
  }

  @media (min-width: 600px) {
    .intro {
      width: 75%;
    }
  }

  @media (min-width: 1200px) {
    .intro {
      width: 50%;
    }
  }

  .headerTags {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: space-between;
    padding: 4rem 0 1.5rem;
    border-bottom: 1px dotted var(--grid-color);
  }

  /* Grid by default, mob size same for all */

  .newsList {
    ul, li {
      list-style: none;
      padding: 0;
    }

    ul {
      margin-top: 1.5rem;
      border-top: 1px dotted var(--grid-color);

      a {
        transition: 0.3s;
      }

      &:hover a {
        opacity: 0.5;
      }
    }

    li {
      padding-bottom: 2.5rem;
      margin-top: 1.5rem;
      border-top: 1px dotted var(--grid-color);
      border-bottom: 1px dotted var(--grid-color);

      &:first-child {
        border-top: none;
        margin-top: 0;
      }

      &:hover a {
        opacity: 1;
      }
    }

    .date {
      font-size: var(--step--1);
    }

    .summary {
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
      ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }

      li {
        border-top: none;
        margin-top: 0;
      }

      h3 {
        border-top: 1px dotted var(--grid-color);
      }

      li:nth-child(-n+2) h3 {
        border-top: none;
      }
    }

    @media (min-width: px-to-rem(1200px)) {
      ul {
        grid-template-columns: repeat(4, 1fr);
      }

      li:nth-child(-n+4) h3 {
        border-top: none;
      }
    }

    ul.list {
      @media (min-width: px-to-rem(600px)) {
        grid-template-columns: none;
        gap: 0;

        a {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-areas:
								"info summary"
								"info summary";
          gap: 1.5rem;
        }

        h3 {
          grid-area: info;
          align-self: start;
          border: none;
        }

        .date {
          grid-area: info;
          align-self: start;
          margin-top: 2.2rem;
        }

        .summary {
          grid-area: summary;
          margin-top: 0;
        }
      }

      @media (min-width: px-to-rem(800px)) {
        a {
          gap: 1.5rem;
          grid-template-columns: calc(34.26% - 1.5rem) auto;
        }
      }

      @media (min-width: px-to-rem(1172px)) {
        a {
          gap: 1.5rem;
          grid-template-columns: calc(25.6% - 1.5rem) auto;
        }
      }
    }
  }

  :global(.gridOff) .news :is(ul, li, .headerTags) {
    border-top-color: rgba(0, 0, 0, 0);
    border-bottom-color: rgba(0, 0, 0, 0);
  }

</style>
