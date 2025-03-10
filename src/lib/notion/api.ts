// src/lib/notion/api.ts
import { createSlug } from '$lib/utils/slug';
import { Client } from '@notionhq/client';
import { NOTION_TOKEN } from '$env/static/private';

export const notionClient: Client = new Client({ auth: NOTION_TOKEN });

export const getDatabaseById = async (ID: string, startCursor?: string, pageSize: number = 20) => {
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
			},
			sorts: [
				{
					property: 'Due Date',
					direction: 'descending'
				}
			],
			start_cursor: startCursor,
			page_size: pageSize,
		});
		//console.log('After Request happened - Database: ', database.results.length);

		if (database.results.length > 0) {
			posts = database.results.map((item: any) => {
				return {
					id: item.id,
					title: item.properties.Name.title[0].plain_text.split('|')[0].trim().replace('#', 'Nr.'),
					slug: createSlug(item.properties.Name.title[0].plain_text, item.id),
					summary: item.properties.Summary.rich_text[0].plain_text,
					fullItem: item
				};
			});
		}

		return {
			posts,
			nextCursor: database.next_cursor,
			hasMore: database.has_more,
		};
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

export const getRecentPosts = async (DB_ID: string, count: number) => {
	try {
		let posts;
		if (!notionClient) {
			return { code: 400, message: 'Invalid or missing notion secret' };
		}

		const database = await notionClient.databases.query({
			database_id: DB_ID,
			filter: {
				property: 'Publish',
				checkbox: {
					'equals': true
				}
			},
			sorts: [
				{
					property: 'Due Date',
					direction: 'descending'
				}
			],
			page_size: count
		});

		if (database.results.length > 0) {
			posts = database.results.map((item: any) => {
				return {
					id: item.id,
					title: item.properties.Name.title[0].plain_text.split('|')[0].trim().replace('#', 'Nr.'),
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
}

