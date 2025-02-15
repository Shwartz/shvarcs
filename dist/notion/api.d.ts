import { Client } from '@notionhq/client';
export declare const notionClient: Client;
export declare const getDatabaseById: (ID: string) => Promise<{
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
} | undefined>;
export declare const getPageById: (ID: string) => Promise<{
    code: number;
    message: string;
    block?: undefined;
    error?: undefined;
} | {
    block: import("@notionhq/client/build/src/api-endpoints").ListBlockChildrenResponse;
    code?: undefined;
    message?: undefined;
    error?: undefined;
} | {
    error: unknown;
    code?: undefined;
    message?: undefined;
    block?: undefined;
}>;
export declare const getSearch: (ID: string, searchString?: string) => Promise<{
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
} | undefined>;
