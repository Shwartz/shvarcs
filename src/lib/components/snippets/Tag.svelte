<script lang="ts">
	import { type CategoryType, getCategoryColor } from '$lib/utils/categoryColors';
	import TickCircle from '../../../assets/svg/TickCircle.svelte';

	interface TagProps {
		blogCategory: CategoryType;
		active: boolean;
	}

	const { blogCategory, active = false }: TagProps = $props();
</script>

<span
	class="tag"
	class:active={active}
	style:background-color={getCategoryColor(blogCategory)}
>
	{#if active}
		<TickCircle />
	{/if}
	{blogCategory}
</span>

<style>
    .tag {
        display: flex;
				gap: 4px;
				align-items: center;
        padding: 0.25em 0.7em;
        border-radius: 1rem;
        color: black;
        font-size: var(--step--2);
        border: 1px solid var(--text);
        transition: 200ms box-shadow, 200ms border;
    }

    .active {
        padding: 0.25em 0.7em 0.25em 0.3em;

    }

    /*:global(html[data-theme='dark'] .active) {
        box-shadow: 1px 1px 3px var(--background-color) inset;
    }*/
</style>
