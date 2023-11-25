<script lang="ts">
  import type {ActionData, PageData} from './$types';
  import {superForm} from "sveltekit-superforms/client";
  /*import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';*/
  import {searchSchema} from "$lib/forms/searchSchema";
  import { Diamonds} from "svelte-loading-spinners";

  export let data: PageData;

  import {base} from '$app/paths';
  import Footer from "$lib/components/Footer.svelte";

  const {form, errors, enhance, delayed, reset, message} = superForm(data.form, {
    validators: searchSchema,
    resetForm: true,
  });
</script>

<div class="newsArchive">
    <h1>Front-end News Archive</h1>
    <p>
        To stay with the latest trends in the Front-end world, I skim the web, X (Twitter) and several newsletters during the week. <br/>
        Naturally, as a <a href="https://www.notion.so/">Notion</a> user, I jot down whatever interests me. I found it handy more than once to search for THAT specific article(s) about a particular feature.<br/>
        Now, I'm transferring my archive to the web using <a href="https://kit.svelte.dev/">SvelteKit</a> and Notion's API.
    </p>

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

            <button type='submit'>Search</button>
            {#if $delayed}
                <Diamonds color="#ffb300" />
            {/if}

    </form>
    {#if $errors.searchTerm}
        <h6 class="warning">{$errors.searchTerm}</h6>
    {/if}

    {#if $message && $message?.searchResults?.length > 0}
        <h6>{$message.text}</h6>
        <a href="{base}/news-archive">Back to all posts</a>
        <ul>
            {#each $message.searchResults as post}
                <li>
                    <h5><a href='{base}/news-archive/{post.slug}'>{post.title}</a></h5>
                    <div>{post.summary}</div>
                </li>
            {/each}
        </ul>
    {/if}

    {#if $message && $message?.searchResults?.length === 0}
        <h3>Nothing came up</h3>
        <a href="{base}/news-archive">Back to all posts</a>
        <p>Currently this is very simplified search version. Try keywords like: "Astro, React, CSS" and similar</p>
    {/if}

    {#if !($message)}
        <ul>
            {#each data.page.posts as post}
                <li>
                    <h5><a href='{base}/news-archive/{post.slug}'>{post.title}</a></h5>
                    <div>{post.summary}</div>
                </li>
            {/each}
        </ul>
    {/if}

    <Footer/>
</div>

<style lang='scss'>
  .newsArchive {
    padding-top: 2rem;
  }

  form {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 0.5rem;

    button, input {
      margin: 0;
    }
  }

  ul {
    margin-top: 2rem;

    h5 {
      margin-bottom: 0.5rem;
    }
  }

  li {
    padding: 1.2rem 0;
    border-bottom: 1px solid grey;
  }
</style>
