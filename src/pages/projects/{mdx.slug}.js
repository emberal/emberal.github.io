import * as React from "react";
import Layout from "../../components/Layout";
import {graphql} from "gatsby";
import {MDXRenderer} from "gatsby-plugin-mdx";
import {GatsbyImage, getImage} from "gatsby-plugin-image";

const ProjectPost = ({data}) => {
    return(
        <Layout
            title={data.mdx.frontmatter.title}
            headline={data.mdx.frontmatter.title}
            children={
                <div>
                    <GatsbyImage
                        alt={data.mdx.frontmatter.hero_image_alt}
                        image={getImage(data.mdx.frontmatter.hero_image.childImageSharp.gatsbyImageData)}/>
                    <p>{data.mdx.frontmatter.description}</p>
                    <MDXRenderer children={data.mdx.body}/>
                </div>
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
      hero_image_alt
    }
    timeToRead
    body
  }
}
`

export default ProjectPost
