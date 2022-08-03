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

    private _isString(
        {
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
            if (this.isAtomic && other.isAtomic && this.exp1 === other.exp1 && this.leading === other.leading) {
                return true;
            }
            else if (!(this.isAtomic || other.isAtomic) && this.operator === other.operator) { // If neither is atomic

                if (!(this._isString({ exp1: this.exp1, exp2: this.exp2 }) || this._isString({
                    exp1: other.exp1,
                    exp2: other.exp2
                }))) {

                    if (this.exp1 && this.exp2 && other.exp1 && other.exp2) {

                        if (this.leading === other.leading && ((this.exp1 as Expression).equals(other.exp1) && (this.exp2 as Expression).equals(other.exp2) ||
                            (this.exp1 as Expression).equals(other.exp2) && (this.exp1 as Expression).equals(other.exp2))) {
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

            return isEqual(this, other) || isEqual(other, this);
        }
        return false;
    }

    /**
     * @example A & !A => true, A & A => false
     * @param other
     * @returns {boolean}
     */
    public equalsAndOpposite(other: Expression | string): boolean {
        if (this.leading.includes("!")) {
            return new Expression(this.exp1, this.operator, this.exp2, { isAtomic: this.isAtomic }).equals(other);
        }
        else if (typeof other === "object" && other.leading.includes("!")) {
            return new Expression(other.exp1, other.operator, other.exp2, { isAtomic: other.isAtomic }).equals(this);
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
        this.distributivity();
        this.commutativeLaw();
        this.mergeNot();
    }

    /**
     * @example A & B | B & C <=> B & (A | C)
     * @example (A | B) & (B | C) <=> B | A & C
     */
    public distributivity(): void {

        if (this.exp1 && this.exp2 && typeof this.exp1 === "object" && typeof this.exp2 === "object" &&
            !this.exp1.isAtomic && !this.exp2.isAtomic) {

            const setObjects = (left: Expression | string, right: Expression | string, common: Expression | string | null): void => {
                this.exp2 = new Expression(left, this.operator, right, {});
                this.exp1 = new Expression(common, null, null, { isAtomic: true });
                this.operator = this.operator === Operator.and ? Operator.or : Operator.and;

                if (this.operator !== Operator.and) {
                    if (!this.leading.includes("(")) {
                        this.leading += "(";
                    }
                    if (!this.trailing.includes(")")) {
                        this.trailing += ")";
                    }
                }
                else { // exp2.operator === or
                    if (!this.exp2.leading.includes("(")) {
                        this.exp2.leading = "(";
                    }
                    if (!this.exp2.trailing.includes(")")) {
                        this.exp2.trailing = ")";
                    }
                }
            };

            // TODO prettify!
            if (this.exp1.exp1 && this.exp1.exp2 && this.exp2.exp1 && this.exp2.exp2 && this.exp1.operator !== this.operator) {
                if (typeof this.exp1.exp1 === "object" && typeof this.exp1.exp2 === "object" &&
                    typeof this.exp2.exp1 === "object" && typeof this.exp2.exp2 === "object") {

                    // TODO store as const instead, so it won't use the same method on the same object multiple times
                    if (this.exp1.exp1.getAtomicValue() === this.exp2.exp1.getAtomicValue() &&
                        this.exp1.exp2.getAtomicValue() !== this.exp2.exp2.getAtomicValue()) {
                        setObjects(this.exp1.exp2, this.exp2.exp2, this.exp1.exp1);
                    }
                    else if (this.exp1.exp1.getAtomicValue() === this.exp2.exp2.getAtomicValue() &&
                        this.exp1.exp2.getAtomicValue() !== this.exp2.exp1.getAtomicValue()) {
                        setObjects(this.exp1.exp2, this.exp2.exp1, this.exp1.exp1);
                    }
                    else if (this.exp1.exp2.getAtomicValue() === this.exp2.exp1.getAtomicValue() &&
                        this.exp1.exp1.getAtomicValue() !== this.exp2.exp2.getAtomicValue()) {
                        setObjects(this.exp1.exp1, this.exp2.exp2, this.exp1.exp2);
                    }
                    else if (this.exp1.exp2.getAtomicValue() === this.exp2.exp2.getAtomicValue() &&
                        this.exp1.exp1.getAtomicValue() !== this.exp2.exp1.getAtomicValue()) {
                        setObjects(this.exp1.exp1, this.exp2.exp1, this.exp1.exp2);
                    }
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
        // TODO?
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

            const removeExp2 = (exp: Expression) => {
                exp.leading = "";
                exp.operator = null;
                exp.exp2 = null;
                exp.trailing = "";
            };

            // If both are atomic values
            if (this.exp1.isAtomic && this.exp2.isAtomic) {
                if (this.exp1.getAtomicValue() === this.exp2.getAtomicValue()) {
                    if (!this.exp1.leading.includes("!") && !this.exp2.leading.includes("!") ||
                        this.exp1.leading.includes("!") && this.exp2.leading.includes("!")) {

                        removeExp2(this);
                        this.isAtomic = true;
                    }
                }
            }
            else if (this.exp1.isAtomic || this.exp2.isAtomic) { // If one is atomic eg: A | (A & B)

                const contains = (exp1: Expression, exp2: string): boolean => {

                    let correctOperators = this.operator === Operator.and;
                    if (!correctOperators) {
                        correctOperators = this.operator === Operator.or && exp1.operator === Operator.and;
                    }
                    if (!correctOperators) {
                        correctOperators = this.operator === Operator.implication;
                    }

                    return correctOperators && (typeof exp1.exp1 !== "string" && typeof exp1.exp2 !== "string" &&
                        (exp2 === exp1.exp1?.getAtomicValue() || exp2 === exp1.exp2?.getAtomicValue()));
                };

                const removeRedundant = (exp1: Expression, exp2: Expression, func: Function): void => {
                    const atomic = exp1.getAtomicValue();
                    if (atomic && contains(exp2, atomic)) {
                        if (typeof exp2.exp1 === "object" && exp2.exp1?.isAtomic && this.operator !== Operator.or) {

                            if (exp2.operator === Operator.and) { // Removes the equal
                                if (exp2.exp1?.getAtomicValue() === atomic) {
                                    exp2.exp1 = exp2.exp2;
                                }
                                removeExp2(exp2);
                                exp2.isAtomic = true;
                            }
                            else if (exp2.operator === Operator.or) { // Removes the unequal
                                if (exp2.exp1?.getAtomicValue() !== atomic) {
                                    exp2.exp1 = exp2.exp2;
                                }
                                removeExp2(exp2);
                                exp2.isAtomic = true;
                            }
                        }
                        else {
                            func();
                            removeExp2(this);
                            this.isAtomic = true;
                        }
                    }
                };

                if (this.exp1.isAtomic) {
                    removeRedundant(this.exp1, this.exp2, () => null);
                }
                else {
                    removeRedundant(this.exp2, this.exp1, () => this.exp1 = this.exp2);
                }
            }
            else { // Neither of the expressions are atomic, eg: (A & B) | (A & B)
                if (this.exp1.equals(this.exp2)) {
                    if (!this.exp1.leading.includes("!") && !this.exp2.leading.includes("!") ||
                        this.exp1.leading.includes("!") && this.exp2.leading.includes("!")) {

                        removeExp2(this);
                    }
                    if (!this.exp1.leading.includes("!")) {
                        this.exp1.leading = "";
                        this.exp1.trailing = "";
                    }
                }
                else {
                    if (typeof this.exp1.exp1 === "object" && typeof this.exp1.exp2 === "object" &&
                        typeof this.exp2.exp1 === "object" && typeof this.exp2.exp2 && this.exp1.exp1 && this.exp1.exp2 &&
                        this.exp2.exp1 && this.exp2.exp2 && this.exp1.leading === this.exp2.leading) {

                        // Eg: (A | B) | (A & B), remove (A & B)
                        if (this.exp1.exp1.equals(this.exp2.exp1) && this.exp1.exp2.equals(this.exp2.exp2) ||
                            this.exp1.exp1.equals(this.exp2.exp2) && this.exp1.exp2.equals(this.exp2.exp1)) {

                            if (this.exp1.operator === Operator.and) {
                                this.exp1 = this.exp2;
                                removeExp2(this)
                            }
                            else if (this.exp2.operator === Operator.and) {
                                removeExp2(this);
                            }
                        }
                        else if (this.exp1.operator === this.operator && this.exp2.operator === this.operator) {
                            // Eg: (A | B) | (A | C) <=> A | B | C
                            if (this.exp1.exp1.equals(this.exp2.exp1) || this.exp1.exp2.equals(this.exp2.exp1)) {
                                this.exp2.exp1 = this.exp2.exp2;
                                removeExp2(this.exp2);
                                this.exp2.isAtomic = true;
                            }
                            else if (this.exp1.exp1.equals(this.exp2.exp2) || this.exp1.exp2.equals(this.exp2.exp2)) {
                                removeExp2(this.exp2);
                                this.exp2.isAtomic = true;
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Removes unnesessarry 'not' operators, if there's an even number, removes them completely.
     * If there's an odd number, remove all but one.
     * @example !!A <=> A or !!!A <=> !A
     */
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

    /**
     * Finds and returns the number of atomic values in the expression
     * @param exp The Expression
     * @returns {number} The number of atomic expressions in the expression
     */
    public static getNumberOfAtomics(exp: Expression | string | null): number {
        if (typeof exp === "string") {
            return 1;
        }
        else if (exp === null) {
            return 0;
        }
        return this.getNumberOfAtomics(exp.exp1) + this.getNumberOfAtomics(exp.exp2);
    }

    /**
     * Takes in an expression with a true or false value for each side, then calculates the correct truth value
     * @param exp1 Left side of the expression.
     * @param exp2 right side of the expression.
     * @returns {boolean} If the expression is truthy, returns 'true', otherwise 'false'
     */
    public solve(exp1: boolean, exp2: boolean): boolean {
        switch (this.operator) {
            case Operator.and:
                return exp1 && exp2;
            case Operator.or:
                return exp1 || exp2;
            case Operator.implication:
                return !exp1 || exp2;
            default:
                return false;
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
