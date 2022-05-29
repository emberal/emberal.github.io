import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

const linksStyle = "text-primaryPurple dark:text-primaryPink hover:underline";

const Footer = () => {

    const {t} = useTranslation();

    return (
        <div className={"absolute text-center w-full bottom-0 mb-5"}>
            <p>{t("createdWith")}
                <a className={linksStyle} href={"https://www.gatsbyjs.com/"} target={"_blank"} rel={"noreferrer"}>
                    Gatsby.js
                </a>
            </p>
            <p>{t("iconsFrom")}
                <a className={linksStyle} href={"https://feathericons.com/"} target={"_blank"} rel={"noreferrer"}>
                    FeatherIcons
                </a>
            </p>
        </div>
    );
}

export default Footer;
