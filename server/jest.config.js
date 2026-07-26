// const { createDefaultPreset } = require("ts-jest");

// const tsJestTransformCfg = createDefaultPreset().transform;

// /** @type {import("jest").Config} **/
// export default {
//   testEnvironment: "node",
//   transform: {
//     ...tsJestTransformCfg,
//   },
// };

// const { createDefaultPreset } = require("ts-jest");

import { createDefaultPreset } from "ts-jest";

const config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  // testEnvironment: "node",

  transform: createDefaultPreset().transform,

  testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],

  moduleFileExtensions: ["ts", "js", "json"],

  clearMocks: true,

  verbose: true,

  setupFilesAfterEnv: ["<rootDir>/src/__test__/setup.ts"],
};

export default config;
