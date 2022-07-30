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

    /*
        TODO count nr of atomic values
        2 atomic    3 atomic
        T T         T T T
        T F         T T F
        F T         T F T
        F F         T F F
                    F T T
                    F T F
                    F F T
                    F F F
     */

    // Matrix of length 8 x 3
    const list = new Array(3);
    for (let i = 0; i < list.length; i++) {
        list[i] = new Array(Math.pow(2, list.length));
    }

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
