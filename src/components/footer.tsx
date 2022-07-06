import * as React from "react";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import { Menu } from "@headlessui/react";
import { ChevronUp, Globe } from "react-feather";
import { Link as I18Link } from "gatsby-plugin-react-i18next/dist/Link";

const linksStyle = "text-primaryPurple dark:text-primaryPink hover:underline";

interface Footer {
    className?: string,
}

const Footer = ({ className }: Footer) => {

    const { languages, originalPath } = useI18next();
    const { t } = useTranslation();

    const langs = {
        auto: 'auto',
        eng: languages[0],
        nor: languages[1]
    }

    /**
     * Checks if language is set to follow browser
     */
    if (typeof localStorage !== "undefined") { // TODO improve change in language from the browser, right now 2 reloads are required
        const item = localStorage.getItem("lang-follow-browser");
        let langAuto = false;

        if (item !== null) {
            langAuto = item === "true";
        }
        if (langAuto) {
            const lang = navigator.language === "nb" || navigator.language === "nn" || navigator.language === "no" ?
                langs.nor : langs.eng;
            localStorage.setItem("gatsby-i18next-language", lang);
        }
        else if (item === null) {
            setAuto();
        }
    }

    function setAuto() {
        localStorage.setItem("lang-follow-browser", "true");
    }

    const langMenu = [
        {
            lang: 'auto',
            text: t("followBrowser"),
            icon: <Globe className={ "w-5 h-5" }/>
        },
        {
            lang: 'en',
            text: "English",
            icon: <span>&#127468;&#127463;</span>
        },
        {
            lang: 'no',
            text: "Norsk Bokmål",
            icon: <span>&#127475;&#127476;</span>
        }
    ];


    return (
        <div className={ `absolute text-center w-full bottom-0 mb-5 ${ className }` }>
            <div className={ "w-fit mx-auto" }>
                <Menu>
                    <Menu.Button>
                        <span className={ "flex items-center" }>
                            Change language <ChevronUp className={ "w-5 h-5" }/>
                        </span>
                    </Menu.Button>
                    <Menu.Items
                        className={ `absolute -top-24 z-50 bg-white dark:bg-gray-900 border border-gray-500
                         rounded-t-2xl px-2 py-1` }>
                        { langMenu.map(lang => (
                            <div key={ lang.lang }>
                                <Menu.Item>
                                    { (active) => (
                                        <div className={ "w-max flex items-center" }>
                                            <span>{ lang.icon }</span>
                                            { lang.lang === 'auto' ?
                                                <I18Link className={ `pl-2 pt-1 ${ active && "hover:underline" }` }
                                                         to={ originalPath } onClick={ setAuto }
                                                         language={
                                                             navigator.language === "nb" || navigator.language === "nn" ||
                                                             navigator.language === "no" ? langs.nor : langs.eng }>
                                                    { lang.text }
                                                </I18Link> :
                                                <I18Link className={ `pl-2 pt-1 ${ active && "hover:underline" }` }
                                                         to={ originalPath } language={ lang.lang }
                                                         onClick={ () => localStorage.setItem("lang-follow-browser", "false") }>
                                                    { lang.text }
                                                </I18Link>
                                            }
                                        </div>
                                    ) }
                                </Menu.Item>
                            </div>
                        )) }
                    </Menu.Items>
                </Menu>
            </div>

            <p>{ t("createdWith") }
                <a className={ linksStyle } href={ "https://www.gatsbyjs.com/" } target={ "_blank" }
                   rel={ "noreferrer" }>
                    Gatsby.js
                </a>
            </p>
            <p>{ t("iconsFrom") }
                <a className={ linksStyle } href={ "https://feathericons.com/" } target={ "_blank" }
                   rel={ "noreferrer" }>
                    FeatherIcons
                </a>
            </p>
        </div>
    );
}

export default Footer;
