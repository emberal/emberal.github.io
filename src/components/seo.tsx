import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

interface SEO {
    title?: string,
    description?: string,
    children?: React.ReactNode,
}

const SEO = ({ title, description, children }: SEO) => { // TODO use new Head in gatsby 4.19

    const query = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    lang
                    title
                }
            }
        }
    `);

    return (
        <>
            <meta lang={ query.site.siteMetadata.lang }/>
            <meta name={ "description" } content={ description }/>
            <title>{ title && title + " | " } { query.site.siteMetadata.title }</title>
            { children }
        </>
    );
}

export default SEO;
