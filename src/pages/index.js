import * as React from "react"
import Layout from "../components/Layout";

const IndexPage = () => {
    return (
        <Layout
            title={"Hjem"}
            headline={"Velkommen!"}
            children={
                <div>
                    <p>Hei, jeg heter Martin og studerer for tiden Informasjonsteknologi på Høgskulen på Vestlandet i
                        Bergen.</p>
                </div>
            }/>
    )
}

export default IndexPage
