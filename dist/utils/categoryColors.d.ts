export declare const predefinedCategories: {
    readonly JavaScript: "var(--pastel-mint)";
    readonly CSS: "var(--pastel-orange)";
    readonly Tools: "var(--pastel-rose)";
    readonly Design: "var(--pastel-purple)";
    readonly Random: "var(--pastel-aqua)";
};
export type CategoryType = keyof typeof predefinedCategories;
export declare function getCategoryColor(category: CategoryType): string;
export declare const getFirstTagColour: (tags: CategoryType[]) => string;
