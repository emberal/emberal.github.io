import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { TitleComponent } from "../interfaces/interfaces";

interface SEO extends TitleComponent {
    description?: string,
    blockCrawlers?: boolean,
}

export default function SEO({ title, description, blockCrawlers = false, children }: SEO): JSX.Element {

    const query = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    lang
                    title
                    description
                }
            }
        }
    `);

    return ( //TODO use HTML tag in gatsby-ssr.jsx
        <>
            <meta lang={ query.site.siteMetadata.lang }/>
            <meta name={ "description" } content={ description ?? query.site.siteMetadata.description }/>
            { blockCrawlers && <meta name={ "robots" } content={ "noindex" }/> }
            <title>{ title && title + " | " } { query.site.siteMetadata.title }</title>
            { children }
        </>
    );
}
