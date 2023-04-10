import * as React from "react";

/**
 * A component that renders a list of elements
 * @param each The list of elements
 * @param children Each element in the list
 */
export function For<T extends readonly any[], U extends JSX.Element>({ each, children }: {
    each: T | undefined | null,
    children: (value: T[number], index: number) => U
}): JSX.Element {
    return <>{ each?.map(children) }</>;
}

/**
 * Renders a component if a condition is true, otherwise renders another component
 * @param when The condition to check
 * @param children The component to render if the condition is true
 * @param otherwise The component to render if the condition is false
 * @param otherwiseWhen The condition to check if the otherwise component should be rendered
 */
export function Show<T, U extends JSX.Element>({ when, children, otherwise = null, otherwiseWhen }: {
    when: T | undefined | null,
    children: U | null,
    otherwise?: U | null,
    otherwiseWhen?: T | null
}): JSX.Element | null {
    if (when) {
        return children;
    }
    else if (otherwiseWhen || otherwiseWhen === undefined) {
        return otherwise;
    }
    return null;
}
