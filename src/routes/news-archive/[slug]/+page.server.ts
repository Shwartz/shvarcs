import { error } from '@sveltejs/kit';
import { getAllPosts, getPost } from '$lib/notion';

export async function load({ params }) {
	const { slug } = params;
	const { posts } = await getAllPosts();
	const post = posts?.find(p => p.slug === slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	const postContent = await getPost(post.id);

	if (postContent.error) {
		throw error(500, 'Failed to fetch post content');
	}

	const title = post?.title ? `News | ${post.title}` : 'News article';

	return {
		title: title,
		post: {
			...post,
			content: postContent?.resBlock?.results
		}
	};
}

