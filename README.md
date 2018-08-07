# COMMENT TO JSON
A small utility to parse any kind of text file(s), extract its comments and related annotation(s) and save it as .json files.

This small library has been initially created to help maintain a living styleguide.

## Installation
To use comment-to-json as development dependency with...
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
comment-to-jon can only detect and process comments delimited by `/*` and `*/` such as follows:
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
#### Example
Input:
```
/**
 * A Media Object...
 * @name Media Object
 * @cssClass .media
 * @description
 *   Media object...
 */
 
...

/* Just a simple single line comment without annotation */

...

```
Output (annotations have been stripped out below to simply the example):
```json
[
  {
    "comment": [
      "A Media Object...",
      "@name Media Object",
      "@cssClass .media",
      "@description",
      "Media object..."
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
In comments, an annotation must be placed at the beginning of a line and start with the character `@`.
Any other characters located between `@` and the next ` ` (space) or the EOL is considered to be the name of the annotation.
Annotation content starts after the annotation name and ends with either the next annotation name or the end of the comment block.
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
      "Media object..."
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
          "Media object..."
        ],
        "contentIndexStart": 4,
        "contentIndexEnd": 4
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

