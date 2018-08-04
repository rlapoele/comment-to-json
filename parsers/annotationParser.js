'use strict';

const utilsInspection = require('../utils/inspection/index');
const isString = utilsInspection.isString;
const isArray = utilsInspection.isArray;


function annotationParser(commentLineArray, annotationBlockTag) {
  let annotations = [];
  let annotationName = '';
  let annotationContentArray = [];
  
  if(commentLineArray && isArray(commentLineArray) && isString(annotationBlockTag)) {
    let arrayIndex = 0;
    let spaceIndex = -1;
    let line = '';
    let commentLineCount = arrayIndex;
    
    while (arrayIndex < commentLineArray.length) {
      line = commentLineArray[arrayIndex];
      
      if (line.startsWith(annotationBlockTag)) {
        if ('' !== annotationName) {
          annotations.push(
            {
              name: annotationName,
              content: annotationContentArray,
              commentLineStart: commentLineCount,
              commentLineEnd: arrayIndex - 1,
            }
          );
          commentLineCount = arrayIndex;
          annotationName = '';
          annotationContentArray = [];
        }
        
        spaceIndex = line.indexOf(' ');
        
        if (-1 < spaceIndex) {
          annotationName = line.slice(1, spaceIndex);
          annotationContentArray.push(line.slice(spaceIndex + 1,line.length));
        }
        else {
          annotationName = line.slice(1, line.length);
          commentLineCount = commentLineCount + 1;
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
    if('' !== annotationName) {
      annotations.push(
        {
          name: annotationName,
          content: annotationContentArray,
          commentLineIndexStart: commentLineCount,
          commentLineIndexEnd: arrayIndex - 1,
        }
      );
    }
  }
  
  return annotations;
}

module.exports = annotationParser;