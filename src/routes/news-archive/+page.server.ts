import { NOTION_TOKEN } from '$env/static/private';
import { initNotion, getAllPosts } from "$lib";
import type { Actions } from '@sveltejs/kit';

initNotion({
	tokens: {
		notionToken: NOTION_TOKEN,
	}
});

export const actions = {
	search: async ({ request }) => {
		const data = await request.formData();
		// do something with data
		console.log('Search data: ', data.get('search'));
	}
} satisfies Actions;

export const load = () => getAllPosts();
