<script lang="ts">
	import { postsArr } from './postsConfig';
	import { TrOutlineCalendarMonth, TrOutlineClock, TrOutlineHeart } from 'svelte-icons-pack/tr';
	import Tag from '$lib/components/snippets/Tag.svelte';
	import { Icon } from 'svelte-icons-pack';
	import { type CategoryType, getCategoryColor } from '$lib/utils/categoryColors';
	import Tooltip from '$lib/components/Tooltip.svelte';

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
<style lang="scss">
  .blog {
    a {
      cursor: url('/src/assets/svg/cursor.svg') 16 16, auto;
    }

    a:hover {
      cursor: url('/src/assets/svg/cursor.svg') 16 16, pointer;
    }

    a {
      text-decoration: none;
    }
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

	@media(min-width: 37.5rem) {
    .visualWrap {
      width: 74%;
      align-self: flex-start;
    }
	}

	@media(min-width: 48rem) {
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

    &:nth-child(even) {
      flex-direction: row-reverse;
    }
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
		align-content: start;
		align-self: center;
    gap: 1.5rem;
		grid-template-rows: auto auto auto auto;
    grid-template-areas:
			'a'
			'b'
			'c'
			'd';
    padding: 1.5rem 0;

    h1, p {
      margin: 0;
    }
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

    > div {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;

      span {
        display: block;
      }
    }
  }

  .tags {
    display: flex;
    gap: 0.5rem;
  }

  /* EXPANDED or COMFORTABLE specific styles */
  .blog.expanded {
  }

  /* COMPACT */
  .blog.compact {
    .content {
      width: 100%;
      display: grid;
			padding-top: 0;
      gap: 1rem 1.5rem;
      grid-template-columns: 1fr auto;
      grid-template-areas:
			"a"
			"b"
			"c"
			"d";
    }

    .icons {
      display: flex;
      flex-direction: row;
    }

    @media(min-width: 48rem) {
			.content {
        grid-template-areas:
			"b a"
			"c a"
			"d d";
			}

      .visualWrap {
        width: 32%;
        min-width: 250px;
      }

      .icons {
        flex-direction: column;
        justify-content: center;
        width: 9rem;
      }
    }

    h1 {
      font-size: 2.25rem;
      line-height: 1.2;
      margin-top: 0;
    }

    .visual {
      align-self: center;
      flex: 0 0 21rem;
    }

    .tags {
      display: flex;
      margin-top: 0;
    }

    .intro {
      width: 100%;
    }

    /* Icons */
    .icons {
      align-items: flex-start;
      gap: 0.2rem;
      flex: 0 0 160px;

      > div {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 14px;

        span {
          display: block;
          text-wrap: nowrap;
        }
      }
    }
  }

  /* Fallback for no JS solution */
  /*   no-js Expanded version */
  :global(.no-js:has(input#toggleCompact[type="checkbox"])) .blog {
    .postSnippet {
      flex-direction: row;
    }

    .visual {
      width: 50%;
    }

    .content {
      display: grid;
      align-items: start;
      width: 50%;
      grid-template-areas:
			'a'
			'b'
			'c'
			'd';
      padding: 1.5rem 0;

      h1, p {
        margin: 0;
      }
    }

    .tags {
      display: flex;
    }
  }

  /*   no-js Compact version */
  :global(.no-js:has(input#toggleCompact[type="checkbox"]:checked)) .blog {
    .postSnippet {
      flex-direction: row;
    }

    .visual {
      align-self: center;
      flex: 0 0 21rem;
    }

    .content {
      width: 100%;
      display: grid;
      gap: 0.5rem 1rem;
      grid-template-columns: 1fr auto;
      grid-template-areas:
			"b b"
			"c a"
			"d d";
    }

    .tags {
      display: flex;
    }
  }

  .truncate {
    display: -webkit-box; /* Enables the use of the line-clamp property */
    -webkit-line-clamp: 3; /* Specifies the number of lines to display */
    -webkit-box-orient: vertical; /* Defines the box orientation as vertical */
    overflow: hidden; /* Hides overflowing content */
    text-overflow: ellipsis; /* Adds an ellipsis (...) to truncated content */
  }
</style>
