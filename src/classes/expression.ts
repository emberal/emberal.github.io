import { Operator } from "./operator";
import { after } from "lodash";

/**
 * @param leading Leading content before the expression, like opening parentheses or 'not' operator
 * @param left The expression to the left of the operator
 * @param operator The operator that separates the expression. Only 'and', 'or' and 'implication' can be used.
 * @param right The expression to the right of the operator
 * @param trailing Trailing content after the expression, like closing parentheses
 * @param atomic The atomic value of the expression, if the expression is not atomic this is 'null'.
 */
interface ExpressionInterface {
    leading?: string,
    left?: Expression | null,
    operator?: Operator | null,
    right?: Expression | null,
    trailing?: string,
    atomic?: string | null,
}

export class Expression {

    public constructor(
        {
            left = null,
            operator = null,
            right = null,
            leading = "",
            trailing = "",
            atomic = null
        }: ExpressionInterface) {

        this.leading = leading;
        this.left = left;
        this.operator = operator;
        this.right = right;
        this.trailing = trailing;
        this.atomic = atomic;
    }

    leading;
    left;
    operator;
    right;
    trailing;
    atomic;

    /**
     * Stores the before and after of each law
     * @example [index] => ¬(A & B);¬A | ¬B;DeMorgans Law
     */
    static orderOfOperations: any[] = [];

    // TODO add weight to each Expression used to compare and sort, using the "value" of child Expressions, atomic uses string value

    /**
     * Compared an object with an other object and returns true if they contain the same values
     * @param other The object this is compared to
     * @returns {boolean} If this and the other expressions are the same returns 'true' (regardless or order) otherwise 'false'
     */
    public equals(other: Expression | null): boolean {

        if (other) {
            if (this === other) { // If they are the same object, or a string with the same content, return true
                return true;
            }

            // If both are atomic
            if (this.isAtomic() && other.isAtomic() && this.atomic === other.atomic && this.isNot() === other.isNot()) {
                return true;
            }
            // If neither is atomic
            else if (this.operator && !(this.isAtomic() || other.isAtomic()) && this.operator === other.operator) {

                if (this.leading === other.leading && (this.left?.equals(other.left) && this.right?.equals(other.right) ||
                    this.left?.equals(other.right) && this.left.equals(other.right))) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * @example A & !A => true, A & A => false
     * @param other The other expression
     * @returns {boolean} Returns 'true' if this and other is the opposite of eachother, otherwise 'false'
     */
    public equalsAndOpposite(other: Expression): boolean {
        if (this.numberOfChar(this.leading, "¬") % 2 === 1) {
            return new Expression({
                left: this.left,
                operator: this.operator,
                right: this.right,
                atomic: this.atomic
            }).equals(other);
        }
        else if (this.numberOfChar(other.leading, "¬") % 2 === 1) {
            return new Expression({
                left: other.left,
                operator: other.operator,
                right: other.right,
                atomic: other.atomic,
            }).equals(this);
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

    /**
     * Finds and returns the leftmost atomic value
     */
    public getAtomicValue(): string | null {
        if (this.isAtomic()) {
            return this.toString();
        }
        return this.left?.getAtomicValue() ?? null;
    }

    private isChangedThenPush(exp: string, law: string): string {
        if (exp !== this.toString()) {
            const op = {
                before: exp,
                after: this.toString(),
                law: law,
            }
            Expression.orderOfOperations.push(op);
            exp = this.toString();
        }
        return exp;
    }

    public laws(): void {

        let exp = this.toString();
        this.eliminationOfImplication();
        exp = this.isChangedThenPush(exp, "Elimination of implication");
        this.mergeNot();
        exp = this.isChangedThenPush(exp, "Merge not operators");
        this.deMorgansLaw();
        exp = this.isChangedThenPush(exp, "De Morgan's Law");
        this.absorption();
        exp = this.isChangedThenPush(exp, "Absorption");
        this.assosiativeLaw();
        exp = this.isChangedThenPush(exp, "Assosiative");
        this.distributivity();
        this.isChangedThenPush(exp, "Distributivity");
    }

    public removeParenthesis(): void {

        if (this.left && this.right) {
            const exp = this.toString();
            const removeBothSides = (exp: Expression) => {
                exp.leading = "";
                exp.trailing = "";
            };

            if (this.operator === Operator.and && !this.isNot() || this.isAtomic()) {
                removeBothSides(this);
            }
            else if (this.left.isAtomic() || this.right.isAtomic()) { // One is atomic, and the other is not
                if (this.operator === this.left.operator && !this.left.isNot()) {
                    removeBothSides(this.left);
                }
                else if (this.operator === this.right.operator && !this.right.isNot()) {
                    removeBothSides(this.right);
                }
            }
            else if (!(this.left.isAtomic() || this.right.isAtomic())) { // Neither is atomic
                if (this.left.operator === this.right.operator && !this.left.isNot() && !this.right.isNot()) {
                    removeBothSides(this.left);
                    removeBothSides(this.right);
                }
                if (this.operator === this.left.operator && !this.left.isNot()) {
                    removeBothSides(this.left);
                }
                else if (this.operator === this.right.operator && !this.right.isNot()) {
                    removeBothSides(this.right);
                }
            }
            this.isChangedThenPush(exp, "Removal of parentheses");
        }
    }

    /**
     * @example A & B | B & C <=> B & (A | C)
     * @example (A | B) & (B | C) <=> B | A & C
     */
    public distributivity(): void {

        if (this.left && this.right && !(this.left.isAtomic() || this.right.isAtomic())) {

            const setObjects = (left: Expression, right: Expression, common: Expression | null): void => {
                this.right = new Expression({ left: left, operator: this.operator, right: right });
                this.left = new Expression({ left: common });
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

            if (this.left.left && this.left.right && this.right.left && this.right.right && this.left.operator !== this.operator) {

                const leftLeft = this.left.left.getAtomicValue();
                const leftRight = this.left.right.getAtomicValue();
                const rightLeft = this.right.left.getAtomicValue();
                const rightRight = this.right.right.getAtomicValue();

                if (leftLeft === rightLeft && leftRight !== rightRight) {
                    setObjects(this.left.right, this.right.right, this.left.left);
                }
                else if (leftLeft === rightRight && leftRight !== rightLeft) {
                    setObjects(this.left.right, this.right.left, this.left.left);
                }
                else if (leftRight === rightLeft && leftLeft !== rightRight) {
                    setObjects(this.left.left, this.right.right, this.left.right);
                }
                else if (leftRight === rightRight && leftLeft !== rightLeft) {
                    setObjects(this.left.left, this.right.left, this.left.right);
                }
            }
        }
    }

    /**
     * @example !A & !B <=> !(A | B) or !(!A | B) <=> A & !B
     */
    public deMorgansLaw(): void {

        if (this.left?.isNot() && this.right?.isNot()) {
            let newOperator = null;

            switch (this.operator) {
                case Operator.and:
                    newOperator = Operator.or;
                    break;
                case Operator.or:
                    newOperator = Operator.and;
            }

            if (newOperator) {
                this.left.removeNot();
                this.right.removeNot();
                this.left = new Expression({
                    leading: "¬(",
                    left: this.left,
                    operator: newOperator,
                    right: this.right,
                    trailing: ")",
                    atomic: this.atomic
                });
                this.operator = null;
                this.right = null;
            }
        }
        else if (this.isNot()) {

            const inverse = (): void => {
                this.leading = "";
                this.trailing = "";
                this.operator = this.operator === Operator.and ? Operator.or : Operator.and;

                if (this.left && !this.left.isAtomic()) {
                    this.left.leading = "";
                    this.left.trailing = "";
                }
                else if (this.right && !this.right.isAtomic()) {
                    this.right.leading = "";
                    this.right.trailing = "";
                }
            };

            const setNot = (remove: Expression, add: Expression): void => {
                inverse();
                remove.removeNot();
                add.leading = "¬";
                if (!add.isAtomic()) {
                    add.leading += "(";
                    add.trailing = ")";
                }
            };

            if (this.left?.isNot() && this.right) {
                setNot(this.left, this.right);
            }
            else if (this.right?.isNot() && this.left) {
                setNot(this.right, this.left);
            }
        }
        else if (this.left?.isNot() && !this.right?.isNot()) {
            this.left.deMorgansLaw();
        }
    }

    /**
     * Checks if an expression has the not operator before it
     * @returns {boolean} Returns 'true' if it contains 'not', otherwise 'false'
     */
    public isNot(): boolean {
        return this.leading.includes("¬");
    }

    /**
     * Removes a single ¬ operator, with an empty string
     * @private
     */
    private removeNot(): void {
        this.leading = this.leading.replace("¬", "");
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

        if (this.left?.isAtomic() && this.right?.isAtomic() && this.left.atomic! >= this.right.atomic!) {
            let exp = this.toString();
            if (this.left.atomic! !== this.right.atomic! || this.left.equalsAndOpposite(this.right) && !this.right.leading.includes("¬")) {
                swap();
                this.isChangedThenPush(exp, "Commutative");
            }
        }
    }

    /**
     * @example A -> B <=> !A | B
     */
    public eliminationOfImplication(): void {

        if (this.left && this.right && this.operator === Operator.implication) {

            if (!this.left.isAtomic()) {
                if (!this.left.leading.includes("(")) {
                    this.left.leading += "(";
                }
                if (!this.left.trailing.includes(")")) {
                    this.left.trailing += ")";
                }
            }
            this.left.leading = "¬" + this.left.leading;
            this.operator = Operator.or;
        }
    }

    /**
     * @example A & (A | B) <=> A or A | (A & B) <=> A
     */
    public absorption(): void {

        if (this.left && this.right) {

            const removeRight = (exp: Expression): void => {
                if (exp.leading.includes("¬") && exp.left) {
                    exp.left.leading = "¬";
                }
                exp.operator = null;
                exp.right = null;
            };

            // If both are atomic values
            if (this.left.isAtomic() && this.right.isAtomic()) {
                if (this.left.equals(this.right)) {
                    removeRight(this);
                }
            }
            else if (this.left.isAtomic() || this.right.isAtomic()) { // If one is atomic eg: A | (A & B)

                // TODO simplify
                const removeRedundant = (left: Expression, right: Expression, removeLeft: boolean): void => {

                    if (right.left && right.right) {

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
                            right.operator === Operator.or) && !right.isNot() && (leftEqualsLeft || leftEqualsRight)) {
                            if (removeLeft) {
                                this.left = this.right;
                            }
                            removeRight(this);
                        }
                        // If right side is always false and operator is "or", remove right side (Ex: B | (A & ¬A) <=> B)
                        else if (this.operator === Operator.or && right.left?.equalsAndOpposite(right.right) &&
                            right.operator === Operator.and) {
                            if (removeLeft) {
                                this.left = this.right;
                            }
                            removeRight(this);
                        }
                        // removes the left side of the right side
                        else if ((leftEqualsLeft &&
                                (this.operator !== Operator.implication || right.operator === Operator.and) && left.leading === right.leading) ||
                            left.equalsAndOpposite(right.left) && this.operator === Operator.or && right.operator === Operator.and ||
                            left.equalsAndOpposite(right.right)) {
                            right.left = right.right;
                            removeRight(right);
                        }
                        // Removes the right side of the right side
                        else if (leftEqualsRight || leftEqualsLeft && (this.operator === Operator.implication &&
                                right.operator === Operator.or || left.leading !== right.leading) ||
                            left.equalsAndOpposite(right.right) || left.equalsAndOpposite(right.left)) {
                            removeRight(right);
                        }
                    }
                };

                if (this.left.isAtomic()) {
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
                    if (!this.left.equalsAndOpposite(this.right)) {

                        // Eg: (A | B) | (A & B), remove (A & B)
                        if (this.left.left?.equals(this.right.left) && this.left.right?.equals(this.right.right) ||
                            this.left.left?.equals(this.right.right) && this.left.right?.equals(this.right.left)) {

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
                            if (this.left.left?.equals(this.right.left) || this.left.right?.equals(this.right.left)) {
                                this.right.left = this.right.right;
                                removeRight(this.right);
                            }
                            else if (this.left.left?.equals(this.right.right) || this.left.right?.equals(this.right.right)) {
                                removeRight(this.right);
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
        this.left?.mergeNot();
        this.right?.mergeNot();
    }

    /**
     * Finds and returns the number of atomic values in the expression
     * @param exp The Expression
     * @returns {number} The number of atomic expressions in the expression
     */
    public static getNumberOfAtomics(exp: Expression | null): number {
        if (exp?.isAtomic()) {
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

    /**
     * Checks if this expression is an atomic value
     * @returns {boolean} Returns 'true' if the expression is atomic
     */
    public isAtomic(): boolean {
        return this.atomic !== null;
    }

    /**
     * Returns a string representation of the expression
     * @example A & B | (¬C -> D)
     * @returns {string} A string representation of the expression
     */
    public toString(): string {
        if (this.isAtomic()) {
            return this.leading + this.atomic!;
        }
        let s = this.leading;
        if (this.left) {
            s += this.left?.toString();
        }
        if (this.operator) {
            s += " " + this.operator?.toString() + " ";
        }
        if (this.right) {
            s += this.right?.toString();
        }
        s += this.trailing;
        return s;
    }
}
