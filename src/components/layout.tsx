import * as React from "react";
import Footer from "./footer";
import { ArrowUp } from "react-feather";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { TitleComponent } from "../interfaces/interfaces";
import Navbar from "./navbar";

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

    return (
        <div className={ `default-bg default-text-black-white overflow-clip ${ className }` }>
            <div id={ "main-container" }
                 className={ `max-w-2xl mx-auto px-2 relative min-h-screen ${ containerClass }` /*Container*/ }>
                <div className={ ` ${ titleAndNavClass }` }>
                    <h1
                        className={ `default-text font-bold text-4xl mb-6 pt-6` }>
                        { headline ? headline : title }
                    </h1>
                    { /*TODO Popover or Menu (headlessUI) menu on small screens (hamburger menu)*/ }
                    <Navbar current={ current }/>
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
