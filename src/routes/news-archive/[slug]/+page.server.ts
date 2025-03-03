import { error } from '@sveltejs/kit';
import { getPost } from '$lib/notion';
import { extractNotionPostId } from '$lib/utils/snippets';

export async function load({ params }) {
	const { slug } = params;
	const postId = extractNotionPostId(slug);

	const postData = await getPost(postId);

	if (postData.error) {
		throw error(500, 'Failed to fetch post content');
	}

	const title = postData.properties.Name.title[0].plain_text.split('|')[0].trim().replace('#', 'Nr.') || 'Friday Issue';
	const summary = postData.properties.Summary.rich_text[0].plain_text || 'Weekly front-end post';
	const dueDate = postData.properties['Due Date'].date.start || '';

	return {
		post: {
			content: postData?.content?.results,
			title,
			summary,
			dueDate,
		}
	};
}

