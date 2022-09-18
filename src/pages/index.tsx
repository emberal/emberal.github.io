import * as React from "react"
import Layout, { Links } from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";
import { graphql, HeadProps } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import SEO from "../components/seo";

/**
 * The front page containing information about yours truly
 * @returns {JSX.Element}
 * @constructor
 */
export default function Homepage(): JSX.Element {

    const { t } = useTranslation();

    return (
        <Layout
            title={ t("home") }
            headline={ t("welcome") }
            description={ t("aboutMeDesc") }
            current={ Links.home }>
            <>
                <div className={ "w-full flex justify-center my-5" }>
                    <StaticImage className={ "max-w-sm border border-gray-500 rounded-3xl" } src={ "../images/me.jpg" }
                                 alt={ t("aboutMePicAlt") }/>
                </div>
                <p>
                    { t("aboutMeDesc") }
                </p>
            </>
        </Layout>
    );
}

export function Head({ data }: HeadProps<Queries.HomepageQuery>): JSX.Element {
    const locales = data.locales.edges[0]?.node?.data;
    let obj = undefined;
    if (locales) {
        obj = JSON.parse(locales);
    }
    return <SEO title={ obj?.home } description={ obj?.aboutMeDesc }/>;
}

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
