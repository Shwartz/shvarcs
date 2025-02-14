export function debounce<T extends (...args: any[]) => void>(
	func: T,
	delay = 300
): (...args: Parameters<T>) => void {
	let timeout: number;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), delay);
	};
}
