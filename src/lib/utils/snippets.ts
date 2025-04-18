export function extractNotionPostId(slug: string) {
	return slug.split('-').slice(-5).join('-');
}

type ImageVariant = '320w' | '640w' | '768w' | '1024w' | '1920w' | '2560w' | 'public';
export function createImgUrl(imgId: string, size: ImageVariant) {
	return `https://imagedelivery.net/OsbYeWCzhRDS5xpqlDmBXA/${imgId}/${size}`;
}

export function escapeHtml(str: string): string {
	return str
	.replace(/&/g, '&amp;')
	.replace(/</g, '&lt;')
	.replace(/>/g, '&gt;')
	.replace(/"/g, '&quot;')
	.replace(/'/g, '&#39;');
}
