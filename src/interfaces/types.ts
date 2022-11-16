export type Theme = "auto" | "dark" | "light";

export type Language = "auto" | "en" | "no" | "nb" | "nn";

export type Link = "home" | "projects" | "contactMe" | "links" | "pageNotFound" | "truthTable";

export type Expression = {
    leading: string,
    left: Expression | null,
    operator: Operator | null,
    right: Expression | null,
    trailing: string,
    atomic: string | null,
};

export type Operator = {
    operator: string,
    weight: number
};

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
        truthMatrix: Table,
    } | null,
};
