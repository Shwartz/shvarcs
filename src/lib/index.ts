import { Client } from '@notionhq/client';
import { getDatabaseById } from './notion/api';

type Tokens = { notionToken: string, databaseId: string, vercelByPassToken?: string };
type InitConfig = { tokens: Tokens };
export type BlogClient = { client: Client, config: Tokens };
let notionClient: BlogClient;

export const initNotion = (config: InitConfig): BlogClient => {
	const client = new Client({
		auth: config.tokens.notionToken
	});
	notionClient = { client, config: config.tokens };
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

		const res = await getDatabaseById(notionClient);
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
