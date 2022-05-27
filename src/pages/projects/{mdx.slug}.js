import * as React from "react";
import Layout from "../../components/layout";
import {graphql} from "gatsby";
import {MDXRenderer} from "gatsby-plugin-mdx";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import {linkStyle} from "../../stylesheets/text.module.css";

/**
 * A single post containing all the data from an mdx file
 * @param data A query containing all the data from a single post
 * @returns {JSX.Element}
 * @constructor
 */
const ProjectPost = ({data}) => { //TODO Tailwind
    return (
        <Layout
            title={data.mdx.frontmatter.title}
            headline={data.mdx.frontmatter.title}
            children={
                <article>
                    <GatsbyImage
                        alt={data.mdx.frontmatter.hero_image_alt}
                        image={getImage(data.mdx.frontmatter.hero_image.childImageSharp.gatsbyImageData)}/>
                    <p>{data.mdx.frontmatter.description}</p>
                    <p>
                        Kildekoden på{" "}
                        <a className={linkStyle} href={data.mdx.frontmatter.source} target={"_blank"} rel={"noreferrer"}>GitHub</a>
                    </p>
                    <MDXRenderer children={data.mdx.body}/>
                </article>
            }
        />
    );
}

export const query = graphql `
    query($id: String, $language: String!) {
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
`

export default ProjectPost
