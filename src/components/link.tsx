import * as React from "react";
import { Link } from "gatsby";
import type { LinkComponent } from "../interfaces/interfaces";

interface A extends LinkComponent {
    newTab?: boolean,
    rel?: string,
}

export function A({ to, title, children, newTab = true, rel, className, id }: A): JSX.Element {
    return (
        <a className={ `default-link ${ className }` } id={ id }
           title={ title ?? undefined }
           href={ to }
           target={ newTab ? "_blank" : undefined }
           rel={ newTab ? `noopener ${ rel }` : undefined }>
            { children }
        </a>
    );
}

export function MyLink({ to, title, children, className, id }: LinkComponent): JSX.Element {
    return (
        <Link to={ to ?? "/" } id={ id }
              title={ title ?? undefined }
              className={ `default-link ${ className }` }>
            { children }
        </Link>
    );
}
