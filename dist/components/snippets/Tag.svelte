<script lang="ts">
	import { type CategoryType, getCategoryColor } from '../../utils/categoryColors';

	export let blogCategory: CategoryType = 'JavaScript';
	export let active: boolean = false;
</script>

<span
	class="tag"
	class:active={active}
	style:background-color={getCategoryColor(blogCategory)}
>
  {blogCategory}
</span>

<style>
    .tag {
        display: inline-block;
        padding: 0.25em 0.7em;
        border-radius: 1em;
        color: black;
        font-size: 0.75rem;
        border: 1px solid rgba(255, 255, 255, 0);
        transition: 200ms box-shadow, 200ms border;
    }

    .active {
        border: 1px solid var(--text);
    }

    :global(html[data-theme='dark'] .active) {
        box-shadow: 1px 1px 3px var(--background-color) inset;
    }
</style>
