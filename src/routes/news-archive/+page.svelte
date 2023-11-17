<script lang="ts">
  import type {ActionData, PageData} from './$types';

  export let data: PageData;
  export let form: ActionData;
  import {base} from '$app/paths';

  const searchResults = Array.isArray(form?.posts) ? form.posts : null;

  console.log({data});
  console.log({searchResults});
</script>

<div>
    <h1>News Archive</h1>

    <form method='POST' action='?/search'>
        <input
                type='text'
                name='search'
                autocomplete='off'
                placeholder='Search for the post'/>
        <button type='submit'>Search</button>
    </form>

    {#if searchResults?.length > 0}
        <p>Search results</p>
        <ul>
            {#each searchResults as post}
                <li>
                    <h4><a href='{base}/news-archive/{post.slug}'>{post.title}</a></h4>
                    <p>{post.summary}</p>
                </li>
            {/each}
        </ul>
    {/if}

    {#if searchResults?.length === 0}
        <p>No results</p>
    {/if}

    {#if !(searchResults?.length > 0)}
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
