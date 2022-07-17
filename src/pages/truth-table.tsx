import * as React from "react";
import Layout from "../components/layout";
import Input from "../components/input";
import { graphql } from "gatsby";
import { Expression, Operator } from "../classes/expression";

interface TruthTablePage {

}

export function simplify(oldString: string): Expression {
    let exp = new Expression(null, Operator.none, null, {});

    for (let i = 0; i < oldString.length; i++) {
        let c = oldString.charAt(i);
        if (c === "&" || c === "|" || (c === "-" && oldString.charAt(i + 1) === ">")) {

            // Moves the entire expression over to the left side
            if (exp.operator !== Operator.none) {
                exp.exp1 = new Expression(exp.exp1, exp.operator, exp.exp2, {});
                exp.operator = Operator.none;
                exp.exp2 = null;
            }

            switch (c) {
                case "&":
                    exp.operator = Operator.and;
                    break;
                case "|":
                    exp.operator = Operator.or;
                    break;
                default:
                    exp.operator = Operator.implication;
            }

            if (exp.exp1 === null) {
                let stringEnd = -1;
                for (let j = i - 1; j >= 0; j--) {

                    if (oldString.charAt(j) === ")") {
                        stringEnd = j;
                    }
                    else if (oldString.charAt(j) === "(") {
                        exp.exp1 = simplify(oldString.substring(j + 1, stringEnd));
                    }
                    else if (stringEnd === -1) {
                        exp.exp1 = oldString.charAt(j);
                        break;
                    }
                }
            }

            if (exp.exp2 === null) {
                // Since implication has length 2, iterate to the final char
                if (exp.operator === Operator.implication) {
                    i++;
                }
                let stringStart = -1;
                for (let j = i + 1; j < oldString.length; j++) {
                    if (oldString.charAt(j) === "(") {
                        stringStart = j + 1;
                    }
                    else if (oldString.charAt(j) === ")") {
                        exp.exp2 = simplify(oldString.substring(stringStart, j));
                        i = j;
                        break;
                    }
                    else if (stringStart === -1) {
                        exp.exp2 = oldString.charAt(j);
                        break;
                    }
                }
            }
        }
    }
    console.log(exp);

    exp.absorption();
    exp.distributivity();
    exp.eliminationOfImplication();
    return exp;
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
    function onChange() {
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
                <Input className={ `rounded-xl` } id={ "truth-input" } onChange={ onChange }/>
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
