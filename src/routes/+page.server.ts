import { getLastPostsByNumber } from '$lib/notion';

export const load = async () => {
	const posts = await getLastPostsByNumber(4);
	// console.log('page.server.ts:', posts);
	return {
		title: 'Home page',
		posts,
	};
};
