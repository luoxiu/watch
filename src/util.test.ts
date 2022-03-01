import {readPKG, mute} from "./util";
import {jest} from "@jest/globals";

jest.useFakeTimers();

test("readPKG", async () => {
  const pkg = await readPKG();
  expect(pkg.name).toEqual("@luoxiu/watch");
});

test("mute", async () => {
  const e = async (msg: string) => {
    throw msg;
  };
  const msg = await mute(e)("msg");
  expect(msg).toEqual("msg");
});