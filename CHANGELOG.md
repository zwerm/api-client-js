# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

Some minor cleanup, automation, and fixes. This release removes the whole .idea folder,
which might mess-up this project in JetBrains IDEs.

You can fix this by just copying the deleted files from v0.3.0 to your .idea folder,
or by just deleting the project & re-checking it out again from source.

Sorry in advance - it's easier to rip the bandage off now, vs later down the line.

### Added
 - `npm version` script to help automate bits and bobs, making it easier & quicker to release.
 
### Changed
 - Cleaned up .gitignore, ignoring and removing .idea/** folder & files.
    This might break existing checkouts of this repo as projects in JetBrains IDEs.
    The best fix is to just delete & checkout the project again. Sorry!
 
### Removed
 - `@stampit/stamp` optional dependency, as it screws over `npm` despite being optional.
    Once this package is released publicity, it'll be added back.
    This (hopefully) shouldn't screw over the typings too much.

## [0.3.0] - 2018-06-19

The `Events` update! This release contains the initial definitions and structure for Zwerms
'system' events, including both typescript typings & static constant getters to `ZwermAPI`.

### Added
 - `Events` namespace.
 - Definitions for `UnknownMessageEvent` (`zwerm.unknown` event).
 - Definitions for `ChannelErrorEvent` (`zwerm.channels.error` event).
 - Definitions for `EngineErrorEvent` (`zwerm.engines.error` event).
 - Definitions for `NewUserEvent` (`zwerm.users.new` event).
 - Definitions for `UpdateUserRouteEvent` (`zwerm.users.route.update` event).
 - Definitions for `NewConversationEvent` (`zwerm.conversations.new` event).
 - Definitions for `UpdateConversationRouteEvent` (`zwerm.conversations.route.update` event).
 - `Zwerm.Database.EventTransactionEntry` interface.

### Changed
 - The `Zwerm.Database.ChannelService` union type now has type `string`, so that it won't
    complain when using channel services that have not yet been added.
 - Renamed `StaMPTransaction` to `StaMPTransactionEntry` (in `Zwerm.Database` namespace).
 - Minor cleanup to typings code layout; mainly adding region tags and property overrides
    to make IDEs a bit happier. 

## [0.2.0] - 2018-06-05

This release was mainly about moving all of the previous commits that were made to the BitBucket 
repo into this repo, so that we can finally wind that repo down in favor of this public one.

### Added
 - 'event' transaction type.
 - `firstConversation` & `lastConversation` properties to `Zwerm.Database.UserEntry`.
 - Missing optional `userId` property to `Zwerm.Database.TransactionChannel`.

### Changed
 - Marked the `apiUrl` parameter of the `ZwermAPI#constructor` method as not nullable in jsdoc.
 - Rearranged order of definitions in typings, so their grouped better, and in a more logical fashion.
 - Made `Zwerm.Database.TransactionEntry#metaMessage` property nullable instead of optional.
 - Made `Zwerm.Database.StaMPTransaction` an interface instead of a class.
 - Renamed `DateTime` to `ZwermDateTime`, to be more distinct (in `Zwerm.Database` namespace).
 - Changed `UserChannel` & `TransactionChannel` to be interfaces instead of types (in `Zwerm.Database` namespace).

### Updated
 - Added `@types/qs` package devDependencies
 - Updated `qs` package to `6.5.2`
 - Updated package to use `@stampit/stamp` package.

### Removed
 - Deprecated `ChannelsObject` interface & `ChannelObject` type.

## 0.1.0 - 2018-05-14

This is the initial release, being pulled over from the BitBucket repo,
and following repository preparations for publishing on Github and NPM.

[Unreleased]: https://github.com/zwerm/api-client-js/compare/v0.3.0...HEAD

[0.3.0]: https://github.com/zwerm/api-client-js/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/zwerm/api-client-js/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/zwerm/api-client-js/compare/v0.1.0...v0.1.0
