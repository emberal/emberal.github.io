import * as React from "react";
import Layout from "../../components/Layout";
import {graphql, Link} from "gatsby";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import {MDXRenderer} from "gatsby-plugin-mdx";
import {linkStyle} from "../../stylesheets/text.module.css"

const projectCard = {
    border: "solid grey",
    borderRadius: "10px",
    marginBottom: "25px",
}
const marginLeftSide = {
    marginLeft: "5px",
}

const Index = ({data}) => {
    return (
        <Layout
            title={"Prosjekter"}
            headline={"Mine prosjekter"}
            children={
                <div style={{paddingBottom: "50px"}}>
                    {
                        data.allMdx.nodes.map(node => (
                            <div style={projectCard} key={node.id}>
                                <Link className={linkStyle} to={node.slug}>
                                    <h2 style={marginLeftSide}>{node.frontmatter.title}</h2>
                                </Link>
                                <p style={marginLeftSide}>Tid å lese: {node.timeToRead} minutt</p>
                                <GatsbyImage
                                    alt={node.frontmatter.hero_image_alt}
                                    image={getImage(node.frontmatter.hero_image.childImageSharp.gatsbyImageData)}/>
                                <div style={marginLeftSide}>
                                    <p>{node.frontmatter.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }/>
    )
}

export const query = graphql `
query {
  allMdx {
    nodes {
      frontmatter {
        title
        description
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
