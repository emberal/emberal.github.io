interface Values {
    values?: string[],
    regex?: RegExp,
}

// Remember strength: ¬, ⋀, ⋁, ➔
// TODO add more operators: XOR, NOR...
export class Operator {

    public constructor(operator: string, weight: number, { values = [], regex }: Values) {
        this.operator = operator;
        this.weight = weight;
        this.values = values;
        this.regex = regex;
    }

    operator: string;
    weight: number;
    values: string[];
    regex?: RegExp;

    static implication = new Operator("➔", 0, {
        values: ["->", "implication", "imp", "impliserer", "=>"],
        regex: /->|=>|implication|impliserer|imp+/ig
    });
    static or = new Operator("⋁", 1, {
        values: ["|", "or", "eller", "intersection", "snitt", "\\/"],
        regex: /\||or|eller|intersection|snitt|\\\/+/ig
    });
    static and = new Operator("⋀", 2, {
        values: ["&", "and", "og", "union", "/\\"],
        regex: /&|and|og|union|\/\\+/ig
    });
    static not = new Operator("¬", 3, {
        values: ["not", "ikke", "!", "~"],
        regex: /[!~]|not|ikke+/ig
    });

    public static getValues(): Operator[] {
        return [Operator.implication, Operator.or, Operator.and, Operator.not];
    }

    public getOperatorValues(): string[] {
        const values = this.values;
        values.push(this.operator);
        return values;
    }

    public static getOperator(operator: string): Operator | null {
        for (const value of Operator.getValues()) {
            if (value.operator === operator) {
                return value;
            }
        }
        return null;
    }

    public static isOperator(stringOp: string): boolean {
        return this.getValues().some((operator: Operator) => operator.operator === stringOp ||
            operator.values.some((value: string) => value === stringOp));
    }

    public toString(): string {
        return this.operator;
    }

}
