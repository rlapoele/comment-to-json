'use strict';
/**
 * A helper module to simplify a bit file path manipulations.
 * @module utils/path
 */
const path = require('path');


/**
 * Extract a file name from a file path. Can strip any number of file extensions.
 * @param filePath
 * @returns {*|string}
 */
function basename(filePath) {
  const filePathExtension = path.extname(filePath);
  const filePathBasename = path.basename(filePath, filePathExtension);
  return ('' !== filePathExtension) ? basename(filePathBasename) : filePathBasename;
}


/**
 * Checks whether a file path contains an extension.
 * @param filePath
 * @returns {boolean}
 */
function pathHasExtension(filePath) {
  return '' === path.extname(filePath);
}

module.exports = { basename, pathHasExtension };
