module.exports = {
    clearMocks: true,
    coveragePathIgnorePatterns: [
        'specs/mock',
        '.*\\.d\\.ts'
    ],
    testMatch: [
        '<rootDir>/src/**/?(*.)(spec).ts'
    ],
    testURL: 'http://localhost',
    transform: {
        '^(?!.*\\.(js|ts|json)$)': '<rootDir>/config/jest/transform/file.transform.js',
        '^.+\\.ts?$': '<rootDir>/config/jest/transform/typescript.transform.js'
    },
    moduleFileExtensions: [
        'ts',
        'js',
        'json'
    ],
    globals: {
        'ts-jest': { tsConfig: './tsconfig.spec.json' }
    }
};
