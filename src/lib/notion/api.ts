import { createSlug } from '$lib/utils';
import { Client } from '@notionhq/client';
import { NOTION_TOKEN } from '$env/static/private';

export const notionClient: Client = new Client({ auth: NOTION_TOKEN });

export const getDatabaseById = async (ID: string) => {
	try {
		let posts;

		if (!notionClient) {
			return { code: 400, message: 'Invalid or missing notion secret' };
		}

		const database = await notionClient.databases.query({
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
					fullItem: item
				};
			});
		}

		return posts;

	} catch (error) {
		return { error };
	}
};

export const getPageById = async (ID: string) => {
	try {
		if (!notionClient) {
			return { code: 400, message: 'Invalid or missing notion secret' };
		}

		const block = await notionClient.blocks.children.list({
			block_id: ID,
			page_size: 100
		});

		return { block };

	} catch (error) {
		return { error };
	}
};

export const getSearch = async (ID: string, searchString = '') => {
	try {
		let posts;
		if (!notionClient) {
			return { code: 400, message: 'Invalid or missing notion secret' };
		}

		console.log('--- searchString: ', searchString);
		//https://github.com/makenotion/notion-sdk-js
		if (searchString.length < 4) {
			return;
		}

		const searchResult = await notionClient.databases.query({
			database_id: ID,
			filter: {
				property: "Search",
				rich_text: {
					contains: searchString
				},
			},
		});

		console.log({searchResult});

		if (searchResult?.results?.length > 0) {
			posts = searchResult.results.map((item: any) => {
				return {
					id: item.id,
					title: item.properties.Name.title[0].plain_text,
					slug: createSlug(item.properties.Name.title[0].plain_text, item.id),
					summary: item.properties.Summary.rich_text[0].plain_text,
					fullItem: item
				};
			});

			return posts;
		} else {
			return [];
		}
	} catch (error) {
		return { error };
	}
};
