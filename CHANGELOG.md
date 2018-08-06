# CHANGE LOG

## Release 1.0.4
- CHANGELOG.md completed with info about previous releases.
- Improvements:
  - improved UX by providing users with source file name around parsing results.
  - improved UX by rendering more parsing results more consistently.

## Release 1.0.3
- CHANGELOG.md file creation.
- Bug Fix: annotation contentColumnStart property was sometimes missing.

## Release 1.0.2
- Bug Fix: when source (target files) is specified as a glob pattern such `**/*.extension`, system sometimes tries to create a `**` folder which raises an exception/error. Additionally, system saves json file under `*.json` instead of a proper name.

## Release 1.0.1
- Bug Fix: "files" package.json was specified with only 2 files which caused npm publication to only push these 2 files instead of everything. Decision was made to follow a more "standard" npm/yarn procedure and this "files" attribute got removed.