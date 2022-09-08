import * as React from "react";
import { Link } from "gatsby";

interface A {
    to?: string,
    children?: React.ReactNode,
    newTab?: boolean,
    className?: string,
    id?: string,
}

export const A = ({ to, children, newTab = true, className, id }: A) => {
    return (
        <a className={ `default-link ${ className }` } id={ id }
           href={ to }
           target={ newTab ? "_blank" : undefined }
           rel={ newTab ? "noopener" : undefined }>
            { children }
        </a>
    );
};

interface MyLink {
    to: string,
    children?: React.ReactNode,
    className?: string,
    id?: string,
}

export const MyLink = ({ to, children, className, id }: MyLink) => {
    return (
        <Link to={ to } id={ id }
              className={ `default-link ${ className }` }>
            { children }
        </Link>
    );
};
