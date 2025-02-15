interface PostListProps {
    selectedFilter: string | null;
    compact: boolean;
    onCountChange?: (count: number) => void;
    numberOfPosts?: number;
}
declare const PostList: import("svelte").Component<PostListProps, {}, "">;
type PostList = ReturnType<typeof PostList>;
export default PostList;
