export const prerender = true
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		title: 'Good Read'
	};
};
