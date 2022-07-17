import * as React from "react";

interface Input {
    className?: string,
    id?: string,
    name?: string,
    type?: string,
    placeholder?: string,
    required?: boolean,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
}

const Input = ({ className, id, name, type, placeholder, required, onChange }: Input) => {
    return (
        <input className={ `dark:bg-gray-900 focus:border-primaryPurple outline-none border-2 border-gray-500 ${ className }` }
               id={ id }
               name={ name }
               type={ type }
               placeholder={ placeholder }
               required={ required }
               onChange={ onChange }/>
    );
}

export default Input;
