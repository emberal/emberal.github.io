import * as React from "react";
import Row from "./row";
import { InputComponent } from "../interfaces/interfaces";

function setupEventListener(id: string, setIsHover: React.Dispatch<React.SetStateAction<boolean>>): () => void {
    let isMounted = true;

    function hover(hover: boolean): void {
        if (isMounted) {
            setIsHover(hover);
        }
    }

    if (id) {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("pointerenter", () => hover(true));
            el.addEventListener("pointerleave", () => hover(false));
        }
    }
    return () => {
        if (id) {
            document.getElementById(id)?.removeEventListener("pointerenter", () => hover(true));
            document.getElementById(id)?.removeEventListener("pointerleave", () => hover(false));
            isMounted = false;
        }
    }
}

/**
 * Sets isText to 'true' or 'false' using the setIsText function.
 * if the value of the input element is not empty and it's different from the current value
 */
function setSetIsText(id: string | undefined, isText: boolean, setIsText: React.Dispatch<React.SetStateAction<boolean>>): void {
    if (id) {
        const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement;
        if (el.value !== "" !== isText) {
            setIsText(el.value !== "");
        }
    }
}

interface Input<T> extends InputComponent<T> {
    leading?: React.ReactElement<HTMLElement>,
    trailing?: React.ReactElement<HTMLElement>,
}

export default function Input(
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
    }: Input<HTMLInputElement>): JSX.Element {

    /**
     * Is 'true' if the input element is in focus
     */
    const [isFocused, setIsFocused] = React.useState(false);
    /**
     * Is 'true' if the user is hovering over the input element
     */
    const [isHover, setIsHover] = React.useState(false);
    /**
     * Is 'true' if the input element contains any characters
     */
    const [isText, setIsText] = React.useState(false);

    React.useEffect(() => {
        if (id && title) {
            setupEventListener(id, setIsHover);
        }
    }, []);

    return (
        <Row className={ "relative" }>
            { leading }
            <HoverTitle title={ title } isActive={ isFocused || isHover || isText } htmlFor={ id }/>
            <input
                className={ `default-bg focus:border-primaryPurple outline-none border-2 border-gray-500 
                hover:border-t-primary-purple pl-2 ${ className }` }
                id={ id }
                onFocus={ () => setIsFocused(true) }
                onBlur={ () => setIsFocused(false) }
                name={ name }
                type={ type }
                placeholder={ placeholder }
                required={ required }
                onInput={ () => setSetIsText(id, isText, setIsText) }
                onChange={ onChange }/>
            { trailing }
        </Row>
    );
}

export function TextArea(
    {
        className,
        id,
        name,
        title,
        placeholder,
        required = false,
        onChange
    }: InputComponent<HTMLTextAreaElement>): JSX.Element {

    /**
     * Is 'true' if the textArea element is in focus
     */
    const [isFocused, setIsFocused] = React.useState(false);
    /**
     * Is 'true' if the user is hovering over the textArea element
     */
    const [isHover, setIsHover] = React.useState(false);
    /**
     * Is 'true' if the textArea element contains any characters
     */
    const [isText, setIsText] = React.useState(false);

    React.useEffect(() => {
        if (id && title) {
            setupEventListener(id, setIsHover);
        }
    }, []);

    return ( // TODO expand textArea when typing
        <div className={ "relative" }>
            <HoverTitle title={ title } isActive={ isFocused || isHover || isText } htmlFor={ id }/>
            <textarea id={ id }
                      className={ `pl-2 min-h-[3rem] default-bg focus:border-primaryPurple outline-none
                                   border-2 border-gray-500 hover:border-t-primary-purple ${ className }` }
                      name={ name }
                      placeholder={ placeholder }
                      required={ required }
                      onInput={ () => setSetIsText(id, isText, setIsText) }
                      onFocus={ () => setIsFocused(true) }
                      onBlur={ () => setIsFocused(false) }
                      onChange={ onChange }/>
        </div>
    );
}

function HoverTitle(
    {
        title,
        isActive = false,
        htmlFor
    }: { title?: string, isActive?: boolean, htmlFor?: string }): JSX.Element {
    return (
        <label className={ `absolute pointer-events-none
                 ${ isActive ? "-top-2 left-3 default-bg text-sm" : "left-2 top-1" } 
            transition-all duration-150 text-gray-600 dark:text-gray-400` }
               htmlFor={ htmlFor }>
            <div className={ "z-50 relative" }>{ title }</div>
            <div className={ "w-full h-2 default-bg absolute bottom-1/3 z-10" }/>
        </label>
    );
}
