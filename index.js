#!/usr/bin/env node
'use strict';


// Imports
const args            = require('yargs').argv;
const options         = { a: !!args.a, h: !!args.h };
const path            = require('path');
const packageJson     = require(path.join(__dirname, 'package.json'));
const chalk           = require('chalk');
const sourceProcessor = require('./processors/fileProcessor');


/**
 * 'comment-to-json' main function in charge of parsing arguments & launching
 * the file(s) comment parsing & transformation into JSON(s) objects.
 */
function main() {
  const thisPackage  = `${chalk.bold(`${packageJson.name} v${packageJson.version}`)}`;
  const usage =
    `Usage: ${chalk.yellow(packageJson.name)} sourceFilePath [targetFilePath] [option]
  
  ${chalk.bold('sourceFilePath')}:  path to commented file(s) incl. name or name pattern.
  (required)       - accept individual specific file name or quoted glob
                     patterns (i.e. '*.css' or '**/*.css').
  
  ${chalk.bold('targetFilePath')}:  target file path.
  (optional)       - if specified, the target filename (excluding the ext.) is
                     used if the sourceFilePath points to 1 file otherwise, it
                     is ignored and sourceFilePath file names are used instead.
                   - if specified, the target directory(ies) is(are) always
                     used.
                   - if not specified, the generated files inherit source
                     files path & names.
                   - in all cases, the target file extension is ignored and a
                     '.json' extension is used.
                     
  ${chalk.bold('option')}:
    --h : show usage.
    --a : keep both comments with and without annotations.

`;
  
  if(args._ && args._.length) {
    if(options.h) {
      console.log(thisPackage);
      console.log(usage);
    }
    else {
      console.log(thisPackage);
      sourceProcessor(args._[0], args._.length > 1 ? args._[1] : args._[0], options.a);
    }
  }
  else {
    console.log(usage);
  }
}


/**
 * Execute the 'comment-to-json' script/program.
 */
main();