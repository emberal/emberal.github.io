import * as React from "react";

interface Row {
    children: React.ReactNode,
    className?: string,
    id?: string,
}

export default function Row({ children, className, id }: Row): JSX.Element {
    return (
        <div className={ `flex-row-center ${ className }` } id={ id }>
            { children }
        </div>
    );
}
