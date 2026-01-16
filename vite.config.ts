import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import svg from '@poppanator/sveltekit-svg';

export default defineConfig({
	plugins: [
		sveltekit(),
		svg({
			includePaths: ['./src/assets/svg/'],
			svgoOptions: {
				multipass: true,
				plugins: [
					{
						name: 'preset-default',
						params: {
							overrides: { removeViewBox: false }
						}
					},
					{
						name: 'removeAttrs',
						params: { attrs: '(fill|stroke)' }
					}
				]
			}
		}),
	],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
          @use '/src/styles/index.scss' as *;
        `,
			}
		},
	},

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
