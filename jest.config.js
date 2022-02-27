export default {
  // https://kulshekhar.github.io/ts-jest/docs/getting-started/presets
  preset: "ts-jest/presets/default-esm",
  globals: {
    "ts-jest": {
      useESM: true
    }
  },
};
