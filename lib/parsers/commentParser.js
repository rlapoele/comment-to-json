'use strict';
/**
 * A comment parser module
 * @module parsers/commentParser
 */

const parseAnnotation = require('./annotationParser');

/**
 * Wraps a comment accumulator & a comment parser function. Gets imported by
 * module(s) interested in parsing text from file being streamed.
 * @param {array} comments
 * @param {string} commentStartTag
 * @param {string} commentEndTag
 * @param {string} annotationBlockTag
 * @returns {function} sourceLineParser
 */
function commentParser(comments, commentStartTag, commentEndTag, annotationBlockTag) {
  let commentCaptureIsOn  = false;
  let currentComment      = '';
  
  function sourceLineParser(sourceLine) {
    let index = 0;
    let commentBlockArray = [];
    let annotations = [];
    
    while (index < sourceLine.length) {
      if (commentCaptureIsOn) {
        let indexOfEnd = sourceLine.indexOf(commentEndTag, index);
        
        if (indexOfEnd === -1) {
          currentComment = currentComment.concat(sourceLine.slice(index, sourceLine.length));
          currentComment = currentComment.concat('\n');
          index = sourceLine.length;
        }
        else {
          currentComment = currentComment.concat(sourceLine.slice(index, indexOfEnd));
          index = indexOfEnd + commentEndTag.length;
          commentBlockArray =
            currentComment.split('\n') // transform comment block into array of individual comment lines.
              .map(item => item.trim()) // remove spaces before and after each comment line.
              .map(item => item.slice(0 === item.indexOf('*') ? 1 : 0, item.length).trim()) // remove all spaces followed by 1 * character.
              .filter(item => !!item.length);  // only keep the non-empty comment lines.
          
          annotations = parseAnnotation(commentBlockArray, annotationBlockTag);
          comments.push(
            {
              comment: commentBlockArray,
              annotations: annotations
            }
          );
          currentComment = '';
          commentBlockArray = [];
          commentCaptureIsOn = false;
        }
      }
      else {
        let indexOfStart = sourceLine.indexOf(commentStartTag, index);
        
        if (indexOfStart === -1) {
          index = sourceLine.length;
        }
        else {
          index = indexOfStart + commentStartTag.length;
          commentCaptureIsOn = true;
        }
      }
    }
  }
  
  return sourceLineParser;
}

module.exports = commentParser;