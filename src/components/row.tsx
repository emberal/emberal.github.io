import * as React from "react";

const Row: Component<ChildProps> = ({ children, className, id }) => (
    <div className={ `flex-row-center ${ className }` } id={ id }>
        { children }
    </div>
);

export default Row;
