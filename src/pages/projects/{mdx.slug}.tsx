import * as React from "react";
import Layout from "../../components/layout";
import { graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

/**
 * A single post containing all the data from an mdx file
 * @param data A query containing all the data from a single post
 * @returns {JSX.Element}
 * @constructor
 */
const ProjectPost = ({data: {mdx}}: PageProps<Queries.Project>) => {
    return (
        <Layout
            title={ mdx?.frontmatter?.title }
            headline={ mdx?.frontmatter?.title }
            description={ mdx?.frontmatter?.description }>
            <article>
                <GatsbyImage
                    alt={ mdx?.frontmatter?.hero_image_alt }
                    image={ getImage(mdx?.frontmatter?.hero_image?.childImageSharp?.gatsbyImageData) }/>
                <p>{ mdx?.frontmatter?.description }</p>
                <p>
                    Kildekoden på{ " " }
                    <a className={ "text-primaryPurple dark:text-primaryPink hover:underline" }
                       href={ mdx?.frontmatter?.source } target={ "_blank" } rel={ "noreferrer" }>GitHub</a>
                </p>
                <div className={ "mt-2" }>
                    <MDXRenderer>{ mdx?.body }</MDXRenderer>
                </div>
            </article>
        </Layout>
    );
}

export default ProjectPost;

export const query = graphql `
    query Project($id: String, $language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
        mdx(id: {eq: $id}) {
            frontmatter {
                hero_image {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                title
                description
                source
                hero_image_alt
            }
            timeToRead
            body
        }
    }
`;
