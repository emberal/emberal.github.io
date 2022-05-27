import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";
import { Sun, Moon, ArrowUp } from "react-feather";
import { Menu } from "@headlessui/react";
import {useTranslation} from "gatsby-plugin-react-i18next";
import Footer from "./footer";
import "../stylesheets/root.css";

/**
 * The default layout used on all pages of the website
 * @param title The title in the browsers tab
 * @param headline The title at the top of the screen, if undefined will use title instead
 * @param description Description used for metadata of the page
 * @param children The contents of the page
 * @returns {JSX.Element}
 * @constructor
 */
const Layout = ({title, headline, description, children}) => {

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

    const [theme, setTheme] = React.useState('auto');

    React.useEffect(() => {
        if (!('theme' in localStorage) || localStorage.theme === 'auto') {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) { //TODO auto change theme on browswe change
                document.documentElement.classList.add('dark');
            }
            else {
                document.documentElement.classList.remove('dark');
            }
            localStorage.theme = 'auto'; // Incase theme does not exist yet
        }
        else if (localStorage.theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        else if (localStorage.theme === 'light') {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    function toggleDarkMode(theme) {
        switch (theme) {
            case 'dark': {
                localStorage.theme = 'dark';
                setTheme('dark');
            } break;
            case 'light': {
                localStorage.theme = 'light';
                setTheme('light');
            } break;
            default: {
                localStorage.theme = 'auto';
                setTheme('auto');
            }
        }
    }

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

    const {t} = useTranslation();

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
            id: "auto",
            text: t('followBrowser'),
        },
        {
            id: "dark",
            text: t('dark'),
        },
        {
            id: "light",
            text: t('light'),
        },
    ];

    return (
        <div id={"root"} className={"dark:bg-gray-900 dark:text-white"}>
            <Helmet>
                <html lang={query.site.siteMetadata.lang}/>
                <meta name={"description"} content={description}/>
                <title>{title} | {query.site.siteMetadata.title}</title>
            </Helmet>
            <div className={"max-w-2xl mx-auto"}> {/*Container*/}
                <h1 id={"title"} className={"text-primaryPink ml-3 font-bold mb-6 pt-6"}>
                    {(headline !== undefined) ? headline : title}
                </h1>
                <nav>
                    <ul id={"links"} className={"list-none flex ml-3 mb-2"}>
                        {
                            navLinks.map(link => (
                                <div key={link.id}>
                                    <li className={"mr-6 w-fit"}>
                                        <Link className={"text-primaryPink hover:underline"} to={link.to}>
                                            {link.name}
                                        </Link>
                                    </li>
                                </div>
                            ))
                        }
                        <li className={"mr-6 w-fit"}>
                            <Menu>
                                <Menu.Button className={"text-primaryPink"}>{t('theme')}</Menu.Button>
                                <Menu.Items className={"border rounded-b-2xl pb-2 pl-2 pr-2"}>
                                    {
                                        themeMenu.map(item => (
                                            <div key={item.id}>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <button onClick={() => toggleDarkMode(item.id)}>
                                                            <span className={`${active && "bg-black"}`}>
                                                                {item.text}
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
                    <p style={{ display: "none" }}>{t('goBackToTheTop')}</p>
                </button>
            )}
        </div>
    );
}

export default Layout;
