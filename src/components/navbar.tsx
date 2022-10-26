import * as React from "react";
import { MyLink } from "./link";
import MyMenu from "./menu";
import { ChevronDown, Globe, Moon, Sun } from "react-feather";
import { Menu } from "@headlessui/react";
import { Links } from "./layout";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { Component, Theme } from "../interfaces/interfaces";

interface NavbarProps extends Component {
    current?: string
}

export default function Navbar({ current }: NavbarProps): JSX.Element {

    const THEME = {
        AUTO: 'auto',
        DARK: 'dark',
        LIGHT: 'light',
    } as { readonly AUTO: Theme, readonly DARK: Theme, readonly LIGHT: Theme };

    const [theme, setTheme] = React.useState(THEME.AUTO);

    React.useEffect(() => {
        const classList = document.documentElement.classList;

        if (!('theme' in localStorage) || localStorage.theme === THEME.AUTO) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) { // TODO auto change theme on browser change
                classList.add('dark');
            }
            else {
                classList.remove('dark');
            }
            localStorage.theme = THEME.AUTO; // If theme does not exist yet
        }
        else if (localStorage.theme === THEME.DARK) {
            classList.add('dark');
        }
        else if (localStorage.theme === THEME.LIGHT) {
            classList.remove('dark');
        }
    }, [theme]);

    const { t } = useTranslation();

    /**
     * Changes the theme to the specified one
     * @param theme The desired theme, can be 'auto', 'dark' or 'light'
     */
    function changeTheme(theme: Theme) {
        switch (theme) {
            case 'dark':
                localStorage.theme = THEME.DARK;
                setTheme(THEME.DARK);
                break;
            case 'light':
                localStorage.theme = THEME.LIGHT;
                setTheme(THEME.LIGHT);
                break;
            default:
                localStorage.theme = THEME.AUTO;
                setTheme(THEME.AUTO);
        }
    }

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
    ] as { to: string, name: string }[];

    const iconCss = "w-4 h-4";

    const themeMenu = [
        {
            id: THEME.AUTO,
            text: t('followBrowser'),
            icon: <Globe className={ iconCss }/>
        },
        {
            id: THEME.DARK,
            text: t('dark'),
            icon: <Moon className={ iconCss }/>
        },
        {
            id: THEME.LIGHT,
            text: t('light'),
            icon: <Sun className={ iconCss }/>
        },
    ] as { id: Theme, text: string, icon: React.ReactElement<HTMLElement> }[];

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
