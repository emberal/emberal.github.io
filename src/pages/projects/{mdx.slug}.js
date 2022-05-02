import * as React from "react";
import Layout from "../../layouts/Layout";
import {graphql} from "gatsby";

const ProjectPost = () => {
    return(
        <Layout
            title={""}
            headline={""}
            children={
                <div>
                    Post
                </div>
            }
        />
    )
}

const query = graphql `

`

export default ProjectPost
