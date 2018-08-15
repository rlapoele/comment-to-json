# COMMENT-TO-JSON
<p>
  <a href="https://npmcharts.com/compare/comment-to-json?minimal=true"><img src="https://img.shields.io/npm/dm/comment-to-json.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/comment-to-json"><img src="https://img.shields.io/npm/v/comment-to-json.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/comment-to-json"><img src="https://img.shields.io/npm/l/comment-to-json.svg" alt="License"></a>
</p>

> A code source comment to json converter.

A small utility to parse any kind of text file(s), extract its comments and related annotation(s) and save it as .json files.

This library has initially been created to help maintain living styleguides.

## Installation
To use _comment-to-json_ as development dependency with...
#### Yarn
```
yarn add -D comment-to-json
```
#### Npm
```
npm install comment-to-json --save-dev
```

## Usage
```
comment-to-json sourceFilePath [targetFilePath] [option]
  
  sourceFilePath:  path to commented file(s) incl. name or name pattern.
  (required)       - accept individual specific file name or quoted glob
                     patterns (i.e. '*.css' or '**/*.css').
  
  targetFilePath:  target file path.
  (optional)       - if specified, the target filename (excluding the ext.) is
                     used if the sourceFilePath points to 1 file otherwise, it
                     is ignored and sourceFilePath file names are used instead.
                   - if specified, the target directory(ies) is(are) always
                     used.
                   - if not specified, the generated files inherit source
                     files path & names.
                   - in all cases, the target file extension is ignored and a
                     '.json' extension is used.
                     
  option:
    --h : show usage.
    --a : keep both comments with and without annotations.

```

## Comments format
_comment-to-jon_ can only detect and process comments delimited by `/*` (comment start tag or marker) and `*/` (comment end tag).

Comments can be on a single line or on multiple.

The comment start and end tags are removed from the captured comments.

#### Example
```css

/**
 * A Media Object...
 * @name Media Object
 * @cssClass .media
 * @description Media object
 */
 
.media, .media__fig, .media__body {
  box-sizing: border-box;
} 
.media {
  display: flex;
}
.media__fig {
  flex: 0 0 auto;
}
.media__body {
  flex: 1 1 auto;
}
```

Currently, any `*` characters prefixed by 0 to any number of space characters found at the beginning of a comment block line are stripped out.
In addition, text portions located between `*` (` *`, `  *`, etc...) and the EOL are trimmed left and right.

#### Example
##### Input:
```
/**
 * A Media Object...
 * @name Media Object
 * @cssClass .media
 * @description
 *   Media object...
 *   @@ignoredAnnotation...
 */
 
...

/* Just a simple single line comment without annotation */

...

```
##### Output

**Note:** annotations have been stripped out from the example below to keep things simpler here:

```json
[
  {
    "comment": [
      "A Media Object...",
      "@name Media Object",
      "@cssClass .media",
      "@description",
      "Media object...",
      "@@ignoredAnnotation..."
    ]
  },
  {
    "comment": [
      "Just a simple single line comment without annotation"
    ]
  }
]
```

**Note:** By default, only annotated comments are kept and saved in the output.

Use the `--a` option if you are interested in capturing all comments. 

## Annotation format
In comments, an annotation must be placed at the beginning of a line and must start with the character `@`.

Any other characters located between `@` and the next ` ` (space) or the EOL if no space are found, are considered to be the name of the annotation.

Annotation content starts after the annotation name and ends with either the _next_ annotation name or the end of the comment block.


**New in v1.1.0:**

Annotations starting with `@@` are ignored and therefore considered as either pure comment or as a part of the content of a _previous_ annotation.

In the later case, the first `@` is stripped out from the text added to the corresponding annotation content.

In the **Output format** section below, see what happens to "@@ignoredAnnotation...".

## Output format
Parsed comments and annotations are saved in one or more .json file(s).
At present, each generated file is formatted as an object array where objects as formatted like this:

```json
[
  {
    "comment": [
      "A Media Object...",
      "@name Media Object",
      "@cssClass .media",
      "@description",
      "Media object...",
      "@@ignoredAnnotation..."
    ],
    "annotations": [
      {
        "name": "name",
        "content": [
          "Media Object"
        ],
        "contentIndexStart": 1,
        "contentColumnStart": 6,
        "contentIndexEnd": 1
      },
      {
        "name": "cssClass",
        "content": [
          ".media"
        ],
        "contentIndexStart": 2,
        "contentIndexEnd": 2
      },
      {
        "name": "description",
        "content": [
          "Media object...",
          "@ignoredAnnotation..."
        ],
        "contentIndexStart": 4,
        "contentIndexEnd": 5
      }
    ]
  },
  {
    "comment": [
      "Just a simple single line comment without annotation"
    ],
    "annotations": []
  }
]
```
