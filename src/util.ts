import { readFile } from "node:fs/promises";
import { pkgUp } from "pkg-up";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function readJSON(path: string): Promise<any> {
  const text = await readFile(path, "utf8");
  return JSON.parse(text);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function readPKG(): Promise<any> {
  const path = await pkgUp();
  if (!path) {
    throw "package.json not found";
  }
  return await readJSON(path);
}
