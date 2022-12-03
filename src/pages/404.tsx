import * as React from "react";
import Layout from "../components/layout";
import { graphql, HeadProps } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import SEO from "../components/seo";
import { MyLink } from "../components/link";

/**
 * The page that is shown when a page does not exist
 * @returns {JSX.Element}
 * @constructor
 */
export default function NotFoundPage(): JSX.Element {

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
}

export function Head({ data }: HeadProps<Queries.NotFoundPageQuery>): JSX.Element {
    const locales = data?.locales?.edges[0]?.node?.data;
    let obj = undefined;
    if (locales) {
        obj = JSON.parse(locales);
    }
    return <SEO title={ obj?.pageNotFound ?? "404: Page not found" } blockCrawlers={ true } />;
}

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
