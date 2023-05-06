import * as React from "react";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import { Menu } from "@headlessui/react";
import { ChevronUp, Globe } from "react-feather";
import { Link as I18Link } from "gatsby-plugin-react-i18next/dist/Link";
import MyMenu from "./menu";
import Row from "./row";
import { A } from "./link";
import { For, Show } from "./flow";

const Footer: Component = ({ className }) => {

    const { languages, originalPath } = useI18next();
    const { t } = useTranslation();

    const langs = {
        auto: 'auto',
        eng: languages[0],
        nor: languages[1]
    }

    // Checks if language is set to follow browser
    if (typeof localStorage !== "undefined") { // TODO improve change in language from the browser, right now 2 reloads are required
        const item = localStorage.getItem("lang-follow-browser");
        let langAuto = false;

        if (item) {
            langAuto = item === "true";
        }
        if (langAuto) {
            const lang = navigator.language === "nb" || navigator.language === "nn" || navigator.language === "no" ?
                langs.nor : langs.eng;
            localStorage.setItem("gatsby-i18next-language", lang);
        }
        else if (item === null) {
            setLangAuto();
        }
    }

    function setLangAuto() {
        localStorage.setItem("lang-follow-browser", "true");
    }

    const langMenu = [
        {
            lang: 'auto',
            text: t("followBrowser"),
            icon: <Globe className={ "w-5 h-5" } />
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
        <div className={ `absolute text-center w-full bottom-0 mb-5 border-t border-gray-500 ${ className }` }>
            <div className={ "w-fit mx-auto" }>
                <MyMenu button={
                    <Row>Change language <ChevronUp className={ "w-5 h-5" } /></Row>
                } itemsClassName={ "-top-24 rounded-t-xl !rounded-b-none" }>
                    <For each={ langMenu }>{ lang =>
                        <Menu.Item key={ lang.lang }>
                            <div className={ "w-max flex-row-center" }>
                                <span>{ lang.icon }</span>
                                <Show when={ lang.lang === 'auto' && typeof navigator !== "undefined" }
                                      otherwise={
                                          <I18Link
                                              className={ `pl-2 pt-1 hover:underline` }
                                              to={ originalPath } language={ lang.lang }
                                              onClick={ () => localStorage.setItem("lang-follow-browser", "false") }>
                                              { lang.text }
                                          </I18Link>
                                      }>
                                    <I18Link
                                        className={ `pl-2 pt-1 hover:underline` }
                                        to={ originalPath } onClick={ setLangAuto }
                                        language={
                                            navigator.language === "nb" || navigator.language === "nn" ||
                                            navigator.language === "no" ? langs.nor : langs.eng }>
                                        { lang.text }
                                    </I18Link>
                                </Show>
                            </div>
                        </Menu.Item>
                    }</For>
                </MyMenu>
            </div>

            <p>{ t("createdWith") }
                <A to={ "https://www.gatsbyjs.com/" }>Gatsby.js</A>
            </p>
            <p>{ t("iconsFrom") }
                <A to={ "https://feathericons.com/" }>FeatherIcons</A>
            </p>
        </div>
    );
}

export default Footer;
