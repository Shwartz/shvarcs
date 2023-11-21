<script lang="ts">
  import type {ActionData, PageData} from './$types';
  import {superForm} from "sveltekit-superforms/client";
  import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
  import {searchSchema} from "$lib/forms/searchSchema";

  export let data: PageData;

  import {base} from '$app/paths';

  const {form, errors, enhance, delayed, reset} = superForm(data.form, {
    validators: searchSchema,
    resetForm: true,
  });

  $:searchResults = Array.isArray(data?.searchPostResults) ? data.searchPostResults : null;

  const resetSearch = () => {
    console.log('reset search');
    searchResults = null;
    console.log('222 searchResults: ', searchResults);
  }

  console.log('111 data page: ', data);
  console.log({searchResults});
</script>

<div>
    <h1>Front-end News Archive</h1>
    <p>I compile news every week by reviewing a few newsletters, X (Twitter) and checking some random sources to stay up
        to date with the latest trends of the Front-End world. Naturally, as a Notion user, I jot down whatever
        interests me. I found it handy more than once to search for THAT specific article(s) about a particular feature.
        Now, I'm transferring my archive to the web using SvelteKit and Notion's API. </p>

    <SuperDebug data={$form} />
    <form method='POST' use:enhance action='?/search'>
        <input
                type='text'
                name='searchTerm'
                id='searchTerm'
                autocomplete='off'
                placeholder='Search for the post'
                bind:value={$form.searchTerm}
        />
        {#if $errors.searchTerm}
            <small class="warning">{$errors.searchTerm}</small>
        {/if}
        <div class="send">
            {#if $delayed}
                <p>LOADER</p>
            {/if}
            <button type='submit'>Search</button>
        </div>
    </form>
    {console.log('in page searchResults: ', searchResults)}

    {#if searchResults && searchResults.length > 0}
        <h3>Search results</h3>
        <a on:click={resetSearch} href="{base}/news-archive">Back to all posts</a>
        <ul>
            {#each searchResults as post}
                <li>
                    <h4><a href='{base}/news-archive/{post.slug}'>{post.title}</a></h4>
                    <p>{post.summary}</p>
                </li>
            {/each}
        </ul>
    {/if}

    {#if searchResults && searchResults.length === 0}
        <p>No results</p>
    {/if}

    {#if !(searchResults && searchResults.length > 0)}
        <ul>
            {#each data.page.posts as post}
                <li>
                    <h4><a href='{base}/news-archive/{post.slug}'>{post.title}</a></h4>
                    <p>{post.summary}</p>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style lang='scss'>
  li {
    border-bottom: 1px solid grey;
  }
</style>
