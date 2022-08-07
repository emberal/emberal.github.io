import * as React from "react";
import Layout from "../components/layout";
import Input from "../components/input";
import { graphql } from "gatsby";
import { Expression } from "../classes/expression";
import { Search, X } from "react-feather";
import TruthTable from "../components/truth-table";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { InfoBox } from "../components/output";
import MySwitch from "../components/switch";
import { isLegalExpression, replaceOperators, simplify } from "../classes/expression_utils";

interface TruthTablePage {

}

const TruthTablePage = ({}: TruthTablePage) => {

    /**
     * Stores the boolean value of the simplify toggle
     */
    const [simplifyEnabled, setSimplifyEnabled] = React.useState(true);
    /**
     * The state element used to store the simplified string, "empty string" by default
     */
    const [search, setSearch] = React.useState("");
    const expression = React.useRef(new Expression(null, null, null, {}));

    /**
     * If there's an error, it will be stored in this state, otherwise it will be "empty string"
     */
    const [errorMessage, setErrorMessage] = React.useState("");

    /**
     * If the searchbar is empty, this state is 'false', otherwise 'true'
     */
    const [typing, setTyping] = React.useState(false);

    const fullWidthTable = React.useRef(false);

    const tableClass = React.useRef("");

    /**
     * Updates the state of the current expression to the new search with all whitespace removed.
     * If the element is not found, reset.
     */
    function onClick() {
        let exp = (document.getElementById("truth-input") as HTMLInputElement | null)?.value;
        if (exp && exp !== "") {
            exp = replaceOperators(exp);
            (document.getElementById("truth-input") as HTMLInputElement).value = exp;

            exp = exp.replace(/\s+/g, ""); // Replace All (g) whitespace (\s) in the string

            const errorMsg = isLegalExpression(exp, {
                atIndex: t("atIndex"),
                missingChar: t("missingChar"),
                illegalChar: t("illegalChar")
            });
            setErrorMessage(errorMsg);

            if (errorMsg === "") {
                let sExp = simplify(exp, simplifyEnabled);

                if (sExp) {
                    expression.current = sExp;
                    setSearch(sExp.toString());

                    const table = document.getElementById("table");
                    const container = document.getElementById("main-container");

                    // if (table && container) { // TODO?
                    //     if (table.clientWidth > 600) {
                    //         tableClass.current = "break-out-of-container-lg";
                    //     }
                    //     fullWidthTable.current = table.clientWidth + 30 >= container.clientWidth;
                    // }
                }
            }
            else {
                setSearch("");
            }
        }
        else {
            setSearch("");
        }
    }

    function onTyping() {
        const el = (document.getElementById("truth-input") as HTMLInputElement | null);
        if (el && (el.value !== "") !== typing) {
            setTyping(el.value !== "");
        }
    }

    function clearSearch() {
        const el = (document.getElementById("truth-input") as HTMLInputElement | null);
        if (el) {
            el.value = "";
            setSearch(el.value);
            setErrorMessage("");
            setTyping(false);
            el.focus();
        }
    }

    React.useEffect(() => {

        let isMounted = true;

        function keyPress(e: KeyboardEvent) {
            if (isMounted && e.key === "Enter") {
                const el = document.getElementById("truth-input-button");
                if (el) {
                    el.click();
                }
            }
        }

        const el = document.getElementById("truth-input") as HTMLInputElement | null;

        if (el) {
            el.focus(); // Focuses search on load
            el.addEventListener("keypress", (e: KeyboardEvent) => keyPress(e));
        }
        return () => {
            if (el) {
                el.removeEventListener("keypress", (e: KeyboardEvent) => keyPress(e));
            }
            isMounted = false;
        };
    }, []);

    const { t } = useTranslation();

    return (
        <Layout title={ t("truthTables") } description={ t("truthTablesDesc") }>
            <div className={ "pt-2" }>
                <div className={ "pb-2" }>
                    <p>{ t("truthTableHowTo") }</p>
                    <p>{ t("not") }</p>
                    <p>{ t("and") }</p>
                    <p>{ t("or") }</p>
                    <p>{ t("implication") }</p>
                </div>
                <Input className={ `rounded-xl !pl-7 h-10 w-52 pr-8` }
                       id={ "truth-input" }
                       placeholder={ "¬A&B>C" }
                       onChange={ onTyping }
                       leading={ <Search className={ "pl-2 absolute" }/> }
                       trailing={
                           <>
                               {
                                   typing ?
                                       <button className={ "absolute left-44" }
                                               title={ t("clear") }
                                               onClick={ clearSearch }>
                                           <X/>
                                       </button> : null
                               }
                               <button id={ "truth-input-button" }
                                       title={ t("generate") + " (Enter)" }
                                       className={ "mx-1 px-1 border border-gray-500 rounded-xl shadow shadow-primaryPurple h-10" }
                                       onClick={ onClick }>
                                   { t("generate") }
                               </button>
                           </>
                       }
                />
                <span>{ t("simplify") }: </span>
                <MySwitch onChange={ setSimplifyEnabled } checked={ simplifyEnabled } title={ t("simplify") }
                          name={ t("toggleSimplify") }/>
                {
                    search !== "" ?
                        <>
                            {
                                simplifyEnabled ?
                                    <InfoBox className={ "w-fit mx-auto" }
                                             title={ t("output") + ":" }
                                             content={ search }/> : null
                            }
                            <TruthTable id={ "table" } // TODO center
                                        expression={ expression.current }
                                        className={ `my-2 mx-auto break-out-of-container-lg` }/>
                        </> : null
                }
                {
                    errorMessage !== "" ?
                        <InfoBox className={ "w-fit" }
                                 title={ t("inputError") }
                                 content={ errorMessage }
                                 error={ true }
                        /> : null
                }
            </div>
        </Layout>
    );
}

export const query = graphql`
    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
    }
`;

export default TruthTablePage;
