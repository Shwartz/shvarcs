import FlexImg from '../heroSvg/ImgPost1.svelte';
import VercelImg from '../heroSvg/vercelError.svelte';
import AnimationImg from '../heroSvg/2d3dVisual.svelte';
import { base } from '$app/paths';
export const postsArr = [
    {
        id: '7',
        url: `${base}/thoughts/lifespan`,
        title: 'Lifespan',
        description: 'How far you have come? Each dot represents one month on average 80 years lifespan',
        tags: ['Random'],
        publishedDate: 'January, 2025',
        readingTime: '1 min read',
        likes: '0 likes',
        Visual: FlexImg
    },
    {
        id: '6',
        url: `${base}/thoughts/how-to-build-css-layout-using-flexbox`,
        title: 'How to create CSS Layout using Flexbox',
        description: 'So, you have your first mockup or design in your hands, but how do you translate it to HTML and CSS? Should you rely on CSS frameworks like Bootstrap, TailwindCSS, or others?',
        tags: ['CSS'],
        publishedDate: 'June, 2024',
        readingTime: '10 min read',
        likes: '8 likes',
        Visual: FlexImg
    }, {
        id: '5',
        url: `${base}/thoughts/build-error-on-vercel`,
        title: 'Build error on Vercel',
        description: 'Finding out about build errors',
        tags: ['JavaScript'],
        publishedDate: 'March, 2024',
        readingTime: '10 min read',
        likes: '5 likes',
        Visual: VercelImg
    }, {
        id: '4',
        url: `${base}/thoughts/2d-3d-animations-with-css`,
        title: '2D and 3D animations using CSS',
        description: '2D and 3D animations provide developers with tools to manipulate an element on the screen, including position, size, perspective and rotation.',
        tags: ['CSS'],
        publishedDate: 'March, 2024',
        readingTime: '10 min read',
        likes: '5 likes',
        Visual: AnimationImg
    }, {
        id: '3',
        url: `${base}/thoughts/practical-usage-of-CSS-pseudo-selectors`,
        title: 'Practical usage of CSS pseudo-class selectors',
        description: 'A quick overview of is(), where(), has() and not() selectors',
        tags: ['CSS'],
        publishedDate: 'February, 2024',
        readingTime: '10 min read',
        likes: '5 likes',
        Visual: FlexImg
    }, {
        id: '2',
        url: `${base}/thoughts/how-to-deal-with-CSS`,
        title: 'How to deal with CSS',
        description: 'The common pitfalls with CSS and different approaches to make sense of the project\'s design, front-end and maintenance.',
        tags: ['CSS'],
        publishedDate: 'May, 2023',
        readingTime: '10 min read',
        likes: '5 likes',
        Visual: FlexImg
    },
    {
        id: '1',
        url: `${base}/thoughts/svelte-vs-reactjs`,
        title: 'Svelte vs ReactJS',
        description: 'The Svelte vs React argument is straightforward when the project requirements are clearly defined.',
        tags: ['JavaScript'],
        publishedDate: 'September, 2022',
        readingTime: '18 min read',
        likes: '112 likes',
        Visual: FlexImg
    }
];
