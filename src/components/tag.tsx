import * as React from "react";

interface Tag {
    name?: string,
    value?: number,
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
}

const Tag = ({ name, value, className, onClick }: Tag) => {
    return (
        <button
            className={ `${ onClick !== undefined ? "cursor-pointer" : "cursor-auto" } ${ className } border rounded-xl
             border-gray-500` }
            onClick={ onClick }>
            <span className={ "mx-2 w-max" }>{ name + (value !== undefined ? `(${ value })` : "") }</span>
        </button>
    )
}

export default Tag;
