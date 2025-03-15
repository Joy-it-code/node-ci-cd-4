export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest", // Set the ECMAScript version
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "semi": ["error", "always"],
    },
  },
];
