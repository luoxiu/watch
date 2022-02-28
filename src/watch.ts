#!/usr/bin/env node

import chokidar, { FSWatcher } from "chokidar";
import path from "path";
import fs from "fs";
import chalk from "chalk";
import { Command } from "commander";
import { readPKG, mute } from "./util.js";

const program = new Command();

Object.assign(global, { chalk });

const configName = ".watchrc.js";
const configPath = path.join(process.cwd(), configName);

type Config = {
  watchers: {
    paths: string | string[];
    options: chokidar.WatchOptions;
    handlers: {
      event: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (...args: any[]) => void
    }[];
  }[]
}

async function getConfig(): Promise<Config> {
  if (!fs.existsSync(configPath)) {
    throw `config not found: "./${configName}"`;
  }

  const module = await import(configPath);

  return module.default as Config;
}

async function watchUseConfig(): Promise<FSWatcher[]> { 
  const config = await getConfig();

  const { watchers } = config;

  return watchers.map(({ paths, options, handlers }) => {
    const watcher = chokidar.watch(paths, options);

    for (const { event, callback } of handlers) {
      watcher.on(event, callback);
    }

    return watcher;
  });
}

async function watch() {
  let watchers = await watchUseConfig();

  const rewatch = async () => {
    const close = mute((w: FSWatcher) => w.close());
    await Promise.all(watchers.map(close));

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

const pkg = await readPKG();

program
  .option(pkg.version, "-v, --version")
  .action(async () => {
    await watch();
  })
  .parseAsync(process.argv)
  .catch(err => {
    console.error(chalk.red(err));
    process.exit(1);
  });