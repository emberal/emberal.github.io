import * as React from "react";
import Layout from "../components/layout";
import Input from "../components/input";
import { graphql } from "gatsby";
import { Expression } from "../classes/expression";
import { Operator } from "../classes/operator";

interface TruthTablePage {

}

// TODO remember strength: !, &, |, ->

// TODO test alt method, find center operator, then divide left side and ride side to each expression, then recursion on both sides
// (A & B) | C    A & B & C & D   A | (B & C)   (A | B) -> C   (A | A) -> (B & C) -> (C | A)   A -> (((B & C) -> C) | A)
//         ^            ^           ^                   ^                         ^              ^
// TODO if there are 2 center operators, pick the one with lowest weight

export function simplify(stringExp: string): Expression | string {
    return simplifyRec(stringExp, 0, stringExp.length);
}

function simplifyRec(stringExp: string, start: number, end: number): Expression | string {

    stringExp = removeOuterParenthesis(stringExp);

    if (stringExp.length <= 1) {
        return stringExp;
    }

    const center = getCenterOperatorIndex(stringExp);

    return new Expression(simplifyRec(stringExp.substring(start, center.index), start, center.index), center.operator,
        simplifyRec(stringExp.substring(center.index + 1, end), center.index + 1, end), {
            leading: "(",
            trailing: ")"
        });
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

        const stack = [];
        try {
            let c = stringExp.charAt(i);
            while ( c === "(" || stack.length > 0 ) {
                c = stringExp.charAt(i);
                if (c === "(") {
                    stack.push("(");
                }
                else if (c === ")") {
                    stack.pop();
                }
                i++;
            }
        }
        catch (error) {
            console.error(error);
        }

        for (const value of Operator.getValues()) {
            if (value.operator === stringExp.charAt(i)) {
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
        const stack = [];

        if (stringExp.charAt(0) === "(") {
            remove = true;
        }
        while ( remove && (stringExp.charAt(index) === "(" || stack.length > 0) ) {
            if (stringExp.charAt(index) === "(") {
                stack.push("(");
            }
            else if (stringExp.charAt(index) === ")") {
                stack.pop();
                if (stack.length === 0 && index !== stringExp.length - 1) {
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

// export function simplify(oldString: string): Expression {
//     let exp = new Expression(null, OperatorEnum.none, null, {});
//
//     // TODO check for parenthesis that spans the entire expression, and remove it, ex: (A&B) => A&B, stack: if the stack is not empty before the end, remove the first and last char
//     // TODO check for illegal inputs, and throw errors
//
//     for (let i = 0; i < oldString.length; i++) {
//         let c = oldString.charAt(i);
//         if (isOperator(c, oldString.charAt(i + 1))) {
//
//             // Moves the entire expression over to the left side
//             if (exp.operator !== OperatorEnum.none) {
//                 exp.exp1 = new Expression(exp.exp1, exp.operator, exp.exp2, {});
//                 exp.operator = OperatorEnum.none;
//                 exp.exp2 = null;
//             }
//
//             switch (c) {
//                 case "&":
//                     exp.operator = OperatorEnum.and;
//                     break;
//                 case "|":
//                     exp.operator = OperatorEnum.or;
//                     break;
//                 default:
//                     exp.operator = OperatorEnum.implication;
//             }
//
//             if (exp.exp1 === null) {
//                 let stringEnd = -1;
//                 for (let j = i - 1; j >= 0; j--) {
//
//                     if (oldString.charAt(j) === ")") {
//                         stringEnd = j;
//                     }
//                     else if (oldString.charAt(j) === "(") {
//                         exp.exp1 = simplify(oldString.substring(j + 1, stringEnd));
//                         if (oldString.charAt(j - 1) === "!") {
//                             exp.exp1.leading = "!";
//                         }
//                         break;
//                     }
//                     else if (stringEnd === -1) {
//                         exp.exp1 = oldString.charAt(j);
//                         if (oldString.charAt(j - 1) === "!") {
//                             exp.exp1 = "!" + exp.exp1;
//                         }
//                         break;
//                     }
//                 }
//             } // if
//
//             if (exp.exp2 === null) {
//                 // Since implication has length 2, iterate to the final char
//                 if (exp.operator === OperatorEnum.implication) {
//                     i++;
//                 }
//                 let stringStart = -1;
//                 for (let j = i + 1; j < oldString.length; j++) { // TODO use stack to count parenthesis
//                     if (oldString.charAt(j) === "(") {
//                         stringStart = j + 1;
//                     }
//                     else if (oldString.charAt(j) === ")") {
//                         exp.exp2 = simplify(oldString.substring(stringStart, j));
//                         if (oldString.charAt(j - 1) === "!") {
//                             exp.exp2.leading = "!";
//                         }
//                         i = j;
//                         break;
//                     }
//                     else if (stringStart === -1 && oldString.charAt(j) !== "!") {
//                         exp.exp2 = oldString.charAt(j);
//                         if (oldString.charAt(j - 1) === "!") {
//                             exp.exp2 = "!" + exp.exp2;
//                         }
//                         break;
//                     }
//                 } // for
//             } // if
//         }
//         // else if (c === "!") {
//         //     exp.leading = c;
//         //     let stringStart = -1;
//         //
//         //     for (let j = i + 1; j < oldString.length; j++) {
//         //
//         //         if (oldString.charAt(j) === "(") {
//         //             stringStart = j + 1;
//         //         }
//         //         else if (oldString.charAt(j) === ")") {
//         //             exp.exp1 = simplify(oldString.substring(stringStart, j));
//         //             exp.exp1.leading = "(";
//         //             exp.exp1.trailing = ")";
//         //             i = j;
//         //             break;
//         //         }
//         //         else if (stringStart === -1) {
//         //             exp.exp1 = oldString.charAt(j);
//         //             break;
//         //         }
//         //     } // for
//         // } // else if
//     } // for
//
//     function isOperator(char: string, nextChar: string): boolean {
//         return char === "&" || char === "|" || (char === "-" && nextChar === ">");
//     }
//
//     // console.log(exp);
//
//     exp.laws();
//     return exp;
// }

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
