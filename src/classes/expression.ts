export enum Operator {
    none = "none",
    and = "&",
    or = "|",
    implication = "->",
}

export class Expression {

    public constructor(exp1: Expression | string | null, operator: Operator, exp2: Expression | string | null, {
        leading = "",
        trailing = "",
        isAtomic = false,
    }) {
        this.leading = leading;
        this.exp1 = exp1;
        this.operator = operator;
        this.exp2 = exp2;
        this.trailing = trailing;
        this.isAtomic = isAtomic;
    }

    leading: string;
    exp1: Expression | string | null;
    operator: Operator;
    exp2: Expression | string | null;
    trailing: string;
    isAtomic: boolean; // TODO set to true if it's an atomic value

    public equals(): boolean {

        if (this.exp1 === this.exp2) {
            return true;
        }
        if (this.exp1 === null || this.exp2 === null) {
            return false;
        }
        if (typeof this.exp1 !== "string" && this.exp1.exp1 === this.exp2) {
            return true;
        }
        if (typeof this.exp1 !== "string" && typeof this.exp2 !== "string" && this.exp1.exp1 === this.exp2.exp1) {
            return true;
        }
        return false;
    }

    public laws(): void {
        this.distributivity();
        this.deMorgansLaw();
        this.assosiativeLaw();
        this.commutativeLaw();
        this.eliminationOfImplication();
        this.absorption();
    }

    /**
     * @example A & B | B & C <=> B & (A | C)
     */
    public distributivity(): void {

        const x = (exp1: Expression, exp2: Expression) => {
            let common: Expression | string | null;
            if (typeof exp2 === "object") {
                if (typeof exp1 === "object" && exp1.exp1 === exp2.exp1) {
                    common = exp1.exp1;
                    this.exp2 = new Expression(exp1.exp2, this.operator, exp2.exp2, { leading: "(", trailing: ")" });
                    this.exp1 = common;
                    this.operator = this.operator === Operator.and ? Operator.or : Operator.and;
                }
                else if (typeof exp1 === "object" && exp1.exp1 === exp2.exp2) {
                    common = exp1.exp1;
                    this.exp2 = new Expression(exp1.exp2, this.operator, exp2.exp1, { leading: "(", trailing: ")" });
                    this.exp1 = common;
                    this.operator = this.operator === Operator.and ? Operator.or : Operator.and;
                }
            }
        }

        if (this.exp1 !== null && this.exp2 !== null && typeof this.exp1 === "object" && typeof this.exp2 === "object") {
            x(this.exp1, this.exp2);
            x(this.exp2, this.exp1);
        }
    }

    /**
     * @example !A & !B <=> !(A | B)
     */
    public deMorgansLaw(): void {
        if (this.exp1 !== null && this.exp2 !== null) {
            if (this._isNot(this.exp1) && this._isNot(this.exp2)) {
                let op = Operator.none;

                switch (this.operator) {
                    case Operator.and:
                        op = Operator.or;
                        break;
                    case Operator.or:
                        op = Operator.and;
                }

                if (op !== Operator.none) {
                    this.exp1 = new Expression(this._removeNot(this.exp1), op, this._removeNot(this.exp2), {
                        leading: "!(",
                        trailing: ")"
                    });
                    this.operator = Operator.none;
                    this.exp2 = null;
                }
            }
        }
    }

    private _isNot(exp: Expression | string): boolean {
        if (typeof exp === "string") {
            return exp.charAt(0) === "!";
        }
        return exp.leading === "!";
    }

    private _removeNot(exp: Expression | string): Expression | string {
        if (typeof exp === "string") {
            return this._removeNotFromString(exp);
        }
        return this._removeNotFromExp(exp);
    }

    private _removeNotFromString(exp: string): string {
        return exp.replace("!", "");
    }

    private _removeNotFromExp(exp: Expression): Expression {
        exp.leading = "";
        return exp;
    }

    public assosiativeLaw(): void {
        // TODO
    }

    public commutativeLaw(): void {
        // TODO
    }

    /**
     * @example A -> B <=> !A | B
     */
    public eliminationOfImplication(): void {
        if (this.exp1 !== null && this.operator === Operator.implication && this.exp2 !== null) {
            if (typeof this.exp1 === "string") {
                this.exp1 = "!" + this.exp1;
            }
            else {
                this.exp1.leading = "!(";
                this.exp1.trailing = ")";
            }
            this.operator = Operator.or;
        }
    }

    /**
     * @example A & (A | B) <=> A or A | (A & B) <=> A
     */
    public absorption(): void {

        if (this.exp1 !== null && this.exp2 !== null) {

            const oneStringOneExp = (exp1: string, exp2: Expression | null): void => {
                if (exp2 !== null && (exp1 === exp2.exp1 || exp1 === exp2.exp2)) {
                    if (exp2 !== this.exp2) {
                        this.exp1 = this.exp2;
                    }
                    this.exp2 = null;
                    this.operator = Operator.none;
                }
            };

            const bothString = (): void => {
                if (typeof this.exp1 === "string" && typeof this.exp2 === "string" && this.exp1 === this.exp2) {
                    this.operator = Operator.none;
                    this.exp2 = null;
                }
            }

            if (this.operator === Operator.and) {
                if (typeof this.exp1 === "string" && typeof this.exp2 !== "string" && this.exp2.operator === Operator.or) {
                    oneStringOneExp(this.exp1, this.exp2);
                }
                else if (typeof this.exp2 === "string" && typeof this.exp1 !== "string" && this.exp1.operator === Operator.or) {
                    oneStringOneExp(this.exp2, this.exp1);
                }
                bothString();
            }
            else {
                if (typeof this.exp1 === "string" && typeof this.exp2 !== "string" && this.exp2.operator === Operator.and) {
                    oneStringOneExp(this.exp1, this.exp2);
                }
                else if (typeof this.exp2 === "string" && typeof this.exp1 !== "string" && this.exp1.operator === Operator.and) {
                    oneStringOneExp(this.exp2, this.exp1);
                }
                bothString();
            }
        }
    }

    public toString(): string {
        let s = this.leading;
        if (this.exp1 !== null) {
            s += this.exp1.toString();

            if (this.operator !== Operator.none) {
                s += " " + this.operator.valueOf();

                if (this.exp2 !== null) {
                    s += " " + this.exp2.toString();
                }
            }
            s += this.trailing;
        }
        return s;
    }
}