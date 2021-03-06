# CHANGE LOG

### Release 1.1.5
- Further cleanups:
  - README.md updates to have npm info reflect at the top of the "page".
  - package.json updates (keywords, description)

### Release 1.1.4
- Cleanups:
  - Small corrections in the README.md file.
  - Modification around the package.json repository url format (to enable proper linking from npm to github)

### Release 1.1.3
- Minor enhancement:
  - parameterized annotation escape tag/marker.

### Release 1.1.2
- More minor updates to package.json

### Release 1.1.1
- Minor updates to package.json

### Release 1.1.0
- README.md updated to reflect latest "usage".
- js code moved under a new "lib" directory.
- New Feature:
  - it is now possible to mask annotations by prefixing it with an extra `@` character. In other words, comment lines starting (ignoring the possible "*", " *", etc...) with "@@blablabla" will not generate any "blablabla" annotation.

### Release 1.0.7
- README.md updated to reflect latest "usage"...

### Release 1.0.6
- Bug Fixes:
  - pathHasExtension path utility function was returning true when a file path didn't have an extension and vice-et-versa.
  - when a target directory path was passed as argument, its last directory was ignored.

### Release 1.0.5
- CHANGELOG.md release headings made smaller.
- Bug Fixes:
  - certain combinations of source/destination file paths were not handled properly.
  - if destination path included non-existent directory(ies), an error was thrown.
  - depending on options passed to script, some processing statuses were incorrectly rendered.

### Release 1.0.4
- CHANGELOG.md completed with info about previous releases.
- Improvements:
  - improved UX by providing users with source file name around parsing results.
  - improved UX by rendering more parsing results more consistently.

### Release 1.0.3
- CHANGELOG.md file creation.
- Bug Fix: annotation contentColumnStart property was sometimes missing.

### Release 1.0.2
- Bug Fix: when source (target files) is specified as a glob pattern such `**/*.extension`, system sometimes tries to create a `**` folder which raises an exception/error. Additionally, system saves json file under `*.json` instead of a proper name.

### Release 1.0.1
- Bug Fix: "files" package.json was specified with only 2 files which caused npm publication to only push these 2 files instead of everything. Decision was made to follow a more "standard" npm/yarn procedure and this "files" attribute got removed.