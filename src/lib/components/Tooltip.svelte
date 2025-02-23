<script lang="ts">
	import type { Snippet } from 'svelte';

	interface TooltipProps {
		color: string;
		children: Snippet;
	}

	let { children, color }: TooltipProps  = $props();
	const tooltip = $state({
		visible: false,
		content: '',
		x: 0,
		y: 0
	});

	function handleMouseEnter(event: MouseEvent) {
		const target = event.target?.firstChild;
		tooltip.content = target.getAttribute('title'); // Get content from title attribute
		if (tooltip.content) {
			target.removeAttribute('title'); // Prevent default browser tooltip
			tooltip.visible = true;
			event.target?.setAttribute('data-tooltip-visible', 'true');
		}
	}

	function handleMouseLeave(event: MouseEvent) {
		const target = event.target?.firstChild;
		if (tooltip.content) {
			target.setAttribute('title', tooltip.content); // Restore title attribute
			tooltip.visible = false;
			event.target?.removeAttribute('data-tooltip-visible');
		}
	}

	function handleMouseMove(event: MouseEvent) {
		tooltip.x = event.clientX + 10; // Offset by 10px
		tooltip.y = event.clientY + 10; // Offset by 10px
	}
</script>
<div
	role="tooltip"
	onmousemove={handleMouseMove}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
>
	{@render children()}
	{#if tooltip.visible}
		<div
			class="tooltip"
			style="top: {tooltip.y}px; left: {tooltip.x}px; box-shadow: 0 0 4px 2px {color};"
		>
			Read: {tooltip.content}
		</div>
	{/if}
</div>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">
  .tooltip {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 0 8px;
    border-radius: 4px;
    font-size: px-to-rem(11px);
    pointer-events: none;
    transform: translate(0, 0);
    z-index: 1000;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s ease-in-out, visibility 0s linear 0.3s;
		transition-delay: 0.3s;
  }

  :global([data-tooltip-visible="true"]) .tooltip {
		opacity: 1;
  }
</style>
