<script>
  import SvelteVsReactjs from "$lib/blog/SvelteVsReactjs.svelte";
  import HowToDealWithCss from "$lib/blog/HowToDealWithCss.svelte";

  export let slug;
</script>

{#if slug === 'svelte-vs-reactjs'}
    <SvelteVsReactjs/>
{:else if slug === 'how-to-deal-with-CSS'}
    <HowToDealWithCss/>
{:else}
    <p>Hmm, no articles for this slug</p>
{/if}
