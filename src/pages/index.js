import * as React from "react"
import Layout from "../components/Layout";
import {StaticImage} from "gatsby-plugin-image";
import {graphql} from "gatsby";
import {useTranslation} from "gatsby-plugin-react-i18next";

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

    const {t} = useTranslation();

    return (
        <Layout
            title={t("home")}
            headline={t("welcome")}
            children={
                <div>
                    <div style={picturePlacement}>
                        <StaticImage style={pictureStyle} src={"../images/me.jpg"} alt={t("aboutMePicAlt")}/>
                    </div>
                    <p>
                        {t("aboutMeDesc")}
                    </p>
                </div>
            }/>
    )
}

export const query = graphql`
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
    }
`;

export default IndexPage
