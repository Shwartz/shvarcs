import { parsePageId } from 'notion-utils';
import { getPost } from '$lib';

export async function load({ params }) {
	const postId = parsePageId(params.pageId);
	const {resBlock} = await getPost(postId);
	const blocks = resBlock.results;

	return {
		blocks
	};
}
