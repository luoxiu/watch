# Watch

Do something exciting when file changes!

## Install

```
$ npm install -g @luoxiu/watch

$ yarn add -g @luoxiu/watch

$ pnpm add -g @luoxiu/watch
```

## Usage

In your working directory, execute:

```
$ watch
```

It will find `watch.config.js` in the current directory, and watch as it configures.

For example:

```js
module.exports = {
    watchers: [
        {
        
            paths: ["Source/**/*.swift", "Tests/**/*.swift"],
            options: {},
            callbacks: [
                {
                    events: ["add", "change"],
                    callback: async (path) => {
                        await $`swiftformat ${path}`
                    }
                }
            ]
        }
    ]
}
```
