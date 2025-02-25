// src/routes/news-archive/+page.server.ts
import {getAllPosts} from "$lib/notion/";

export const load = async (event) => {
	const news = await getAllPosts();

	return {
		news,
	}
};
