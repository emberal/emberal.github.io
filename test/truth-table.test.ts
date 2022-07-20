import { simplify } from '../src/pages/truth-table'

test("Absorption w/ same values", () => {
    expect(simplify("A&A")).toBe("A");
    expect(simplify("A|A&A")).toBe("A");
    expect(simplify("A>A&A|A")).toBe("A");
    expect(simplify("(A&A)|(A&A)")).toBe("A");
    expect(simplify("((A|A)>(A&(A|A)))")).toBe("A");
});

test("Absorption w/ different values", () => {
    expect(simplify("A&B|A")).toBe("A");
    expect(simplify("A&(B|B)&C")).toBe("A & B & C");
});

test("Distributivity", () => {
    expect(simplify("A&B|B&C")).toBe("B & (C | A)");
    expect(simplify("(A|B)&(B|C)")).toBe("B | A & C");
});

test("Elimination of implication", () => {
    expect(simplify("A>B")).toBe("!A | B");
    expect(simplify("A&C>B")).toBe("!(A & C) | B");
});

test("De Morgan's law", () => {
    expect(simplify("!A&!B")).toBe("!(A | B)");
    expect(simplify("!A|!B")).toBe("!(A & B)");
});

test("Parenthesis", () => {
    expect(simplify("A&(B|C)&D")).toBe("A & (B | C) & D");
    expect(simplify("(!(A&B)|(C>D))&E")).toBe("(!(A&B)|(C>D))&E");
});

// test("Commutative", () => {
//     expect(simplify("B&A")).toBe("A & B");
//     expect(simplify(("B|A"))).toBe("A | B");
// });