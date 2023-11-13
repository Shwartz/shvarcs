import { NOTION_DATABASE_ID, NOTION_TOKEN } from '$env/static/private';
import { initNotion, getAllPosts } from "$lib";

initNotion({
	tokens: {
		databaseId: NOTION_DATABASE_ID,
		notionToken: NOTION_TOKEN,
	}
});

export const load = () => getAllPosts();
