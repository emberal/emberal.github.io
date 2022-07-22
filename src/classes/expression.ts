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

    // TODO add weight to each Expression used to compare and sort, using the "value" of noth child Expressions, atomic uses string value

    private _isString({
                          exp1 = null,
                          exp2 = null
                      }: { exp1: Expression | string | null, exp2: Expression | string | null }): boolean {
        let isString = false;
        if (exp1 !== null) {
            isString = typeof exp1 === "string";
        }
        if (exp2 !== null) {
            isString = typeof exp2 === "string";
        }
        return isString;
    }

    /**
     * Compared an object with an other object and returns true if they contain the same values
     * @param other The object this is compared to
     * @returns {boolean} If this and the other expressions are the same returns 'true' (regardless or order) otherwise 'false'
     */
    public equals(other: Expression | string): boolean {

        if (this === other) { // If they are the same object, or a string with the same content, return true
            return true;
        }
        else if (typeof this !== "string" && typeof other !== "string") {
            if (this.isAtomic && other.isAtomic && this.exp1 === other.exp1) {
                return true;
            }
            else if (!(this.isAtomic || other.isAtomic)) { // If neither is atomic

                if (this._isString({ exp1: this.exp1, exp2: this.exp2 }) && this._isString({
                    exp1: other.exp1,
                    exp2: other.exp2
                })) {

                    if (((this.exp1 === other.exp1 && this.exp2 === other.exp2) ||
                        (this.exp1 === other.exp2 && this.exp2 === other.exp1)) && this.operator === other.operator) {
                        return true;
                    }
                }
                else if (!(this._isString({ exp1: this.exp1, exp2: this.exp2 }) || this._isString({
                    exp1: other.exp1,
                    exp2: other.exp2
                }))) {
                    if (this.exp1 && this.exp2 && other.exp1 && other.exp2) {

                        if ((this.exp1 as Expression).equals(other.exp1) || (this.exp1 as Expression).equals(other.exp2) ||
                            (this.exp2 as Expression).equals(other.exp2)) {
                            return true;
                        }
                    }
                }
            }
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
        if (typeof this.exp1 === "string") {
            return this.exp1;
        }
        else if (this.exp1 && this.exp1.isAtomic) {
            return this.exp1.getAtomicValue();
        }
        return null;
    }

    public laws(): void {
        this.absorption();
        this.eliminationOfImplication();
        this.deMorgansLaw();
        this.assosiativeLaw();
        this.commutativeLaw();
        this.distributivity();
        this.mergeNot();
    }

    /**
     * @example A & B | B & C <=> B & (A | C)
     */
    public distributivity(): void {

        if (this.exp1 && this.exp2 && typeof this.exp1 === "object" && typeof this.exp2 === "object" &&
            !this.exp1.isAtomic && !this.exp2.isAtomic) {

            const setObjects = (left: Expression | string, right: Expression | string, common: Expression | string | null): void => {
                this.exp2 = new Expression(left, this.operator, right, {});
                this.exp1 = new Expression(common, null, null, { isAtomic: true });
                this.operator = this.operator === Operator.and ? Operator.or : Operator.and;
                if (this.exp2.operator !== Operator.and) {
                    this.exp2.leading = "(";
                    this.exp2.trailing = ")";
                }
            };

            // TODO prettify!
            if (this.exp1.exp1 && this.exp1.exp2 && this.exp2.exp1 && this.exp2.exp2) {
                if ((this.exp1.exp1 as Expression).getAtomicValue() === (this.exp2.exp1 as Expression).getAtomicValue()) {
                    setObjects(this.exp1.exp2, this.exp2.exp2, this.exp1.exp1);
                }
                else if ((this.exp1.exp1 as Expression).getAtomicValue() === (this.exp2.exp2 as Expression).getAtomicValue()) {
                    setObjects(this.exp1.exp2, this.exp2.exp1, this.exp1.exp1);
                }
                else if ((this.exp1.exp2 as Expression).getAtomicValue() === (this.exp2.exp1 as Expression).getAtomicValue()) {
                    setObjects(this.exp1.exp1, this.exp2.exp2, this.exp1.exp2);
                }
                else if ((this.exp1.exp2 as Expression).getAtomicValue() === (this.exp2.exp2 as Expression).getAtomicValue()) {
                    setObjects(this.exp1.exp1, this.exp2.exp1, this.exp1.exp2);
                }
            }
        }
    }

    /**
     * @example !A & !B <=> !(A | B)
     */
    public deMorgansLaw(): void {

        if (this.exp1 && this.exp2) {

            if (this._isNot(this.exp1) && this._isNot(this.exp2)) {
                let newOperator = null;

                switch (this.operator) {
                    case Operator.and:
                        newOperator = Operator.or;
                        break;
                    case Operator.or:
                        newOperator = Operator.and;
                }

                if (newOperator !== null) {
                    this.exp1 = new Expression(this._removeNot(this.exp1), newOperator, this._removeNot(this.exp2), {
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
        return exp.leading.includes("!");
    }

    private _removeNot(exp: Expression | string): Expression | string {

        if (typeof exp === "string") {
            return exp.replace("!", "");
        }
        exp.leading = exp.leading.replace("!", "");
        return exp;
    }

    public assosiativeLaw(): void {
        // TODO
    }

    public commutativeLaw(): void {

        const swap = () => {
            const help = this.exp1;
            this.exp1 = this.exp2;
            this.exp2 = help;
        }

        if (this.exp1 && this.exp2) {
            if (typeof this.exp1 === "string" && typeof this.exp2 === "string" && this.exp1 > this.exp2) {
                swap();
            }
            else if (typeof this.exp1 === "object" && typeof this.exp2 === "object" && this.exp1.isAtomic && this.exp2.isAtomic) {
                const atomic1 = this.exp1.getAtomicValue();
                const atomic2 = this.exp2.getAtomicValue();
                if (atomic1 && atomic2 && atomic1 > atomic2) {
                    swap();
                }
            }
        }
    }

    /**
     * @example A -> B <=> !A | B
     */
    public eliminationOfImplication(): void {

        if (this.exp1 && this.exp2 && this.operator === Operator.implication) {

            if (typeof this.exp1 !== "string") {
                if (!this.exp1.isAtomic) {
                    if (!this.exp1.leading.includes("(")) {
                        this.exp1.leading += "(";
                    }
                    if (!this.exp1.trailing.includes(")")) {
                        this.exp1.trailing += ")";
                    }
                }
                this.exp1.leading = "!" + this.exp1.leading;
            }
            else {
                this.exp1 = "!" + this.exp1;
            }
            this.operator = Operator.or;
        }
    }

    /**
     * @example A & (A | B) <=> A or A | (A & B) <=> A
     */
    public absorption(): void {

        if (this.exp1 && this.exp2 && typeof this.exp1 !== "string" && typeof this.exp2 !== "string") {

            const removeExp2 = () => {
                this.leading = "";
                this.operator = null;
                this.exp2 = null;
                this.trailing = "";
                this.isAtomic = true;
            };

            if (this.exp1.isAtomic && this.exp2.isAtomic && this.exp1.getAtomicValue() === this.exp2.getAtomicValue()) {
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

    public mergeNot(): void {
        let index = 0;
        while ( this.leading.charAt(index) === "!" ) {
            index++;
        }
        if (index > 1) {
            this.leading = this.leading.replace(/!/g, "");
            if (index % 2 !== 0) {
                this.leading = "!" + this.leading;
            }
        }
        if (typeof this.exp1 !== "string") {
            this.exp1?.mergeNot();
        }
        if (typeof this.exp2 !== "string") {
            this.exp2?.mergeNot();
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