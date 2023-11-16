import { NOTION_DATABASE_ID } from '$env/static/private';
import { getDatabaseById, getPageById } from './notion/api';

export const getAllPosts = async () => {
	try {
		const posts = await getDatabaseById(NOTION_DATABASE_ID);

		if (posts?.length > 0) {
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
		const res = await getPageById(id);

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
