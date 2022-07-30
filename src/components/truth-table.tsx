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

    return (
        <div className={ `border border-gray-500 grid grid-flow-col w-fit ${ className }` } id={ id }>
            {
                expressions.map(exp => (
                    <div key={ exp.toString() /*TODO better key*/ }>
                        <span className={ "w-fit px-2 border border-gray-500" }>{ exp.toString() }</span>
                    </div>
                ))
            }
        </div>
    );
};

export default TruthTable;
