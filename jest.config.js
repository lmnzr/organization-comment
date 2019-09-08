module.exports = {
    roots: ['<rootDir>/tests'],
    transform: {'^.+\\.ts?$': 'ts-jest'},
    testEnvironment: 'node',
    testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    coverageDirectory: "./coverage/",
    coveragePathIgnorePatterns: [
      "./node_modules/",
      "./.vscode/",
      "./build",
      "./log",
      "./migrations",
      ".dockerignore",
      ".env",
    ]
  };