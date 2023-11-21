<script lang="ts">
  import type {ActionData, PageData} from './$types';
  import {superForm} from "sveltekit-superforms/client";
  /*import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';*/
  import {searchSchema} from "$lib/forms/searchSchema";

  export let data: PageData;

  import {base} from '$app/paths';

  const {form, errors, enhance, delayed, reset, message} = superForm(data.form, {
    validators: searchSchema,
    resetForm: true,
  });
</script>

<div>
    <h1>Front-end News Archive</h1>
    <p>I compile news every week by reviewing a few newsletters, X (Twitter) and checking some random sources to stay up
        to date with the latest trends of the Front-End world. Naturally, as a Notion user, I jot down whatever
        interests me. I found it handy more than once to search for THAT specific article(s) about a particular feature.
        Now, I'm transferring my archive to the web using SvelteKit and Notion's API. </p>

    <!--<SuperDebug data={$form}/>-->
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

    {#if $message && $message?.searchResults?.length > 0}
        <h3>Search results</h3>
        <a href="{base}/news-archive">Back to all posts</a>
        <ul>
            {#each $message.searchResults as post}
                <li>
                    <h4><a href='{base}/news-archive/{post.slug}'>{post.title}</a></h4>
                    <p>{post.summary}</p>
                </li>
            {/each}
        </ul>
    {/if}

    {#if $message && $message?.searchResults?.length === 0}
        <h3>Nothing came up</h3>
        <a href="{base}/news-archive">Back to all posts</a>
        <p>This is very simple search. Try simple keywords like: "Astro, React, CSS"</p>
    {/if}

    {#if !($message)}
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
