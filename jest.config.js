module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost:4000',
  },
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.js'],
};
