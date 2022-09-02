import * as React from "react";

interface Row {
    children: React.ReactNode,
    className?: string,
}

const Row = ({ children, className }: Row): JSX.Element => {
    return (
        <div className={ `flex flex-row items-center ${ className }` }>
            { children }
        </div>
    );
};

export default Row;
