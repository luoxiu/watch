import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
export function noop(o: any) {
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function readJSON(path: string): Promise<any> {
  const text = await readFile(path, "utf8");
  return JSON.parse(text);
}

export const thisFile = fileURLToPath(import.meta.url);
export const thisDir = dirname(thisFile);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function readPKG(): Promise<any> {
  const path = join(thisDir, "../package.json");
  return await readJSON(path);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mute<I = void>(fn: (i: I) => Promise<any>): (i: I) => Promise<void> {
  return function (i: I): Promise<void> {
    return fn(i).catch(e => e);
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function log(...args: any[]): void {
  console.log(chalk.blue("watch:"), ...args);
}
