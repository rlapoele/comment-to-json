'use strict';
/**
 * File (JSON) of comments writer module.
 * @module writers/commentFileWriter
 */
const fs = require('fs');
const path = require('path');
const basename = require('../utils/path').basename;
const chalk = require('chalk');


/**
 * Filter out (or not) non-annotated comments, JSONify & save results to file(s).
 * Called everytime a file stream reading completes and stream emits a 'close' event.
 * @param {array} comments
 * @param {string} commentsSourceFilePath
 * @param {string} commentsDestinationFilePath
 * @param {boolean} keepAllComments
 * @returns {function} writeCommentToFile
 */
function commentFileWriter(comments, commentsSourceFilePath, commentsDestinationFilePath, keepAllComments) {
  
  /**
   * Actual/real comment file writer.
   */
  function writeCommentToFile() {
  
    /**
     * Create missing path directories.
     * @param {string} filePath
     * @returns {boolean}
     */
    function ensureDirectoryExistence(filePath) {
      const dirname = path.dirname(filePath);
      if (fs.existsSync(dirname)) {
        return true;
      }
      ensureDirectoryExistence(dirname);
      fs.mkdirSync(dirname);
    }
  
    const unfilteredCommentCount = comments.length;
    const filteredComments = keepAllComments ? comments : comments.filter(comment => !!comment.annotations.length);
  
    if (filteredComments.length > 0) {
      ensureDirectoryExistence(commentsDestinationFilePath);
      fs.writeFile(
        commentsDestinationFilePath,
        JSON.stringify(filteredComments, null, 2),
        function (err) {
          if(err) {
            console.error(err);
          }
          else {
            const commentLabel = `${!keepAllComments?'annotated ':''}comment${filteredComments.length>1?'s':''}`;
            const outOfLabel = !keepAllComments ? `(out of ${unfilteredCommentCount}) `: '';
            console.log(`"${chalk.green(`${basename(commentsSourceFilePath)}${path.extname(commentsSourceFilePath)}`)}": ${chalk.yellow(chalk.bold(filteredComments.length))} ${chalk.yellow(commentLabel)} parsed ${outOfLabel}and saved in "${chalk.blue(commentsDestinationFilePath)}"`);
          }
        }
      );
    }
    else {
      console.log(`"${chalk.red(`${basename(commentsSourceFilePath)}${path.extname(commentsSourceFilePath)}`)}": ${chalk.red(chalk.bold('0'))} ${chalk.red('annotated comments')} parsed.`);
    }
  }
  
  return writeCommentToFile;
}

module.exports = commentFileWriter;