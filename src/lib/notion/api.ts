export const getDatabaseById = async (blogClient: any) => {
	try {
		const notion = blogClient.client;
		let posts;

		if (!notion) {
			return { code: 400, message: 'Invalid or missing notion secret' };
		}

		const database = await notion.databases.query({
			database_id: blogClient.config.databaseId,
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
					url: item.url,
					id: item.id,
					fullItem: item,
					title: item.properties.Name.title[0].plain_text,
				};
			});
		}

		return posts;

	} catch (error) {
		return { error };
	}
};
