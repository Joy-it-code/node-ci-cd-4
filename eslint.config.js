export default [
  {
    files: ["**/*.js"], // Specify the file types you want ESLint to process
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
