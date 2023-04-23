/**
 * Returns true if the browser supports touch events.
 * @returns 'true' if the browser supports touch events, 'false' otherwise
 */
export function isTouch(): boolean {
    return typeof window !== "undefined" && "ontouchstart" in window ||
        typeof document !== "undefined" && "ontouchstart" in document.documentElement;
}