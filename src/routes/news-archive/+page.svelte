<script lang="ts">
  import type {ActionData, PageData} from './$types';

  export let data: PageData;
  export let form: ActionData;
  import {base} from '$app/paths';

  let searchResults = Array.isArray(form?.posts) ? form.posts : null;

  const resetSearch = () => {
    console.log('reset search');
    searchResults = null;
  }

  console.log({data});
  console.log({searchResults});
</script>

<div>
    <h1>Front-end News Archive</h1>
    <p>I compile news every week by reviewing a few newsletters, X (Twitter) and checking some random sources to stay up
        to date with the latest trends of the Front-End world. Naturally, as a Notion user, I jot down whatever
        interests me. I found it handy more than once to search for THAT specific article(s) about a particular feature.
        Now, I'm transferring my archive to the web using SvelteKit and Notion's API. </p>

    <form method='POST' action='?/search'>
        <input
                type='text'
                name='search'
                autocomplete='off'
                placeholder='Search for the post'/>
        <button type='submit'>Search</button>
    </form>

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
            {#each data.posts as post}
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
