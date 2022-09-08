import * as React from "react";
import { MouseEventHandler } from "react";
import Layout, { Links } from "../components/layout";
import Input from "../components/input";
import { graphql, HeadProps } from "gatsby";
import { Expression } from "../classes/expression";
import { Check, Eye, EyeOff, Filter, Search, X } from "react-feather";
import TruthTable, { Hide, Sort } from "../components/truth-table";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { InfoBox, MyDisclosure, MyDisclosureContainer } from "../components/output";
import MySwitch from "../components/switch";
import { diffChars } from "diff";
import { isLegalExpression, replaceOperators, simplify } from "../classes/expression_utils";
import SEO from "../components/seo";
import { Menu } from "@headlessui/react";
import Row from "../components/row";
import MyMenu from "../components/menu";

interface TruthTablePage {

}

const TruthTablePage = ({}: TruthTablePage): JSX.Element => {

    const { t } = useTranslation();

    /**
     * Stores the boolean value of the simplify toggle
     */
    const [simplifyEnabled, setSimplifyEnabled] = React.useState(true);
    /**
     * The state element used to store the simplified string, "empty string" by default
     */
    const [search, setSearch] = React.useState("");
    const expression = React.useRef(new Expression({}));

    /**
     * If there's an error, it will be stored in this state, otherwise it will be "empty string"
     */
    const [errorMessage, setErrorMessage] = React.useState("");

    /**
     * If the searchbar is empty, this state is 'false', otherwise 'true'
     */
    const [typing, setTyping] = React.useState(false);

    const hideOptions = [
        { name: t("showAll") + " " + t("results"), value: Hide.none },
        { name: t("hide") + " " + t("true") + " " + t("results"), value: Hide.true },
        { name: t("hide") + " " + t("false") + " " + t("results"), value: Hide.false },
    ];

    const sortOptions = [
        { name: t("sortBy") + " " + t("default"), value: Sort.default },
        { name: t("sortBy") + " " + t("true") + " " + t("first"), value: Sort.trueFirst },
        { name: t("sortBy") + " " + t("false") + " " + t("first"), value: Sort.falseFirst },
    ];

    /**
     * The currently selected hide value, either 'none', 'true' or 'false'
     */
    const [hideValues, setHideValues] = React.useState(hideOptions[0]);

    /**
     * The currently selected sort value, either 'default', 'trueFirst' or 'falseFirst'
     */
    const [sortValues, setSortValues] = React.useState(sortOptions[0]);

    /**
     * Updates the state of the current expression to the new search with all whitespace removed.
     * If the element is not found, reset.
     */
    function onClick() {
        let exp = (document.getElementById("truth-input") as HTMLInputElement | null)?.value;
        if (exp && exp !== "") {
            exp = replaceOperators(exp);
            (document.getElementById("truth-input") as HTMLInputElement).value = exp;

            exp = exp.replace(/\s/g, ""); // Replace All (g) whitespace (\s) in the string

            const errorMsg = isLegalExpression(exp, {
                atIndex: t("atIndex"),
                missingChar: t("missingChar"),
                illegalChar: t("illegalChar"),
                expressionTooBig: t("expressionTooBig"),
            });
            setErrorMessage(errorMsg);

            if (errorMsg === "") {
                const sExp = simplify(exp, simplifyEnabled); // Magic happens

                if (sExp) {
                    expression.current = sExp;
                    setSearch(sExp.toString());
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

        // Resets the array on page load, if the page has been used before
        if (search === "") {
            Expression.orderOfOperations = [];
        }

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

    return (
        <Layout title={ t("truthTables") }
                description={ t("truthTablesDesc") }
                containerClass={ "!max-w-full overflow-x-hidden" }
                titleAndNavClass={ "max-w-2xl mx-auto" }
                footerClass={ "max-w-2xl left-1/2 -translate-x-1/2" }
                current={ Links.truthTable }>
            <div className={ "pt-2" } id={ "truth-content" }>
                <div className={ "max-w-2xl mx-auto" }>
                    <MyDisclosureContainer>
                        <MyDisclosure title={ t("howTo") } content={ <p>{ t("truthTableHowTo") }</p> }/>
                        <MyDisclosure title={ t("keywords") }
                                      content={
                                          <>
                                              <p>{ t("not") }</p>
                                              <p>{ t("and") }</p>
                                              <p>{ t("or") }</p>
                                              <p>{ t("implication") }</p>
                                          </>
                                      }
                        />
                    </MyDisclosureContainer>
                    <Input className={ `rounded-xl pl-7 h-10 w-52 sm:w-96 pr-8` }
                           id={ "truth-input" }
                           placeholder={ "¬A & B -> C" }
                           onChange={ onTyping }
                           leading={ <Search className={ "pl-2 absolute" }/> }
                           trailing={
                               <>
                                   {
                                       typing &&
                                       <button className={ "absolute left-44 sm:left-[22rem]" }
                                               title={ t("clear") }
                                               onClick={ clearSearch }>
                                           <X/>
                                       </button>
                                   }
                                   <button id={ "truth-input-button" }
                                           title={ t("generate") + " (Enter)" }
                                           className={ "mx-1 px-1 border-rounded border-gray-500 shadow shadow-primaryPurple h-10" }
                                           onClick={ onClick }>
                                       { t("generate") }
                                   </button>
                               </>
                           }
                    />
                    <Row className={ "my-1 gap-2" }>
                        <span className={ "h-min" }>{ t("simplify") }: </span>
                        <MySwitch onChange={ setSimplifyEnabled } checked={ simplifyEnabled } title={ t("simplify") }
                                  name={ t("toggleSimplify") } className={ "mx-1" }/>
                        <div className={ "h-min relative" }>
                            <MyMenu title={ t("filter") + " " + t("results") }
                                    button={
                                        hideValues.value === Hide.none ?
                                            <Eye className={ "mx-1" }/> :
                                            <EyeOff className={ `mx-1 ${ hideValues.value === Hide.true ?
                                                "text-green-500" : "text-red-500" }` }/>
                                    }
                                    items={
                                        hideOptions.map(option => (
                                            <div key={ option.value }>
                                                <SingleMenuItem onClick={ () => setHideValues(option) }
                                                                option={ option }
                                                                currentValue={ hideValues }/>
                                            </div>
                                        ))
                                    } itemsClassName={ "right-0" }
                            />
                        </div>
                        <div className={ "h-min relative" }>
                            <MyMenu title={ t("sort") + " " + t("results") }
                                    button={ <Filter
                                        className={ sortValues.value === Sort.trueFirst ?
                                            "text-green-500" : sortValues.value === Sort.falseFirst ? "text-red-500" : "" }/> }
                                    items={
                                        <>
                                            {
                                                sortOptions.map(option => (
                                                    <div key={ option.value }>
                                                        <SingleMenuItem option={ option } currentValue={ sortValues }
                                                                        onClick={ () => setSortValues(option) }/>
                                                    </div>
                                                ))
                                            }
                                        </>
                                    }
                                    itemsClassName={ "right-0" }
                            />
                        </div>
                    </Row>
                    {
                        errorMessage !== "" &&
                        <InfoBox className={ "w-fit" }
                                 title={ t("inputError") }
                                 content={ errorMessage }
                                 error={ true }
                        />
                    }
                    {
                        simplifyEnabled && Expression.orderOfOperations.length > 0 &&
                        <MyDisclosureContainer>
                            <MyDisclosure title={ t("showMeHowItsDone") } content={
                                <table className={ "table" }>
                                    <tbody>
                                    {
                                        Expression.orderOfOperations.map((operation: any, index: number) => (
                                            <tr key={ index } className={ "border-b border-dotted border-gray-500" }>
                                                <td>{ index + 1 }:</td>
                                                <td className={ "px-2" }>
                                                    {
                                                        diffChars(operation.before, operation.after).map(
                                                            (part, index: number) => (
                                                                <span key={ index }
                                                                      className={
                                                                          `${ part.added && "bg-green-500 dark:bg-green-700 text-black dark:text-white" } 
                                                                    ${ part.removed && "bg-red-500 dark:bg-red-700 text-black dark:text-white" }` }>
                                                                { part.value }
                                                            </span>
                                                            ))
                                                    }
                                                    { typeof window !== "undefined" && window.outerWidth <= 640 &&
                                                        <p>{ t("using") }: { operation.law }</p> }
                                                </td>
                                                { typeof window !== "undefined" && window.outerWidth > 640 &&
                                                    <td>{ t("using") }: { operation.law }</td> }
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            }/>
                        </MyDisclosureContainer>
                    }
                </div>
                {
                    search !== "" &&
                    <>
                        {
                            simplifyEnabled &&
                            <InfoBox className={ "w-fit mx-auto pb-1 text-lg" }
                                     title={ t("output") + ":" }
                                     content={ search }
                            />
                        }
                        <div className={ "flex justify-center m-2" }>
                            <div id={ "table" }
                                 className={ "h-[45rem] overflow-scroll" }>
                                <TruthTable
                                    expression={ expression.current }
                                    hide={ hideValues.value }
                                    sort={ sortValues.value }
                                    className={ `relative w-max default-text-black-white` }
                                />
                            </div>
                        </div>
                    </>
                }
            </div>
        </Layout>
    );
}

export const Head = ({ data }: HeadProps<Queries.TruthTablePageQuery>): JSX.Element => {
    const locales = data.locales.edges[0]?.node?.data;
    let obj = undefined;
    if (locales) {
        obj = JSON.parse(locales);
    }
    return <SEO title={ obj?.truthTables } description={ obj?.truthTablesDesc }/>;
};

export const query = graphql`
    query TruthTablePage($language: String!) {
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

interface SingleMenuItem {
    option: any,
    currentValue?: any,
    onClick: MouseEventHandler<HTMLDivElement>,
}

const SingleMenuItem = ({ option, currentValue, onClick }: SingleMenuItem) => {
    return (
        <Menu.Item>
            <div
                className={ `hover:underline cursor-pointer last:mb-1 flex-row-center` }
                onClick={ onClick }>
                <Check
                    className={ `${ currentValue.value !== option.value && "text-transparent" }` }/>
                { option.name }
            </div>
        </Menu.Item>
    );
};

export default TruthTablePage;
