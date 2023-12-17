import type {PageServerLoad} from './$types';

export function load({params}: PageServerLoad): {slug: string} {
  const {slug} = params;
  return {slug};
}
