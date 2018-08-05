'use strict';
/**
 * File (JSON) of comments writer module.
 * @module writers/commentFileWriter
 */
const fs = require('fs');
const chalk = require('chalk');


/**
 * Filter out (or not) non-annotated comments, JSONify & save results to file(s).
 * Called everytime a file stream reading completes and stream emits a 'close' event.
 * @param comments
 * @param commentsDestinationFilePath
 * @param keepAllComments
 * @returns {function} writeCommentToFile
 */
function commentFileWriter(comments, commentsDestinationFilePath, keepAllComments) {
  
  /**
   * Actual/real comment file writer.
   */
  function writeCommentToFile() {
    const unfilteredCommentCount = comments.length;
    let filteredComments = keepAllComments ? comments : comments.filter(comment => !!comment.annotations.length);
    if (filteredComments.length > 0) {
      
      fs.writeFile(
        commentsDestinationFilePath,
        JSON.stringify(filteredComments, null, 2),
        function (err) {
          if (err) {
            console.error(err);
          }
          else {
            const commentLabel = `${!keepAllComments?'annotated':''} comment${filteredComments.length>1?'s':''}`;
            console.log(`Parsed ${chalk.yellow(chalk.bold(filteredComments.length))} ${chalk.yellow(commentLabel)} (out of ${!keepAllComments?unfilteredCommentCount:''}) and saved it in "${chalk.blue(commentsDestinationFilePath)}"`);
          }
        }
      );
    }
    else {
      console.log(`${chalk.red('No comments (0)')} found.`);
    }
  }
  
  return writeCommentToFile;
}

module.exports = commentFileWriter;