import * as React from "react";
import type { ChildComponent } from "../interfaces/interfaces";

export default function Row({ children, className, id }: ChildComponent): JSX.Element {
    return (
        <div className={ `flex-row-center ${ className }` } id={ id }>
            { children }
        </div>
    );
}
