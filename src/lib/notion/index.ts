// lib/notion/index.ts
import { NOTION_DATABASE_ID } from '$env/static/private';
import { getDatabaseById, getPageById, getRecentPosts, notionClient } from './api';
import pMemoize from 'p-memoize';
import ExpiryMap from 'expiry-map';

// const expireCacheTime = 1000 * 60 * 60;
const expireCacheTime = 1000;

const cacheAllPosts = new ExpiryMap(expireCacheTime);
const cacheGetPost = new ExpiryMap(expireCacheTime);
export const getAllPosts = pMemoize(
	async () => {
		try {
			const posts = await getDatabaseById(NOTION_DATABASE_ID);

			if (posts && Array.isArray(posts) && posts?.length > 0) {
				// console.log('getAllPosts: ', posts.length);
				return {
					posts: posts.map((post) => ({
						...post,
						id: post.id
					}))
				};
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
					message: "Can't connect to DB"
				}
			};
		}
	},
	{ cache: cacheAllPosts }
);

export const getPaginatedPosts = pMemoize(
	async (startCursor?: string, pageSize: number = 20) => {
		try {
			const result = await getDatabaseById(NOTION_DATABASE_ID, startCursor, pageSize);

			if (result.posts) {
				const posts = result.posts.map((post) => ({
					id: post.id,
					title: post.title,
					slug: post.slug,
					summary: post.summary,
					dueDate: post.fullItem.properties['Due Date'].date.start,
				}));

				// console.log('INDEX --> posts --> ', posts);

				return {
					posts: posts,
					nextCursor: result.nextCursor,
					hasMore: result.hasMore
				};
			} else {
				return {
					error: {
						code: 400,
						message: 'Error fetching posts'
					}
				};
			}
		} catch (error) {
			return {
				error: {
					code: 500,
					message: "Can't connect to DB"
				}
			};
		}
	},
	{ cache: new ExpiryMap(expireCacheTime) }
);

export const getPost = pMemoize(
	async (id: string) => {
		try {
			const [pageContent, pageProperties] = await Promise.all([
				getPageById(id),
				notionClient.pages.retrieve({ page_id: id })
			]);

			if (pageContent.block.results.length > 0) {
				return {
					content: pageContent.block,
					properties: pageProperties.properties
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
					message: "Can't connect to DB"
				}
			};
		}
	},
	{ cache: cacheGetPost }
);

export const getLastPostsByNumber = pMemoize(
	async (count: number = 4) => {
		try {
			const posts = await getRecentPosts(NOTION_DATABASE_ID, count);

			if (posts && posts.length > 0) {
				return {
					posts: posts
				};
			} else {
				return {
					error: {
						code: 400,
						message: 'No posts found'
					}
				};
			}
		} catch (error) {
			return {
				error: {
					code: 500,
					message: `Can't retrieve recent posts: ${error}`
				}
			};
		}
	},
	{ cache: new ExpiryMap(expireCacheTime) }
);
