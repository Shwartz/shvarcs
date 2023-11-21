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
    // do something with data
    if (!form.valid) {
      return message(form, {
        status: 'error',
        text: 'Sorry, I can\'t send the form. Something went wrong or just a bad luck.'
      });
    }

    try {
      const posts = await getSearch(NOTION_DATABASE_ID, searchTerm);

			// if no errors
			if (Array.isArray(posts)) {
				return message(form, {status: 'success', text: "Found search results", searchResults: posts})
			} else {
				return {
					error: {
						code: 400,
						message: 'Error'
					}
				};
			}

    } catch (error) {
      return {
        error: {
          code: 500,
          message: 'Some error occurred'
        }
      };
    }
  }
} satisfies Actions;

