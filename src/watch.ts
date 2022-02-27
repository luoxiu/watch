#!/usr/bin/env node

import chokidar from "chokidar";
import path from "path";
import fs from "fs";
import chalk from "chalk";
import { Command } from "commander";
import { readPKG } from "./util.ts";

const program = new Command();

Object.assign(global, { chalk });

const configName = ".watchrc.js";
const configPath = path.join(process.cwd(), configName);

async function getConfig() {
  if (!fs.existsSync(configPath)) {
    throw `config not found: "./${configName}"`;
  }

  const module = await import(configPath);

  return module.default;
}

async function watchUseConfig() {
  const config = await getConfig();

  const { watchers } = config;

  return watchers.map(({ paths, options, handlers }) => {
    const watcher = chokidar.watch(paths, options);

    for (const { eventName, callback } of handlers) {
      watcher.on(eventName, callback);
    }

    return watcher;
  });
}

async function rewatchOnConfigChange() {
  let watchers;

  const rewatch = async () => {
    if (Array.isArray(watchers)) {

      const close = async (watcher) => {
        try {
          await watcher.close();
        } catch(err) {
          console.error(chalk.red(err));
        }
      };

      await Promise.all(watchers.map(close));
    }

    watchers = await watchUseConfig();
  };

  // 'add'|'addDir'|'change'
  chokidar.watch(configPath)
    .on("change", () => {
      console.log(chalk.green("config changed, re-watching..."));
      rewatch()
        .then(() => {
          console.log(chalk.green("re-watching done"));
        });
    });
}

program
  .option(pkg.version, "-v, --version")
  .action(async () => {
    await rewatchOnConfigChange();
    await watchUseConfig();
  })
  .parseAsync(process.argv)
  .catch(err => {
    console.error(chalk.red(err));
    process.exit(1);
  });