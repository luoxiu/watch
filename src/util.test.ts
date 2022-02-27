import {readPKG} from "./util";

test("readPKG", async () => {
  const pkg = await readPKG();
  expect(pkg.name).toEqual("watch");
});