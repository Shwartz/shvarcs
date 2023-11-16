import { getAllPosts } from "$lib";
import type { Actions } from '@sveltejs/kit';
import { getSearch } from '../../lib/notion/api';
import { NOTION_DATABASE_ID } from '$env/static/private';

export const actions = {
	search: async ({ request }) => {
		const data = await request.formData();
		const searchTerm = data.get('search');
		// do something with data
		console.log('Search data: ', searchTerm);

		try {
			const posts = await getSearch(NOTION_DATABASE_ID, searchTerm);
			console.log({posts});

			if (posts?.length > 0) {
				return { posts };
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

export const load = () => getAllPosts();
