import * as React from "react";
import { Link } from "gatsby";

interface A {
    to?: string,
    title?: string,
    children?: React.ReactNode,
    newTab?: boolean,
    className?: string,
    id?: string,
}

export const A = ({ to, title, children, newTab = true, className, id }: A) => {
    return (
        <a className={ `default-link ${ className }` } id={ id }
           title={ title }
           href={ to }
           target={ newTab ? "_blank" : undefined }
           rel={ newTab ? "noopener" : undefined }>
            { children }
        </a>
    );
};

interface MyLink {
    to: string,
    title?: string,
    children?: React.ReactNode,
    className?: string,
    id?: string,
}

export const MyLink = ({ to, title, children, className, id }: MyLink) => {
    return (
        <Link to={ to } id={ id }
              title={ title }
              className={ `default-link ${ className }` }>
            { children }
        </Link>
    );
};
