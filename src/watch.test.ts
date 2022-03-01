import { getConfig } from "./watch";
import { dir } from "./util";
import * as path from "node:path";

test("getConfig", async () => {

  const cfgPaths = [
    "../fixtures/cfg/obj.js",
    "../fixtures/cfg/fn.js",
    "../fixtures/cfg/async-fn.js"
  ];

  for (const cfgPath of cfgPaths) {
    const cfg = await getConfig(path.join(dir, cfgPath));
    expect(cfg.watchers).toBeDefined();
  }
});
