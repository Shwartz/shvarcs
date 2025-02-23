<script lang="ts">
	import type { PageData } from './$types';
	import { tagState } from '$lib/stores/tagState.svelte';
	import Tag from '$lib/components/snippets/Tag.svelte';
	import { type CategoryType } from '$lib/utils/categoryColors';
	import { TrOutlineArrowBackUp, TrOutlineCalendarMonth, TrOutlineClock, TrOutlineHeart } from 'svelte-icons-pack/tr';
	import { Icon } from 'svelte-icons-pack';
	import { base } from '$app/paths';
	import PostFooter from '$lib/components/PostFooter.svelte';

	let { data }: { data: PageData } = $props();
	let { postData: { id, Visual, readingTime, tags, title, publishedDate, likes }, PostContent } = data;

	$effect(() => {
		tagState.id = id;
		tagState.tagArr = tags;
		tagState.title = title;
		tagState.Visual = Visual;
	});

</script>
<!-- All this is added to children() prop in the +layout.svelte -->
{#if tags && readingTime && publishedDate}
	<h1 id="mainTitle" style="view-transition-name: title-{id}">
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
				<Icon size="20" color="var(--text)" src={TrOutlineArrowBackUp} />
				<span>back</span>
			</a>
		</div>
	</div>

	<div class="metaWrap">
		<div class="meta second">
			<div class="icons" style="view-transition-name: icons-{id}">
				<div>
					<Icon size="16" color="var(--text)" src={TrOutlineCalendarMonth} />
					<span>{publishedDate}</span>
				</div>
				<div>
					<Icon size="16" color="var(--text)" src={TrOutlineClock} />
					<span>{readingTime}</span>
				</div>
				<div>
					<Icon size="16" color="var(--text)" src={TrOutlineHeart} />
					<span>{likes}</span>
				</div>
			</div>
		</div>
	</div>
{/if}

{#if PostContent}
	<PostContent/>
{:else}
	<p>Loading post content...</p>
{/if}

<PostFooter linkBack="thoughts" />

<style lang="scss">
  h1 {
    margin-top: 2rem;
    padding: 2rem 0;
    border-bottom: 1px dotted var(--grid-color);
    line-height: 1.2;

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

  :global(.gridOff) :is(h1, .metaWrap) {
    border-color: rgba(0, 0, 0, 0);
  }

  .second {
    border-top: 1px solid rgba(0, 0, 0, 0);
    border-bottom: 1px solid rgba(0, 0, 0, 0);
  }

  :global(.gridOff) .second {
    border-color: var(--text);
  }

  .meta {
    display: flex;
    max-width: var(--post-width);
    align-items: center;
    gap: 1rem;
    margin-inline: auto;
    padding: 1rem 0;
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
    transform: translate3d(0, 0, 0);
    transition: transform 200ms;

    &:hover,
		&:focus {
      transform: translate3d(4px, 0, 0);
    }
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
