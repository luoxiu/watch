#!/usr/bin/env node

import { Command } from "commander";
import { readPKG } from "./util.js";
import { watchAndRewatchOnConfigChange } from "./watch.js";
import chalk from "chalk";
import "zx/globals";
import * as _ from "lodash";

globalThis._ = _;

const program = new Command();

const pkg = await readPKG();

program
  .version(pkg.version, "-v, --version", "display version")
  .action(async () => {
    await watchAndRewatchOnConfigChange();
  })
  .parseAsync(process.argv)
  .catch(err => {
    console.error(chalk.red(err));
    process.exit(1);
  });