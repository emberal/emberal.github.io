/**
 * Takes a String in a csv format, separated by ";" and returns an array of strings
 * @param csv A String representation of a csv file, with ; as separator
 * @returns {string[]} An array of strings, in the order the strings in the 'csv' string was
 */
export const splitCSV = (csv: string): string[] => csv.split(";");

/**
 * Removes all 'null' and 'undefined' values in an array
 * @param arr An array of T
 * @returns An array of objects without any 'null' or 'undefined' values
 */
export function removeNullValues<T extends any>(arr: (T | null | undefined)[]): NonNullable<T>[] {
    return arr.filter((element: T | null | undefined) => element) as NonNullable<T>[];
}