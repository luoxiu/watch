import { getConfig } from "./watch";
import { pkgUpSync } from "pkg-up";
import * as path from "node:path";

const pkgPath: string = pkgUpSync() ?? "";
const pkgDir = path.dirname(pkgPath);

test("getConfig", async () => {

  const cfgPaths = [
    "./fixtures/cfg/obj.js",
    "./fixtures/cfg/fn.js",
    "./fixtures/cfg/async-fn.js"
  ];

  for (const cfgPath of cfgPaths) {
    const cfg = await getConfig(path.join(pkgDir, cfgPath));
    expect(cfg.watchers).toBeDefined();
  }
});
