import * as React from "react";
import type { ChildProps, Component } from "../declarations/props";

const Row: Component<ChildProps> = ({ children, className, id }) => (
    <div className={ `flex-row-center ${ className }` } id={ id }>
        { children }
    </div>
);

export default Row;
