'use strict';
/**
 * An annotation parser module (actually a comment block parser detecting
 * annotations).
 * @module parsers/annotationParser
 */

/**
 * Import inspection utilities.
 */
const utilsInspection = require('../utils/inspection/index');
const isString = utilsInspection.isString;
const isArray = utilsInspection.isArray;

/**
 * Parse array of comment block individual lines (string) and create an
 * annotation object each time an '@' symbol is detected. The name of the
 * created annotation is the portion of text between the '@' character and - the
 * first space character found later in the line - or - the end of the line.
 * Everything between the detected annotation and the next one or the end of
 * the comment block is considered to be the content of the annotation.
 * @param commentLineArray
 * @param annotationBlockTag
 * @returns {Array}
 */
function annotationParser(commentLineArray, annotationBlockTag) {
  let annotations = [];
  
  if(commentLineArray && isArray(commentLineArray) && isString(annotationBlockTag)) {
    let annotationName = '';
    let annotationContentArray = [];
    let arrayIndex = 0;
    let spaceIndex = -1;
    let annotationContentColStartIndex = -1;
    let line = '';
    let commentLineCount = arrayIndex;
    
    /* While we have comment lines to process... */
    while (arrayIndex < commentLineArray.length) {
      
      /* Let's make a soft copy of the current line of text. */
      line = commentLineArray[arrayIndex];
      
      /* does the current line start with a '@'? */
      if (line.startsWith(annotationBlockTag)) {
        if ('' !== annotationName) {
          if (-1 === annotationContentColStartIndex) {
            annotations.push(
              {
                name: annotationName,
                content: annotationContentArray,
                contentIndexStart: commentLineCount,
                contentIndexEnd: arrayIndex - 1,
              }
            );
          }
          else {
            annotations.push(
              {
                name: annotationName,
                content: annotationContentArray,
                contentIndexStart: commentLineCount,
                contentColumnStart: annotationContentColStartIndex,
                contentIndexEnd: arrayIndex - 1,
              }
            );
          }
          commentLineCount = arrayIndex;
          annotationName = '';
          annotationContentArray = [];
          annotationContentColStartIndex = -1;
        }
        
        spaceIndex = line.indexOf(' ');
        
        if (-1 < spaceIndex) {
          annotationName = line.slice(1, spaceIndex);
          annotationContentArray.push(line.slice(spaceIndex + 1,line.length));
          annotationContentColStartIndex = spaceIndex + 1;
        }
        else {
          annotationName = line.slice(1, line.length);
          commentLineCount = commentLineCount + 1;
          annotationContentColStartIndex = -1;
        }
        
      }
      else {
        if('' !== annotationName) {
          annotationContentArray.push(line);
        }
      }
      arrayIndex = arrayIndex + 1;
      if('' === annotationName) {
        commentLineCount = arrayIndex;
      }
    }
    if ('' !== annotationName) {
      if (-1 === annotationContentColStartIndex) {
        annotations.push(
          {
            name: annotationName,
            content: annotationContentArray,
            contentIndexStart: commentLineCount,
            contentIndexEnd: arrayIndex - 1,
          }
        );
      }
      else {
        annotations.push(
          {
            name: annotationName,
            content: annotationContentArray,
            contentIndexStart: commentLineCount,
            contentColumnStart: annotationContentColStartIndex,
            contentIndexEnd: arrayIndex - 1,
          }
        );
      }
    }
  }
  return annotations;
}

module.exports = annotationParser;