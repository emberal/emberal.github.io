import * as React from "react";
import Layout from "../components/layout";
import Input from "../components/input";
import { graphql } from "gatsby";
import { Expression } from "../classes/expression";
import { Operator } from "../classes/operator";
import { Search } from "react-feather";
import TruthTable from "../components/truth-table";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { InfoBox } from "../components/output";
import MySwitch from "../components/switch";

interface TruthTablePage {

}

/**
 * Takes in a string representation of a truth expression, then simplified it after multiple known laws.
 * @param stringExp The string that will be attempted simplified
 * @param simplify If 'true' will simplify the expression as much as possible
 * @returns {string} A simplified string
 */
export function simplify(stringExp: string, simplify: boolean): Expression {
    let exp = simplifyRec(stringExp, simplify);
    if (!exp.leading.includes("!")) {
        exp.leading = "";
        exp.trailing = "";
    }
    return exp;
}

function simplifyRec(stringExp: string, simplify: boolean): Expression {

    // Basis
    if (stringExp.length < 3) {
        let leading = "";
        if (stringExp.includes("!")) {
            stringExp = stringExp.replace("!", "");
            leading = "!";
        }
        return new Expression(stringExp, null, null, { leading: leading, isAtomic: true });
    }

    let exp = new Expression(null, null, null, {});

    // TODO move this above the basis, so it removes outer parentheses
    if (stringExp[0] === "!" && isOuterParentheses(stringExp.substring(1, stringExp.length))) { // TODO what if several !!!!
        stringExp = stringExp.replace("!", "");
        exp.leading = "!";
    }

    const oldStringLen = stringExp.length;
    stringExp = removeOuterParentheses(stringExp);

    if (oldStringLen !== stringExp.length) {
        exp.leading += "(";
        exp.trailing += ")";
    }

    const center = getCenterOperatorIndex(stringExp);

    exp.left = simplifyRec(stringExp.substring(0, center.index), simplify); // Left
    exp.operator = center.operator;
    exp.right = simplifyRec(stringExp.substring(center.index + 1, stringExp.length), simplify); // Right

    if (simplify) {
        exp.laws();
    }
    // Moves expressions up the tree structure
    if (exp.right === null) {
        exp = exp.left;
    }
    else if (exp.left.isAtomic && typeof exp.left.left === "object") {
        exp.left = exp.left.left;
    }
    else if (exp.right.isAtomic && typeof exp.right.left === "object") {
        exp.right = exp.right.left;
    }
    return exp;
}

/**
 * Iterates through the string and finds the outer most center operator, if there are two, the one with the lowest weight is picked.
 * If they have the same weight the one to the right is picked.
 * @param stringExp A truth expression as a string, with no spaces between characters
 * @returns {number} The index position of the center operator based on the weight of the operators
 */
function getCenterOperatorIndex(stringExp: string): any {

    stringExp = removeOuterParentheses(stringExp);

    let index = 0;
    const operatorArray: any[] = [];
    for (let i = 0; i < stringExp.length; i++) {

        let operators = 0;
        try {
            // Skips all lines within parenthesis
            let c = stringExp.charAt(i);
            while ( c === "(" || operators > 0 ) {
                c = stringExp.charAt(i);
                if (c === "(") {
                    operators++;
                }
                else if (c === ")") {
                    operators--;
                }
                i++;
            }
        }
        catch (error) {
            console.error(error);
        }

        // Finds the matching Operator
        const operator = Operator.getOperator(stringExp.charAt(i));
        if (operator && operator !== Operator.not) {
            operatorArray[index++] = { operator: operator, index: i };
        }
    }

    let op = operatorArray[0];
    let allEqual = true;

    // Finds the rightmost operator with the lowest weight, if all the operators are equal, pick the center most
    for (let i = 1; i < operatorArray.length; i++) {
        if (operatorArray[i].operator.weight !== op.operator.weight) {
            allEqual = false;
        }
        if (operatorArray[i].operator.weight <= op.operator.weight) {
            op = operatorArray[i];
        }
    }
    return allEqual ? operatorArray[Math.floor(operatorArray.length / 2)] : op;
}

/**
 * TODO illegal if two or more operators are following eachother, or if ! is before an operator
 * @param stringExp
 */
function isLegalExpression(stringExp: string): string {

    const illegalCharError = (char: string, index: number): string => {
        error = `Illegal character "${ char }" at index: ${ index }`; // TODO translate
        console.error(error);
        return error;
    };

    const missingCharError = (char: string, index: number): string => {
        error = `Missing character "${ char }" at index: ${ index }`;
        console.error(error);
        return error;
    };

    const isParentheses = (char: string): boolean => {
        return char === "(" || char === ")";
    };

    let error = "";
    const stack: string[] = [];
    let isTruthValue = false;

    for (let i = 0; i < stringExp.length; i++) {
        const char = stringExp.charAt(i);
        if (char === "(") {
            stack.push(char);
        }
        if (char === ")") {
            const pop = stack.pop();
            if (pop === undefined || pop !== "(") {
                return illegalCharError(char, i);
            }
        }

        if (!Operator.isOperator(char) && !isParentheses(char)) {
            isTruthValue = true;
        }

        if (i > 0) {
            if (char === Operator.not.operator) {
                if (!Operator.isOperator(stringExp.charAt(i - 1)) || i === stringExp.length - 1) {
                    return illegalCharError(char, i);
                }
                continue;
            }
            // Return false if two operators are following eachother, but not !
            if (Operator.isOperator(char)) {
                if (Operator.isOperator(stringExp.charAt(i - 1)) || i === stringExp.length - 1 || isParentheses(stringExp.charAt(i - 1))) {
                    return illegalCharError(char, i);
                }
            }
            else if (!Operator.isOperator(char) && !Operator.isOperator(stringExp.charAt(i - 1)) &&
                !isParentheses(char) && !isParentheses(stringExp.charAt(i - 1))) {
                return illegalCharError(char, i);
            }
        }
    }
    if (!isTruthValue) {
        return missingCharError("A", stringExp.length);
    }
    if (stack.length > 0) {
        return missingCharError(")", stringExp.length);
    }

    return ""; // Legal expression
}

function removeOuterParentheses(stringExp: string): string {
    return isOuterParentheses(stringExp) ? stringExp.substring(1, stringExp.length - 1) : stringExp;
}

function isOuterParentheses(stringExp: string): boolean {
    let operators = 0;
    let is = false;

    if (stringExp.charAt(0) === "(") {
        is = true;
    }
    let index = 0;
    while ( is && (stringExp.charAt(index) === "(" || operators > 0) ) {
        if (stringExp.charAt(index) === "(") {
            operators++;
        }
        else if (stringExp.charAt(index) === ")") {
            operators--;
            if (operators === 0 && index !== stringExp.length - 1) {
                is = false;
            }
        }
        index++;
    }
    return is;
}

const TruthTablePage = ({}: TruthTablePage) => {

    const [simplifyEnabled, setSimplifyEnabled] = React.useState(true);
    /**
     * The state element used to store the simplified string, "empty string" by default
     */
    const [search, setSearch] = React.useState("");
    let expression = React.useRef(new Expression(null, null, null, {}));

    const [errorMessage, setErrorMessage] = React.useState("");

    /**
     * Updates the state of the current expression to the new search with all whitespace removed.
     * If the element is not found, reset.
     */
    function onClick() {
        let exp = (document.getElementById("truth-input") as HTMLInputElement | null)?.value;
        if (exp && exp !== "") {
            exp = exp.replace(/\s+/g, ""); // Replace All (/g) whitespace (/s) in the string

            const errorMsg = isLegalExpression(exp);
            if (errorMsg === "") {
                setErrorMessage("");

                let sExp = simplify(exp, simplifyEnabled);

                if (sExp) {
                    expression.current = sExp;
                    setSearch(sExp.toString());
                }
            }
            else {
                setErrorMessage(errorMsg);
                setSearch("");
            }
        }
        else {
            setSearch("");
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

        const el = document.getElementById("truth-input");
        if (el) {
            el.addEventListener("keypress", (e) => keyPress(e));
        }
        return () => {
            if (el) {
                el.removeEventListener("keypress", (e) => keyPress(e));
            }
            isMounted = false;
        };
    }, []);

    const { t } = useTranslation();

    return (
        <Layout title={ t("truthTables") } description={ t("truthTablesDesc") }>
            <div className={ "pt-2" }>
                <Input className={ `rounded-xl !pl-7 h-10 w-52` }
                       id={ "truth-input" }
                       placeholder={ "A&B>C" }
                       leading={ <Search className={ "pl-2 absolute" }/> }
                       trailing={
                           <>
                               <button id={ "truth-input-button" }
                                       title={ t("generate") + " (Enter)" }
                                       className={ "mx-1 px-1 border border-gray-500 rounded-xl shadow shadow-primaryPurple h-10" }
                                       onClick={ onClick }>
                                   { t("generate") }
                               </button>
                           </>
                       }
                />
                <span className={ "" }>{ t("simplify") }: </span>
                <MySwitch onChange={ setSimplifyEnabled } checked={ simplifyEnabled } title={ t("simplify") }
                          name={ t("toggleSimplify") }/>
                {
                    search !== "" ?
                        <>
                            {
                                simplifyEnabled ?
                                    <InfoBox className={ "w-fit" }
                                             title={ t("output") + ":" }
                                             content={ search }/> : null
                            }
                            <TruthTable expression={ expression.current }
                                        className={ "mt-2" }/> { /*TODO expand table when needed*/ }
                        </> : null
                }
                {
                    errorMessage !== "" ?
                        <InfoBox className={ "w-fit" }
                                 title={ t("inputError") }
                                 content={ errorMessage }
                                 error={ true }/> : null
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
