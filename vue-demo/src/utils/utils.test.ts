import { product, sum } from "./utils"

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});


test('multiplies 2 & 2 to equal 4', () => {
    expect(product(2, 2)).toBe(4);
});