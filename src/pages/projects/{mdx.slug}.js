import * as React from "react";
import Layout from "../../components/Layout";
import {graphql} from "gatsby";
import {MDXRenderer} from "gatsby-plugin-mdx";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import {linkStyle} from "../../stylesheets/text.module.css";

const ProjectPost = ({data}) => {
    return (
        <Layout
            title={data.mdx.frontmatter.title}
            headline={data.mdx.frontmatter.title}
            children={
                <>
                    <GatsbyImage
                        alt={data.mdx.frontmatter.hero_image_alt}
                        image={getImage(data.mdx.frontmatter.hero_image.childImageSharp.gatsbyImageData)}/>
                    <p>{data.mdx.frontmatter.description}</p>
                    <p>Kildekoden på <a className={linkStyle} href={data.mdx.frontmatter.source}>GitHub</a></p>
                    <MDXRenderer children={data.mdx.body}/>
                </>
            }
        />
    )
}

export const query = graphql `
query($id: String) {
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
