export declare const getAllPosts: () => Promise<{
    posts: {
        id: any;
        title: any;
        slug: string;
        summary: any;
        fullItem: any;
    }[] | {
        code: number;
        message: string;
        error?: undefined;
    } | {
        error: unknown;
        code?: undefined;
        message?: undefined;
    };
    error?: undefined;
} | {
    error: {
        code: number;
        message: string;
    };
    posts?: undefined;
}>;
export declare const getPost: (id: string) => Promise<{
    resBlock: import("@notionhq/client/build/src/api-endpoints").ListBlockChildrenResponse | undefined;
    error?: undefined;
} | {
    error: {
        code: number;
        message: string;
    };
    resBlock?: undefined;
}>;
