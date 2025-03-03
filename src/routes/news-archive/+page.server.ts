// src/routes/news-archive/+page.server.ts
import { getPaginatedPosts } from '$lib/notion/';

export const load = async ({ url }) => {
	const cursor = url.searchParams.get('cursor') || undefined;
	const pageSize = 20;

	const news = await getPaginatedPosts(cursor, pageSize);

	return {
		news
	};
};

export const actions = {
	loadMore: async ({ request }) => {
		const data = await request.formData();
		const cursor = data.get('cursor')?.toString();
		const pageSize = 20;

		const news = await getPaginatedPosts(cursor, pageSize);
		const { posts, nextCursor, hasMore } = news;

		return {
			posts,
			nextCursor,
			hasMore,
		};
	}
};
