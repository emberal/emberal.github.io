/**
 * Get element by id
 * @param id The id of the element
 * @returns The element with the given id, or null if it doesn't exist
 * @type T The type of the HTMLElement
 */
export function getElementById<T extends HTMLElement = HTMLElement>(id: string): T | null {
    return document.getElementById(id) as T | null;
}

/**
 * Scrolls the window to the top
 */
export function backUp(): void {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Firefox, chromium, opera and the others
}
