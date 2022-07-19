import * as React from "react";

interface Input {
    className?: string,
    id?: string,
    name?: string,
    type?: string,
    placeholder?: string,
    required?: boolean,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    leading?: React.ReactElement<HTMLElement>,
    trailing?: React.ReactElement<HTMLElement>,
}

const Input = ({ className, id, name, type, placeholder, required, onChange, leading, trailing }: Input) => {
    return ( // TODO add leading and trailing components and make there's no overlap
        <div>
            { leading }
            <input
                className={ `dark:bg-gray-900 focus:border-primaryPurple outline-none border-2 border-gray-500 ${ className }` }
                id={ id }
                name={ name }
                type={ type }
                placeholder={ placeholder }
                required={ required }
                onChange={ onChange }/>
            { trailing }
        </div>

    );
}

export default Input;
