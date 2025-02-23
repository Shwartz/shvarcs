import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			runtime: 'nodejs20.x',
		}),
		/* Pre render static blog posts as they don't change frequently */
		prerender: {
			entries: [
				'/thoughts',
				'/thoughts/lifespan',
				'/thoughts/how-to-build-css-layout-using-flexbox',
				'/thoughts/build-error-on-vercel',
				'/thoughts/2d-3d-animations-with-css',
				'/thoughts/practical-usage-of-CSS-pseudo-selectors',
				'/thoughts/how-to-deal-with-CSS',
				'/thoughts/svelte-vs-reactjs',
			]
		},
	},
	onwarn: (warning, handler) => {
		const { code, frame } = warning;
		// console.log(code); // <= uncomment to check other warnings
		if (code === "css_unused_selector")
			return;
		if (code === "a11y_invalid_attribute")
			return;
		handler(warning);
	}
};

export default config;
