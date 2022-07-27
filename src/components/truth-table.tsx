import * as React from "react";
import { Expression } from "../classes/expression";

interface TruthTable {
    expression: Expression,
    className?: string,
    id?: string,
}

const TruthTable = ({ expression, className, id }: TruthTable) => {

    let expressions: Expression[] = [];

    function expToArray(exp: Expression | string | null) { // TODO

        if (exp) {
            if (typeof exp !== "string") {
                expToArray(exp.exp1);
                expToArray(exp.exp2);

                expressions.push(exp);
            }
            else {

            }
        }
    }

    return (
        <div className={ `${ className }` } id={ id }>

        </div>
    )
};

export default TruthTable;
