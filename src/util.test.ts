import {mute, readPKG} from "./util";

test("readPKG", async () => {
  const pkg = await readPKG();
  expect(pkg.name).toEqual("watch");
});

test("mute", async () => {

  const e = async () => {
    throw "e";
  };

  const muteE = mute(e);
  await muteE();
});