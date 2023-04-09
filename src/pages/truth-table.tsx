import * as React from "react";
import Seo from "../components/seo";
import type { Component } from "../declarations/props";

const TruthTablePage: Component = () => {

    if (typeof window !== "undefined") {
        window.location.replace("https://martials.no/simplify-truths.html");
    }
    return <></>;
};

export default TruthTablePage;

export const Head: Component = () => (
    <Seo title={ "Redirecting" } description={ "Redirecting" }>
        <meta httpEquiv="refresh" content="0; url=https://martials.no/simplify-truths.html" />
    </Seo>
);
