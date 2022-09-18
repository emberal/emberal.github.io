import * as React from "react";
import Row from "./row";
import { InputComponent } from "../interfaces/interfaces";

function setupEventListener(id: string, setIsHover: Function): () => void {
    let isMounted = true;

    function hover(hover: boolean) {
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

interface Input<T> extends InputComponent<T> {
    leading?: React.ReactElement<HTMLElement>,
    trailing?: React.ReactElement<HTMLElement>,
}

export default function Input(
    {
        className,
        id,
        name,
        type,
        title,
        placeholder,
        required,
        onChange,
        leading,
        trailing
    }: Input<HTMLInputElement>): JSX.Element {

    const [isFocused, setIsFocused] = React.useState(false);
    const [isHover, setIsHover] = React.useState(false);
    const [isText, setIsText] = React.useState(false);

    function setSetIsText() {
        if (id) {
            const el = document.getElementById(id) as HTMLInputElement;
            if (el.value !== "" !== isText) {
                setIsText(el.value !== "");
            }
        }
    }

    React.useEffect(() => {
        if (id && title) {
            setupEventListener(id, setIsHover);
        }
    }, []);

    return (
        <Row className={ "relative" }>
            { leading }
            <HoverTitle title={ title } isActive={ isFocused || isHover || isText }/>
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
                onInput={ setSetIsText }
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

    const [isFocused, setIsFocused] = React.useState(false);
    const [isHover, setIsHover] = React.useState(false);
    const [isText, setIsText] = React.useState(false);

    function setSetIsText() {
        if (id) {
            const el = document.getElementById(id) as HTMLTextAreaElement;
            if (el.value !== "" !== isText) {
                setIsText(el.value !== "");
            }
        }
    }

    React.useEffect(() => {
        if (id && title) {
            setupEventListener(id, setIsHover);
        }
    }, []);

    return ( // TODO expand textArea when typing
        <div className={ "relative" }>
            <HoverTitle title={ title } isActive={ isFocused || isHover || isText }/>
            <textarea id={ id }
                      className={ `pl-2 min-h-[3rem] default-bg focus:border-primaryPurple outline-none
                                   border-2 border-gray-500 hover:border-t-primary-purple ${ className }` }
                      name={ name }
                      placeholder={ placeholder }
                      required={ required }
                      onInput={ setSetIsText }
                      onFocus={ () => setIsFocused(true) }
                      onBlur={ () => setIsFocused(false) }
                      onChange={ onChange }/>
        </div>
    );
}

function HoverTitle({ title, isActive = false }: { title?: string, isActive?: boolean }): JSX.Element {
    return (
        <span className={ `absolute pointer-events-none
                 ${ isActive ? "-top-2 left-3 default-bg text-sm" : "left-2 top-1" } 
            transition-all duration-150 text-gray-600 dark:text-gray-400` }>
                <div className={ "z-50 relative" }>{ title }</div>
                <div className={ "w-full h-2 default-bg absolute bottom-1/3 z-10" }/>
        </span>
    );
}
