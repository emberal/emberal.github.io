import * as React from "react";
import { Expression } from "../classes/expression";

interface TruthTable {
    expression: Expression | null,
    className?: string,
    id?: string,
}

const TruthTable = ({ expression, className, id }: TruthTable) => {

    let expressions: Expression[] = [];

    expToArray(expression);

    function expToArray(exp: Expression | string | null) {

        if (exp) {
            if (typeof exp !== "string") {
                expToArray(exp.exp1);
                expToArray(exp.exp2);

                expressions.push(exp);
            }
        }
    }

    const numberOfAtomics = Expression.getNumberOfAtomics(expression);

    const matrix = new Array(numberOfAtomics);
    let changeIndex = Math.pow(2, matrix.length) / 2;

    for (let i = 0; i < matrix.length; i++) {
        let boolValue = true;
        let counter = 0;

        matrix[i] = new Array(Math.pow(2, matrix.length));

        for (let j = 0; j < matrix[i].length; j++) {
            if (counter === changeIndex) {
                boolValue = !boolValue;
                counter = 0;
            }
            matrix[i][j] = boolValue;
            counter++;
        }
        changeIndex /= 2;
    }

    // console.log(matrix);

    return (
        <div className={ `border border-gray-500 rounded-lg overflow-auto grid grid-flow-col w-fit ${ className }` }
             id={ id }>
            {
                expressions.map((exp, index) => (
                    <div key={ index }>
                        <span className={ "w-fit px-2 border border-gray-500" }>{ exp.toString() }</span>
                    </div>
                ))
            }
        </div>
    );
};

export default TruthTable;
