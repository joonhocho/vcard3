module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.module.json',
    },
  },
  moduleNameMapper: {
    '^_common/(.*)': '<rootDir>/src/common/$1',
    '^_deps/(.*)': '<rootDir>/src/deps/$1',
    '^_util/(.*)': '<rootDir>/src/util/$1',
    '^_src/(.*)': '<rootDir>/src/$1',
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  preset: 'ts-jest',
};
