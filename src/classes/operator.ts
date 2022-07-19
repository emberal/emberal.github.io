export class Operator {

    public constructor(operator: string, weight: number, { values = [] }) {
        this.operator = operator;
        this.weight = weight;
        this.values = values;
    }

    operator: string;
    weight: number;
    values: string[];

    static implication = new Operator(">", 0, {});
    static or = new Operator("|", 1, {});
    static and = new Operator("&", 2, {});
    static not = new Operator("!", 3, {});

    public static getValues(): Operator[] {
        return [Operator.implication, Operator.or, Operator.and, Operator.not];
    }

    public append(val: string): void {
        this.values[this.values.length] = val;
    }

    public toString(): string {
        return this.operator;
    }

}
