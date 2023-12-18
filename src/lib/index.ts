import { NOTION_DATABASE_ID } from '$env/static/private';
import { getDatabaseById, getPageById } from './notion/api';
import pMemoize from 'p-memoize';
import ExpiryMap from "expiry-map";

const expireCacheTime = 1000 * 60 * 60;
//const expireCacheTime = 1000;

const cacheAllPosts = new ExpiryMap(expireCacheTime);
const cacheGetPost = new ExpiryMap(expireCacheTime);
export const getAllPosts = pMemoize(async () => {
	try {
		const posts = await getDatabaseById(NOTION_DATABASE_ID);

		if (posts?.length > 0) {
			// console.log('getAllPosts: ', posts.length);
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
				message: 'Can\'t connect to DB'
			}
		};
	}
}, {cache: cacheAllPosts});

export const getPost = pMemoize(async (id: string) => {
	try {
		const res = await getPageById(id);

		if (res.block.results.length > 0) {
			// console.log('getPost: ', res.block.results.length);
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
				message: 'Can\'t connect to DB'
			}
		};
	}
}, {cache: cacheGetPost});
