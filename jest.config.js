/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleNameMapper: {
		"^@src(.*)$": "<rootDir>/dist$1",
		"^@models(.*)$": "<rootDir>/dist/models$1",
		"^@classes(.*)$": "<rootDir>/dist/classes$1",
		"^@controllers(.*)$": "<rootDir>/dist/controllers$1",
	},
};
