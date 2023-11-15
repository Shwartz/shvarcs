import { NOTION_DATABASE_ID } from '$env/static/private';
import { Client } from '@notionhq/client';
import { getDatabaseById, getPageById } from './notion/api';

type Tokens = { notionToken: string };
type InitConfig = { tokens: Tokens };
export type BlogClient = { client: Client };
let notionClient: BlogClient;

export const initNotion = (config: InitConfig): BlogClient => {
	const client = new Client({
		auth: config.tokens.notionToken
	});
	notionClient = { client };
	return notionClient;
};
export const getAllPosts = async () => {
	try {
		if (!notionClient) {
			return {
				error: {
					code: 400,
					message: 'Notion client is not initialized'
				}
			};
		}

		const posts = await getDatabaseById(notionClient, NOTION_DATABASE_ID);

		if (posts.length > 0) {
			return { posts };
		} else {
			return {
				error: {
					code: 400,
					message: 'Error'
				}
			};
		}

	} catch (error) {
		return {
			error: {
				code: 500,
				message: 'Some error occurred'
			}
		};
	}
};

export const getPost = async (id: string) => {
	try {
		if (!notionClient) {
			return {
				error: {
					code: 400,
					message: 'Notion client is not initialized'
				}
			};
		}

		const res = await getPageById(notionClient, id);

		if (res.block.results.length > 0) {
			return {
				resBlock: res.block
			};

		} else {
			return {
				error: {
					code: 400,
					message: `Error: Expected blocks but there were none`
				}
			};
		}

	} catch (error) {
		return {
			error: {
				code: 500,
				message: 'Some error occurred'
			}
		};
	}
}
