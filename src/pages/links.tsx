import * as React from "react";
import Layout, { Links } from "../components/layout";
import { graphql, HeadProps } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { GitHub, MessageSquare, Linkedin, Instagram, Link as LinkIcon } from "react-feather";
import SEO from "../components/seo";

interface LinksPage {

}

const linkContent = [
    {
        key: 0,
        icon: <GitHub/>,
        text: "GitHub",
        url: "https://github.com/h600878"
    },
    {
        key: 1,
        text: "Mastodon (snabelen.no)",
        url: "https://snabelen.no/@Martials"
    },
    {
        key: 2,
        icon: <MessageSquare/>,
        text: "Matrix",
        url: "https://matrix.to/#/@martials:matrix.org"
    },
    {
        key: 3,
        icon: <Linkedin/>,
        text: "LinkedIn",
        url: "https://www.linkedin.com/in/martin-b-2a69391a3/"
    },
    {
        key: 4,
        icon: <Instagram/>,
        text: "Instagram",
        url: "https://www.instagram.com/martinalstad/",
    },
    {
        key: 5,
        text: "Pixelfed (Pixelfed.social)",
        url: "https://pixelfed.social/i/web/profile/261454857934868480",
    },
];

/**
 * A page containing cards of several social links
 * @returns {JSX.Element}
 * @constructor
 */
const LinksPage = ({}: LinksPage): JSX.Element => {

    const { t } = useTranslation();

    return (
        <Layout
            title={ t("links") }
            headline={ t("myLinks") }
            description={ t("linksDescription") }
            current={ Links.links }>
            <div className={ "pt-5" }>
                {
                    linkContent.map(link => (
                        <div key={ link.key }>
                            <MyLink icon={ link.icon } text={ link.text } url={ link.url }/>
                        </div>
                    ))
                }
            </div>
        </Layout>
    );
}

interface Props {
    icon?: React.ReactNode | null,
    text?: string,
    url?: string,
    className?: string,
}

const MyLink = ({ icon, text, url, className }: Props) => {
    return (
        <a href={ url } target={ "_blank" } rel={ "noreferrer" } className={ className }>
            <div
                className={ `hover:underline bg-gradient-to-r from-primaryPurple border-gray-500
                hover:to-primaryPurple border rounded-2xl h-16 flex justify-center items-center my-2` }>
                <div className={ "pr-2" }>{ icon !== undefined ? icon : <LinkIcon/> }</div>
                <span>{ text }</span>
            </div>
        </a>
    );
}

export const Head = ({ data }: HeadProps<Queries.LinksPageQuery>): JSX.Element => {
    const locales = data.locales.edges[0].node.data;
    let obj = undefined;
    if (locales) {
        obj = JSON.parse(locales);
    }
    return <SEO title={ obj?.myLinks }/>; // TODO description
};

export const query = graphql`
    query LinksPage($language: String!) {
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

export default LinksPage;
