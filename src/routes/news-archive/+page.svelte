<script lang="ts">
	// src/routes/news-archive/+page.svelte
	import { base } from '$app/paths';
	import ToggleListGrid from '$lib/components/ToggleListGrid.svelte';
	import { onMount } from 'svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { getColor } from '$lib/components/snippets/getColor';
	import { TrOutlineCalendarMonth } from 'svelte-icons-pack/tr';
	import { Icon } from 'svelte-icons-pack';
	import { deserialize } from '$app/forms';
	import PostFooter from '$lib/components/PostFooter.svelte';

	const { data } = $props();
	const newsState = $state({
		posts: data.news.posts,
		nextCursor: data.news.nextCursor,
		hasMore: data.news.hasMore
	});

	let isLoading = $state(false);
	let checked = $state(false);
	let compact = $state(false);

	async function loadMorePosts() {
		if (newsState.nextCursor && !isLoading) {
			isLoading = true;
			const form = new FormData();
			form.append('cursor', newsState.nextCursor);

			try {
				const response = await fetch(`${base}/news-archive?/loadMore`, {
					method: 'POST',
					body: form
				});
				const rawData = await response.text();
				const newData = deserialize(rawData);
				const { posts, nextCursor, hasMore } = newData.data;

				newsState.posts = [...newsState.posts, ...posts];
				newsState.nextCursor = nextCursor;
				newsState.hasMore = hasMore;
			} catch (error) {
				console.error('Failed to load more posts: ', error);
			} finally {
				isLoading = false;
			}
		}
	}

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

	const title = 'Front-End Findings: Curated News';
	const description = 'Front-end news, trends, and valuable and interesting articles accumulated from newsletters and other sources.';

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

<div class="news">
	<h1 id="mainTitle" class="frankTitle">news</h1>
	<p class="intro">I curate this bi-weekly collection from across the web,
		<a href="https://bsky.app/profile/andrissvarcs.bsky.social">BlueSky</a> and various newsletters, capturing the
		latest trends and useful articles. Originally a personal <a href="https://www.notion.com/">Notion</a> database, I'm
		now sharing it here using <a href="https://svelte.dev/">SvelteKit</a>.</p>

	<div class="headerTags">
		<div>{newsState?.posts?.length || '0'} items</div>
		<div>
			<ToggleListGrid {checked} toggleCompact={toggleCompact} />
		</div>
	</div>

	<div class="newsList">
		<ul class={checked ? `list` : `grid`}>
			{#each newsState.posts as post, index}
				<li>
					<Tooltip color={getColor(index)}>
						<a title="{post.title}" href="{base}/news-archive/{post.slug}">
							<h3>{post.title}</h3>
							<p class="date">
								<Icon size="16" color="var(--text)" src={TrOutlineCalendarMonth} />
								<span>{post.dueDate}</span>
							</p>
							<p class="summary">{post.summary}</p>
						</a>
					</Tooltip>
				</li>
			{/each}
		</ul>
		{#if newsState.hasMore}
			<div class="loadMore">
				<button title="Load more articles" class="btnTag" onclick={loadMorePosts} disabled={isLoading}>
					<span class="tag">
						Load More
						{#if isLoading}
							<span class="loader"></span>
						{/if}
					</span>
				</button>
			</div>
		{/if}
		<PostFooter linkBack="news-archive" />
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
    margin: 4.5rem 0 1.5rem;
    font-size: 5.75rem;
    color: var(--textLight);
    line-height: normal;

    /* 768 */
    @media(min-width: 48rem) {
      margin: 6.5rem 0 1.5rem;
      font-size: 9rem;
    }
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
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: var(--step--1);

      :global(svg) {
        position: relative;
        top: -0.5px;
      }
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

    /* 600 */
    @media (min-width: 37.5rem) {
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
      /* 600 */
      @media (min-width: 37.5rem) {
        grid-template-columns: none;
        gap: 0;

        li:not(:first-child) {
          border-top: 1px dotted var(--grid-color);
          margin-top: 1.5rem;
        }

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

  .loadMore {
    display: flex;
    justify-content: center;
    padding-top: 2rem;
  }

  .btnTag {
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    cursor: pointer;

    &:disabled .tag {
      color: var(--black50);
    }
  }

  .tag {
    display: flex;
    gap: 4px;
    align-items: center;
    margin: 0 2rem 0;
    padding: 0.25em 0.7em;
    border-radius: 1rem;
    color: var(--black);
    font-size: var(--step--2);
    border: 1px solid var(--text);
    transition: 200ms box-shadow, 200ms border;
    background-color: var(--pastel-lime);

    &:hover {
      border: 1px solid var(--textLight);
    }
  }

  .loader {
    --width: 6px;
    --distance: 10px;
    width: var(--width);
    margin: 0 0.5rem 0 0.7rem;
    aspect-ratio: 1;
    background: var(--black50);
    border-radius: 50%;
    animation: loadingAnim 1s infinite linear alternate;
  }

  @keyframes loadingAnim {
    0% {
      box-shadow: var(--width) 0 var(--black50), calc(var(--distance) * -1) 0 var(--black50)
    }
    50% {
      box-shadow: var(--width) 0 var(--black50), calc(var(--width) * -1) 0 var(--black50)
    }
    100% {
      box-shadow: var(--distance) 0 var(--black50), calc(var(--width) * -1) 0 var(--black50)
    }
  }


  :global(.gridOff) .news :is(ul, li, .headerTags) {
    border-color: rgba(0, 0, 0, 0);
  }

</style>
