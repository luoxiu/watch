# Watch

Do something exciting on file changes!

![ci](https://img.shields.io/github/workflow/status/luoxiu/watch/CI)
![npm](https://img.shields.io/npm/v/@luoxiu/watch)
![license](https://img.shields.io/github/license/luoxiu/watch)

## Install

```
$ npm install -g @luoxiu/watch

$ yarn add -g @luoxiu/watch

$ pnpm add -g @luoxiu/watch
```

## Usage

In your working directory, create a file named `watch.config.js`:

```
$ cd ./wd && touch watch.config.js
```

and execute:

```
$ watch
```

## `watch.config.js`

The following example will format your swift code as it changes:

```js
// watch.config.js
module.exports = {
    watchers: [ 
        {
            paths: ["Source/**/*.swift", "Tests/**/*.swift"],
            options: {
                ignored: ["*.generated.swift"],
            },
            callbacks: [
                {
                    events: ["change"],
                    callback: async (path) => {
                        await $`swiftformat ${path}`
                    }
                }
            ]
        }
    ]
}

// or
module.exports = async () => {
    return {
        // ...
    }
}
```

`watch` uses [chokidar](https://github.com/paulmillr/chokidar) to watch file changes, so you can watch `add | change | unlink(remove) | more` events on `file | dir | glob | more`. 

Please refer to [chokidar#api](https://github.com/paulmillr/chokidar#api) to learn more about `paths`, `options`, `events` and `callbacks`.

`watch` uses [zx](https://github.com/google/zx) to execute callbacks, so you can write expressive scripts like:

```
{
    events: ["changes"],
    callback: async (path) => {
        const resp = await fetch('https://wttr.in')
        const text = await fs.readFile(path)

        console.log(chalk.blue('Hello world!'))

        cd('/a-path')
        await $`pwd` // outputs /tmp
    }
}
```

Please refer to [zx#documentation](https://github.com/google/zx#documentation) to learn more about `zx`.
