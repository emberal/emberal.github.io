import { Operator } from "../classes/operator";

export type Theme = "auto" | "dark" | "light";

export type Expression = {
    leading: string,
    left: Expression | null,
    operator: Operator | null,
    right: Expression | null,
    trailing: string,
    atomic: string | null,
}

export type Table = boolean[][];

export type OrderOfOperations = {
    before: string,
    after: string,
    law: string,
}[];

export type FetchResult = {
    status: {
        code: number,
        message: string,
    },
    before: string,
    after: string,
    orderOperations: OrderOfOperations | null,
    expression: Expression | null,
    header: string[] | null,
    table: {
        truthMatrix: Table
    } | null
}
