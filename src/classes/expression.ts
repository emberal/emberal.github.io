import { Operator } from "./operator";

interface ExpressionInterface {
    leading?: string,
    left?: Expression | string | null,
    operator?: Operator | null,
    right?: Expression | string | null,
    trailing?: string,
    isAtomic?: boolean,
}

export class Expression {

    public constructor(
        {
            left = null,
            operator = null,
            right = null,
            leading = "",
            trailing = "",
            isAtomic = false,
        }: ExpressionInterface) {

        this.leading = leading;
        this.left = left;
        this.operator = operator;
        this.right = right;
        this.trailing = trailing;
        this.isAtomic = isAtomic;
    }

    leading;
    left;
    operator;
    right;
    trailing;
    isAtomic;
    // TODO add a atomic: string and remove string type from left and right

    // TODO add weight to each Expression used to compare and sort, using the "value" of child Expressions, atomic uses string value

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
     * @param other The other expression
     * @returns {boolean} Returns 'true' if this and other is the opposite of eachother, otherwise 'false'
     */
    public equalsAndOpposite(other: Expression | string): boolean {
        if (this.numberOfChar(this.leading, "¬") % 2 === 1) {
            return new Expression({
                left: this.left,
                operator: this.operator,
                right: this.right,
                isAtomic: this.isAtomic
            }).equals(other);
        }
        else if (typeof other === "object" && this.numberOfChar(other.leading, "¬") % 2 === 1) {
            return new Expression({
                left: other.left,
                operator: other.operator,
                right: other.right,
                isAtomic: other.isAtomic
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
        this.eliminationOfImplication();
        this.absorption();
        this.mergeNot();
        this.deMorgansLaw();
        this.assosiativeLaw();
        this.distributivity();
    }

    public removeParenthesis(): void {

        if (this.left && this.right && typeof this.left === "object" && typeof this.right === "object") {

            const removeBothSides = (exp: Expression) => {
                exp.leading = "";
                exp.trailing = "";
            };

            if (this.operator === Operator.and && !this.isNot()) {
                removeBothSides(this);
            }
            else if (this.isAtomic) { // This expression is atomic
                removeBothSides(this);
            }
            else if (this.left.isAtomic || this.right.isAtomic) { // One is atomic, and the other is not
                if (this.operator === this.left.operator && !this.left.isNot()) {
                    removeBothSides(this.left);
                }
                else if (this.operator === this.right.operator && !this.right.isNot()) {
                    removeBothSides(this.right);
                }
            }
            else if (!(this.left.isAtomic || this.right.isAtomic)) { // Neither is atomic
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
        }
    }

    /**
     * @example A & B | B & C <=> B & (A | C)
     * @example (A | B) & (B | C) <=> B | A & C
     */
    public distributivity(): void {

        if (this.left && this.right && typeof this.left === "object" && typeof this.right === "object" &&
            !this.left.isAtomic && !this.right.isAtomic) {

            const setObjects = (left: Expression | string, right: Expression | string, common: Expression | string | null): void => {
                this.right = new Expression({ left: left, operator: this.operator, right: right });
                this.left = new Expression({ left: common, isAtomic: true });
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
                if (typeof this.left.left === "object" && typeof this.left.right === "object" &&
                    typeof this.right.left === "object" && typeof this.right.right === "object") {

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
    }

    /**
     * @example !A & !B <=> !(A | B) or !(!A | B) <=> A & !B
     */
    public deMorgansLaw(): void {

        if (this.left && this.right && typeof this.left === "object" && typeof this.right === "object") {

            if (this.left.isNot() && this.right.isNot()) {
                let newOperator = null;

                switch (this.operator) {
                    case Operator.and:
                        newOperator = Operator.or;
                        break;
                    case Operator.or:
                        newOperator = Operator.and;
                }

                if (newOperator !== null) {
                    this.left._removeNot();
                    this.right._removeNot();
                    this.left = new Expression({
                        left: this.left,
                        operator: newOperator,
                        right: this.right,
                        leading: "¬(",
                        trailing: ")"
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

                    const setNot = (remove: Expression, add: Expression): void => {
                        inverse();
                        remove._removeNot();
                        add.leading = "¬";
                        if (!add.isAtomic) {
                            add.leading += "(";
                            add.trailing = ")";
                        }
                    };

                    if (this.left.isNot()) {
                        setNot(this.left, this.right);
                    }
                    else if (this.right.isNot()) {
                        setNot(this.right, this.left);
                    }
                }
            }
            else if (this.left.isNot() && !this.right.isNot() && typeof this.left === "object") {
                this.left.deMorgansLaw();
            }
        }
    }

    public isNot(): boolean {
        return this.leading.includes("¬");
    }

    private _removeNot(): void {
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

            const removeRight = (exp: Expression, isAtomic: boolean) => {
                if (exp.leading.includes("¬") && typeof exp.left === "object" && exp.left) {
                    exp.left.leading = "¬";
                }
                exp.operator = null;
                exp.right = null;
                if (isAtomic) {
                    exp.isAtomic = true;
                }
            };

            // If both are atomic values
            if (this.left.isAtomic && this.right.isAtomic) {
                if (this.left.getAtomicValue() === this.right.getAtomicValue()) {
                    removeRight(this, true);
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
                            removeRight(this, false);
                        }
                        // Removed the entire right side
                        else if ((this.operator === Operator.or && right.operator === Operator.and || this.operator === Operator.and &&
                            right.operator === Operator.or) && !right.isNot() && (leftEqualsLeft || leftEqualsRight)) {
                            if (removeLeft) {
                                this.left = this.right;
                            }
                            removeRight(this, true);
                        }
                        // removes the left side of the right side
                        else if ((leftEqualsLeft &&
                                (this.operator !== Operator.implication || right.operator === Operator.and) && left.leading === right.leading) ||
                            left.equalsAndOpposite(right.left) && this.operator === Operator.or && right.operator === Operator.and ||
                            left.equalsAndOpposite(right.right)) {
                            right.left = right.right;
                            removeRight(right, true);
                        }
                        // Removes the right side of the right side
                        else if (leftEqualsRight || leftEqualsLeft && (this.operator === Operator.implication &&
                                right.operator === Operator.or || left.leading !== right.leading) ||
                            left.equalsAndOpposite(right.right) || left.equalsAndOpposite(right.left)) {
                            removeRight(right, true);
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

                        removeRight(this, false);
                    }
                    if (!this.left.leading.includes("¬")) {
                        this.left.leading = "";
                        this.left.trailing = "";
                    }
                }
                else {
                    if (typeof this.left.left === "object" && typeof this.left.right === "object" &&
                        typeof this.right.left === "object" && typeof this.right.right && this.left.left && this.left.right &&
                        this.right.left && this.right.right && !this.left.equalsAndOpposite(this.right)) {

                        // Eg: (A | B) | (A & B), remove (A & B)
                        if (this.left.left.equals(this.right.left) && this.left.right.equals(this.right.right) ||
                            this.left.left.equals(this.right.right) && this.left.right.equals(this.right.left)) {

                            if (this.left.operator === Operator.and) {
                                this.left = this.right;
                                removeRight(this, false)
                            }
                            else if (this.right.operator === Operator.and) {
                                removeRight(this, false);
                            }
                        }
                        else if (this.left.operator === this.operator && this.right.operator === this.operator) {
                            // Eg: (A | B) | (A | C) <=> A | B | C
                            if (this.left.left.equals(this.right.left) || this.left.right.equals(this.right.left)) {
                                this.right.left = this.right.right;
                                removeRight(this.right, true);
                            }
                            else if (this.left.left.equals(this.right.right) || this.left.right.equals(this.right.right)) {
                                removeRight(this.right, true);
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
