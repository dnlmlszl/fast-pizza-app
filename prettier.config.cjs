// module.exports = {
//   plugins: [require('prettier-plugin-tailwindcss')],
//   singleQuote: true,
// };

/** @type {import('prettier').Config} */
const prettierPluginTailwindCSS = require('prettier-plugin-tailwindcss');
const sortImports = require('@ianvs/prettier-plugin-sort-imports');

module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  pluginSearchDirs: false,
  plugins: [sortImports, prettierPluginTailwindCSS],
  importOrder: ['^@', '^[a-zA-Z0-9-]+', '^[./]'],
}