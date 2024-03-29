import * as React from "react";
import Layout from "../components/layout";
import { graphql, type HeadProps } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Seo from "../components/seo";
import { MyLink } from "../components/link";

/**
 * The page that is shown when a page does not exist
 * @returns {JSX.Element}
 * @constructor
 */
const NotFoundPage: Component = () => {

    const { t } = useTranslation();

    return (
        <Layout title={ t("pageNotFound") ?? undefined } description={ "Error 404. Page not found!" }>
            <p> { t("sorry") + " " } <span role="img" aria-label="Pensive emoji">😔</span>
                { " " + t("pageWasNotFound") }
                <br /><br />
                <MyLink to="/">{ t("home") }</MyLink>.
            </p>
        </Layout>
    );
};

export default NotFoundPage;

export const Head: Component<HeadProps<Queries.NotFoundPageQuery>> = ({ data }) => {
    const locales = data?.locales?.edges[0]?.node?.data;
    let obj = undefined;
    if (locales) {
        obj = JSON.parse(locales);
    }
    return <Seo title={ obj?.pageNotFound ?? "404: Page not found" } blockCrawlers={ true } />;
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
