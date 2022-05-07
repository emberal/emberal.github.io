import * as React from "react";
import {Link} from "gatsby";
import {Helmet} from "react-helmet";
import Footer from "./footer";
import {navLinksStyle, navLinkPadding, linkStyle} from "../stylesheets/text.module.css";
import "../stylesheets/root.css"

const layoutStyle = {
    backgroundColor: "#181a1b",
    color: "white",
    fontFamily: "sans-serif",
    height: "100vh",
    overflow: "auto",
}
const titleStyle = {
    paddingTop: "50px",
    paddingBottom: "25px",
    color: "#9e6ecf",
}
const container = {
    maxWidth: "600px",
    margin: "auto",
}
const footerPlacement = {
    position: "relative",
    minHeight: "75vh",
}

const Layout = ({title, headline, description, children}) => {
    return (
        <div style={layoutStyle}>
            <Helmet>
                <html lang={"no"}/>
                <meta name={"description"} content={description}/>
                <title>{title} | Martin Berg Alstad</title>
            </Helmet>
            <div style={container}>
                <h1 style={titleStyle}>{headline}</h1>
                <ul className={navLinksStyle}>
                    <li className={navLinkPadding}><Link className={linkStyle} to={"/"}>Hjem</Link></li>
                    <li className={navLinkPadding}><Link className={linkStyle} to={"/projects"}>Projekter</Link></li>
                    <li className={navLinkPadding}><Link className={linkStyle} to={"/contact-me"}>Kontakt meg</Link>
                    </li>
                </ul>
                <main style={footerPlacement}>
                    {children}
                    <Footer/>
                </main>
            </div>
        </div>
    );
}

export default Layout
