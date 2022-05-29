import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { GitHub, Hash, MessageSquare, Linkedin } from "react-feather";

const linkContent = [
    {
        key: "0",
        icon: <GitHub/>,
        text: "GitHub",
        url: "https://github.com/h600878"
    },
    {
        key: "1",
        icon: <Hash/>,
        text: "Mastodon (snabelen.no)",
        url: "https://snabelen.no/@Martials"
    },
    {
        key: "2",
        icon: <MessageSquare/>,
        text: "Matrix",
        url: "https://matrix.to/#/@martials:matrix.org"
    },
    {
        key: "3",
        icon: <Linkedin/>,
        text: "LinkedIn",
        url: "https://www.linkedin.com/in/martin-b-2a69391a3/"
    }
];

/**
 * A page containing cards of several social links
 * @returns {JSX.Element}
 * @constructor
 */
const Links = () => {

    const {t} = useTranslation();

    return(
        <Layout title={t("links")} headline={t("myLinks")} children={
            <div className={"pb-20"}>
                {
                    linkContent.map(link => (
                        <div key={link.key}>
                            <MyLink icon={link.icon} text={link.text} url={link.url}/>
                        </div>
                    ))
                }
            </div>
        }
                description={t("linksDescription")}
        />
    );
}

interface Props {
    icon: React.ReactNode,
    text: string,
    url: string
}

const MyLink = ({icon, text, url}: Props) => {
    return(
        <a href={url} target={"_blank"} rel={"noreferrer"}>
            <div className={"bg-primaryPink border rounded-2xl h-16 flex justify-center items-center my-2"}>
                <div className={"pr-2"}>{icon}</div>
                <span>{text}</span>
            </div>
        </a>
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

export default Links;
