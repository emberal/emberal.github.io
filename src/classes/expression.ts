import { Operator } from "./operator";

export class Expression {

    public constructor(left: Expression | string | null, operator: Operator | null, right: Expression | string | null, {
        leading = "",
        trailing = "",
        isAtomic = false,
    }) {
        this.leading = leading;
        this.left = left;
        this.operator = operator;
        this.right = right;
        this.trailing = trailing;
        this.isAtomic = isAtomic;
    }

    leading: string;
    left: Expression | string | null;
    operator: Operator | null;
    right: Expression | string | null;
    trailing: string;
    isAtomic: boolean;

    // TODO add weight to each Expression used to compare and sort, using the "value" of noth child Expressions, atomic uses string value

    /**
     * Compared an object with an other object and returns true if they contain the same values
     * @param other The object this is compared to
     * @returns {boolean} If this and the other expressions are the same returns 'true' (regardless or order) otherwise 'false'
     */
    public equals(other: Expression | string | null): boolean {

        if (other) {
            if (this === other) { // If they are the same object, or a string with the same content, return true
                return true;
            }
            else if (typeof this !== "string" && typeof other !== "string") {
                if (this.isAtomic && other.isAtomic && this.left === other.left && this.leading === other.leading) {
                    return true;
                }
                else if (!(this.isAtomic || other.isAtomic) && this.operator === other.operator) { // If neither is atomic

                    if (typeof this.left !== "string" && typeof this.right !== "string" ||
                        typeof other.left !== "string" && typeof other.right !== "string") {

                        if (this.left && this.right && other.left && other.right) {

                            if (this.leading === other.leading && ((this.left as Expression).equals(other.left) && (this.right as Expression).equals(other.right) ||
                                (this.left as Expression).equals(other.right) && (this.left as Expression).equals(other.right))) {
                                return true;
                            }
                        }
                    }
                }
            }
            else { // One is a string while the other is an Expression

                const isEqual = (left: Expression | string, right: Expression | string): boolean => {
                    return typeof left === "string" && typeof right !== "string" && left === right.left;
                };

                return isEqual(this, other) || isEqual(other, this);
            }
        }
        return false;
    }

    /**
     * @example A & !A => true, A & A => false
     * @param other
     * @returns {boolean}
     */
    public equalsAndOpposite(other: Expression | string): boolean {
        if (this.numberOfChar(this.leading, "¬") % 2 === 1) {
            return new Expression(this.left, this.operator, this.right, { isAtomic: this.isAtomic }).equals(other);
        }
        else if (typeof other === "object" && this.numberOfChar(other.leading, "¬") % 2 === 1) {
            return new Expression(other.left, other.operator, other.right, { isAtomic: other.isAtomic }).equals(this);
        }
        return false;
    }

    public numberOfChar(s: string, char: string): number {
        let numberOf = 0;
        for (let i = 0; i < s.length; i++) {
            if (s.charAt(i) === char) {
                numberOf++;
            }
        }
        return numberOf;
    }

    public getAtomicValue(): string | null {
        if (this.isAtomic) {
            return this.toString();
        }
        else if (this.left && typeof this.left === "object") {
            return this.left.getAtomicValue();
        }
        return null;
    }

    public laws(): void {
        this.absorption();
        this.eliminationOfImplication();
        this.mergeNot();
        this.deMorgansLaw();
        this.assosiativeLaw();
        this.distributivity();
    }

    /**
     * @example A & B | B & C <=> B & (A | C)
     * @example (A | B) & (B | C) <=> B | A & C
     */
    public distributivity(): void {

        if (this.left && this.right && typeof this.left === "object" && typeof this.right === "object" &&
            !this.left.isAtomic && !this.right.isAtomic) {

            const setObjects = (left: Expression | string, right: Expression | string, common: Expression | string | null): void => {
                this.right = new Expression(left, this.operator, right, {});
                this.left = new Expression(common, null, null, { isAtomic: true });
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
                    if (!this.right.leading.includes("(")) {
                        this.right.leading = "(";
                    }
                    if (!this.right.trailing.includes(")")) {
                        this.right.trailing = ")";
                    }
                }
            };

            // TODO prettify!
            if (this.left.left && this.left.right && this.right.left && this.right.right && this.left.operator !== this.operator) {
                if (typeof this.left.left === "object" && typeof this.left.right === "object" &&
                    typeof this.right.left === "object" && typeof this.right.right === "object") {

                    // TODO store as const instead, so it won't use the same method on the same object multiple times
                    if (this.left.left.getAtomicValue() === this.right.left.getAtomicValue() &&
                        this.left.right.getAtomicValue() !== this.right.right.getAtomicValue()) {
                        setObjects(this.left.right, this.right.right, this.left.left);
                    }
                    else if (this.left.left.getAtomicValue() === this.right.right.getAtomicValue() &&
                        this.left.right.getAtomicValue() !== this.right.left.getAtomicValue()) {
                        setObjects(this.left.right, this.right.left, this.left.left);
                    }
                    else if (this.left.right.getAtomicValue() === this.right.left.getAtomicValue() &&
                        this.left.left.getAtomicValue() !== this.right.right.getAtomicValue()) {
                        setObjects(this.left.left, this.right.right, this.left.right);
                    }
                    else if (this.left.right.getAtomicValue() === this.right.right.getAtomicValue() &&
                        this.left.left.getAtomicValue() !== this.right.left.getAtomicValue()) {
                        setObjects(this.left.left, this.right.left, this.left.right);
                    }
                }
            }
        }
    }

    /**
     * @example !A & !B <=> !(A | B) or !(!A | B) <=> A & !B
     */
    public deMorgansLaw(): void {

        if (this.left && this.right) {

            if (this.isNot(this.left) && this.isNot(this.right)) {
                let newOperator = null;

                switch (this.operator) {
                    case Operator.and:
                        newOperator = Operator.or;
                        break;
                    case Operator.or:
                        newOperator = Operator.and;
                }

                if (newOperator !== null) {
                    this.left = new Expression(this._removeNot(this.left), newOperator, this._removeNot(this.right), {
                        leading: "¬(",
                        trailing: ")"
                    });
                    this.operator = null;
                    this.right = null;
                }
            }
            else if (this.isNot(this)) {

                const inverse = (): void => {
                    this.leading = "";
                    this.trailing = "";
                    this.operator = this.operator === Operator.and ? Operator.or : Operator.and;

                    if (typeof this.left === "object" && this.left && !this.left.isAtomic) {
                        this.left.leading = "";
                        this.left.trailing = "";
                    }
                    else if (typeof this.right === "object" && this.right && !this.right.isAtomic) {
                        this.right.leading = "";
                        this.right.trailing = "";
                    }
                };

                if (typeof this.left === "object" && typeof this.right === "object" && this.left.left && this.right.left) {

                    if (this.isNot(this.left)) {
                        inverse();
                        this.left.leading = this.left.leading.replace("¬", "");
                        this.right.leading = "¬" + this.right.leading;
                        if (this.right.isAtomic) {
                            this.right.leading = "¬";
                        }
                        else {
                            this.right.leading = "¬(" + this.left.leading;
                            this.right.trailing = ")";
                        }
                    }
                    else if (this.isNot(this.right)) {
                        inverse();
                        this.right.leading = this.right.leading.replace("¬", "");
                        if (this.left.isAtomic) {
                            this.left.leading = "¬";
                        }
                        else {
                            this.left.leading = "¬(" + this.left.leading;
                            this.left.trailing = ")";
                        }
                    }
                }
            }
            else if (this.isNot(this.left) && !this.isNot(this.right) && typeof this.left === "object") {
                this.left.deMorgansLaw();
            }
        }
    }

    public isNot(exp: Expression | string): boolean {
        if (typeof exp === "string") {
            return exp.charAt(0) === "¬";
        }
        return exp.leading.includes("¬");
    }

    private _removeNot(exp: Expression | string): Expression | string {

        if (typeof exp === "string") {
            return exp.replace("¬", "");
        }
        exp.leading = exp.leading.replace("¬", "");
        return exp;
    }

    public assosiativeLaw(): void {
        // TODO?
    }

    public commutativeLaw(): void {

        const swap = () => {
            const help = this.left;
            this.left = this.right;
            this.right = help;
        };

        if (this.left && this.right) {
            if (typeof this.left === "string" && typeof this.right === "string" && this.left > this.right) {
                swap();
            }
            else if (typeof this.left === "object" && typeof this.right === "object" && this.left.isAtomic && this.right.isAtomic) {
                let atomic1 = this.left.getAtomicValue();
                let atomic2 = this.right.getAtomicValue();

                if (atomic1 && atomic2) {
                    if (this.left.equalsAndOpposite(atomic2) && atomic1.includes("¬")) {
                        swap();
                    }
                    atomic1 = atomic1.replace("¬", "");
                    atomic2 = atomic2.replace("¬", "");
                    if (atomic1 > atomic2) {
                        swap();
                    }
                }
            }
        }
    }

    /**
     * @example A -> B <=> !A | B
     */
    public eliminationOfImplication(): void {

        if (this.left && this.right && this.operator === Operator.implication) {

            if (typeof this.left !== "string") {
                if (!this.left.isAtomic) {
                    if (!this.left.leading.includes("(")) {
                        this.left.leading += "(";
                    }
                    if (!this.left.trailing.includes(")")) {
                        this.left.trailing += ")";
                    }
                }
                this.left.leading = "¬" + this.left.leading;
            }
            else {
                this.left = "¬" + this.left;
            }
            this.operator = Operator.or;
        }
    }

    /**
     * @example A & (A | B) <=> A or A | (A & B) <=> A
     */
    public absorption(): void {

        if (this.left && this.right && typeof this.left === "object" && typeof this.right === "object") {

            const removeRight = (exp: Expression) => {
                if (exp.leading.includes("¬") && typeof exp.left === "object" && exp.left) {
                    exp.left.leading = "¬";
                }
                exp.leading = "";
                exp.operator = null;
                exp.right = null;
                exp.trailing = "";
            };

            // If both are atomic values
            if (this.left.isAtomic && this.right.isAtomic) {
                if (this.left.getAtomicValue() === this.right.getAtomicValue()) {
                    removeRight(this);
                    this.isAtomic = true;
                }
            }
            else if (this.left.isAtomic || this.right.isAtomic) { // If one is atomic eg: A | (A & B)

                // TODO simplify
                const removeRedundant = (left: Expression, right: Expression, removeLeft: boolean): void => {

                    if (right.left && right.right && typeof right.left === "object" && typeof right.right === "object") {

                        const leftEqualsLeft = left.equals(right.left);
                        const leftEqualsRight = left.equals(right.right);

                        // Remove the entire left side
                        if (this.operator === Operator.and && right.left.equalsAndOpposite(right.right)) {
                            if (!removeLeft) {
                                this.left = this.right;
                            }
                            removeRight(this);
                        }
                        // Removed the entire right side
                        else if ((this.operator === Operator.or && right.operator === Operator.and || this.operator === Operator.and &&
                            right.operator === Operator.or) && !right.isNot(right) && (leftEqualsLeft || leftEqualsRight)) {
                            if (removeLeft) {
                                this.left = this.right;
                            }
                            removeRight(this);
                            this.isAtomic = true;
                        }
                        // removes the left side of the right side
                        else if ((leftEqualsLeft && (this.operator !== Operator.implication || right.operator === Operator.and) &&
                                left.leading === right.leading) || left.equalsAndOpposite(right.left) && this.operator === Operator.or ||
                            left.equalsAndOpposite(right.right)) {
                            right.left = right.right;
                            removeRight(right);
                            right.isAtomic = true;
                        }
                        // Removes the right side of the right side
                        else if (leftEqualsRight || leftEqualsLeft && (this.operator === Operator.implication &&
                                right.operator === Operator.or || left.leading !== right.leading) ||
                            left.equalsAndOpposite(right.right) || left.equalsAndOpposite(right.left)) {
                            removeRight(right);
                            right.isAtomic = true;
                        }
                    }
                };

                if (this.left.isAtomic) {
                    removeRedundant(this.left, this.right, false);
                }
                else {
                    removeRedundant(this.right, this.left, true);
                }
            }
            else { // Neither of the expressions are atomic, eg: (A & B) | (A & B)
                if (this.left.equals(this.right)) {
                    if (!this.left.leading.includes("¬") && !this.right.leading.includes("¬") ||
                        this.left.leading.includes("¬") && this.right.leading.includes("¬")) {

                        removeRight(this);
                    }
                    if (!this.left.leading.includes("¬")) {
                        this.left.leading = "";
                        this.left.trailing = "";
                    }
                }
                else {
                    if (typeof this.left.left === "object" && typeof this.left.right === "object" &&
                        typeof this.right.left === "object" && typeof this.right.right && this.left.left && this.left.right &&
                        this.right.left && this.right.right && this.left.leading === this.right.leading) {

                        // Eg: (A | B) | (A & B), remove (A & B)
                        if (this.left.left.equals(this.right.left) && this.left.right.equals(this.right.right) ||
                            this.left.left.equals(this.right.right) && this.left.right.equals(this.right.left)) {

                            if (this.left.operator === Operator.and) {
                                this.left = this.right;
                                removeRight(this)
                            }
                            else if (this.right.operator === Operator.and) {
                                removeRight(this);
                            }
                        }
                        else if (this.left.operator === this.operator && this.right.operator === this.operator) {
                            // Eg: (A | B) | (A | C) <=> A | B | C
                            if (this.left.left.equals(this.right.left) || this.left.right.equals(this.right.left)) {
                                this.right.left = this.right.right;
                                removeRight(this.right);
                                this.right.isAtomic = true;
                            }
                            else if (this.left.left.equals(this.right.right) || this.left.right.equals(this.right.right)) {
                                removeRight(this.right);
                                this.right.isAtomic = true;
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
        while ( this.leading.charAt(index) === "¬" ) {
            index++;
        }
        if (index > 1) {
            this.leading = this.leading.replace(/¬/g, "");
            if (index % 2 !== 0) {
                this.leading = "¬" + this.leading;
            }
        }
        if (typeof this.left !== "string") {
            this.left?.mergeNot();
        }
        if (typeof this.right !== "string") {
            this.right?.mergeNot();
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
        return this.getNumberOfAtomics(exp.left) + this.getNumberOfAtomics(exp.right);
    }

    /**
     * Takes in an expression with a true or false value for each side, then calculates the correct truth value
     * @param left Left side of the expression.
     * @param right right side of the expression.
     * @returns {boolean} If the expression is truthy, returns 'true', otherwise 'false'
     */
    public solve(left: boolean, right: boolean): boolean {
        switch (this.operator) {
            case Operator.and:
                return left && right;
            case Operator.or:
                return left || right;
            case Operator.implication:
                return !left || right;
            default:
                return false;
        }
    }

    public toString(): string {
        let s = this.leading;

        if (this.left !== null) {
            s += this.left.toString();

            if (this.operator !== null) {
                s += " " + this.operator.toString();

                if (this.right !== null) {
                    s += " " + this.right.toString();
                }
            }
            s += this.trailing;
        }
        return s;
    }
}
