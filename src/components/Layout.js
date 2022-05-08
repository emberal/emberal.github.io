import * as React from "react";
import {graphql, Link, useStaticQuery} from "gatsby";
import {Helmet} from "react-helmet";
import Footer from "./footer";
import {navLinksStyle, navLinkPadding, linkStyle} from "../stylesheets/text.module.css";
import "../stylesheets/root.css";

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
    marginLeft: "5px",
    color: colorModes[0].importantText,
}
const container = {
    maxWidth: "600px",
    margin: "auto",
}
const pageStyle = {
    position: "relative",
    minHeight: "100vh",
    marginLeft: "5px",
    marginRight: "5px"
}

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

    const [isDark, setIsDark] = React.useState(1); //Dark mode=0, light mode=1
    function toggleDarkMode() {
        const root = document.getElementById("root");
        root.style.backgroundColor = colorModes[isDark].background;
        root.style.color = colorModes[isDark].text;

        document.getElementById("title").style.color = colorModes[isDark].importantText;
        let links = document.getElementsByClassName(linkStyle);
        for (let i = 0; i < links.length; i++) {
            links[i].style.color = colorModes[isDark].importantText;
        }
        setIsDark((isDark + 1) % 2);
    }

    return (
        <div id={"root"} style={layoutStyle}>
            <Helmet>
                <html lang={query.site.siteMetadata.lang}/>
                <meta name={"description"} content={description}/>
                <title>{title} | {query.site.siteMetadata.title}</title>
            </Helmet>
            <div style={container}>
                <h1 id={"title"} style={titleStyle}>{headline}</h1>
                <ul id={"links"} className={navLinksStyle}>
                    <li className={navLinkPadding}><Link className={linkStyle} to={"/"}>Hjem</Link></li>
                    <li className={navLinkPadding}><Link className={linkStyle} to={"/projects"}>Projekter</Link></li>
                    <li className={navLinkPadding}><Link className={linkStyle} to={"/contact-me"}>Kontakt meg</Link></li>
                    <li className={navLinkPadding}>
                        <button onClick={toggleDarkMode}>{(isDark) ? "Light mode" : "Dark mode"}</button>
                    </li>
                </ul>
                <main style={pageStyle}>
                    {children}
                    <Footer/>
                </main>
            </div>
        </div>
    )
}

export default Layout
