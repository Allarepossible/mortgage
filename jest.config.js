module.exports = {
    verbose: true,
    cacheDirectory: './tmp/tests',
    coverageDirectory: './tmp/coverage',
    testEnvironment: 'jsdom',
    testURL: 'http://localhost:3000',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    setupFilesAfterEnv: ['<rootDir>/scripts/jest/setup.js'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    modulePaths: ['src'],
    moduleDirectories: ['node_modules'],
    moduleNameMapper: {
        '^actions(.*)$': '<rootDir>/src/actions$1',
    },
    collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**'],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 80,
        },
    },
    snapshotSerializers: ['enzyme-to-json/serializer'],
    globals: {
        window: true,
        snapshot: true,
        'ts-jest': {
            tsConfig: './tsconfig.json',
        },
    },
};
