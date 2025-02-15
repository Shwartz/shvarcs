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

.tooltip {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0 8px;
  border-radius: 4px;
  font-size: 0.6875rem;
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
}</style>
