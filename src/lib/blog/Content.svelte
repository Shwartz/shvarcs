<script>
  import SvelteVsReactjs from "$lib/blog/SvelteVsReactjs.svelte";
  import HowToDealWithCss from "$lib/blog/HowToDealWithCss.svelte";
  import PracticalUsageOnCSSPseudoClassSelectors from "$lib/blog/PracticalUsageOnCSSPseudoClassSelectors.svelte";

  export let slug;
</script>

{#if slug === 'svelte-vs-reactjs'}
    <SvelteVsReactjs/>
{:else if slug === 'how-to-deal-with-CSS'}
    <HowToDealWithCss/>
{:else if slug === 'practical-usage-of-CSS-pseudo-selectors'}
    <PracticalUsageOnCSSPseudoClassSelectors/>
{:else}
    <p>Hmm, no articles for this slug</p>
{/if}
