// jest.config.js
module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest", // Ensure JSX/TSX is processed by babel-jest
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)/", // This tells Jest to transform axios, which uses ESM
  ],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"], // Ensure Jest resolves .js/.jsx/.ts/.tsx files
  testEnvironment: "jsdom",
  testRegex: "src/App.test.js$", // Use regex to match the file
};
