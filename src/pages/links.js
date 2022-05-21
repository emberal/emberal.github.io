import * as React from "react";
import {useTranslation} from "gatsby-plugin-react-i18next";
import {GitHub, Hash, MessageSquare, Linkedin} from "react-feather";
import Layout from "../components/Layout";
import {myLinkStyle} from "../stylesheets/media.module.css";
import {graphql} from "gatsby";

const linksPadding = {
    marginBottom: "10px"
}
const iconPadding = {
    marginRight: "10px",
};

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
]

/**
 * A page containing cards of several social links
 * @returns {JSX.Element}
 * @constructor
 */
const Links = () => {

    const {t} = useTranslation();

    return(
        <Layout title={t("links")} headline={t("myLinks")} children={
            <div style={linksPadding}>
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

const MyLink = ({icon, text, url}) => {
    return(
        <a href={url} target={"_blank"} rel={"noreferrer"}>
            <div className={myLinkStyle}>
                <div style={iconPadding}>{icon}</div>
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
