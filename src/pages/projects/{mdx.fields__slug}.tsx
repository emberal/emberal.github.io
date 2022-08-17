import * as React from "react";
import Layout, { Links } from "../../components/layout";
import { graphql, PageProps } from "gatsby";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import { TagsRow } from "../../components/tags";
import { splitCSV } from "./index";

/**
 * A single post containing all the data from an mdx file
 * @param data A query containing all the data from a single post
 * @returns {JSX.Element}
 * @constructor
 */
const ProjectPost = ({ data: { mdx }, children }: any/*PageProps<Queries.ProjectPostQuery>*/) => { // FIXME

    if (mdx) {

        const heroImageData = mdx.frontmatter?.hero_image?.childImageSharp?.gatsbyImageData;
        const heroImage = typeof heroImageData !== 'undefined' ? getImage(heroImageData as ImageDataLike) : undefined;
        const heroImageAlt = mdx.frontmatter?.hero_image_alt;
        const title = mdx.frontmatter?.title;
        const description = mdx.frontmatter?.description;
        const source = mdx.frontmatter?.source;
        const tags = mdx.frontmatter?.tags;

        return (
            <>
                <Layout
                    title={ typeof title === 'string' ? title : "Blogpost" }
                    headline={ title ?? undefined }
                    description={ typeof description === 'string' ? description : "A blogpost by Martin Berg Alstad" }
                    current={ Links.projects }>
                    <article>
                        <div className={ `max-h-[40rem] flex justify-center` }>
                            {
                                heroImage && heroImageAlt ?
                                    <GatsbyImage className={ `${ heroImage.height > heroImage.width * 2 && "w-72" }` }
                                                 alt={ heroImageAlt } image={ heroImage }/> : null
                            }
                        </div>
                        <div className={ "my-2" }>
                            <TagsRow tags={ splitCSV(tags ?? "") }/>
                        </div>

                        <p>{ description }</p>
                        <p>
                            Kildekoden på{ " " }
                            <a className={ "text-primaryPurple dark:text-primaryPink hover:underline" }
                               href={ source !== null ? source : undefined }
                               target={ "_blank" } rel={ "noreferrer" }>GitHub</a>
                        </p>
                        <div className={ "mt-2" }>
                            { children }
                        </div>
                    </article>
                </Layout>
            </>
        );
    }
    else {
        return null;
    }
}

export const query = graphql`
    query ($id: String, $language: String!) { # query ProjectPost($id: String, $language: String!) { # FIXME can't use name?
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
                uploaded
                tags
            }
            fields {
                timeToRead {
                    minutes
                }
            }
        }
    }
`;

export default ProjectPost;
