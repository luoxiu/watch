import add from "./add";

test("add", () => {
  const n = add(1, 2);
  expect(n).toBe(3);
});
