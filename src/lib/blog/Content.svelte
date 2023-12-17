<script>
  import SvelteVsReactjs from "$lib/blog/SvelteVsReactjs.svelte";

  export let slug;
</script>

{#if slug === 'svelte-vs-reactjs'}
    <SvelteVsReactjs/>
{:else if slug === 'something-else'}
    <p>Something else</p>
{:else}
    <p>Hmm, no articles for this slug</p>
{/if}
