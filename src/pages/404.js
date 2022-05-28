import * as React from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import { useTranslation } from "gatsby-plugin-react-i18next";

/**
 * The page that is shown when a page does not exist
 * @returns {JSX.Element}
 * @constructor
 */
const NotFoundPage = () => {

    const {t} = useTranslation();

    return (
        <Layout title={t("pageNotFound")} children={
            <>
                <Helmet>
                    <meta name="robots" content="noindex"/>
                </Helmet>
                <p> {t("sorry") + " "} <span role="img" aria-label="Pensive emoji">😔</span>
                    {" " + t("pageWasNotFound")}
                    <br/><br/>
                    <Link className={"dark:text-primaryPink text-primaryPurple hover:underline"} to="/">{t("home")}</Link>.
                </p>
            </>
        }/>
    );
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

export default NotFoundPage
