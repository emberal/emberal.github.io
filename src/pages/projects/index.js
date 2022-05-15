import * as React from "react";
import Layout from "../../components/Layout";
import {graphql, Link} from "gatsby";
import {GitHub} from "react-feather";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import {githubIcon} from "../../stylesheets/media.module.css";
import {linkStyle} from "../../stylesheets/text.module.css";
import {useTranslation} from "gatsby-plugin-react-i18next";

const projectCard = {
    border: "solid grey",
    borderRadius: "10px",
    marginBottom: "25px",
}
const marginLeftSide = {
    marginLeft: "5px",
    width: "fit-content",
}
const projectTitle = {
    display: "flex",
    alignItems: "center",
    maxHeight: "60px"
}
const projectData = {
    display: "grid",
    gridColumn: "auto auto",
    gridAutoFlow: "column",
    justifyContent: "space-between",
}

/**
 * Contains cards of all projects with some information, and links to the posts
 * @param data A query containing data from the posts
 * @returns {JSX.Element}
 * @constructor
 */
const Index = ({data}) => {

    const {t} = useTranslation();

    return (
        <Layout
            title={t("projects")}
            headline={t("myProjects")}
            children={
                <div style={{paddingBottom: "120px"}}>
                    {
                        data.allMdx.nodes.map(node => (
                            <article style={projectCard} key={node.id}>
                                <div style={projectTitle}>
                                    <Link className={linkStyle} to={node.slug}>
                                        <h2 style={marginLeftSide}>{node.frontmatter.title}</h2>
                                    </Link>
                                    <a title={t("openInGitHub")} className={githubIcon} href={node.frontmatter.source}
                                       target={"_blank"} rel={"noreferrer"}><GitHub/>
                                    </a>
                                </div>
                                <div style={projectData}>
                                    <p style={marginLeftSide}>
                                        {t("timeToRead")}{node.timeToRead} {(node.timeToRead === 1) ? t("minute") : t("minutes")}
                                    </p>
                                    <p style={{marginRight: "5px"}}>Type: {node.frontmatter.type}</p>
                                </div>
                                <GatsbyImage
                                    alt={node.frontmatter.hero_image_alt}
                                    image={getImage(node.frontmatter.hero_image.childImageSharp.gatsbyImageData)}/>
                                <div style={marginLeftSide}>
                                    <p>{node.frontmatter.description}</p>
                                </div>
                            </article>
                        ))
                    }
                </div>
            }/>
    );
}

export const query = graphql `
    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
        allMdx {
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
                }
                id
                slug
                timeToRead
            }
        }
    }
`

export default Index
