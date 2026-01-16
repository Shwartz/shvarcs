export function debounce<T extends (...args: never[]) => void>(
	func: T,
	delay = 300
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), delay);
	};
}
