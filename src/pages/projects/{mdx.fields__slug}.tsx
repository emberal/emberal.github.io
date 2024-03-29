import * as React from "react";
import Layout from "../../components/layout";
import { graphql } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { TagsRow } from "../../components/tags";
import { splitCSV } from "../../utils/util";
import Seo from "../../components/seo";
import { A } from "../../components/link";

/**
 * A single post containing all the data from an mdx file
 * @param data A query containing all the data from a single post
 * @returns {JSX.Element}
 * @constructor
 */
const ProjectPost: Component<ProjectPostInterface> = (
    {
        data: {
            mdx: {
                frontmatter
            }
        },
        children
    }) => {

    const heroImageData: IGatsbyImageData | undefined = frontmatter?.hero_image?.childImageSharp?.gatsbyImageData;
    const heroImage = heroImageData ? getImage(heroImageData) : undefined;

    return (
        <Layout
            title={ frontmatter?.title ?? "Blogpost" }
            headline={ frontmatter?.title }
            description={ frontmatter?.description ? frontmatter.description : "A blogpost by Martin Berg Alstad" }>
            <article>
                <div className={ `max-h-[40rem] flex justify-center` }>
                    { heroImage && frontmatter?.hero_image_alt &&
                        <GatsbyImage imgStyle={ { objectFit: "contain" } }
                                     alt={ frontmatter.hero_image_alt } image={ heroImage } />
                    }
                </div>

                <div className={ "my-2" }>
                    <TagsRow tags={ splitCSV(frontmatter?.tags ?? "") } />
                </div>

                <p>{ frontmatter?.description }</p>
                <p>
                    Kildekoden på{ " " }
                    <A to={ frontmatter?.source ?? undefined }>GitHub</A>
                </p>
                <div>
                    <br />
                    { children }
                </div>
            </article>
        </Layout>
    );
};

export default ProjectPost;

export const Head: Component<ProjectPostInterface> = ({ data: { mdx } }) => (
    <Seo title={ mdx?.frontmatter?.title } description={ mdx?.frontmatter?.description } />
);

export const query = graphql`
    query ($id: String, $language: String!) {
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
        }
    }
`;
