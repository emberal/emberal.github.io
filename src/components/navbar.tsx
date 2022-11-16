import * as React from "react";
import { MyLink } from "./link";
import MyMenu from "./menu";
import { ChevronDown, Globe, Icon, Moon, Sun } from "react-feather";
import { Menu } from "@headlessui/react";
import { links } from "./layout";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { Component } from "../interfaces/interfaces";
import { Theme } from "../interfaces/types";

interface NavbarProps extends Component {
    current?: string
}

export default function Navbar({ current }: NavbarProps): JSX.Element {

    const theme: Record<Theme, Theme> = {
        auto: 'auto',
        dark: 'dark',
        light: 'light',
    };

    const [currentTheme, setCurrentTheme] = React.useState(theme.auto);

    React.useEffect(() => {
        const classList = document.documentElement.classList;

        if (!('theme' in localStorage) || localStorage.theme === theme.auto) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) { // TODO auto change theme on browser change
                classList.add('dark');
            }
            else {
                classList.remove('dark');
            }
            localStorage.theme = theme.auto; // If theme does not exist yet
        }
        else if (localStorage.theme === theme.dark) {
            classList.add('dark');
        }
        else if (localStorage.theme === theme.light) {
            classList.remove('dark');
        }
    }, [currentTheme]);

    const { t } = useTranslation();

    /**
     * Changes the theme to the specified one
     * @param {Theme} theme The desired theme, can be 'auto', 'dark' or 'light'
     */
    function changeTheme(theme: Theme): void {
        localStorage.theme = theme;
        setCurrentTheme(theme);
    }

    const navLinks: { to: string, name: string }[] = [
        {
            to: links.home,
            name: t('home'),
        },
        {
            to: links.projects,
            name: t('projects'),
        },
        {
            to: links.contactMe,
            name: t('contactMe'),
        },
    ];

    const iconCss = "w-4 h-4";

    const themeMenu: { id: Theme, text: string, icon: React.ReactElement<Icon>; }[] = [
        {
            id: theme.auto,
            text: t('followBrowser'),
            icon: <Globe className={ iconCss }/>
        },
        {
            id: theme.dark,
            text: t('dark'),
            icon: <Moon className={ iconCss }/>
        },
        {
            id: theme.light,
            text: t('light'),
            icon: <Sun className={ iconCss }/>
        },
    ];

    return (
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
                                            <span className={ `flex-row-center hover:underline` }>
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
    );
}
