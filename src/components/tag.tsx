import * as React from "react";

interface Tag {
    name?: string,
    value?: number,
    hoverTitle?: string,
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    id?: string,
}

const Tag = ({ name, value, hoverTitle, className, onClick, id }: Tag) => {

    return (
        <button title={ hoverTitle } id={ id }
                className={ `${ onClick !== undefined ? "cursor-pointer" : "cursor-auto" } ${ className } border rounded-xl
             border-gray-500` }
                onClick={ onClick }>
            <span className={ "mx-2 w-max" }>{ name + (value !== undefined ? `(${ value })` : "") }</span>
        </button>
    )
}

export default Tag;
