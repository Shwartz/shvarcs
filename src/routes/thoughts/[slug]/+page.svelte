<script lang="ts">
	// import type { PageData } from './$types';
	import { tagState } from '$lib/stores/tagState.svelte';
	import Tag from '$lib/components/snippets/Tag.svelte';
	import { type CategoryType } from '$lib/utils/categoryColors';
	import { TrOutlineArrowBackUp, TrOutlineCalendarMonth, TrOutlineClock, TrOutlineHeart } from 'svelte-icons-pack/tr';
	import { Icon } from 'svelte-icons-pack';
	import { base } from '$app/paths';
	import { page} from '$app/stores';

	// let { data }: { data: PageData } = $props();
	const { slug, postData: { id, Visual, readingTime, tags, title, publishedDate, likes } } = $page.data;
	let PostContent = $state(null);

	$effect(() => {
		tagState.id = id;
		tagState.tagArr = tags;
		tagState.title = title;
		tagState.Visual = Visual;
		loadContent();
	});

	async function loadContent() {
		try {
			const content = await import(`$lib/blog/posts/${slug}.svelte`);
			PostContent = content.default;
		} catch (error) {
			console.error(`Failed to load post for slug: ${slug}`, error);
			// TODO: implement 404 page
		}
	}
</script>
<!-- All this is added to children() prop in the +layout.svelte -->
{#if tags && readingTime && publishedDate}
	<h1 style="view-transition-name: title-{id}">
		<span>{title}</span>
	</h1>

	<div class="metaWrap">
		<div class="meta first">
			<div class="tags">
				{#each tags as tag}
					<Tag blogCategory={tag as CategoryType} />
				{/each}
			</div>
			<a href="{base}/thoughts" class="back">
				<Icon size="20" color="777777" src={TrOutlineArrowBackUp} />
				<span>back</span>
			</a>
		</div>
	</div>

	<div class="metaWrap">
		<div class="meta second">
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
		</div>
	</div>

{/if}

{#if PostContent}
	<svelte:component this={PostContent} />
{:else}
	<p>Loading post content...</p>
{/if}

<style lang="scss">
  h1 {
    margin-top: 2rem;
    padding: 2rem 0;
    border-bottom: 1px dotted var(--grid-color);
    line-height: 3.5rem;

    span {
      display: flex;
      max-width: var(--post-width);
      margin-inline: auto;
    }
  }

  .metaWrap {
    border-bottom: 1px dotted var(--grid-color);

    + .metaWrap {
      margin-bottom: 2rem;
    }
  }

  .meta {
    padding: 1rem 0;
  }

  :global(.gridOff) :is(h1, .metaWrap) {
    border-bottom-color: rgba(0, 0, 0, 0);
  }

  .second {
    border-top: 1px solid rgba(0, 0, 0, 0);
    border-bottom: 1px solid rgba(0, 0, 0, 0);
  }

  :global(.gridOff) .second {
    border-top: 1px solid var(--text);
    border-bottom: 1px solid var(--text);
  }

  .meta {
    display: flex;
    max-width: var(--post-width);
    align-items: center;
    gap: 1rem;
    margin-inline: auto;
  }

  .first {
    justify-content: space-between;
  }

  .tags {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .back {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }

  .icons {
    display: flex;
    gap: 1.5rem;
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
</style>
