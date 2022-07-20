import * as React from "react";
import Layout from "../components/layout";
import Input from "../components/input";
import { graphql } from "gatsby";
import { Expression } from "../classes/expression";
import { Operator } from "../classes/operator";
import { Search } from "react-feather";

interface TruthTablePage {

}

// TODO remember strength: !, &, |, ->

export function simplify(stringExp: string): string {
    return removeOuterParenthesis(simplifyRec(stringExp).toString());
}

function simplifyRec(stringExp: string): Expression {

    stringExp = removeOuterParenthesis(stringExp); // TODO use, or move?
    const end = stringExp.length;

    if (stringExp.length < 3) {
        return new Expression(stringExp, null, null, { isAtomic: true });
    }

    const center = getCenterOperatorIndex(stringExp);

    const exp = new Expression(simplifyRec(stringExp.substring(0, center.index)), center.operator,
        simplifyRec(stringExp.substring(center.index + 1, end)), { leading: "(", trailing: ")" }); // TODO only use parenthesis when needed to
    exp.absorption(); // TODO use all
    exp.distributivity(); // FIXME

    if (exp.operator === Operator.and) { // TODO improve
        exp.leading = "";
        exp.trailing = "";
    }
    return exp;
}

/**
 *
 * @param stringExp
 * @returns {number} The index position of the center operator based on the weight of the operators
 */
function getCenterOperatorIndex(stringExp: string): any {

    const arr: any[] = [];
    let index = 0;
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
        for (const value of Operator.getValues()) {
            if (value.operator === stringExp.charAt(i) && value.operator !== Operator.not.operator) {
                arr[index++] = { operator: value, index: i };
                break;
            }
        }
    }

    let op = arr[Math.floor(arr.length / 2)];

    if (arr.length % 2 === 0) {

        let secondOp = arr[Math.floor(arr.length / 2 - 1)];
        if (op.operator.weight > secondOp.operator.weight) {
            op = secondOp;
        }
    }
    return op;
}

function removeOuterParenthesis(stringExp: string): string {

    let remove = false;
    try {
        let index = 0;
        let operators = 0;

        if (stringExp.charAt(0) === "(") {
            remove = true;
        }
        while ( remove && (stringExp.charAt(index) === "(" || operators > 0) ) {
            if (stringExp.charAt(index) === "(") {
                operators++;
            }
            else if (stringExp.charAt(index) === ")") {
                operators--;
                if (operators === 0 && index !== stringExp.length - 1) {
                    remove = false;
                }
            }
            index++;
        }
    }
    catch (error) {
        console.error(error);
    }
    return remove ? stringExp.substring(1, stringExp.length - 1) : stringExp;
}

// TODO translate
// TODO create methods for each of the laws
// TODO generate truth tables
// TODO simplify truth expressions
// TODO F.eks A & B | B, check A & B first, since it can't be simplified, then check | B if B is in the previous expression
const TruthTablePage = ({}: TruthTablePage) => {

    const [search, setSearch] = React.useState("");

    /**
     * Updates the state of the current expression to the new search with all whitespace removed.
     * If the element is not found, reset.
     */
    function onClick() {
        let exp = (document.getElementById("truth-input") as HTMLInputElement | null)?.value;
        if (exp) {
            exp = exp.replace(/\s+/g, ""); // Replace All (/g) whitespace (/s) in the string
            setSearch(exp);
        }
        else {
            setSearch("");
        }
    }

    React.useEffect(() => {
        // console.log(search);
    }, [search]);

    return (
        <Layout title={ "Truth tables" } description={ "Generate truth tables or simplify" }>
            <div>
                <Input className={ `rounded-xl !pl-7 h-10` }
                       id={ "truth-input" }
                       leading={ <Search className={ "pl-2 absolute" }/> }
                       trailing={
                           <button
                               className={ "ml-1 px-1 bg-primaryPink text-black border border-gray-500 rounded-xl h-10" }
                               onClick={ onClick }>
                               Simplify
                           </button> }/>
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
