import {getAllPosts} from "$lib";
import type {Actions} from '@sveltejs/kit';
import {getSearch} from '$lib/notion/api';
import {NOTION_DATABASE_ID} from '$env/static/private';
import {searchSchema} from "$lib/forms/searchSchema";
import {superValidate, message} from "sveltekit-superforms/server"

interface Message {
  status: 'error' | 'success';
  text: string;
  searchResults?: object;
}

const isPlural = (len: number, one: string, many: string) => {
  return len > 1 ? many : one;
}

export const load = async (event) => {
  const form = await superValidate(event, searchSchema);

  return {
    page: getAllPosts(),
    form,
  }
};
export const actions = {
  search: async (event) => {
    const form = await superValidate<typeof searchSchema, Message>(event, searchSchema);
    const {searchTerm} = form.data;
    // seems Notion has min char limit four, so to search 'CSS' I add empty char as 'CSS '
    const updatedSearchTerm = searchTerm.length === 3 ? `${searchTerm} ` : searchTerm;
    // do something with data
    if (!form.valid) {
      return message(form, {
        status: 'error',
        text: 'Sorry, I can\'t send the form. Something went wrong or just a bad luck.'
      });
    }

    try {
      const posts = await getSearch(NOTION_DATABASE_ID, updatedSearchTerm);
			// if no errors
			if (Array.isArray(posts)) {
        const len = posts.length;
        const happyResponseText = `There ${isPlural(len, 'is', 'are')} ${len} ${isPlural(len, 'post', 'posts')} with the tag "${searchTerm}"`;
				return message(form, {status: 'success', text: happyResponseText, searchResults: posts})
			} else {
        console.error('error 1');
				return {
					error: {
						code: 400,
						message: 'Error'
					}
				};
			}

    } catch (error) {
      console.error('error 2', error);
      return {
        error: {
          code: 500,
          message: 'Some error occurred'
        }
      };
    }
  }
} satisfies Actions;

