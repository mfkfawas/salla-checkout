module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/__mocks__/svgMock.js',
  },

  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json', // or your custom tsconfig for Jest
    },
  },
};
