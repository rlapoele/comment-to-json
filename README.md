# COMMENT TO JSON
A small utility to parse any kind of text file(s), extract its comments and related annotation(s) and save it as .json files.

This small library has been initially created to help maintain a living styleguide.

## Installation

## Usage
```
Usage: comment-to-json sourceFilePath [targetFilePath] [option]
  
  sourceFilePath:  path to commented file(s) including name or name pattern.
  (required)       - accept quoted glob patterns (i.e. '*.css' or '**/*.css')
  
  targetFilePath:  target file path.
  (optional)       - applies only when sourceFilePath is not a glob.
                   - when not specified, the generated files will be in the
                     same location as the source files and will have the same
                     name followed by a ".json" extension.
                     
  option:
    --h : show usage.
    --a : keep both comments with and without annotations.

```

## Comments format

## Annotation format

## Output format
Parsed comments and annotations are saved in one or more .json file(s).
At present, each generated file is formatted as a object array where object as formatted like this:
```json
[
  {
    comment: [
      'comment line 1',
      'comment line 2, etc...',
      '@description Media Object'
    ],
    annotations: {
      name: 'description',
      content: [
        'Media Object'
      ],
      commentLineStart: 2,
      commentLineEnd: 2
    }
  }
]
```

