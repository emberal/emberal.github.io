import { simplify } from '../src/pages/truth-table'

test("Absorption w/ same values", () => {
    expect(simplify("A&A")).toBe("A");
    expect(simplify("A|A&A")).toBe("A");
    expect(simplify("A>A&A|A")).toBe("A");
    expect(simplify("(A&A)|(A&A)")).toBe("A");
    expect(simplify("((A|A)>(A&(A|A)))")).toBe("A");
    expect(simplify("A|A|(A>A)&(A|A&A)>A")).toBe("A");
});

test("Absorption w/ different values", () => {
    expect(simplify("A&B|A")).toBe("A");
    expect(simplify("A&(B|B)&C")).toBe("A & B & C");
    expect(simplify("A&B|A&B")).toBe("A & B");
});

test("Distributivity", () => {
    expect(simplify("A&B|B&C")).toBe("B & (A | C)");
    expect(simplify("(A|B)&(B|C)")).toBe("B | A & C");
});

test("Elimination of implication", () => {
    expect(simplify("A>B")).toBe("!A | B");
    expect(simplify("A&C>B")).toBe("!(A & C) | B");
    expect(simplify("!(A|B)>C")).toBe("(A | B) | C");
});

test("De Morgan's law", () => {
    expect(simplify("!A&!B")).toBe("!(A | B)");
    expect(simplify("!A|!B")).toBe("!(A & B)");
    expect(simplify("!(A|B)&!(C|D)")).toBe("!((A | B) | (C | D))");
});

test("Parenthesis", () => {
    expect(simplify("A&(B|C)&D")).toBe("A & (B | C) & D");
    expect(simplify("(!(A&B)|(C>D))&E")).toBe("(!(A & B) | (!C | D)) & E");
});

test("Commutative", () => {
    expect(simplify("B&A")).toBe("A & B");
    expect(simplify("B|A")).toBe("A | B");
    expect(simplify("G&(H|B)>A&(J|C)")).toBe("!(G & (B | H)) | A & (C | J)");
});

test("All", () => {
    expect(true).toBe(false); // TODO test all laws
});
