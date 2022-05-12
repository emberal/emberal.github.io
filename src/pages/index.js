import * as React from "react"
import Layout from "../components/Layout";
import {StaticImage} from "gatsby-plugin-image";

const pictureStyle = {
    maxWidth: "300px",
    border: "solid grey",
    borderRadius: "20px",
}
const picturePlacement = {
    width: "100%",
    display: "flex",
    justifyContent: "center"}

/**
 * The front page containing information about yours truly
 * @returns {JSX.Element}
 * @constructor
 */
const IndexPage = () => {
    return (
        <Layout
            title={"Hjem"}
            headline={"Velkommen!"}
            children={
                <div>
                    <div style={picturePlacement}>
                        <StaticImage style={pictureStyle} src={"../images/me.jpg"} alt={"Et bilde av meg på fjelltur"}/>
                    </div>
                    <p>
                        Hei, jeg heter Martin og studerer for tiden Informasjonsteknologi på Høgskulen på Vestlandet i
                        Bergen.
                    </p>
                </div>
            }/>
    )
}

export default IndexPage
