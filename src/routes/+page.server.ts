import { getLastPostsByNumber } from '$lib/notion';
import type { PostsData } from '$lib/types/types';

export const load = () => {

	return {
		title: 'Frontend stories By Andris',
		description: 'Stories about CSS, HTML, animation and all around Frontend',
		posts: getLastPostsByNumber(4) as Promise<PostsData>,
	};
};
