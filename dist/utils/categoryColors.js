export const predefinedCategories = {
    JavaScript: 'var(--pastel-mint)',
    CSS: 'var(--pastel-orange)',
    Tools: 'var(--pastel-rose)',
    Design: 'var(--pastel-purple)',
    Random: 'var(--pastel-aqua)'
};
export function getCategoryColor(category) {
    return predefinedCategories[category] || 'var(--default-color)';
}
export const getFirstTagColour = (tags) => {
    if (tags.length > 0) {
        return getCategoryColor(tags[0]);
    }
    return 'var(--pastel-cream)'; // Fallback colour
};
