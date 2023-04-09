import * as React from "react";
import { MyLink } from "./link";
import MyMenu from "./menu";
import { ChevronDown, Globe, Moon, Sun } from "react-feather";
import { Menu } from "@headlessui/react";
import { Links } from "./layout";
import { useTranslation } from "gatsby-plugin-react-i18next";
import type { Component, Theme } from "../declarations/props";

const Navbar: Component = () => {

    const [theme, setTheme] = React.useState<Theme>("auto");

    React.useEffect(() => {
        const classList = document.documentElement.classList;

        let localTheme: Theme = localStorage.theme;
        if (!('theme' in localStorage) || localTheme === "auto") {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) { // TODO auto change theme on browser change
                classList.add('dark');
            }
            else {
                classList.remove('dark');
            }
            localStorage.theme = "auto"; // If theme does not exist yet
        }
        else if (localTheme === "dark") {
            classList.add('dark');
        }
        else if (localTheme === "light") {
            classList.remove('dark');
        }
    }, [theme]);

    const { t } = useTranslation();

    /**
     * Changes the theme to the specified one
     * @param theme The desired theme, can be 'auto', 'dark' or 'light'
     */
    function changeTheme(theme: Theme): void {
        localStorage.theme = theme;
        setTheme(theme);
    }


    const navLinks: { to: string, name: string }[] = [
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

    const themeMenu: { id: Theme, text: string, icon: React.ReactElement<HTMLElement> }[] = [
        {
            id: "auto",
            text: t('followBrowser'),
            icon: <Globe className={ iconCss } />
        },
        {
            id: "dark",
            text: t('dark'),
            icon: <Moon className={ iconCss } />
        },
        {
            id: "light",
            text: t('light'),
            icon: <Sun className={ iconCss } />
        },
    ];

    let path = "/";
    if (typeof location !== "undefined" && location.pathname.length > 1) {
        path = location.pathname.substring(0, location.pathname.length - 1);
    }

    return (
        <nav>
            <ul className={ "list-none flex gap-3 mb-2" }>
                { navLinks.map(link =>
                    <li key={ link.to } className={ "w-fit text-lg" }>
                        <MyLink
                            className={ `${ path === link.to && "after:content-['<']" }` }
                            to={ link.to }> { link.name }
                        </MyLink>
                    </li>
                ) }
                <li className={ "mr-6 w-fit relative" }>
                    <MyMenu button={ <>{ t('theme') }<ChevronDown className={ "w-5 h-5" } /></> }
                            buttonClassName={ "default-link text-lg" }
                            itemsClassName={ "right-0" }>
                        { themeMenu.map(item =>
                            <div key={ item.id }>
                                <Menu.Item>
                                    <button onClick={ () => changeTheme(item.id) }>
                                            <span className={ `flex-row-center hover:underline` }>
                                                { item.icon }
                                                <p className={ "pl-2 w-max" }>{ item.text }</p>
                                            </span>
                                    </button>
                                </Menu.Item>
                            </div>
                        ) }
                    </MyMenu>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
