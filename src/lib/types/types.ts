export interface Bookmark {
	id: string;
	title: string;
	date: string;
	tags: Array<string>;
	description: string;
	url: string;
	author?: string;
}

export interface Post {
	id: number;
	title: string;
	slug: string;
	summary: string;
	fullItem: {
		properties: {
			'Due Date': {
				date: {
					start: string;
				};
			};
		};
	};
}

export interface ErrorResponse {
	code: number;
	message: string;
	error?: unknown;
}

export type PostsData = Post[] | ErrorResponse;
