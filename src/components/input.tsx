import * as React from "react";

interface Input {
    className?: string,
    id?: string,
    name?: string,
    type?: string,
    title?: string,
    placeholder?: string,
    required?: boolean,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    leading?: React.ReactElement<HTMLElement>,
    trailing?: React.ReactElement<HTMLElement>,
}

const Input = ({ className, id, name, type, title, placeholder, required, onChange, leading, trailing }: Input) => {

    const [isFocused, setIsFocused] = React.useState(false);
    const [isHover, setIsHover] = React.useState(false);
    const [isText, setIsText] = React.useState(false);

    function setSetIsText() {
        if (id) {
            const el = document.getElementById(id) as HTMLInputElement;
            setIsText(el.value !== "");
        }
    }

    React.useEffect(() => {

        let isMounted = true;

        function hover(hover: boolean) {
            if (isMounted) {
                setIsHover(hover);
            }
        }

        if (id && title) {
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
            }
            isMounted = false;
        }
    }, []);

    return (
        <div className={ "flex flex-row items-center relative" }>
            { leading }
            <HoverTitle title={ title } isActive={ isFocused || isHover || isText }/>
            <input
                className={ `dark:bg-gray-900 focus:border-primaryPurple outline-none border-2 border-gray-500 pl-2 ${ className }` }
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
        </div>
    );
}

export default Input;

interface TextArea {
    className?: string,
    id?: string,
    name?: string,
    title?: string,
    placeholder?: string,
    required?: boolean,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
}

export const TextArea = ({ className, id, name, title, placeholder, required = false, onChange }: TextArea) => {

    const [isFocused, setIsFocused] = React.useState(false);
    const [isHover, setIsHover] = React.useState(false);
    const [isText, setIsText] = React.useState(false);

    function setSetIsText() {
        if (id) {
            const el = document.getElementById(id) as HTMLTextAreaElement;
            setIsText(el.value !== "");
        }
    }

    React.useEffect(() => {

        let isMounted = true;

        function hover(hover: boolean) {
            if (isMounted) {
                setIsHover(hover);
            }
        }

        if (id && title) {
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
    }, []);

    return ( // TODO expand textArea when typing
        <div className={ "relative" }>
            <HoverTitle title={ title } isActive={ isFocused || isHover || isText }/>
            <textarea id={ id }
                      className={ `pl-2 min-h-[3rem] dark:bg-gray-900 focus:border-primaryPurple outline-none
                                   border-2 border-gray-500 ${ className }` }
                      name={ name }
                      placeholder={ placeholder }
                      required={ required }
                      onInput={ setSetIsText }
                      onFocus={ () => setIsFocused(true) }
                      onBlur={ () => setIsFocused(false) }
                      onChange={ onChange }/>
        </div>
    );
};

interface HoverTitle {
    title?: string,
    isActive?: boolean,
}

const HoverTitle = ({ title, isActive = false }: HoverTitle) => {
    return (
        <span className={ `absolute pointer-events-none
                 ${ isActive ? "-top-2 left-3 bg-white dark:bg-gray-900 text-sm" : "left-2 top-1" } 
            transition-all duration-150 text-gray-600 dark:text-gray-400` }>
                <div className={ "z-50 relative" }>{ title }</div>
                <div className={ "w-full h-2 bg-white dark:bg-gray-900 absolute bottom-1/3 z-10" }/>
            </span>
    );
}
