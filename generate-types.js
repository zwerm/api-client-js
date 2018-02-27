// import { compileFromFile } from 'json-schema-to-typescript'
const schemaToTypescript = require('json-schema-to-typescript');
const fs = require('fs');
const prettier = require('prettier');

schemaToTypescript.compileFromFile('bots.schema.json')
                  .then(ts => `namespace BotsSchema { \n ${ts} }`)
                  .then(ts => prettier.format(`${ts}`, {
                      tabWidth: 4,
                      useTabs: false,
                      semi: true,
                      singleQuote: true,
                      trailingComma: 'none',
                      parser: 'typescript'
                  }))
                  .then(ts => fs.writeFileSync('bots.schema.d.ts', ts));
