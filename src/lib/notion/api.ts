import { createSlug } from '$lib/utils';

export const getDatabaseById = async (blogClient: any, ID: string) => {
	try {
		const notion = blogClient.client;
		let posts;

		if (!notion) {
			return { code: 400, message: 'Invalid or missing notion secret' };
		}

		const database = await notion.databases.query({
			database_id: ID,
			filter: {
				property: 'Publish',
				checkbox: {
					'equals': true
				}
			}
		});

		if (database.results.length > 0) {
			posts = database.results.map((item: any) => {
				return {
					id: item.id,
					title: item.properties.Name.title[0].plain_text,
					slug: createSlug(item.properties.Name.title[0].plain_text, item.id),
					summary: item.properties.Summary.rich_text[0].plain_text,
					fullItem: item,
				};
			});
		}

		return posts;

	} catch (error) {
		return { error };
	}
};

export const getPageById = async (blogClient: any, ID: string) => {
	try {
		const notion = blogClient.client;

		if (!notion) {
			return { code: 400, message: 'Invalid or missing notion secret' };
		}

		const block = await notion.blocks.children.list({
			block_id: ID,
			page_size: 100
		});

		return {block};

	} catch (error) {
		return { error };
	}
};

export const getSearch = async (blogClient: any, ID: string, searchString: string) => {
	try {
		const notion = blogClient.client;
		let posts;

		if (!notion) {
			return { code: 400, message: 'Invalid or missing notion secret' };
		}

		const database = await notion.databases.query({
			database_id: ID,
			filter: {
				property: 'Search Tags',
				contains: searchString
			}
		});

		if (database.results.length > 0) {
			posts = database.results.map((item: any) => {
				return {
					id: item.id,
					title: item.properties.Name.title[0].plain_text,
					slug: createSlug(item.properties.Name.title[0].plain_text, item.id),
					summary: item.properties.Summary.rich_text[0].plain_text,
					fullItem: item,
				};
			});
		}

		return posts;

	} catch (error) {
		return { error };
	}
};
