import * as React from "react";
import { Link } from "gatsby";

export const A: Component<LinkProps> = (
    {
        to,
        title,
        children,
        newTab = true,
        rel,
        className,
        id
    }) => (
    <a className={ `default-link ${ className }` } id={ id }
       title={ title ?? undefined }
       href={ to }
       target={ newTab ? "_blank" : undefined }
       rel={ newTab ? `noopener ${ rel }` : undefined }>
        { children }
    </a>
);

export const MyLink: Component<LinkProps> = (
    {
        to,
        title,
        children,
        className,
        id
    }) => (
    <Link to={ to ?? "/" } id={ id }
          title={ title ?? undefined }
          className={ `default-link ${ className }` }>
        { children }
    </Link>
);
