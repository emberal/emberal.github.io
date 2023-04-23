/**
 * Returns true if the browser supports touch events.
 * @returns 'true' if the browser supports touch events, 'false' otherwise
 */
export function isTouch(): boolean {
    return "ontouchstart" in window || "ontouchstart" in document.documentElement;
}