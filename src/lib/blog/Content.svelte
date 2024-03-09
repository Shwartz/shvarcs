<script lang="ts">
  import SvelteVsReactjs from "$lib/blog/SvelteVsReactjs.svelte";
  import HowToDealWithCss from "$lib/blog/HowToDealWithCss.svelte";
  import PracticalUsageOnCSSPseudoClassSelectors from "$lib/blog/PracticalUsageOnCSSPseudoClassSelectors.svelte";
  import TwoDThreeDdAnimationsWithCSS from "$lib/blog/2d-3d-animationsWithCSS.svelte";

  export let slug:string;
</script>

{#if slug === 'svelte-vs-reactjs'}
    <SvelteVsReactjs/>
{:else if slug === 'how-to-deal-with-CSS'}
    <HowToDealWithCss/>
{:else if slug === 'practical-usage-of-CSS-pseudo-selectors'}
    <PracticalUsageOnCSSPseudoClassSelectors/>
{:else if slug === '2d-3d-animations-with-css'}
    <TwoDThreeDdAnimationsWithCSS/>
{:else}
    <p>Hmm, no articles for this slug</p>
{/if}
