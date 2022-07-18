import { simplify } from '../src/pages/truth-table'

test("Absorption w/ same values", () => {
    expect(simplify("A&A").toString()).toBe("A");
    expect(simplify("A|A&A").toString()).toBe("A");
    expect(simplify("A>A&A|A").toString()).toBe("A");
    expect(simplify("(A&A)|(A&A)"));
    expect(simplify("((A|A)>(A&(A|A)))").toString()).toBe("A");
});

test("Absorption w/ different values", () => {
    expect(simplify("A&B|A").toString()).toBe("A");
    expect(simplify("A&(B|B)&C").toString()).toBe("A & B & C");
});

test("Distributivity", () => {
    expect(simplify("(A&B)|(B&C)").toString()).toBe("B & (C | A)");
});

test("Elimination of implication", () => {
    expect(simplify("A>B").toString()).toBe("!A | B");
    expect(simplify("(A&C)>B").toString()).toBe("!(A & C) | B");
});

test("De Morgan's law", () => {
    expect(simplify("!A&!B)").toString()).toBe("!(A | B)");
    expect(simplify("!A|!B").toString()).toBe("!(A & B)");
});

// test("Commutative", () => {
//     expect(simplify("B&A").toString()).toBe("A & B");
//     expect(simplify(("B|A").toString())).toBe("A | B");
// });