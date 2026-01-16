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

	const title = postData.properties.Name.title[0].plain_text.split('|')[0].trim().replace('#', '') || 'Friday Issue';
	const summary = postData.properties.Summary.rich_text[0].plain_text || 'Weekly front-end post';
	const dueDate = postData.properties['Due Date'].date.start || '';
	const heroImage = postData.properties['heroImg']?.rich_text[0]?.plain_text || '';
	const showHeroImage = postData.properties['showHeroImg'].checkbox || false;

	return {
		post: {
			content: postData?.content?.results,
			title,
			summary,
			dueDate,
			heroImage,
			showHeroImage
		}
	};
}

