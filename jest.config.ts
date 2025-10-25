import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    roots: ["<rootDir>/test"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    transform: {
        "^.+\\.(ts|tsx)$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.jest.json"
            }
        ]
    },
    setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"],
    transformIgnorePatterns: [
        "node_modules/(?!(.*\\.mjs$))"
    ],
    testEnvironmentOptions: {
        customExportConditions: [""]
    }
};

export default config;
