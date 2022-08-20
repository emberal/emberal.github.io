import * as React from "react";
import Layout from "../components/layout";
import { graphql, HeadProps, Link } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import SEO from "../components/seo";

/**
 * The page that is shown when a page does not exist
 * @returns {JSX.Element}
 * @constructor
 */
const NotFoundPage = (): JSX.Element => {

    const { t } = useTranslation();

    return (
        <Layout title={ t("pageNotFound") } description={ "Error 404. Page not found!" }>
            <p> { t("sorry") + " " } <span role="img" aria-label="Pensive emoji">😔</span>
                { " " + t("pageWasNotFound") }
                <br/><br/>
                <Link className={ "dark:text-primaryPink text-primaryPurple hover:underline" }
                      to="/">{ t("home") }</Link>.
            </p>
        </Layout>
    );
}

export const Head = ({ data }: HeadProps<Queries.NotFoundPageQuery>): JSX.Element => {
    const locales = data.locales.edges[0].node.data;
    let obj = undefined;
    if (locales) {
        obj = JSON.parse(locales);
    }
    return <SEO title={ obj?.pageNotFound } blockCrawlers={ true }/>;
};

export const query = graphql`
    query NotFoundPage($language: String!) {
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
