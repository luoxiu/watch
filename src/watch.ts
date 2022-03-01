#!/usr/bin/env node

import chokidar, { FSWatcher } from "chokidar";
import * as path from "node:path";
import * as fs from "node:fs";
import chalk from "chalk";

import { mute, log } from "./util.js";
import is from "@sindresorhus/is";

const configName = ".watchrc.js";
const configPath = path.join(process.cwd(), configName);

export type Config = {
  watchers: {
    paths: string | string[];
    options: chokidar.WatchOptions;
    callbacks: {
      events: string | string[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (...args: any[]) => void | Promise<void>;
    }[];
  }[]
}

export async function getConfig(path: string = configPath): Promise<Config> {
  if (!fs.existsSync(path)) {
    throw "config: .watchrc.js not found";
  }

  const module = await import(path);

  const config = module.default;

  if (is.asyncFunction(config)) 
    return await config() as Config;

  if (is.function_(config))
    return config() as Config;
  
  if (is.object(config))
    return config as Config;

  throw "config: .watchrc.js bad format";
}

export async function watch(): Promise<FSWatcher[]> { 
  const config = await getConfig();

  const { watchers } = config;

  return watchers.map(({ paths, options, callbacks }) => {
    const watcher = chokidar.watch(paths, options);

    for (const { events, callback } of callbacks) {
      const es = is.array(events) ? events : [events];
      for (const e of es) {
        watcher.on(e, callback);
      }
      log("start watching", chalk.blue(paths), "on", chalk.blue(es));
    }

    return watcher;
  });
}

export async function watchAndRewatchOnConfigChange() {
  let watchers = await watch();

  const rewatch = async () => {
    const close = mute((w: FSWatcher) => w.close());
    await Promise.all(watchers.map(close));

    watchers = await watch();
  };

  // 'add'|'addDir'|'change'
  chokidar.watch(configPath)
    .on("change", () => {
      
      log(chalk.green("config changed, rewatching..."));

      rewatch()
        .then(() => {
          log(chalk.green("done"));
        });
    });
}
