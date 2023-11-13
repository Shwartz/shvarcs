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
	console.log({ notionClient });
	console.log('test');
	try {
		if (!notionClient) {
			return {
				error: {
					code: 400,
					message: 'Notion client is not initialized'
				}
			};
		}

		const res = await getDatabaseById(notionClient, NOTION_DATABASE_ID);
		console.log('res: ', res.length);


		if (res.length > 0) {
			return { res };
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

		if (res.page.object === 'page') {
			return {
				page: res.page,
				block: res.block
			};

		} else {
			return {
				error: {
					code: 400,
					message: `Error: Expected page but returned type is ${res.object}`
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
