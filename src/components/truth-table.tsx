import * as React from "react";
import { Expression } from "../classes/expression";
import { Component } from "../interfaces/interfaces";

export enum Hide {
    none,
    true,
    false,
}

export enum Sort {
    default,
    trueFirst,
    falseFirst,
}

interface TruthTable extends Component {
    expression: Expression,
    hide?: Hide,
    sort?: Sort,
}

// TODO export to excel or similar
export default function TruthTable(
    {
        expression,
        className,
        id,
        hide = Hide.none,
        sort = Sort.default
    }: TruthTable): JSX.Element {

    const expressions: Expression[] = [];

    expToArray(expression);

    /**
     * Takes an expression and pushes all parts of it to a one dimentional array
     * @param exp An Expression
     */
    function expToArray(exp: Expression | null) {

        if (exp) {
            expToArray(exp.left);
            expToArray(exp.right);

            let oppositeExists = false;

            // Checks if the expression is already in the array
            for (let i = 0; i < expressions.length; i++) {
                if (exp.equals(expressions[i])) {
                    return;
                }
                else if (exp.equalsAndOpposite(expressions[i])) {
                    oppositeExists = true;
                }
            }
            if (!oppositeExists && exp.numberOfChar(exp.leading, "¬") % 2 === 1) { // Pushes the 'not' expression
                expressions.push(new Expression({
                    left: exp.left,
                    operator: exp.operator,
                    right: exp.right,
                    atomic: exp.atomic,
                }));
            }
            expressions.push(exp);
        }
    }

    let numberOfAtomics = 0;

    for (let i = 0; i < expressions.length; i++) {
        if (expressions[i].isAtomic()) {
            let exists = false;
            for (let j = i - 1; !exists && j >= 0; j--) {

                // If the opposite expression already exists
                if (expressions[j].isAtomic() && expressions[i].equalsAndOpposite(expressions[j])) {
                    exists = true;
                }
            }
            if (!exists) {
                numberOfAtomics++;
            }
        }
    }

    const truthMatrix: boolean[][] = new Array(numberOfAtomics);
    const powerToLength = Math.pow(2, truthMatrix.length);
    let changeIndex = powerToLength / 2;

    // Creates a helper matrix with the correct truth values, in order to get all the different combinations
    for (let i = 0; i < truthMatrix.length; i++) {
        let boolValue = true;
        let counter = 0;

        truthMatrix[i] = new Array(powerToLength);

        for (let j = 0; j < truthMatrix[i].length; j++) {
            if (counter === changeIndex) {
                boolValue = !boolValue;
                counter = 0;
            }
            truthMatrix[i][j] = boolValue;
            counter++;
        }
        changeIndex /= 2;
    }

    let truthMatrixRowIndex = 0;
    let truthMatrixColIndex = 0;

    // TODO Add a new first column with a boolean value, if it's true, show the row, if it's false skip it
    // TODO So it would be possible to filter without rebuilding entire table
    // Creates a matrix with the body of the table, using the helper matrix truthMatrix to fill in the correct values.
    // The expressions that aren't atomic, uses the atomic values to see if they're truthy
    const tBodyMatrix: string[][] = new Array(expressions.length);
    for (let row = 0; truthMatrix.length > 0 && row < truthMatrix[0].length; row++) {
        tBodyMatrix[row] = [];

        // Finds the location of an expression, then checks the value
        function findExp(exp: Expression | null): boolean {
            for (let i = 0; i < expressions.length; i++) {

                if (exp?.equals(expressions[i])) {
                    return tBodyMatrix[row][i] === "T";
                }
            }
            return false;
        }

        for (let column = 0; column < expressions.length && row < tBodyMatrix.length; column++) {

            const exp = expressions[column];

            if (exp.isAtomic() && exp.numberOfChar(exp.leading, "¬") % 2 === 0) { // If not using 'not' operator

                tBodyMatrix[row][column] = truthMatrix[truthMatrixRowIndex][truthMatrixColIndex] ? "T" : "F";

                // Iterates through the truthMatrix
                truthMatrixRowIndex = (truthMatrixRowIndex + 1) % truthMatrix.length;

                if (truthMatrixRowIndex === 0) {
                    truthMatrixColIndex = (truthMatrixColIndex + 1) % truthMatrix[truthMatrixRowIndex].length;
                }
            }
            else if (exp.isAtomic()) { // If using 'not' operator
                tBodyMatrix[row][column] = findExp(
                    new Expression({
                        left: exp.left,
                        operator: exp.operator,
                        right: exp.right,
                        atomic: exp.atomic,
                    })
                ) ? "F" : "T";
            }
            else {

                const left = findExp(exp.left);
                const right = findExp(exp.right);

                let boolExp = exp.solve(left, right);

                if (exp.isNot()) {
                    boolExp = !boolExp;
                }

                if (exp === expressions[expressions.length - 1] && (hide === Hide.true && boolExp || hide === Hide.false && !boolExp)) {
                    tBodyMatrix.splice(row);
                }
                else {
                    tBodyMatrix[row][column] = boolExp ? "T" : "F";

                    if (exp === expressions[expressions.length - 1] && (sort === Sort.trueFirst && boolExp || sort === Sort.falseFirst && !boolExp)) {
                        let r = row;
                        while (r > 0 && (tBodyMatrix[r - 1] === undefined || tBodyMatrix[r - 1][expressions.length - 1] === (boolExp ? "F" : "T"))) {
                            const help = tBodyMatrix[r];
                            tBodyMatrix[r] = tBodyMatrix[r - 1];
                            tBodyMatrix[r - 1] = help;
                            r--;
                        }
                    }
                }
            }
        }
    }

    return (
        <table className={ `border-2 border-gray-500 border-collapse table z-10 ${ className }` } id={ id }>
            <thead>
            <tr>
                {
                    expressions?.map((exp: Expression, index: number) =>
                        <th key={ index } scope={ "col" }
                            className={ `default-bg text-center sticky top-0 [position:-webkit-sticky;]
                             outline outline-2 outline-offset-[-1px] outline-gray-500` /*TODO sticky header at the top of the screen*/ }>
                            <p className={ "px-2" }>{ exp.toString() }</p>
                        </th>
                    )
                }
            </tr>
            </thead>
            <tbody>
            {
                tBodyMatrix?.map((row: string[], rowIndex: number) =>
                    <tr key={ rowIndex } className={ "dark:hover:text-black hover:text-white" }>
                        {
                            tBodyMatrix[rowIndex]?.map((value: string, colIndex: number) =>
                                <td key={ colIndex } className={ `text-center border border-gray-500 last:underline
                                ${ value === "T" ? "bg-green-500 dark:bg-green-700" : "bg-red-500 dark:bg-red-700" }` }>
                                    <p>{ value }</p>
                                </td>
                            )
                        }
                    </tr>
                )
            }
            </tbody>
        </table>
    );
}
