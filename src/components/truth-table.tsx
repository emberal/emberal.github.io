import * as React from "react";
import { Expression } from "../classes/expression";

interface TruthTable {
    expression: Expression,
    className?: string,
    id?: string,
}

const TruthTable = ({ expression, className, id }: TruthTable) => {

    // console.log(expression);
    let expressions: Expression[] = [];

    expToArray(expression);

    function expToArray(exp: Expression | string | null) {

        if (exp && typeof exp !== "string") {
            expToArray(exp.exp1);
            expToArray(exp.exp2);

            expressions.push(exp);
        }
    }

    const numberOfAtomics = Expression.getNumberOfAtomics(expression);

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
                // Finds the location of the first expression, then checks the value
                let left = false;
                const exp = expressions[column].exp1;
                if (typeof exp === "object") {
                    for (let i = 0; i < expressions.length; i++) {

                        if (exp?.equals(expressions[i])) {
                            left = tBodyMatrix[row][i] === "T";
                            break;
                        }
                    }
                }

                const right = tBodyMatrix[row][column - 1] === "T";
                let boolExp = expressions[column].solve(left, right);

                if (expressions[column].leading.includes("!")) {
                    boolExp = !boolExp;
                }

                tBodyMatrix[row][column] = boolExp ? "T" : "F";
            }
        }
    }

    return (
        <table className={ `border border-gray-500 rounded-lg overflow-auto ${ className }` }
               id={ id }>
            <thead className={ "border-b-2 border-gray-500" }>
            <tr>
                {
                    expressions.map((exp, index) => (
                        <th key={ index } className={ "border border-gray-500" }>
                            <p className={ "w-fit px-2" }>{ exp.toString() }</p>
                        </th>
                    ))
                }
            </tr>
            </thead>
            <tbody>
            {
                tBodyMatrix.map((row: string[], rowIndex: number) => (
                    <tr key={ rowIndex }>
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
