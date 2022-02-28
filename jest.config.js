export default {
  // https://kulshekhar.github.io/ts-jest/docs/next/guides/esm-support/#use-esm-presets
  preset: "ts-jest/presets/js-with-babel-esm",
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    // https://github.com/facebook/jest/issues/12270
    chalk: "chalk/source/index.js",
    "#ansi-styles": "chalk/source/vendor/ansi-styles/index.js",
    "#supports-color": "chalk/source/vendor/supports-color/index.js"
  },
};
