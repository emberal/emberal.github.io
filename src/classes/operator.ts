interface Values {
    values?: string[],
}

// TODO remember strength: !, &, |, ->

export class Operator {

    public constructor(operator: string, weight: number, { values = [] }: Values) {
        this.operator = operator;
        this.weight = weight;
        this.values = values;
    }

    operator: string;
    weight: number;
    values: string[];

    static implication = new Operator(">", 0, { values: ["implication", "impliserer", "->", "=>"] });
    static or = new Operator("|", 1, { values: ["or", "eller", "V", "\\/"] });
    static and = new Operator("&", 2, { values: ["and", "og", "/\\"] });
    static not = new Operator("!", 3, { values: ["not", "ikke", "¬", "~", "-"] });

    public static getValues(): Operator[] {
        return [Operator.implication, Operator.or, Operator.and, Operator.not];
    }

    public static getOperator(operator: string): Operator | null {
        for (const value of Operator.getValues()) {
            if (value.operator === operator) {
                return value;
            }
        }
        return null;
    }

    public append(val: string): void {
        this.values[this.values.length] = val;
    }

    public toString(): string {
        return this.operator;
    }

}
