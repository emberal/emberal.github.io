import * as React from "react";
import { Component } from "../interfaces/interfaces";

interface TruthTable extends Component {
    table: any,
}

export default function TruthTable(
    {
        table,
        className,
        id,
    }: TruthTable): JSX.Element {

    return (
        <table className={ `border-2 border-gray-500 border-collapse table z-10 ${ className }` } id={ id }>
            {/*<thead>*/}
            {/*    <tr>*/}
            {/*        {*/}
            {/*            table?.map((exp: Expression, index: number) =>*/}
            {/*                <th key={ index } scope={ "col" }*/}
            {/*                    className={ `default-bg text-center sticky top-0 [position:-webkit-sticky;]*/}
            {/*                 outline outline-2 outline-offset-[-1px] outline-gray-500` /*TODO sticky header at the top of the screen \}>*/}
            {/*                    <p className={ "px-2" }>{ exp.toString() }</p>*/}
            {/*                </th>*/}
            {/*            )*/}
            {/*        }*/}
            {/*    </tr>*/}
            {/*</thead>*/}
            <tbody>
                {
                    table?.map((row: boolean[], rowIndex: number) =>
                        <tr key={ rowIndex } className={ "dark:hover:text-black hover:text-white" }>
                            {
                                row?.map((value: boolean, colIndex: number) =>
                                    <td key={ colIndex } className={ `text-center border border-gray-500 last:underline
                                ${ value ? "bg-green-500 dark:bg-green-700" : "bg-red-500 dark:bg-red-700" }` }>
                                        <p>{ value ? "T" : "F" }</p>
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
