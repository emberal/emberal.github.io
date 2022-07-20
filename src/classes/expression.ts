import { Operator } from "./operator";

export class Expression {

    public constructor(exp1: Expression | string | null, operator: Operator | null, exp2: Expression | string | null, {
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
    operator: Operator | null;
    exp2: Expression | string | null;
    trailing: string;
    isAtomic: boolean;

    public equals(other: Expression | string): boolean {

        if (this === other) { // If they are the same object, or a string with the same content, return true
            return true;
        }
        else if (typeof this !== "string" && typeof other !== "string") {
            if (this.isAtomic && other.isAtomic && this.exp1 === other.exp1) {
                return true;
            }
            else if (!(this.isAtomic || other.isAtomic)) { // If neither is atomic

                if (((this.exp1 === other.exp1 && this.exp2 === other.exp2) ||
                    (this.exp1 === other.exp2 && this.exp2 === other.exp1)) && this.operator === other.operator) {
                    return true;
                }
            }
            // TODO check children of both objects
        }
        else { // One is a string while the other is an Expression

            const isEqual = (exp1: Expression | string, exp2: Expression | string): boolean => {
                return typeof exp1 === "string" && typeof exp2 !== "string" && exp1 === exp2.exp1;
            };

            if (isEqual(this, other) || isEqual(other, this)) {
                return true;
            }
        }
        return false;
    }

    public getAtomicValue(): string | null {
        if (this.isAtomic) {
            if (typeof this.exp1 === "string") {
                return this.exp1;
            }
            else {
                if (this.exp1) {
                    return this.exp1.getAtomicValue();
                }
            }
        }
        return null;
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
            if (typeof exp1 === "object" && typeof exp2 === "object") {
                if (exp1.exp1 === exp2.exp1) {
                    common = exp1.exp1;
                    this.exp2 = new Expression(exp1.exp2, this.operator, exp2.exp2, { leading: "(", trailing: ")" });
                    this.exp1 = common;
                    this.operator = this.operator === Operator.and ? Operator.or : Operator.and;
                }
                else if (exp1.exp1 === exp2.exp2) {
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
                let op = null;

                switch (this.operator) {
                    case Operator.and:
                        op = Operator.or;
                        break;
                    case Operator.or:
                        op = Operator.and;
                }

                if (op !== null) {
                    this.exp1 = new Expression(this._removeNot(this.exp1), op, this._removeNot(this.exp2), {
                        leading: "!(",
                        trailing: ")"
                    });
                    this.operator = null;
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

        if (this.exp1 !== null && this.exp2 !== null && typeof this.exp1 !== "string" && typeof this.exp2 !== "string") {

            const removeExp2 = () => { // TODO save exp1 in parent, if possible
                this.leading = "";
                this.operator = null;
                this.exp2 = null;
                this.trailing = "";
                this.isAtomic = true;
            };

            if (this.exp1?.isAtomic && this.exp2?.isAtomic && this.exp1.getAtomicValue() === this.exp2.getAtomicValue()) {
                removeExp2();
            }
            else if (this.exp1.isAtomic || this.exp2.isAtomic) { // eg: A | (A & B)

                const contains = (exp1: Expression, exp2: string): boolean => {

                    let correctOperators = this.operator === Operator.and && exp1.operator === Operator.or;
                    if (!correctOperators) {
                        correctOperators = this.operator === Operator.or && exp1.operator === Operator.and;
                    }

                    return correctOperators && (typeof exp1.exp1 !== "string" && typeof exp1.exp2 !== "string" &&
                        (exp2 === exp1.exp1?.getAtomicValue() || exp2 === exp1.exp2?.getAtomicValue()));
                };

                if (this.exp1.isAtomic) {
                    const atomic = this.exp1.getAtomicValue();
                    if (atomic !== null && contains(this.exp2, atomic)) {
                        removeExp2();
                    }
                }
                else {
                    const atomic = this.exp2.getAtomicValue();
                    if (atomic !== null && contains(this.exp1, atomic)) {
                        this.exp1 = this.exp2;
                        removeExp2();
                    }
                }
            }
            else { // Neither of the expressions are atomic, eg: (A & B) | (A & B)
                if (this.exp1.equals(this.exp2)) {
                    removeExp2();
                }
            }
        }
    }

    public toString(): string {
        let s = this.leading;
        if (this.exp1 !== null) {
            s += this.exp1.toString();

            if (this.operator !== null) {
                s += " " + this.operator.toString();

                if (this.exp2 !== null) {
                    s += " " + this.exp2.toString();
                }
            }
            s += this.trailing;
        }
        return s;
    }
}