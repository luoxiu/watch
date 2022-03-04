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
async function format(path) {
    await $`swiftformat ${path}`
    await $`open ${path} -a Xcode`
}

module.exports = {
  watchers: [
    {
      paths: ["Sources/**/*.swift", "Tests/**/*.swift"],
      options: {
        usePolling: true,
        interval: 500
      },
      callbacks: [
        {
          events: ["change"],
          callback: async (path) => {
              _.debounce(format, 500)(path)
          }
        }
      ]
    }
  ]
}
```

### chokidar

`watch` uses [chokidar](https://github.com/paulmillr/chokidar) to watch file changes, so you can watch `add | change | unlink(remove) | etc` events on `file | dir | glob | etc`. 

Please refer to [chokidar#api](https://github.com/paulmillr/chokidar#api) to learn more about `paths`, `options`, `events` and `callbacks`.

### zx

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

### lodash

`watch` also includes [lodash](https://lodash.com), so you can use your favorite lodash functions like `_.cloneDeep`, `_.uniq`, `_.debounce` to write your ambitious configs.

Please refer to [lodash#Docs](https://lodash.com/docs) to learn more about `lodash`.
