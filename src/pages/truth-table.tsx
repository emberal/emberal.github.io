import * as React from "react";
import Seo from "../components/seo";

export default function TruthTablePage(): JSX.Element {

    if (typeof window !== "undefined") {
        window.location.replace("https://martials.no/simplify-truths.html");
    }
    return <></>;
}

export function Head(): JSX.Element {
    return (
        <Seo title={ "Redirecting" } description={ "Redirecting" }>
            <meta httpEquiv="refresh" content="0; url=https://martials.no/simplify-truths.html" />
        </Seo>
    );
}
