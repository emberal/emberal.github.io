import { Expression } from "./expression";
import { Operator } from "./operator";

export function simplify(stringExp: string, simplify: boolean): Expression {
    let exp = simplifyRec(stringExp, simplify);
    if (!exp.leading.includes("¬")) {
        exp.leading = "";
        exp.trailing = "";
    }
    return exp;
}

function simplifyRec(stringExp: string, simplify: boolean): Expression {

    let exp = new Expression(null, null, null, {});

    // Basis
    if (isAtomic(stringExp)) {
        while ( stringExp.includes("¬") ) {
            stringExp = stringExp.replace("¬", "");
            exp.leading += "¬";
        }
        exp.left = stringExp;
        exp.isAtomic = true;
        if (simplify) {
            exp.mergeNot();
        }
        return exp;
    }

    // TODO move this above the basis?
    while ( stringExp[0] === "¬" && isOuterParentheses(stringExp.substring(1, stringExp.length)) ) {
        stringExp = stringExp.replace("¬", "");
        exp.leading += "¬";
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
    let rightIndex = 1;
    if (exp.operator === Operator.implication) {
        rightIndex = 2;
    }
    exp.right = simplifyRec(stringExp.substring(center.index + rightIndex, stringExp.length), simplify); // Right

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

    exp.commutativeLaw(); // Sorts the expression
    return exp;
}

function isAtomic(exp: string): boolean {

    const regex = new RegExp(/[a-zA-ZæøåÆØÅ0-9\[\]]/);
    let atomic = regex.test(exp);
    let nrOfAtomics = 0;
    let isSquareBracket = false;

    for (let i = 0; atomic && i < exp.length; i++) {
        if (exp.charAt(i) === "[") {
            isSquareBracket = true;
        }
        else if (exp.charAt(i) === "]") {
            nrOfAtomics++;
            isSquareBracket = false;
            if (nrOfAtomics > 1) {
                atomic = false;
            }
        }
        else if (regex.test(exp.charAt(i)) && !isSquareBracket) {
            nrOfAtomics++;
            if (nrOfAtomics > 1) {
                atomic = false;
            }
        }
    }
    return atomic;
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

        let parentheses = 0;
        try {
            // Skips all lines within parenthesis
            let c = stringExp.charAt(i);
            while ( c === "(" || c === "[" || parentheses > 0 ) {
                c = stringExp.charAt(i);
                if (c === "(" || c === "[") {
                    parentheses++;
                }
                else if (c === ")" || c === "]") {
                    parentheses--;
                }
                i++;
            }
        }
        catch (error) {
            console.error(error);
        }

        let following = "";
        if (stringExp.charAt(i) === "-") {
            following = stringExp.charAt(i + 1);
        }

        // Finds the matching Operator
        const operator = Operator.getOperator(stringExp.charAt(i) + following);
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

interface isLegalExpressionTranslations {
    illegalChar?: string,
    missingChar?: string,
    atIndex?: string
}

/**
 * Checks if a string is a valid truth expression. If the string is valid, it will return "empty string", otherwise an error message
 * It is not true if either of the following are present.
 * More than one operator in a row.
 * More than one atomic value in a row.
 * Not operator prior to another different operator.
 * The parentheses do not match.
 * @param stringExp A string in the style of a truth expression
 * @param illegalChar A string message for illegal characters
 * @param missingChar A string message for missing characters
 * @param atIndex A string message for displaying index
 */
export function isLegalExpression(stringExp: string, {
    illegalChar = "Illegal character",
    missingChar = "Missing character",
    atIndex = "at index:"
}: isLegalExpressionTranslations): string {

    const illegalCharError = (char: string, index: number): string => {
        error = `${ illegalChar } "${ char }" ${ atIndex } ${ index }`;
        console.error(error);
        return error;
    };

    const missingCharError = (char: string, index: number): string => {
        error = `${ missingChar } "${ char }" ${ atIndex } ${ index }`;
        console.error(error);
        return error;
    };

    const isParentheses = (char: string): boolean => {
        return char === "(" || char === ")";
    };

    const regex = new RegExp(/[^a-zA-ZæøåÆØÅ0-9()&|¬\->\[\]]|^->|]\[|\)\[|\)\(|\(\)/);
    const match = stringExp.match(regex);
    if (match) {
        return illegalCharError(match[0], stringExp.indexOf(match[0]));
    }
    let error = "";
    const stack: string[] = [];
    let isTruthValue = false;
    let insideSquare = false;

    for (let i = 0; i < stringExp.length; i++) {
        const char = stringExp.charAt(i);

        if (char === "-" && stringExp.charAt(i + 1) !== ">") {
            return illegalCharError(char, i);
        }
        else if (char === "(" || char === "[") {
            stack.push(char)
            if (char === "[") {
                insideSquare = true;
            }
        }
        else if (char === ")" || char === "]") {
            const pop = stack.pop();
            if (char === "]") {
                insideSquare = false;
            }
            if (char === ")" && pop !== "(" || char === "]" && pop !== "[") {
                return illegalCharError(char, i);
            }
        }
        else if (!Operator.isOperator(char) && !isParentheses(char)) {
            isTruthValue = true;
        }

        if (i > 0 && !insideSquare) {
            const prevChar = stringExp.charAt(i - 1);

            if (Operator.not.operator === char) {
                if (!Operator.isOperator(stringExp.charAt(i - 1)) && prevChar !== "(" || i === stringExp.length - 1) {
                    return illegalCharError(char, i);
                }
                continue;
            }
            let following = "";
            if (char === "-") {
                following = stringExp.charAt(i + 1);
            }
            // Return false if two operators are following eachother, but not ¬
            if (Operator.isOperator(char + following)) {
                if (Operator.isOperator(prevChar) || prevChar === "(" || i === stringExp.length - 1) {
                    return illegalCharError(char, i);
                }
            }
            else if (!(char === "]" || Operator.isOperator(char) || Operator.isOperator(prevChar) ||
                isParentheses(char) || isParentheses(prevChar))) {
                return illegalCharError(char, i);
            }
        }
    }
    if (!isTruthValue) {
        return missingCharError("A", stringExp.length);
    }
    if (stack.length > 0) {
        return missingCharError(stack.pop() === "(" ? ")" : "]", stringExp.length);
    }

    return ""; // Legal expression
}

function removeOuterParentheses(stringExp: string): string {
    return isOuterParentheses(stringExp) ? stringExp.substring(1, stringExp.length - 1) : stringExp;
}

function isOuterParentheses(stringExp: string): boolean {
    let operators = 0;
    let is = false;
    let index = 0;

    while ( stringExp.charAt(index) === "¬" ) {
        index++;
    }

    if (stringExp.charAt(index) === "(") {
        is = true;
    }
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

export function replaceOperators(exp: string): string {

    const regex = (start: number, end: number) => {
        if (start < end) {
            for (const operator of Operator.getValues()) {
                if (operator.regex) {
                    exp = exp.substring(0, start) +
                        exp.substring(start, end).replace(operator.regex, operator.operator) +
                        exp.substring(end, exp.length);
                }
            }
        }
    };

    let startIndex = 0;

    for (let i = 1; i < exp.length; i++) {
        if (exp.charAt(i) === "[") {
            regex(startIndex, i);
        }
        else if (exp.charAt(i) === "]") {
            startIndex = i + 1;
        }
    }
    regex(startIndex, exp.length);

    return exp;
}
