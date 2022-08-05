import { simplify } from '../src/classes/expression_utils';
import { Expression } from "../src/classes/expression";
import { Operator } from "../src/classes/operator";

test("Equals", () => {
    const innerLeft = new Expression("A", null, null, { isAtomic: true });
    const notInnerLeft = new Expression("A", null, null, { isAtomic: true, leading: "!" });
    const innerRight = new Expression("B", null, null, { isAtomic: true });

    const exp1 = new Expression(innerLeft, Operator.and, innerRight, {});
    const exp2 = new Expression(innerLeft, Operator.and, innerRight, {});
    const notExp1 = new Expression(innerLeft, Operator.and, innerRight, { leading: "!(", trailing: ")" });

    expect(exp1.equals(exp2)).toBeTruthy();
    expect(exp2.equals(exp1)).toBeTruthy();
    expect(innerLeft.equals(notInnerLeft)).toBeFalsy();
    expect(exp1.equals(notExp1)).toBeFalsy();
    expect(innerLeft.equalsAndOpposite(notInnerLeft)).toBeTruthy();
});

test("Absorption w/ same values", () => {
    expect(simplify("A&A", true)?.toString()).toBe("A");
    expect(simplify("A|A&A", true)?.toString()).toBe("A");
    expect(simplify("A>A&A|A", true)?.toString()).toBe("A");
    expect(simplify("(A&A)|(A&A)", true)?.toString()).toBe("A");
    expect(simplify("((A|A)>(A&(A|A)))", true)?.toString()).toBe("A");
    expect(simplify("A|A|(A>A)&(A|A&A)>A", true)?.toString()).toBe("A");
});

test("Absorption w/ different values", () => {
    expect(simplify("A&B|A", true)?.toString()).toBe("A");
    expect(simplify("A&(B|B)&C", true)?.toString()).toBe("A & B & C");
    expect(simplify("A&B|A&B", true)?.toString()).toBe("A & B");
    expect(simplify("A&B&A&B", true)?.toString()).toBe("A & B");
    expect(simplify("(A&B|C&D)&(A&B|C&D)", true)?.toString()).toBe("A & B | C & D");
    expect(simplify("A>A&B", true)?.toString()).toBe("!A | B");
    expect(simplify("A&B&A", true)?.toString()).toBe("A & B");
    expect(simplify("A|B|A&B", true)?.toString()).toBe("A | B");
    expect(simplify("A|B|A|B", true)?.toString()).toBe("A | B");
    expect(simplify("A|B|C|A", true)?.toString()).toBe("A | B | C");
});

test("Distributivity", () => {
    expect(simplify("A&B|B&C", true)?.toString()).toBe("B & (A | C)");
    expect(simplify("(A|B)&(B|C)", true)?.toString()).toBe("B | A & C");
    expect(simplify("(A|B)&(B|C)&D|(A|B)&(B|C)&E", true)?.toString()).toBe("(B | A & C) & (D | E)");
});

test("Elimination of implication", () => {
    expect(simplify("A>B", true)?.toString()).toBe("!A | B");
    expect(simplify("A&C>B", true)?.toString()).toBe("!(A & C) | B");
    expect(simplify("!(A|B)>C", true)?.toString()).toBe("(A | B) | C");
});

test("De Morgan's law", () => {
    expect(simplify("!A&!B", true)?.toString()).toBe("!(A | B)");
    expect(simplify("!A|!B", true)?.toString()).toBe("!(A & B)");
    expect(simplify("!(A|B)&!(C|D)", true)?.toString()).toBe("!((A | B) | (C | D))");
});

test("Parenthesis", () => {
    expect(simplify("A&(B|C)&D", true)?.toString()).toBe("A & (B | C) & D");
    expect(simplify("(!(A&B)|(C>D))&E", true)?.toString()).toBe("(!(A & B) | (!C | D)) & E");
});

test("Commutative", () => {
    expect(simplify("B&A", true)?.toString()).toBe("A & B");
    expect(simplify("B|A", true)?.toString()).toBe("A | B");
    expect(simplify("G&(H|B)>A&(J|C)", true)?.toString()).toBe("!(G & (B | H)) | A & (C | J)");
});

test("Operator weight", () => {
    expect(simplify("A&B&C|D", true)?.operator).toBe(Operator.or);
    expect(simplify("A|B&C&D", true)?.operator).toBe(Operator.or);
    expect(simplify("A>B&C|D", true)?.left?.toString()).toBe("!A");
    expect(simplify("A>B|C&D|E>F&G", true)?.right?.toString()).toBe("F & G");
});

test("Several", () => {
    expect(simplify("A&B|C>C&A", true)?.toString()).toBe("!(A & B | C) | A & C");
});

test("Always true / false", () => {
    const innerA = new Expression("A", null, null, { isAtomic: true });
    const innerB = new Expression("B", null, null, { isAtomic: true });
    const aAndB = new Expression(innerA, Operator.and, innerB, {});
    const notAAndB = new Expression(innerB, Operator.and, innerB, { leading: "!(", trailing: ")" });
    const alwaysFalse = new Expression(aAndB, Operator.and, notAAndB, {});

    expect(simplify("A&!A", true)?.toString()).toBe("!A & A");
    expect(simplify("A|!A", true)?.toString()).toBe("!A | A");
    expect(simplify("A&B&!A", true)?.toString()).toBe("!A & A");
    expect(simplify("!A&B&A", true)?.toString()).toBe("!A & A");
    expect(simplify("A>A|B", true)?.toString()).toBe("!A | A");
    expect(simplify("A&!(A|B)", true)?.toString()).toBe("!A & A");
    expect(simplify("A&B&!(A&B)", true)?.toString()).toBe("A & B & !(A & B)");
    expect(simplify("A&B|!(A&B)", true)?.toString()).toBe("A & B | !(A & B)");
    expect(alwaysFalse.solve(true, false)).toBeFalsy();
});

test("Don't simplify", () => {
    expect(simplify("A&B|!A", true)?.toString()).toBe("A & B | !A");
    expect(simplify("A|B&!A", true)?.toString()).toBe("A | !A & B");
});
