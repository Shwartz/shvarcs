import {getAllPosts} from "$lib";
import type {Actions} from '@sveltejs/kit';
import {getSearch} from '$lib/notion/api';
import {NOTION_DATABASE_ID} from '$env/static/private';
import {searchSchema} from "$lib/forms/searchSchema";
import {superValidate, message} from "sveltekit-superforms/server"

interface Message {
  status: 'error' | 'success';
  text: string
}

let searchPostResults;

export const load = async (event) => {
  const form = await superValidate(event, searchSchema);

  return {
    page: getAllPosts(),
    form,
    searchPostResults
  }
};
export const actions = {
  search: async (event) => {
    // const data = await request.formData();
    const form = await superValidate<typeof searchSchema, Message>(event, searchSchema);
    const {searchTerm} = form.data;
    // const searchTerm = data.get('search');
    // do something with data
    console.log('Search data: ', form);
    if (!form.valid) {
      return message(form, {
        status: 'error',
        text: 'Sorry, I can\'t send the form. Something went wrong or just a bad luck.'
      });
    }

    try {
      const posts = await getSearch(NOTION_DATABASE_ID, searchTerm);
      console.log({posts});

			// if no errors
			if (Array.isArray(posts)) {
        searchPostResults = posts;
				return message(form, {status: 'success', text: "Found search results"});
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

