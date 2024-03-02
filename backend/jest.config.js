module.exports = {
    globalSetup: './tests/setup.js',
    globalTeardown: './tests/teardown.js',
    testEnvironment: 'node', // Use the Node test environment
    testMatch: ['**/tests/**/*.test.js'], // Pattern to locate test files
    clearMocks: true, // Automatically clear mock calls, instances, and results before every test
    coverageDirectory: 'coverage', // Directory where Jest should output its coverage files
    collectCoverageFrom: [ // Specify which files should be included in the coverage
      'src/**/*.js',
      '!src/server.js', // Exclude server.js or any other file as needed
    ],
  };
  