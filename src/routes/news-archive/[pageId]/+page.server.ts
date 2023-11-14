import { NOTION_TOKEN } from '$env/static/private';
import { parsePageId } from 'notion-utils';
import { getPost, initNotion } from '$lib';

initNotion({
	tokens: {
		notionToken: NOTION_TOKEN,
	}
});
export async function load({ params }) {
	const postId = parsePageId(params.pageId);
	const {resBlock} = await getPost(postId);
	const blocks = resBlock.results;

	return {
		blocks
	};
}
