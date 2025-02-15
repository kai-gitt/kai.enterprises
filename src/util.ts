export function removeMultipleClasses(
	element: HTMLElement,
	prefixes: string[]
) {
	prefixes.forEach((prefix) => {
		Array.from(element.classList).forEach((className) => {
			if (className.startsWith(prefix)) {
				element.classList.remove(className);
			}
		});
	});
}
