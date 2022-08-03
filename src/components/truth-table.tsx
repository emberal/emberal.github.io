import * as React from "react";
import { Expression } from "../classes/expression";

interface TruthTable {
    expression: Expression,
    className?: string,
    id?: string,
}

const TruthTable = ({ expression, className, id }: TruthTable) => {

    let expressions: Expression[] = [];

    expToArray(expression);

    /**
     * Takes an expression and pushes all parts of it to a one dimentional array
     * @param exp An Expression
     */
    function expToArray(exp: Expression | string | null) {

        if (exp && typeof exp !== "string") {
            expToArray(exp.exp1);
            expToArray(exp.exp2);

            // Checks if the expression is already in the array
            for (let i = 0; i < expressions.length; i++) {
                if (exp.equals(expressions[i])) {
                    return;
                }
            }
            expressions.push(exp);
        }
    }

    let numberOfAtomics = 0;

    for (let i = 0; i < expressions.length; i++) {
        if (expressions[i].isAtomic) {
            numberOfAtomics++;
        }
    }

    const truthMatrix: boolean[][] = new Array(numberOfAtomics);
    let changeIndex = Math.pow(2, truthMatrix.length) / 2;

    // Creates a helper matrix with the correct truth values, in order to get all the different combinations
    for (let i = 0; i < truthMatrix.length; i++) {
        let boolValue = true;
        let counter = 0;

        truthMatrix[i] = new Array(Math.pow(2, truthMatrix.length));

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

    // Creates a matrix with the body of the table, using the helper matrix truthMatrix to fill in the correct values.
    // The expressions that aren't atomic, uses the atomic values to see if they're truthy
    const tBodyMatrix: string[][] = new Array(expressions.length);
    for (let row = 0; truthMatrix.length > 0 && row < truthMatrix[0].length; row++) {
        tBodyMatrix[row] = [];

        for (let column = 0; column < expressions.length; column++) {
            if (expressions[column].isAtomic) {

                tBodyMatrix[row][column] = truthMatrix[truthMatrixRowIndex][truthMatrixColIndex] ? "T" : "F";

                // Iterates through the truthMatrix
                truthMatrixRowIndex = (truthMatrixRowIndex + 1) % truthMatrix.length;
                if (truthMatrixRowIndex === 0) {
                    truthMatrixColIndex = (truthMatrixColIndex + 1) % truthMatrix[truthMatrixRowIndex].length;
                }
            }
            else {
                // Finds the location of an expression, then checks the value
                const findExp = (exp: Expression | string | null): boolean => {
                    if (typeof exp === "object") {
                        for (let i = 0; i < expressions.length; i++) {

                            if (exp?.equals(expressions[i])) {
                                return  tBodyMatrix[row][i] === "T";
                            }
                        }
                    }
                    return false;
                };

                const left = findExp(expressions[column].exp1);
                const right = findExp(expressions[column].exp2);

                let boolExp = expressions[column].solve(left, right);

                if (expressions[column].leading.includes("!")) {
                    boolExp = !boolExp;
                }

                tBodyMatrix[row][column] = boolExp ? "T" : "F";
            }
        }
    }

    return (
        <table className={ `border border-gray-500 ${ className }` }
               id={ id }>
            <thead className={ "border-b-2 border-gray-500" }>
            <tr>
                {
                    expressions.map((exp: Expression, index: number) => (
                        <th key={ index } scope={ "col" } className={ "border border-gray-500" }>
                            <p className={ "w-fit px-2" }>{ exp.toString() }</p>
                        </th>
                    ))
                }
            </tr>
            </thead>
            <tbody>
            {
                tBodyMatrix.map((row: string[], rowIndex: number) => (
                    <tr key={ rowIndex } className={ "dark:hover:text-black hover:text-white" }>
                        {
                            tBodyMatrix[rowIndex].map((value: string, colIndex: number) => (
                                <td key={ colIndex } className={ `text-center border border-gray-500
                                ${ value === "T" ? "bg-green-500 dark:bg-green-700" : "bg-red-500 dark:bg-red-700" }` }>
                                    <p>{ value }</p>
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
};

export default TruthTable;
