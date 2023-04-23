import * as React from "react"
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";
import { graphql, type HeadProps } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Seo from "../components/seo";
import type { Component } from "../declarations/props";

/**
 * The front page containing information about yours truly
 * @returns {JSX.Element}
 * @constructor
 */
const Homepage: Component = () => {

    const { t } = useTranslation();

    return (
        <Layout
            title={ t("home") }
            headline={ t("welcome") }
            description={ t("aboutMeDesc") }>
            <>
                <a rel={ "me" } href={ "https://snabelen.no/@Martials" } className={ "sr-only" } />
                <div className={ "w-full flex justify-center my-5" }>
                    <StaticImage className={ "max-w-sm border border-gray-500 rounded-3xl" } src={ "../images/me.jpg" }
                                 alt={ t("aboutMePicAlt") } />
                </div>
                <p>{ t("aboutMeDesc") }</p>
            </>
        </Layout>
    );
};

export default Homepage;

export const Head: Component<HeadProps<Queries.HomepageQuery>> = ({ data }) => {
    const locales = data?.locales?.edges[0]?.node?.data;
    let obj;
    if (locales) {
        obj = JSON.parse(locales);
    }
    return <Seo title={ obj?.home } description={ obj?.aboutMeDesc } />;
};

export const query = graphql`
    query Homepage($language: String!) {
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
