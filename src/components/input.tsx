import * as React from "react";
import Row from "./row";
import { getElementById } from "../utils/dom";

function setupEventListener(id: string, setIsHover: Setter<boolean>): () => void {
    let isMounted = true;

    function hover(hover: boolean): void {
        if (isMounted) {
            setIsHover(hover);
        }
    }

    const el = getElementById(id);
    el?.addEventListener("pointerenter", () => hover(true));
    el?.addEventListener("pointerleave", () => hover(false));
    return () => {
        getElementById(id)?.removeEventListener("pointerenter", () => hover(true));
        getElementById(id)?.removeEventListener("pointerleave", () => hover(false));
        isMounted = false;
    }
}

/**
 * Sets isText to 'true' or 'false' using the setIsText function.
 * if the value of the input element is not empty and it's different from the current value
 */
function setSetIsText(id: string | undefined, isText: boolean, setIsText: Setter<boolean>): void {
    if (id) {
        const el = getElementById<HTMLInputElement | HTMLTextAreaElement>(id);
        if (el && el.value !== "" !== isText) {
            setIsText(el.value !== "");
        }
    }
}

interface Input<T extends HTMLElement> extends InputProps<T> {
    leading?: React.ReactElement<HTMLElement>,
    trailing?: React.ReactElement<HTMLElement>,
}

const Input: Component<Input<HTMLInputElement>> = (
    {
        className,
        id,
        name,
        type = "text",
        title,
        placeholder,
        required = false,
        onChange,
        leading,
        trailing
    }) => {

    // Is 'true' if the input element is in focus
    const [isFocused, setIsFocused] = React.useState(false);
    // Is 'true' if the user is hovering over the input element
    const [isHover, setIsHover] = React.useState(false);
    // Is 'true' if the input element contains any characters
    const [isText, setIsText] = React.useState(false);

    React.useEffect(() => {
        if (id && title) { // TODO use ref instead of id
            setupEventListener(id, setIsHover);
        }
    }, []);

    return (
        <Row className={ "relative" }>
            { leading }
            <HoverTitle title={ title } isActive={ isFocused || isHover || isText } htmlFor={ id } />
            <input
                className={ `default-bg focus:border-primaryPurple outline-none border-2 border-gray-500 
                hover:border-t-primary-purple pl-2 ${ className }` }
                id={ id }
                onFocus={ () => setIsFocused(true) }
                onBlur={ () => setIsFocused(false) }
                name={ name ?? undefined }
                type={ type }
                placeholder={ placeholder ?? undefined }
                required={ required }
                onInput={ () => setSetIsText(id, isText, setIsText) }
                onChange={ onChange } />
            { trailing }
        </Row>
    );
}

export default Input;

export const TextArea: Component<InputProps<HTMLTextAreaElement>> = (
    {
        className,
        id,
        name,
        title,
        placeholder,
        required = false,
        onChange
    }) => {

    // Is 'true' if the textArea element is in focus
    const [isFocused, setIsFocused] = React.useState(false);
    // Is 'true' if the user is hovering over the textArea element
    const [isHover, setIsHover] = React.useState(false);
    // Is 'true' if the textArea element contains any characters
    const [isText, setIsText] = React.useState(false);

    React.useEffect(() => {
        if (id && title) { // TODO use ref instead of id
            setupEventListener(id, setIsHover);
        }
    }, []);

    return ( // TODO expand textArea when typing
        <div className={ "relative" }>
            <HoverTitle title={ title } isActive={ isFocused || isHover || isText } htmlFor={ id } />
            <textarea id={ id }
                      className={ `pl-2 min-h-[3rem] default-bg focus:border-primaryPurple outline-none
                                   border-2 border-gray-500 hover:border-t-primary-purple ${ className }` }
                      name={ name ?? undefined }
                      placeholder={ placeholder ?? undefined }
                      required={ required }
                      onInput={ () => setSetIsText(id, isText, setIsText) }
                      onFocus={ () => setIsFocused(true) }
                      onBlur={ () => setIsFocused(false) }
                      onChange={ onChange } />
        </div>
    );
}

const HoverTitle: Component<{ title?: string | null, isActive?: boolean, htmlFor?: string }> = (
    {
        title,
        isActive = false,
        htmlFor
    }) => (
    <label className={ `absolute pointer-events-none
                 ${ isActive ? "-top-2 left-3 default-bg text-sm" : "left-2 top-1" } 
            transition-all duration-150 text-gray-600 dark:text-gray-400` }
           htmlFor={ htmlFor }>
        <div className={ "z-50 relative" }>{ title }</div>
        <div className={ "w-full h-2 default-bg absolute bottom-1/3 z-10" } />
    </label>
);
