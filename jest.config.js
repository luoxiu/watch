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
  },
};
