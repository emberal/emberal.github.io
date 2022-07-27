import * as React from "react";
import Layout from "../components/layout";
import Input from "../components/input";
import { graphql } from "gatsby";
import { Expression } from "../classes/expression";
import { Operator } from "../classes/operator";
import { Search } from "react-feather";

interface TruthTablePage {

}

/**
 * Takes in a string representation of a truth expression, then simplified it after multiple known laws.
 * @param stringExp The string that will be attempted simplified
 * @returns {string} A simplified string
 */
export function simplify(stringExp: string): string {
    // TODO parse string and remove all unnecessarry parenthesis, if needed
    const isLegal = isLegalExpression(stringExp);
    return isLegal ? removeOuterParentheses(simplifyRec(stringExp).toString()) : stringExp;
}

function simplifyRec(stringExp: string): Expression {

    // Basis
    if (stringExp.length < 3) {
        let leading = "";
        if (stringExp.includes("!")) {
            stringExp = stringExp.replace("!", "");
            leading = "!";
        }
        return new Expression(stringExp, null, null, { leading: leading, isAtomic: true });
    }

    const exp = new Expression(null, null, null, {});

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

    exp.exp1 = simplifyRec(stringExp.substring(0, center.index)); // Left
    exp.operator = center.operator;
    exp.exp2 = simplifyRec(stringExp.substring(center.index + 1, stringExp.length)); // Right

    exp.laws();
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
    const arr: any[] = [];
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
            arr[index++] = { operator: operator, index: i };
        }
    }

    let op = arr[Math.floor(arr.length / 2)];

    // If even, use the one with the lowest weight
    if (arr.length % 2 === 0) {

        let secondOp = arr[Math.floor(arr.length / 2 - 1)];
        if (op.operator.weight > secondOp.operator.weight) {
            op = secondOp;
        }
    }
    return op;
}

/**
 * TODO illegal if two or more operators are following eachother, or if ! is before an operator
 * @param stringExp
 */
function isLegalExpression(stringExp: string): boolean {

    let operators: string[] = [];
    for (let i = 0; i < Operator.getValues().length; i++) {
        if (Operator.getValues()[i] !== Operator.not) {
            operators[i] = Operator.getValues()[i].operator;
        }
    }

    // If the first or las index is an operator, return false
    if (operators.some((value) => value === stringExp.charAt(0) || value === stringExp.charAt(stringExp.length - 1))) {
        console.error("Illegal input!");
        return false;
    }

    for (let i = 1; i < stringExp.length - 1; i++) {
        if (stringExp.charAt(i) === Operator.not.operator) {
            continue;
        }
        if (Operator.isOperator(stringExp.charAt(i)) && Operator.isOperator(stringExp.charAt(i - 1))) {
            console.error("Illegal input!");
            return false;
        }
    }

    return true;
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

// TODO? neccessarry?
function removeUnnessesarryParentheses(stringExp: string): string {
    let operators = 0;
    let parenthesesAroundExp = false;

    let leftPIndex = -1;
    let removeParentheses = false;

    if (stringExp.charAt(0) === "(") {
        parenthesesAroundExp = true;
    }
    let index = 0;
    while ( stringExp.charAt(index) === "(" || operators > 0 ) {
        if (leftPIndex !== -1) {
            const operator = Operator.getOperator(stringExp.charAt(index));
            // TODO use Expression instead?
            switch (operator) {
                case Operator.and:
                    removeParentheses = true;
                    break;
                case Operator.or:
                case Operator.implication:
                case Operator.not:
            }
        }

        if (stringExp.charAt(index) === "(") {
            operators++;
            leftPIndex = index;
        }
        else if (stringExp.charAt(index) === ")") {
            operators--;
            if (leftPIndex !== -1 && removeParentheses) {
                stringExp = stringExp.substring(0, leftPIndex) + stringExp.substring(index + 1, stringExp.length);
            }
            if (operators === 0 && index !== stringExp.length - 1) {
                parenthesesAroundExp = false;
            }
        }
        index++;
    }
    return stringExp;
}

// TODO translate
// TODO generate truth tables
// TODO simplify truth expressions
const TruthTablePage = ({}: TruthTablePage) => {

    /**
     * The state element used to store the simplified string, "empty string" by default
     */
    const [search, setSearch] = React.useState("");

    /**
     * Updates the state of the current expression to the new search with all whitespace removed.
     * If the element is not found, reset.
     */
    function onClick() {
        let exp = (document.getElementById("truth-input") as HTMLInputElement | null)?.value;
        if (exp) {
            exp = exp.replace(/\s+/g, ""); // Replace All (/g) whitespace (/s) in the string
            setSearch(simplify(exp));
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

    return (
        <Layout title={ "Truth tables" } description={ "Generate truth tables or simplify" }>
            <div className={ "pt-2" }>
                <Input className={ `rounded-xl !pl-7 h-10` }
                       id={ "truth-input" }
                       placeholder={"A&B>C"}
                       leading={ <Search className={ "pl-2 absolute" }/> }
                       trailing={
                           <button id={ "truth-input-button" }
                                   className={ "ml-1 px-1 border border-gray-500 rounded-xl shadow shadow-primaryPurple h-10" }
                                   onClick={ onClick }>
                               Simplify
                           </button> }/>
                <p>Output: { search }</p>
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
