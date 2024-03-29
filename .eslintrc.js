module.exports =  {
    "env": {
      "browser": true,
      "node": true,
      "jquery": true,
      "jest": true
    },
    "parser":  "@typescript-eslint/parser",  // Specifies the ESLint parser
    "extends":  [
      "plugin:@typescript-eslint/recommended",  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    ],
   "parserOptions":  {
      "ecmaVersion":  2018,  // Allows for the parsing of modern ECMAScript features
      "sourceType":  "module",  // Allows for the use of imports
    },
  
    "rules": {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-function": "off",
    }
  }