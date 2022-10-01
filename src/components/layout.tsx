import * as React from "react";
import Footer from "./footer";
import { Globe, Sun, Moon, ArrowUp, ChevronDown } from "react-feather";
import { Menu } from "@headlessui/react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import MyMenu from "./menu";
import { MyLink } from "./link";
import { TitleComponent } from "../interfaces/interfaces";

export const Links = {
    home: "/",
    projects: "/projects",
    contactMe: "/contact-me",
    links: "/links",
    pageNotFound: "/404",
    truthTable: "/truth-table",
}

interface Layout extends TitleComponent {
    headline?: string,
    description: string,
    current?: string,
    titleAndNavClass?: string,
    containerClass?: string,
    footerClass?: string,
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
export default function Layout(
    {
        title,
        headline,
        children,
        current,
        className,
        titleAndNavClass,
        containerClass,
        footerClass,
    }: Layout): JSX.Element {

    // TODO use actual Enum?
    const themeEnum = {
        auto: 'auto',
        dark: 'dark',
        light: 'light'
    }

    const [theme, setTheme] = React.useState(themeEnum.auto);

    React.useEffect(() => {
        const classList = document.documentElement.classList;

        if (!('theme' in localStorage) || localStorage.theme === themeEnum.auto) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) { // TODO auto change theme on browser change
                classList.add('dark');
            }
            else {
                classList.remove('dark');
            }
            localStorage.theme = themeEnum.auto; // If theme does not exist yet
        }
        else if (localStorage.theme === themeEnum.dark) {
            classList.add('dark');
        }
        else if (localStorage.theme === themeEnum.light) {
            classList.remove('dark');
        }
    }, [theme]);

    /**
     * Changes the theme to the specified one
     * @param theme The desired theme, can be 'auto', 'dark' or 'light'
     */
    function changeTheme(theme: string) {
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

    /**
     * Is true if the window is almost at the top
     */
    const [isTop, setIsTop] = React.useState(true);

    React.useEffect(() => {
        let isMounted = true;

        function onScroll() {
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
        <div className={ `default-bg default-text-black-white overflow-clip ${ className }` }>
            <div id={ "main-container" }
                 className={ `max-w-2xl mx-auto px-2 relative min-h-screen ${ containerClass }` /*Container*/ }>
                <div className={ ` ${ titleAndNavClass }` }>
                    <h1
                        className={ `default-text font-bold text-4xl mb-6 pt-6` }>
                        { (headline) ? headline : title }
                    </h1>
                    { /*TODO Popover or Menu (headlessUI) menu on small screens (hamburger menu)*/ }
                    <nav>
                        <ul className={ "list-none flex gap-3 mb-2" }>
                            {
                                navLinks.map(link =>
                                    <li key={ link.to } className={ "w-fit text-lg" }>
                                        <MyLink
                                            className={ `${ current === link.to && "after:content-['<']" }` }
                                            to={ link.to }> { link.name }
                                        </MyLink>
                                    </li>
                                )
                            }
                            <li className={ "mr-6 w-fit relative" }>
                                <MyMenu button={ <>{ t('theme') }<ChevronDown className={ "w-5 h-5" }/></> }
                                        buttonClassName={ "default-link text-lg" }
                                        itemsClassName={ "right-0" }>
                                    {
                                        themeMenu.map(item =>
                                            <div key={ item.id }>
                                                <Menu.Item>
                                                    <button onClick={ () => changeTheme(item.id) }>
                                                            <span
                                                                className={ `flex-row-center hover:underline` }>
                                                                { item.icon }
                                                                <p className={ "pl-2 w-max" }>{ item.text }</p>
                                                            </span>
                                                    </button>
                                                </Menu.Item>
                                            </div>
                                        )
                                    }
                                </MyMenu>
                            </li>
                        </ul>
                    </nav>
                </div>
                <main>
                    <div className={ "pb-28" } id={ "main-content" }>{ children }</div>
                    <Footer className={ footerClass }/>
                </main>
            </div>
            {
                !isTop &&
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
