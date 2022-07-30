import { simplify } from '../src/pages/truth-table'

test("Absorption w/ same values", () => {
    expect(simplify("A&A")?.toString()).toBe("A");
    expect(simplify("A|A&A")?.toString()).toBe("A");
    expect(simplify("A>A&A|A")?.toString()).toBe("A");
    expect(simplify("(A&A)|(A&A)")?.toString()).toBe("A");
    expect(simplify("((A|A)>(A&(A|A)))")?.toString()).toBe("A");
    expect(simplify("A|A|(A>A)&(A|A&A)>A")?.toString()).toBe("A");
});

test("Absorption w/ different values", () => {
    expect(simplify("A&B|A")?.toString()).toBe("A");
    expect(simplify("A&(B|B)&C")?.toString()).toBe("A & B & C");
    expect(simplify("A&B|A&B")?.toString()).toBe("A & B");
    expect(simplify("(A&B|C&D)&(A&B|C&D)")?.toString()).toBe("A & B | C & D");
    expect(simplify("A>A&B")?.toString()).toBe("!A | B");
    expect(simplify("A>A|B")?.toString()).toBe("!A | A");
});

test("Distributivity", () => {
    expect(simplify("A&B|B&C")?.toString()).toBe("B & (A | C)");
    expect(simplify("(A|B)&(B|C)")?.toString()).toBe("B | A & C");
    expect(simplify("(A|B)&(B|C)&D|(A|B)&(B|C)&E")?.toString()).toBe("(B | A & C) & (D | E)");
});

test("Elimination of implication", () => {
    expect(simplify("A>B")?.toString()).toBe("!A | B");
    expect(simplify("A&C>B")?.toString()).toBe("!(A & C) | B");
    expect(simplify("!(A|B)>C")?.toString()).toBe("(A | B) | C");
});

test("De Morgan's law", () => {
    expect(simplify("!A&!B")?.toString()).toBe("!(A | B)");
    expect(simplify("!A|!B")?.toString()).toBe("!(A & B)");
    expect(simplify("!(A|B)&!(C|D)")?.toString()).toBe("!((A | B) | (C | D))");
});

test("Parenthesis", () => {
    expect(simplify("A&(B|C)&D")?.toString()).toBe("A & (B | C) & D");
    expect(simplify("(!(A&B)|(C>D))&E")?.toString()).toBe("(!(A & B) | (!C | D)) & E");
});

test("Commutative", () => {
    expect(simplify("B&A")?.toString()).toBe("A & B");
    expect(simplify("B|A")?.toString()).toBe("A | B");
    expect(simplify("G&(H|B)>A&(J|C)")?.toString()).toBe("!(G & (B | H)) | A & (C | J)");
});

test("Several", () => {
    expect(simplify("A&B|C>C&A")?.toString()).toBe("!(A & B | C) | C & A"); // TODO check test
});
