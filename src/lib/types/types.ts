export interface Bookmark {
	id: string;
	title: string;
	date: string;
	tags: Array<string>;
	description: string;
	url: string;
	author?: string;
}
