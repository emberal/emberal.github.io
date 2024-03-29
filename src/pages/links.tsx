import * as React from "react";
import Layout from "../components/layout";
import { graphql, type HeadProps } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { GitHub, MessageSquare, Linkedin, Instagram, Link as LinkIcon } from "react-feather";
import Seo from "../components/seo";
import { A } from "../components/link";
import { For } from "../components/flow";

const linkContent = [
    {
        key: 0,
        icon: <GitHub />,
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
        icon: <MessageSquare />,
        text: "Matrix",
        url: "https://matrix.to/#/@martials:matrix.org"
    },
    {
        key: 3,
        icon: <Linkedin />,
        text: "LinkedIn",
        url: "https://www.linkedin.com/in/martin-b-2a69391a3/"
    },
    {
        key: 4,
        icon: <Instagram />,
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
const LinksPage: Component = () => {

    const { t } = useTranslation();

    return (
        <Layout
            title={ t("links") }
            headline={ t("myLinks") }
            description={ t("linksDescription") }>
            <div className={ "pt-5" }>
                <For each={ linkContent }>{ link =>
                    <MyLink title={ link.text } to={ link.url } key={ link.key }>
                        { link.icon }
                    </MyLink>
                }</For>
            </div>
        </Layout>
    );
};

export default LinksPage;

const MyLink: Component<LinkProps> = (
    {
        children,
        title,
        to,
        className
    }) => (
    <A to={ to } className={ `!text-inherit ${ className }` }>
        <div
            className={ `bg-gradient-to-r from-primaryPurple border-gray-500
                hover:to-primaryPurple border rounded-2xl h-16 flex justify-center items-center my-2` }>
            <div className={ "pr-2" }>{ children ? children : <LinkIcon /> }</div>
            <span>{ title }</span>
        </div>
    </A>
);

export const Head: Component<HeadProps<Queries.LinksPageQuery>> = ({ data }) => {
    const locales = data?.locales?.edges[0]?.node?.data;
    let obj;
    if (locales) {
        obj = JSON.parse(locales);
    }
    return <Seo title={ obj?.myLinks } />; // TODO description
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
