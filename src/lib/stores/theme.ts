import { writable } from 'svelte/store';

const theme = writable<'dark' | 'light'>('light');

export default theme;
