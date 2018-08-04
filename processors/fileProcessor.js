'use strict';

/**
 * A File Processor module
 * @module fileProcessor
 *
 */
const path             = require('path');
const fs               = require('fs');
const glob             = require('glob');
const chalk            = require('chalk');
const readline         = require('readline');
const parseComments    = require('../parsers/commentParser');
const saveComments     = require('../writers/commentFileWriter');
const pathUtils        = require('../utils/path/index');
const basename         = pathUtils.basename;
const pathHasExtension = pathUtils.pathHasExtension;
const constants        = require('../constants');
const currentDirectory = process.cwd();


/**
 * Find, stream and parse files to extract comments & possibly, annotations.
 * @param {string} source - source file path (can contain glob pattern) of the file(s) to process.
 * @param {string} destination - destination file path.
 * @param {boolean} keepAllComments - option telling us whether to keep annotated comments only or all parsed comments.
 */
function fileProcessor(source, destination, keepAllComments) {

  const sourceFilePaths = path.join(currentDirectory,`${source}`);
  
  glob(
    sourceFilePaths,
    function (error, files) {
      if (files.length > 0) {
        files.forEach(
          function (sourceFilePath) {
           
            if (!fs.existsSync(sourceFilePath)) {
              console.log(chalk.red(`Could not find "${sourceFilePath}".`));
            }
            else {
              const destinationDirectoryName = path.join(currentDirectory,path.dirname(pathHasExtension(destination)?path.join(destination,'ignored'):destination));
              const destinationFileName = `${basename(destination)}.json`;
              const destinationFilePath = files.length === 1 ? path.join(destinationDirectoryName, destinationFileName): path.join(path.dirname(pathHasExtension(sourceFilePath)?path.join(sourceFilePath,'ignored'):sourceFilePath), `${basename(sourceFilePath)}.json`);
    
              console.log(`Processing "${chalk.blue(sourceFilePath)}"...`);
              const fileReadStream = fs.createReadStream(sourceFilePath);
    
              const rl =
                readline.createInterface(
                  {
                    input: fileReadStream,
                    crlfDelay: Infinity,
                    terminal: false,
                  }
                );
    
              const comments = [];
              rl.on('line', parseComments(comments, constants.COMMENT_START_TAG, constants.COMMENT_END_TAG, constants.ANNOTATION_BLOCK_TAG));
              rl.on('close', saveComments(comments, destinationFilePath, keepAllComments));
            }

          }
        );
      }
      else {
        console.log(chalk.magenta(`Oops... looks like ${chalk.bold('no files')} matching "${source}" could be found.`))
      }
    }
  );
}

/**
 * @type {fileProcessor}
 */
module.exports = fileProcessor;