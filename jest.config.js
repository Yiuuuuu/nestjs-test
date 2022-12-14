module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json", "ts"],
  roots: ["<rootDir>/src"],
  moduleDirectories: ["node_modules"],
  modulePaths: ["<rootDir>"],
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
  transform: {
    "^.+\\.(t|j)s?$": ["@swc/jest"],
  },
  setupFiles: ["<rootDir>/jest.setup.ts"],
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: [
    "<rootDir>/(.*).entity.ts",
    "<rootDir>/(.*).dto.ts",
    "<rootDir>/(.*).interface.ts",
    "<rootDir>/(.*).errors?.ts",
    "<rootDir>/(.*).vo.ts",
    "<rootDir>/(.*).module.ts",
    "<rootDir>/(.*).module.tokens.ts",
    "<rootDir>/(.*).types?.ts",
    "<rootDir>/(.*).constants?.ts",
  ],
  moduleNameMapper: {
    "^~services/(.*)$": "<rootDir>/src/services/$1",
    "^~infras/(.*)$": "<rootDir>/src/infras/$1",
    "^~ports/(.*)$": "<rootDir>/src/ports/$1",
    "^~utils/(.*)$": "<rootDir>/src/utils/$1",
    "^~/(.*)$": "<rootDir>/src/$1",
    "^uuid$": require.resolve("uuid"),
  },
};
