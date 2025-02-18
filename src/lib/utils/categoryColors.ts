export const predefinedCategories = {
	JavaScript: 'var(--pastel-mint)',
	CSS: 'var(--pastel-orange)',
	Tools: 'var(--pastel-rose)',
	Design: 'var(--pastel-purple)',
	Fonts: 'var(--pastel-cream)',
	Development: 'var(--pastel-yellow)',
	Random: 'var(--pastel-aqua)'
} as const;

export type CategoryType = keyof typeof predefinedCategories;

export function getCategoryColor(category: CategoryType): string {
	return predefinedCategories[category] || 'var(--default-color)';
}

export const getFirstTagColour = (tags: CategoryType[]): string => {
	if (tags.length > 0) {
		return getCategoryColor(tags[0] as CategoryType);
	}
	return 'var(--pastel-cream)'; // Fallback colour
};
