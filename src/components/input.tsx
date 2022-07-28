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
    const [isText, setIsText] = React.useState(false);

    function setSetIsText() {
        if (id) {
            const el = document.getElementById(id) as HTMLInputElement;
            setIsText(el.value !== "");
        }
    }

    React.useEffect(() => {
        setSetIsText();
    }, [onChange])

    return ( // TODO also move text when hovering
        <div className={ "flex flex-row items-center relative" }>
            { leading }
            <span
                className={ `absolute cursor-text
                 ${ isFocused || isText ? "-top-2 left-3 bg-white dark:bg-gray-900 text-sm" : "left-2 top-1" } 
            transition-all duration-150 text-gray-600 dark:text-gray-400` }>
                <div className={ "z-50 relative" }>{ title }</div>
                <div className={ "w-full h-2 bg-white dark:bg-gray-900 absolute bottom-1/3 z-10" }/>
            </span>
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
