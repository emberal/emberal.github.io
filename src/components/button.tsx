import * as React from "react";
import { ArrowUp } from "react-feather";
import { ButtonComponent } from "../interfaces/interfaces";

export function BackUpButton({ onClick, hoverTitle, id, className }: ButtonComponent<HTMLButtonElement>) {
    return (
        <button id={ id }
                className={ `fixed right-10 bottom-20 button h-9 z-50 ${ className }` }
                title={ hoverTitle ?? undefined } onClick={ onClick }>
            <ArrowUp/>
            <p className={ "sr-only" }>{ hoverTitle }</p>
        </button>
    );
}
