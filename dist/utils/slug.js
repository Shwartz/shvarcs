export const createSlug = (inputString, id = '') => {
    // Remove non-alphanumeric characters and replace spaces with dashes
    const cleanedString = inputString
        .replace(/\//g, ' ')
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-').toLowerCase();
    // Replace multiple dashes with a single dash
    const slug = cleanedString.replace(/-+/g, '-');
    return id ? `${slug}-${id}` : slug;
};
