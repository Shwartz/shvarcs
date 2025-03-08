export const extractMainDomain = (url:string) => {
	const regex = /(?:https?:\/\/)?(?:www\.)?([^/]+)/;
	const match = url.match(regex);
	return match ? match[1] : null;
}
