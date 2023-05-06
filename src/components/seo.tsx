import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

interface SeoProps extends TitleProps {
    description?: string | null,
    blockCrawlers?: boolean,
}

const Seo: Component<SeoProps> = (
    {
        title,
        description,
        blockCrawlers = false,
        children
    }) => {

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
            <meta lang={ query.site.siteMetadata.lang } />
            <meta name={ "description" } content={ description ?? query.site.siteMetadata.description } />
            { blockCrawlers && <meta name={ "robots" } content={ "noindex" } /> }
            <title>{ title && title + " | " } { query.site.siteMetadata.title }</title>
            { children }
        </>
    );
};

export default Seo;
