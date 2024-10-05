module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir:'src',
    coverageDirectory: '../coverage',
    collectCoverage: true,
    collectCoverageFrom: [
      "**/*.{ts,tsx,js,jsx}",
      "!**/*/*.d.ts",
      "!**/coverage/**",
      "!**/node_modules/**",
      "!**/jest.setup.js",
      "!**/app.handler.ts",
      "!**/index.ts",
      "!**/*model.ts"
    ],
    verbose: true,
    moduleFileExtensions: ['ts', 'js', 'json'],
    testMatch: ['**/test/**/*.spec.ts'],
    transform: {
        '^.+\\.ts$': ['ts-jest', {
          tsconfig: 'tsconfig.json', 
          isolatedModules: true,
          diagnostics: false,   
        }],
    },
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
    },
};