import * as React from "react";
import { MouseEventHandler } from "react";
import Layout, { Links } from "../components/layout";
import Input from "../components/input";
import { graphql, HeadProps } from "gatsby";
import { Expression } from "../classes/expression";
import { Check, Download, Eye, EyeOff, Filter, Search, X } from "react-feather";
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
import { BookType, utils, write, writeFile } from "xlsx"
import MyDialog from "../components/MyDialog";

export default function TruthTablePage(): JSX.Element {

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
    function onClick(e: { preventDefault: () => void; }) {
        e.preventDefault(); // Stops the page from reloading onClick
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
            setSearch("");
            setErrorMessage("");
            setTyping(false);
            el.focus();
        }
    }

    React.useEffect(() => {
        // Focuses searchbar on load
        (document.getElementById("truth-input") as HTMLInputElement | null)?.focus();
    }, []);

    const tableId = "truth-table";
    const filenameId = "excel-filename";

    /**
     * Exports the generated truth table to an excel (.xlsx) file
     *
     * @param e
     * @param type The downloaded files extension. Default is "xlsx"
     * @param name The name of the file, excluding the extension. Default is "Truth Table"
     * @param dl
     * @returns {any}
     * @author SheetJS
     * @link https://cdn.sheetjs.com/
     * @license Apache 2.0 License
     * SheetJS Community Edition -- https://sheetjs.com/
     *
     * Copyright (C) 2012-present   SheetJS LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *       http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function exportToExcel(
        {
            type = "xlsx",
            name = "Truth Table",
            dl = false
        }: { type?: BookType, name?: string, dl?: boolean }): any {

        const element = document.getElementById(tableId);
        const wb = utils.table_to_book(element, { sheet: "sheet1" });
        return dl ?
            write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
            writeFile(wb, name + "." + type);
    }

    function _exportToExcel(): void {
        exportToExcel({
            name: (document.getElementById(filenameId) as HTMLInputElement | null)?.value
        });
    }

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
                        <MyDisclosure title={ t("howTo") }>
                            <p>{ t("truthTableHowTo") }</p>
                        </MyDisclosure>
                        <MyDisclosure title={ t("keywords") }>
                            <>
                                <p>{ t("not") }</p>
                                <p>{ t("and") }</p>
                                <p>{ t("or") }</p>
                                <p>{ t("implication") }</p>
                            </>
                        </MyDisclosure>
                    </MyDisclosureContainer>

                    <form className={ "flex-row-center" } onSubmit={ onClick } autoComplete={ "off" }>
                        <Input className={ `rounded-xl pl-7 h-10 w-52 sm:w-96 pr-8` }
                               id={ "truth-input" }
                               placeholder={ "¬A & B -> C" }
                               type={ "text" }
                               onChange={ onTyping }
                               leading={ <Search className={ "pl-2 absolute" }/> }
                               trailing={ typing ?
                                   <button className={ "absolute left-44 sm:left-[22rem]" }
                                           title={ t("clear") }
                                           type={ "reset" }
                                           onClick={ clearSearch }>
                                       <X/>
                                   </button> : undefined }
                        />
                        <input id={ "truth-input-button" }
                               title={ t("generate") + " (Enter)" }
                               type={ "submit" }
                               className={ "button" }
                               value={ t("generate") }/>
                    </form>

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
                                    children={
                                        hideOptions.map(option =>
                                            <div key={ option.value }>
                                                <SingleMenuItem onClick={ () => setHideValues(option) }
                                                                option={ option }
                                                                currentValue={ hideValues }/>
                                            </div>
                                        )
                                    } itemsClassName={ "right-0" }
                            />
                        </div>

                        <div className={ "h-min relative" }>
                            <MyMenu title={ t("sort") + " " + t("results") }
                                    button={ <Filter
                                        className={ sortValues.value === Sort.trueFirst ?
                                            "text-green-500" : sortValues.value === Sort.falseFirst ? "text-red-500" : "" }/> }
                                    children={
                                        sortOptions.map(option => (
                                            <div key={ option.value }>
                                                <SingleMenuItem option={ option } currentValue={ sortValues }
                                                                onClick={ () => setSortValues(option) }/>
                                            </div>
                                        ))
                                    }
                                    itemsClassName={ "right-0" }
                            />
                        </div>

                        <MyDialog title={ t("download") }
                                  description={ t("exportCurrentTable") }
                                  button={ <><p className={ "sr-only" }>{ t("download") }</p><Download/></> }
                                  callback={ _exportToExcel }
                                  acceptButtonName={ t("download") }
                                  cancelButtonName={ t("cancel") }
                                  buttonClasses={ `float-right` }
                                  buttonTitle={ t("exportCurrentTable") }>
                            <p>{ t("filename") }: ({ t("fileWillBeStoredInYourDownloads") })</p>
                            <Input className={ "border-rounded h-10" } id={ filenameId }/>
                        </MyDialog>

                    </Row>
                    {
                        errorMessage !== "" &&
                        <InfoBox className={ "w-fit text-center" }
                                 title={ t("inputError") }
                                 error={ true }>
                            <p>{ errorMessage }</p>
                        </InfoBox>
                    }
                    {
                        search !== "" && simplifyEnabled && Expression.orderOfOperations.length > 0 &&
                        <MyDisclosureContainer>
                            <MyDisclosure title={ t("showMeHowItsDone") }>
                                <table className={ "table" }>
                                    <tbody>
                                        {
                                            Expression.orderOfOperations.map((operation, index: number) => (
                                                <tr key={ index }
                                                    className={ "border-b border-dotted border-gray-500" }>
                                                    <td>{ index + 1 }:</td>
                                                    <td className={ "px-2" }>
                                                        {
                                                            diffChars(operation.before, operation.after).map(
                                                                (part, index: number) => (
                                                                    <span key={ index }
                                                                          className={
                                                                              `${ part.added && "bg-green-500 dark:bg-green-700 default-text-black-white" } 
                                                                    ${ part.removed && "bg-red-500 dark:bg-red-700 default-text-black-white" }` }>
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
                            </MyDisclosure>
                        </MyDisclosureContainer>
                    }
                </div>
                {
                    search !== "" &&
                    <>
                        <div className={ "flex flex-row" }>
                            {
                                simplifyEnabled &&
                                <InfoBox className={ "w-fit mx-auto pb-1 text-lg text-center" }
                                         title={ t("output") + ":" } id={ "expression-output" }>
                                    <p>{ search }</p>
                                </InfoBox>
                            }
                        </div>

                        <div className={ "flex justify-center m-2" }>
                            <div id={ "table" } className={ "h-[45rem] overflow-auto" }>
                                <TruthTable
                                    expression={ expression.current }
                                    hide={ hideValues.value }
                                    sort={ sortValues.value }
                                    className={ `relative w-max default-text-black-white` }
                                    id={ tableId }
                                />
                            </div>

                        </div>
                    </>
                }
            </div>
        </Layout>
    );
}

export function Head({ data }: HeadProps<Queries.TruthTablePageQuery>): JSX.Element {
    const locales = data?.locales?.edges[0]?.node?.data;
    let obj = undefined;
    if (locales) {
        obj = JSON.parse(locales);
    }
    return <SEO title={ obj?.truthTables } description={ obj?.truthTablesDesc }/>;
}

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

function SingleMenuItem({ option, currentValue, onClick }: SingleMenuItem): JSX.Element {
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
}
