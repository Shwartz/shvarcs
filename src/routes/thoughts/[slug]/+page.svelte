<script>
    import Content from "$lib/blog/Content.svelte";
    export let data;
    const {slug} = data;
</script>

<Content {slug}/>

