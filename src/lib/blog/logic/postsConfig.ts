import FlexImg from '$lib/blog/heroSvg/ImgPost1.svelte';
import VercelImg from '$lib/blog/heroSvg/vercelError.svelte';
import AnimationImg from '$lib/blog/heroSvg/2d3dVisual.svelte';
import Fallback from '$lib/blog/heroSvg/fallback.svelte';
import LifeSpan from '$lib/blog/heroSvg/lifeSpanVisual.svelte';
import { base } from '$app/paths';

export const postsArr = [
	{
		id: '8',
		url: `${base}/thoughts/colour-conundrum`,
		title: 'Colour Conundrum',
		description: 'post about colours',
		tags: ['CSS'],
		publishedDate: 'March, 2025',
		readingTime: '10 min read',
		likes: '0 likes',
		Visual: Fallback
	},
	{
		id: '7',
		url: `${base}/thoughts/lifespan`,
		title: 'Lifespan',
		description: 'Visualise your life\'s journey in months. This tiny app shows you a shocking perspective on your time in this world. It might just make you rethink how you spend those precious moments.',
		tags: ['Random'],
		publishedDate: 'January, 2025',
		readingTime: '1 min read',
		likes: '0 likes',
		Visual: LifeSpan
	},
	{
		id: '6',
		url: `${base}/thoughts/how-to-build-css-layout-using-flexbox`,
		title: 'How to create CSS Layout using Flexbox',
		description: 'So, you have your first mockup or design in your hands, but how do you translate it to HTML and CSS? Should you rely on CSS frameworks like Bootstrap, TailwindCSS, or others?',
		tags: ['CSS'],
		publishedDate: 'June, 2024',
		readingTime: '12 min read',
		likes: '8 likes',
		Visual: FlexImg
	}, {
		id: '5',
		url: `${base}/thoughts/build-error-on-vercel`,
		title: 'Build error on Vercel',
		description: 'Finding out about build errors',
		tags: ['JavaScript'],
		publishedDate: 'March, 2024',
		readingTime: '2 min read',
		likes: '5 likes',
		Visual: VercelImg
	}, {
		id: '4',
		url: `${base}/thoughts/2d-3d-animations-with-css`,
		title: '2D and 3D animations using CSS',
		description: '2D and 3D animations provide developers with tools to manipulate an element on the screen, including position, size, perspective and rotation.',
		tags: ['CSS'],
		publishedDate: 'March, 2024',
		readingTime: '6 min read',
		likes: '5 likes',
		Visual: AnimationImg
	}, {
		id: '3',
		url: `${base}/thoughts/practical-usage-of-CSS-pseudo-selectors`,
		title: 'Practical usage of CSS pseudo-class selectors',
		description: 'A quick overview of is(), where(), has() and not() selectors',
		tags: ['CSS'],
		publishedDate: 'February, 2024',
		readingTime: '5 min read',
		likes: '5 likes',
		Visual: Fallback
	}, {
		id: '2',
		url: `${base}/thoughts/how-to-deal-with-CSS`,
		title: 'How to deal with CSS',
		description: 'The common pitfalls with CSS and different approaches to make sense of the project\'s design, front-end and maintenance.',
		tags: ['CSS'],
		publishedDate: 'May, 2023',
		readingTime: '5 min read',
		likes: '5 likes',
		Visual: Fallback
	},
	{
		id: '1',
		url: `${base}/thoughts/svelte-vs-reactjs`,
		title: 'Svelte vs ReactJS',
		description: 'The Svelte vs React argument is straightforward when the project requirements are clearly defined.',
		tags: ['JavaScript'],
		publishedDate: 'September, 2022',
		readingTime: '4 min read',
		likes: '112 likes',
		Visual: Fallback
	}
];


