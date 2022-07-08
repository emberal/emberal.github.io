import * as React from "react";

interface Tag {
    name?: string,
    value?: number,
    hoverTitle?: string,
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    id?: string,
}

/**
 * A tag containing a short string and a number of occurrences
 * @param name The string name that will be visible on the tag
 * @param value The number of occurrences of the tag
 * @param hoverTitle The string that will be shown when hovering above the tag
 * @param className Styling of the root element
 * @param onClick The function that will be called upon clicking the tag. If 'undefined' the cursor will appear normal
 * @param id A unique id for the tag
 * @constructor
 */
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
