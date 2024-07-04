module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)", // Add axios to the list of modules to be transformed
  ],
  testEnvironment: "jsdom",
};
