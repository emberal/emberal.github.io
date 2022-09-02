import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

interface SEO {
    title?: string,
    description?: string,
    blockCrawlers?: boolean,
    children?: React.ReactNode,
}

const SEO = ({ title, description, blockCrawlers = false, children }: SEO) => {

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

    return ( //TODO move to gatsby-ssr.jsx as HTML
        <>
            <meta lang={ query.site.siteMetadata.lang }/>
            <meta name={ "description" } content={ description ?? query.site.siteMetadata.description}/>
            { blockCrawlers && <meta name={ "robots" } content={ "noindex" }/> }
            <title>{ title && title + " | " } { query.site.siteMetadata.title }</title>
            { children }
        </>
    );
}

export default SEO;
