import * as React from "react";
import Layout, { Links } from "../../components/layout";
import { graphql, Link, PageProps } from "gatsby";
import { GitHub } from "react-feather";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { useTranslation } from "gatsby-plugin-react-i18next";

/**
 * Contains cards of all projects with some information, and links to the posts
 * @param data A query containing data from the posts
 * @returns {JSX.Element}
 * @constructor
 */
const Index = ({ data: { allMdx } }: PageProps<Queries.AboutMePageQuery>) => {

    const { t } = useTranslation();
    let image: IGatsbyImageData | undefined;

    return (
        <Layout
            title={ t("projects") }
            headline={ t("myProjects") }
            description={ t("projectsByMe") }
            current={ Links.projects }>
            <div className={ "pb-20" }>
                {
                    allMdx.nodes.map((node: any) => (
                        <article className={ "border-2 rounded-xl mb-10" } key={ node.id }>
                            <div className={ "flex items-center my-3" }>
                                <Link className={ "text-primaryPurple dark:text-primaryPink hover:underline" }
                                      to={ node.slug }>
                                    <h2 className={ "mx-2 text-xl" }>{ node.frontmatter?.title }</h2>
                                </Link>
                                <a title={ t("openInGitHub") } href={ node.frontmatter?.source }
                                   target={ "_blank" } rel={ "noreferrer" }><GitHub/>
                                </a>
                            </div>
                            <div className={ "grid grid-flow-col justify-between mx-2 mb-2" }>
                                <p>
                                    { t("timeToRead") } { node.timeToRead } { (node.timeToRead === 1) ?
                                    t("minute") : t("minutes") }
                                </p>
                                <p>Type: { node.frontmatter?.type }</p>
                            </div>
                            { (() => { // Used to initiate the variable image in order to null check it
                                image = getImage(node.frontmatter?.hero_image.childImageSharp.gatsbyImageData)
                                return true;
                            })() }
                            { image ? <GatsbyImage alt={ node.frontmatter?.hero_image_alt } image={ image }/> : null }
                            <div className={ "mx-2 my-4" }>
                                <p>{ node.frontmatter?.description }</p>
                            </div>
                        </article>
                    ))
                }
            </div>
        </Layout>
    );
}

export const query = graphql`
    query AboutMePage ($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
        allMdx(sort: {fields: frontmatter___uploaded, order: DESC}) {
            nodes {
                frontmatter {
                    title
                    description
                    type
                    source
                    hero_image_alt
                    hero_image {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                    uploaded
                }
                id
                slug
                timeToRead
            }
        }
    }
`;

export default Index;
