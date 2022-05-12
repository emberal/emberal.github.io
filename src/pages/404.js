import * as React from "react";
import {Link} from "gatsby";
import {Helmet} from "react-helmet";
import Layout from "../components/Layout";
import {linkStyle} from "../stylesheets/text.module.css";

/**
 * The page that is shown when a page does not exist
 * @returns {JSX.Element}
 * @constructor
 */
const NotFoundPage = () => {
    return (
        <Layout title={"Siden ble ikke funnet"} children={
            <>
                <Helmet>
                    <meta name="robots" content="noindex"/>
                </Helmet>
                <p> Beklager{" "} <span role="img" aria-label="Pensive emoji">😔</span>{" "}
                    Siden du lette etter fins ikke.
                    <br/><br/>
                    <Link className={linkStyle} to="/">Go home</Link>.
                </p>
            </>
        }/>
    );
}

export default NotFoundPage
