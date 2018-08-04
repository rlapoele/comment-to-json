'use strict';

/**
 * utility module making simple type checking quicker & safer to write.
 * @module utils/inspection
 */


/**
 * Checks whether a value is a string.
 * @param {any} string - can be any type really...
 * @returns {boolean}
 */
function isString(string) { return 'string' === typeof string }


/**
 * Checks whether a value is an array.
 * @param {any} array - can be any type really...
 * @returns {boolean}
 */
function isArray(array)   { return Array.isArray(array) }


module.exports = { isString, isArray };
