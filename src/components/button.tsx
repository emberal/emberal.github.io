import * as React from "react";
import { ArrowUp } from "react-feather";

export const BackUpButton: Component<ButtonProps> = (
    {
        onClick,
        hoverTitle,
        id,
        className
    }) => (
    <button id={ id }
            className={ `fixed right-10 bottom-20 button h-9 z-50 ${ className }` }
            title={ hoverTitle ?? undefined } onClick={ onClick }>
        <ArrowUp />
        <p className={ "sr-only" }>{ hoverTitle }</p>
    </button>
);
