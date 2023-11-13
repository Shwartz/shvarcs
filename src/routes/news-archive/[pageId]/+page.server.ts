import { NOTION_TOKEN } from '$env/static/private';
import { parsePageId } from 'notion-utils';
import { getPost, initNotion } from '$lib';

initNotion({
	tokens: {
		notionToken: NOTION_TOKEN,
	}
});

export async function load({ params }) {
	console.log({params});
	const postId = parsePageId(params.pageId);
	const {page, block} = await getPost(postId);
	// const {page, block} = result;

	console.log({page, block});

	return {
		postId,
		page,
		block
	};
}
