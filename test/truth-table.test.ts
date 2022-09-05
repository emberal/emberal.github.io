import { isLegalExpression, simplify } from '../src/classes/expression_utils';
import { Expression } from "../src/classes/expression";
import { Operator } from "../src/classes/operator";

/**
 * Not: ¬
 * And: ⋀
 * Or: ⋁
 * Implication: ➔
 */

test("Equals", () => {
    const innerLeft = new Expression({ atomic: "A" });
    const innerLeftParentheses = new Expression({ atomic: "A", leading: "(", trailing: ")" });
    const notInnerLeft = new Expression({ leading: "¬", atomic: "A" });
    const innerRight = new Expression({ atomic: "B" });

    const exp1 = new Expression({ left: innerLeft, operator: Operator.and, right: innerRight });
    const exp2 = new Expression({ left: innerLeft, operator: Operator.and, right: innerRight });
    const notExp1 = new Expression({
        left: innerLeft,
        operator: Operator.and,
        right: innerRight,
        leading: "¬(",
        trailing: ")"
    });

    expect(exp1.equals(exp2)).toBeTruthy();
    expect(exp2.equals(exp1)).toBeTruthy();
    expect(innerLeft.equals(notInnerLeft)).toBeFalsy();
    expect(exp1.equals(notExp1)).toBeFalsy();
    expect(innerLeft.equalsAndOpposite(notInnerLeft)).toBeTruthy();
    expect(innerLeft.equals(innerLeftParentheses)).toBeTruthy();
});

test("Absorption w/ same values", () => {
    expect(simplify("A⋀A", true).toString()).toBe("A");
    expect(simplify("(A)⋀A", true).toString()).toBe("A");
    expect(simplify("A⋁A⋀A", true).toString()).toBe("A");
    expect(simplify("(A⋀A)⋁(A⋀A)", true).toString()).toBe("A");
    expect(simplify("A⋀A➔¬A➔A", true).toString()).toBe("A");
    expect(simplify("A⋁A⋁(A➔A)⋀(A⋁A⋀A)➔A", true).toString()).toBe("A");
    expect(simplify("A➔¬A", true).toString()).toBe("¬A");
});

test("Absorption w/ different values", () => {
    expect(simplify("A⋀B⋁A", true).toString()).toBe("A");
    expect(simplify("(A⋁B)⋀A", true).toString()).toBe("A");
    expect(simplify("A⋀(B⋁B)⋀C", true).toString()).toBe("A ⋀ B ⋀ C");
    expect(simplify("A⋀B⋁A⋀B", true).toString()).toBe("A ⋀ B");
    expect(simplify("A⋀B⋀A⋀B", true).toString()).toBe("A ⋀ B");
    expect(simplify("(A⋀B⋁C⋀D)⋀(A⋀B⋁C⋀D)", true).toString()).toBe("A ⋀ B ⋁ C ⋀ D");
    expect(simplify("A➔A⋀B", true).toString()).toBe("¬A ⋁ B");
    expect(simplify("A⋀B⋁¬A", true).toString()).toBe("¬A ⋁ B");
    expect(simplify("A⋁B⋀¬A", true).toString()).toBe("A ⋁ B");
    expect(simplify("A⋀B⋀A", true).toString()).toBe("A ⋀ B");
    expect(simplify("A⋁B⋁A⋀B", true).toString()).toBe("A ⋁ B");
    expect(simplify("A⋁B⋁A⋁B", true).toString()).toBe("A ⋁ B");
    expect(simplify("A⋁B⋁C⋁A", true).toString()).toBe("A ⋁ B ⋁ C");
    expect(simplify("¬A⋀B⋁(A➔B)", true).toString()).toBe("¬A ⋁ B");
    expect(simplify("¬A⋀A⋁B", true).toString()).toBe("B");
});

test("Distributivity", () => {
    expect(simplify("A⋀B⋁B⋀C", true).toString()).toBe("B ⋀ (A ⋁ C)");
    expect(simplify("(A⋁B)⋀(B⋁C)", true).toString()).toBe("B ⋁ A ⋀ C");
    expect(simplify("(A⋁B)⋀(B⋁C)⋀D⋁(A⋁B)⋀(B⋁C)⋀E", true).toString()).toBe("(B ⋁ A ⋀ C) ⋀ (D ⋁ E)");
    expect(simplify("A⋀B⋁¬C➔D", true).toString()).toBe("¬(A ⋀ B) ⋀ C ⋁ D");
});

test("Elimination of implication", () => {
    expect(simplify("A➔B", true).toString()).toBe("¬A ⋁ B");
    expect(simplify("A⋀C➔B", true).toString()).toBe("¬(A ⋀ C) ⋁ B");
    expect(simplify("¬(A⋁B)➔C", true).toString()).toBe("A ⋁ B ⋁ C");
});

test("De Morgan's law", () => {
    expect(simplify("¬A⋀¬B", true).toString()).toBe("¬(A ⋁ B)");
    expect(simplify("¬A⋁¬B", true).toString()).toBe("¬(A ⋀ B)");
    expect(simplify("¬(A⋁B)⋀¬(C⋁D)", true).toString()).toBe("¬(A ⋁ B ⋁ C ⋁ D)");
    expect(simplify("¬(¬A⋀B)", true).toString()).toBe("A ⋁ ¬B");
    expect(simplify("A⋀B➔C➔D", true).toString()).toBe("A ⋀ B ⋀ ¬C ⋁ D");
});

test("Parenthesis", () => {
    expect(simplify("A⋀(B⋁C)⋀D", true).toString()).toBe("A ⋀ (B ⋁ C) ⋀ D");
    expect(simplify("(¬(A⋀B)⋁(C➔D))⋀E", true).toString()).toBe("(¬(A ⋀ B) ⋁ ¬C ⋁ D) ⋀ E");
});

test("Commutative", () => {
    expect(simplify("B⋀A", true).toString()).toBe("A ⋀ B");
    expect(simplify("B⋁A", true).toString()).toBe("A ⋁ B");
    expect(simplify("G⋀(H⋁B)➔A⋀(J⋁C)", true).toString()).toBe("¬(G ⋀ (B ⋁ H)) ⋁ A ⋀ (C ⋁ J)");
});

test("Operator weight", () => {
    expect(simplify("A⋀B⋀C⋁D", false).operator).toBe(Operator.or);
    expect(simplify("A⋁B⋀C⋀D", false).operator).toBe(Operator.or);
    expect(simplify("A➔B⋀C⋁D", false).left?.toString()).toBe("A");
    expect(simplify("A➔B⋁C⋀D⋁E➔F⋀G", false).right?.toString()).toBe("F ⋀ G");
});

test("Several", () => {
    expect(simplify("A⋀B⋁C➔C⋀A", true).toString()).toBe("¬(A ⋀ B ⋁ C) ⋁ A ⋀ C");
});

test("Always true / false", () => {
    const innerA = new Expression({ atomic: "A" });
    const innerB = new Expression({ atomic: "B" });
    const aAndB = new Expression({ left: innerA, operator: Operator.and, right: innerB });
    const notAAndB = new Expression({
        left: innerB,
        operator: Operator.and,
        right: innerB,
        leading: "¬(",
        trailing: ")"
    });
    const alwaysFalse = new Expression({ left: aAndB, operator: Operator.and, right: notAAndB });

    expect(simplify("A⋀¬A", true).toString()).toBe("A ⋀ ¬A");
    expect(simplify("A⋁¬A", true).toString()).toBe("A ⋁ ¬A");
    expect(simplify("A⋀B⋀¬A", true).toString()).toBe("A ⋀ ¬A");
    expect(simplify("¬A⋀B⋀A", true).toString()).toBe("A ⋀ ¬A");
    expect(simplify("¬A⋁B⋁¬B", true).toString()).toBe("B ⋁ ¬B");
    expect(simplify("A➔A⋁B", true).toString()).toBe("A ⋁ ¬A");
    expect(simplify("A➔A⋀A⋁A", true).toString()).toBe("A ⋁ ¬A");
    expect(simplify("((A⋁A)➔(A⋀(A⋁A)))", true).toString()).toBe("A ⋁ ¬A");
    expect(simplify("A⋀¬(A⋁B)", true).toString()).toBe("A ⋀ ¬A");
    expect(simplify("A⋀¬A⋀!B", true).toString()).toBe("A ⋀ ¬A");
    expect(simplify("A⋀B⋀¬(A⋀B)", true).toString()).toBe("A ⋀ B ⋀ ¬(A ⋀ B)");
    expect(simplify("A⋀B⋁¬(A⋀B)", true).toString()).toBe("A ⋀ B ⋁ ¬(A ⋀ B)");
    expect(simplify("¬(A⋀¬A)➔A", true).toString()).toBe("A");
    expect(alwaysFalse.solve(true, false)).toBeFalsy();
});

test("Merge not", () => {
    expect(simplify("¬¬A", true).toString()).toBe("A");
    expect(simplify("¬¬¬A", true).toString()).toBe("¬A");
});

test("Don't simplify", () => {
    expect(simplify("¬A", true).toString()).toBe("¬A");
});

test("Word expressions", () => {
    expect(simplify("[first]⋀[last]⋁[first]", true).toString()).toBe("[first]");
    expect(simplify("[first]⋀B⋁B", true).toString()).toBe("B");
    expect(simplify("[⋁]⋁A", true).toString()).toBe("A ⋁ [⋁]");
});

test("Legal expressions", () => {
    expect(isLegalExpression("A", {})).toBe("");
    expect(isLegalExpression("[Hello]", {})).toBe("");
    expect(isLegalExpression("A⋁B", {})).toBe("");
    expect(isLegalExpression("A⋀B", {})).toBe("");
    expect(isLegalExpression("A➔B", {})).toBe("");
    expect(isLegalExpression("A⋁¬B", {})).toBe("");
    expect(isLegalExpression("¬A⋀¬B", {})).toBe("");
    expect(isLegalExpression("[Hello]⋀[World]", {})).toBe("");
    expect(isLegalExpression("A⋁B⋀C➔D", {})).toBe("");
    expect(isLegalExpression("([A])", {})).toBe("");
});

test("Illegal expressions", () => {
    expect(isLegalExpression("#", {}) !== "").toBeTruthy();
    expect(isLegalExpression("AB", {}) !== "").toBeTruthy();
    expect(isLegalExpression("A⋁⋀", {}) !== "").toBeTruthy();
    expect(isLegalExpression("A(", {}) !== "").toBeTruthy();
    expect(isLegalExpression("A[", {}) !== "").toBeTruthy();
    expect(isLegalExpression("A]", {}) !== "").toBeTruthy();
    expect(isLegalExpression("A)", {}) !== "").toBeTruthy();
    expect(isLegalExpression("A⋀(B]", {}) !== "").toBeTruthy();
    expect(isLegalExpression("A⋀()", {}) !== "").toBeTruthy();
    expect(isLegalExpression("A¬B", {}) !== "").toBeTruthy();
    expect(isLegalExpression("(A⋀B)(B⋀C)", {}) !== "").toBeTruthy();
    expect(isLegalExpression("[Hello][World]", {}) !== "").toBeTruthy();
});
