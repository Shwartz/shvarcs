import type { Snippet } from 'svelte';
interface TooltipProps {
    color: string;
    children: Snippet;
}
declare const Tooltip: import("svelte").Component<TooltipProps, {}, "">;
type Tooltip = ReturnType<typeof Tooltip>;
export default Tooltip;
