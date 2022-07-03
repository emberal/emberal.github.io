import * as React from "react"
import Layout, { Links } from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

/**
 * The front page containing information about yours truly
 * @returns {JSX.Element}
 * @constructor
 */
const IndexPage = () => {

    const { t } = useTranslation();

    return (
        <Layout
            title={ t("home") }
            headline={ t("welcome") }
            description={ t("aboutMeDesc") }
            current={ Links.home }>
            <div>
                <div className={ "w-full flex justify-center my-5" }>
                    <StaticImage className={ "max-w-sm border rounded-3xl" } src={ "../images/me.jpg" }
                                 alt={ t("aboutMePicAlt") }/>
                </div>
                <p>
                    { t("aboutMeDesc") }
                </p>
            </div>
        </Layout>
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

export default IndexPage;
