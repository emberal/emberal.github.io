import * as React from "react";
import {graphql, Link, useStaticQuery} from "gatsby";
import {Helmet} from "react-helmet";
import {Sun, Moon, ArrowUp} from "react-feather";
import Footer from "./footer";
import {navLinksStyle, navLinkPadding, linkStyle} from "../stylesheets/text.module.css";
import {githubIcon, buttonStyle, backUpButton} from "../stylesheets/media.module.css";
import "../stylesheets/root.css";
import classNames from "classnames";

const colorModes = [
    { //Dark mode
        background: "#181a1b",
        text: "white",
        importantText: "#c17aff",
    },
    { //Light mode
        background: "white",
        text: "black",
        importantText: "#9e24ff",
    }
]

const layoutStyle = {
    backgroundColor: colorModes[0].background,
    color: colorModes[0].text,
    fontFamily: "sans-serif",
    overflow: "auto",
}
const titleStyle = {
    paddingTop: "50px",
    paddingBottom: "25px",
    marginLeft: "10px",
    fontWeight: "700",
    color: colorModes[0].importantText,
}
const container = {
    maxWidth: "600px",
    margin: "auto",
}
const pageStyle = {
    position: "relative",
    minHeight: "100vh",
    marginLeft: "10px",
    marginRight: "10px",
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

    let wasDark;
    if (typeof window !== "undefined") {
        if (localStorage.darkMode) { //If storage is defined and localStorage is not empty
            wasDark = Number(localStorage.darkMode); //Gets theme from local storage
        }
        else { // If storage is empty get dark-theme preference from browser
            wasDark = Number(window.matchMedia("(prefers-color-scheme: light)").matches); //Gets theme from browser
        }
    }

    React.useEffect(() => {
        toggleDarkMode(); //TODO Improve
    }, []); //Must be empty, so the function is called only once after the first render

    const [isDark, setIsDark] = React.useState(wasDark); //Dark mode=0, light mode=1

    function toggleDarkMode() {
        const root = document.getElementById("root");
        root.style.backgroundColor = colorModes[isDark].background;
        root.style.color = colorModes[isDark].text;

        document.getElementById("title").style.color = colorModes[isDark].importantText; //Titles

        setStyles(linkStyle, colorModes[isDark].importantText); //Links
        setStyles(githubIcon, colorModes[isDark].text); //GitHub icons
        function setStyles(className, attribute) {
            Array.from(document.getElementsByClassName(className)).forEach( element => element.style.color = attribute);
        }
        setIsDark((isDark + 1) % 2);
        localStorage.darkMode = isDark; //Saves the preference in local storage
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

    return (
        <div id={"root"} style={layoutStyle}>
            <Helmet>
                <html lang={query.site.siteMetadata.lang}/>
                <meta name={"description"} content={description}/>
                <title>{title} | {query.site.siteMetadata.title}</title>
            </Helmet>
            <div style={container}>
                <h1 id={"title"} style={titleStyle}>{(headline !== undefined) ? headline : title}</h1>
                <nav>
                    <ul id={"links"} className={navLinksStyle}>
                        <li className={navLinkPadding}><Link className={linkStyle} to={"/"}>Hjem</Link></li>
                        <li className={navLinkPadding}><Link className={linkStyle} to={"/projects"}>Projekter</Link></li>
                        <li className={navLinkPadding}><Link className={linkStyle} to={"/contact-me"}>Kontakt meg</Link></li>
                        <li className={navLinkPadding}>
                            <button title={"Veksle dark-mode"} onClick={toggleDarkMode} className={buttonStyle}>
                                {(isDark) ? <Sun style={{color: "white"}}/> : <Moon/>}
                                <p style={{display: "none"}}>Toggle dark-mode</p>
                            </button>
                        </li>
                    </ul>
                </nav>
                <main style={pageStyle}>
                    {children}
                    <Footer/>
                </main>
            </div>
            {(isTop) ? null : (
                <button className={classNames(buttonStyle, backUpButton)} title={"Til toppen"} onClick={backUp}>
                    <ArrowUp/>
                </button>
            )}
        </div>
    )
}

export default Layout
