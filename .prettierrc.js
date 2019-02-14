module.exports = {
  /**
   * Include parentheses around a sole arrow function parameter
   */
  arrowParens: 'avoid',
  /**
   * Controls the printing of trailing commas wherever possible.
   * Valid options:
   * 'none' - No trailing commas
   * 'es5' - Trailing commas where valid in ES5 (objects, arrays, etc)
   * 'all' - Trailing commas wherever possible (function arguments)
   */
  trailingComma: 'all',
  tabWidth: 2, // Number of spaces it should use per tab
  semi: true, // Whether to add a semicolon at the end of every line
  singleQuote: true, // If true, will use single instead of double quotes
  printWidth: 85, // Fit code within this line limit
  useTabs: false, // Indent lines with tabs
};
