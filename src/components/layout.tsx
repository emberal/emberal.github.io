import * as React from "react";
import Footer from "./footer";
import { graphql, Link, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";
import { Globe, Sun, Moon, ArrowUp, ChevronDown } from "react-feather";
import { Menu } from "@headlessui/react";
import { Link as I18Link, useI18next, useTranslation } from "gatsby-plugin-react-i18next";

interface Props {
    title: string,
    headline?: string,
    description: string,
    children: React.ReactNode
}

/**
 * The default layout used on all pages of the website
 * @param title The title in the browsers tab
 * @param headline The title at the top of the screen, if undefined will use title instead
 * @param description Description used for metadata of the page
 * @param children The contents of the page
 * @returns {JSX.Element}
 * @constructor
 */
const Layout = ({title, headline, description, children}: Props) => {

    const query = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    lang
                    title
                }
            }
        }
    `);

    const themeEnum = {
        auto: 'auto',
        dark: 'dark',
        light: 'light'
    }

    const [theme, setTheme] = React.useState(themeEnum.auto);

    React.useEffect(() => {
        if (!('theme' in localStorage) || localStorage.theme === themeEnum.auto) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) { //TODO auto change theme on browser change
                document.documentElement.classList.add('dark');
            }
            else {
                document.documentElement.classList.remove('dark');
            }
            localStorage.theme = themeEnum.auto; // Incase theme does not exist yet
        }
        else if (localStorage.theme === themeEnum.dark) {
            document.documentElement.classList.add('dark');
        }
        else if (localStorage.theme === themeEnum.light) {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    /**
     * Changes the theme to the specified one
     * @param theme The desired theme, can be 'auto', 'dark' or 'light'
     */
    function toggleDarkMode(theme: string) { //TODO create themeType instead
        switch (theme) {
            case 'dark':
                localStorage.theme = themeEnum.dark;
                setTheme(themeEnum.dark);
                break;
            case 'light':
                localStorage.theme = themeEnum.light;
                setTheme(themeEnum.light);
                break;
            default:
                localStorage.theme = themeEnum.auto;
                setTheme(themeEnum.auto);
        }
    }

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
    }

    function setAuto() {
        localStorage.setItem("lang-follow-browser", "true");
    }

    /**
     * Scrolls the window to the top
     */
    function backUp() {
        document.body.scrollTop = 0; //Safari
        document.documentElement.scrollTop = 0; //Firefox, chromium, opera and the others
    }

    const [isTop, setIsTop] = React.useState(true);

    React.useEffect(() => {
        let isMounted = true;
        const onScroll = () => {
            if (isMounted) {
                const show = window.scrollY < 50;
                if (show !== isTop) {
                    setIsTop(show);
                }
            }
        }
        const _ = require("lodash");
        document.addEventListener("scroll", _.throttle(onScroll, 100));

        return () => {
            document.removeEventListener("scroll", onScroll);
            isMounted = false;
        };
    }, [isTop]);

    const navLinks = [
        {
            id: 0,
            to: "/",
            name: t('home'),
        },
        {
            id: 1,
            to: "/projects",
            name: t('projects'),
        },
        {
            id: 2,
            to: "/contact-me",
            name: t('contactMe'),
        },
    ];
    const themeMenu = [
        {
            id: themeEnum.auto,
            text: t('followBrowser'),
            icon: <Globe className={"w-4 h-4"}/>
        },
        {
            id: themeEnum.dark,
            text: t('dark'),
            icon: <Moon className={"w-4 h-4"}/>
        },
        {
            id: themeEnum.light,
            text: t('light'),
            icon: <Sun className={"w-4 h-4"}/>
        },
    ];
    const langMenu = [
        {
            lang: 'auto',
            text: t("followBrowser"),
            icon: <Globe className={"w-5 h-5"}/>
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
        <div id={"root"} className={"dark:bg-gray-900 dark:text-white"}>
            <Helmet>
                <html lang={query.site.siteMetadata.lang}/>
                <meta name={"description"} content={description}/>
                <title>{title} | {query.site.siteMetadata.title}</title>
            </Helmet>
            <div className={"absolute right-5 top-5"}>
                <Menu>
                    <Menu.Button>
                        <span className={"flex items-center"}>
                            Change language <ChevronDown className={"w-5 h-5"}/>
                        </span>
                    </Menu.Button>
                    <Menu.Items className={"absolute z-50 right-0 bg-white dark:bg-gray-900 border rounded-b-2xl px-2 py-1"}>
                        {langMenu.map(lang => (
                            <div key={lang.lang}>
                                <Menu.Item>
                                    {(active) => (
                                        <div className={"w-max flex items-center"}>
                                            <span>{lang.icon}</span>
                                            {lang.lang === 'auto' ?
                                                <I18Link className={`pl-2 pt-1 ${active && "hover:underline"}`}
                                                         to={originalPath} onClick={setAuto}
                                                         language={
                                                    navigator.language === "nb" || navigator.language === "nn" ||
                                                    navigator.language === "no" ? langs.nor : langs.eng}>
                                                    {lang.text}
                                                </I18Link> :
                                                <I18Link className={`pl-2 pt-1 ${active && "hover:underline"}`}
                                                         to={originalPath} language={lang.lang}
                                                         onClick={() => localStorage.setItem("lang-follow-browser", "false")}>
                                                    {lang.text}
                                                </I18Link>
                                            }
                                        </div>
                                    )}
                                </Menu.Item>
                            </div>
                        ))}
                    </Menu.Items>
                </Menu>
            </div>
            <div className={"max-w-2xl mx-auto px-2"}> {/*Container*/}
                <h1 id={"title"} className={"text-primaryPurple dark:text-primaryPink font-bold text-3xl mb-6 pt-6"}>
                    {(headline !== undefined) ? headline : title}
                </h1>
                <nav>
                    <ul id={"links"} className={"list-none flex mb-5"}>
                        {
                            navLinks.map(link => (
                                <div key={link.id}>
                                    <li className={"mr-5 w-fit text-lg"}>
                                        <Link className={"text-primaryPurple dark:text-primaryPink hover:underline"}
                                              to={link.to}> {link.name}
                                        </Link>
                                    </li>
                                </div>
                            ))
                        }
                        <li className={"mr-6 w-fit relative"}>
                            <Menu>
                                <Menu.Button className={"text-primaryPurple dark:text-primaryPink flex items-center text-lg"}>
                                    <>
                                        {t('theme')}<ChevronDown className={"w-5 h-5"}/>
                                    </>
                                </Menu.Button>
                                <Menu.Items className={
                                    "bg-white dark:bg-gray-900 border rounded-b-2xl pt-1 p-2 absolute z-50 right-0"}>
                                    {
                                        themeMenu.map(item => (
                                            <div key={item.id}>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <button onClick={() => toggleDarkMode(item.id)}>
                                                            <span className={`flex items-center ${active && "underline"}`}>
                                                                {item.icon}<p className={"pl-2 w-max"}>{item.text}</p>
                                                            </span>
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        ))
                                    }
                                </Menu.Items>
                            </Menu>
                        </li>
                    </ul>
                </nav>
                <main className={"relative min-h-screen"}>
                    {children}
                    <Footer/>
                </main>
            </div>
            {(isTop) ? null : (
                <button className={"fixed right-10 bottom-20"} title={t('goBackToTheTop')} onClick={backUp}>
                    <ArrowUp/>
                    <p className={"hidden"}>{t('goBackToTheTop')}</p>
                </button>
            )}
        </div>
    );
}

export default Layout;
