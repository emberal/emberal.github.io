import * as React from "react";
import Footer from "./footer";
import { Link } from "gatsby";
import { Globe, Sun, Moon, ArrowUp, ChevronDown } from "react-feather";
import { Menu } from "@headlessui/react";
import { useTranslation } from "gatsby-plugin-react-i18next";

export const Links = {
    home: "/",
    projects: "/projects",
    contactMe: "/contact-me",
    links: "/links",
    pageNotFound: "/404",

}

interface Layout {
    title: string,
    headline?: string,
    description: string,
    children?: React.ReactNode,
    current?: string,
    className?: string,
    titleAndNavClass?: string,
    containerClass?: string,
}

/**
 * The default layout used on all pages of the website
 * @param title The title in the browsers tab
 * @param headline The title at the top of the screen, if undefined will use title instead
 * @param description Description used for metadata of the page
 * @param children The contents of the page
 * @param current Defines the current page using the layout
 * @param className Styling of the root element
 * @param titleAndNavClass Styling of the title and nav container
 * @param containerClass Styling of the main container
 * @returns {JSX.Element}
 * @constructor
 */
const Layout = (
    {
        title,
        headline,
        children,
        current,
        className,
        titleAndNavClass,
        containerClass
    }: Layout) => {

    const themeEnum = {
        auto: 'auto',
        dark: 'dark',
        light: 'light'
    }

    const [theme, setTheme] = React.useState(themeEnum.auto);

    React.useEffect(() => {
        if (!('theme' in localStorage) || localStorage.theme === themeEnum.auto) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) { // TODO auto change theme on browser change
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
    function toggleDarkMode(theme: string) {
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

    const { t } = useTranslation();

    /**
     * Scrolls the window to the top
     */
    function backUp() {
        document.body.scrollTop = 0; // Safari
        document.documentElement.scrollTop = 0; // Firefox, chromium, opera and the others
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
            to: Links.home,
            name: t('home'),
        },
        {
            to: Links.projects,
            name: t('projects'),
        },
        {
            to: Links.contactMe,
            name: t('contactMe'),
        },
    ];

    const iconCss = "w-4 h-4";

    const themeMenu = [
        {
            id: themeEnum.auto,
            text: t('followBrowser'),
            icon: <Globe className={ iconCss }/>
        },
        {
            id: themeEnum.dark,
            text: t('dark'),
            icon: <Moon className={ iconCss }/>
        },
        {
            id: themeEnum.light,
            text: t('light'),
            icon: <Sun className={ iconCss }/>
        },
    ];

    return (
        <div className={ `dark:bg-gray-900 dark:text-white overflow-clip ${ className }` }>
            <div id={ "main-container" }
                 className={ `max-w-2xl mx-auto px-2 relative min-h-screen ${ containerClass }` /*Container*/ }>
                <div className={ ` ${ titleAndNavClass }` }>
                    <h1
                        className={ `text-primaryPurple dark:text-primaryPink font-bold text-4xl mb-6 pt-6` }>
                        { (headline) ? headline : title }
                    </h1>
                    { /*TODO Popover or Menu (headlessUI) menu on small screens (hamburger menu)*/ }
                    <nav>
                        <ul className={ "list-none flex gap-3 mb-2" }>
                            {
                                navLinks.map(link => (
                                    <li key={ link.to } className={ "w-fit text-lg" }>
                                        <Link
                                            className={ `default-link ${ current === link.to && "after:content-['<']" }` }
                                            to={ link.to }> { link.name }
                                        </Link>
                                    </li>
                                ))
                            }
                            <li className={ "mr-6 w-fit relative" }>
                                <Menu>
                                    <Menu.Button className={ "default-link flex items-center text-lg" }>
                                        <>
                                            { t('theme') }<ChevronDown className={ "w-5 h-5" }/>
                                        </>
                                    </Menu.Button>
                                    { /*TODO transition*/ }
                                    <Menu.Items className={
                                        "bg-white dark:bg-gray-900 border border-gray-500 rounded-b-2xl pt-1 p-2 absolute z-50 right-0" }>
                                        {
                                            themeMenu.map(item => (
                                                <div key={ item.id }>
                                                    <Menu.Item>
                                                        { ({ active }) => (
                                                            <button onClick={ () => toggleDarkMode(item.id) }>
                                                            <span
                                                                className={ `flex items-center ${ active && "underline" }` }>
                                                                { item.icon }
                                                                <p className={ "pl-2 w-max" }>{ item.text }</p>
                                                            </span>
                                                            </button>
                                                        ) }
                                                    </Menu.Item>
                                                </div>
                                            ))
                                        }
                                    </Menu.Items>
                                </Menu>
                            </li>
                        </ul>
                    </nav>
                </div>
                <main>
                    <div className={ "pb-24" } id={ "main-content" }>{ children }</div>
                    <Footer/>
                </main>
            </div>
            { isTop ? null :
                <button
                    className={ "fixed right-10 bottom-20 border-rounded shadow-sm shadow-primaryPurple p-1 z-50" }
                    title={ t('goBackToTheTop') } onClick={ backUp }>
                    <ArrowUp/>
                    <p className={ "sr-only" }>{ t('goBackToTheTop') }</p>
                </button>
            }
        </div>
    );
}

export default Layout;
