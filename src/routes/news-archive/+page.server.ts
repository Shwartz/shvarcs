import { NOTION_TOKEN } from '$env/static/private';
import { initNotion, getAllPosts } from "$lib";

initNotion({
	tokens: {
		notionToken: NOTION_TOKEN,
	}
});

export const load = () => getAllPosts();
