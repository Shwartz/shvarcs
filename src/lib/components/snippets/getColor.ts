const colors = [
	'var(--pastel-cream)',
	'var(--pastel-yellow)',
	'var(--pastel-orange)',
	'var(--pastel-pink)',
	'var(--pastel-rose)',
	'var(--pastel-purple)',
	'var(--pastel-blue)',
	'var(--pastel-aqua)',
	'var(--pastel-mint)',
	'var(--pastel-lime)'
];

export const getColor = (index: number) => {
	return colors[index % 10];
};
