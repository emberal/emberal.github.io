import * as React from "react";
import Layout from "../../components/layout";
import { graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import {GatsbyImage, getImage, IGatsbyImageData, ImageDataLike} from "gatsby-plugin-image";

/**
 * A single post containing all the data from an mdx file
 * @param data A query containing all the data from a single post
 * @returns {JSX.Element}
 * @constructor
 */
const ProjectPost = ({data: {mdx}}: PageProps<Queries.ProjectPostQuery>) => {

    let heroImage: IGatsbyImageData | undefined;
    if (mdx !== null) {
        heroImage = getImage(mdx.frontmatter?.hero_image?.childImageSharp?.gatsbyImageData as ImageDataLike);
    }

    return ( //TODO Change as keyword with proper type checking
        <>
            { mdx !== null ?
                <Layout
                    title={ mdx.frontmatter?.title as string }
                    headline={ mdx.frontmatter?.title }
                    description={ mdx.frontmatter?.description as string }>
                    <article>
                        { heroImage ? <GatsbyImage alt={ mdx.frontmatter?.hero_image_alt as string } image={ heroImage }/> : null }
                        <p>{ mdx?.frontmatter?.description }</p>
                        <p>
                            Kildekoden på{ " " }
                            <a className={ "text-primaryPurple dark:text-primaryPink hover:underline" }
                               href={ mdx.frontmatter?.source as string | undefined }
                               target={ "_blank" } rel={ "noreferrer" }>GitHub</a>
                        </p>
                        <div className={ "mt-2" }>
                            <MDXRenderer>{ mdx.body }</MDXRenderer>
                        </div>
                    </article>
                </Layout> : <span>Oops! mdx seems to be 'null'</span>
            }
        </>
    );
}

export default ProjectPost;

export const query = graphql `
    query ProjectPost($id: String, $language: String!) {
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
