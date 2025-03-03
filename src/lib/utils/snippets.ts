export function extractNotionPostId(slug: string) {
	return slug.split('-').slice(-5).join('-');
}
