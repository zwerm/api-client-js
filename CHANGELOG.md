# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
 - Support for the `query` field in `postEvent` methods.

## [0.7.0] - 2018-08-08

### Added
 - Support for the `timestamp` field in `postEvent` methods.

## [0.6.0] - 2018-07-20

### Added
 - Definitions for `WelcomeEvent` (`zwerm.welcome` event). ([17b683a], [e737cf4])
 - Definitions for `WelcomeBackEvent` (`zwerm.welcome-back` event). ([7fde191], [b986018])
 - Definitions for `TimerStartEvent` (`zwerm.timer.start` event). ([0071d05], [b686e4b])
 - Definitions for `TimerCancelEvent` (`zwerm.timer.cancel` event). ([5261272], [2910329])

### Removed
 - Deprecated `ZwermAPI~NEW_CONVESRATION_EVENT` method in favor of `ZwermAPI~NEW_CONVERSATION_EVENT` method. ([cb72e4b])

## [0.5.0] - 2018-06-22

### Added
 - Methods for using the events api endpoints, allowing you to send events to users & conversations. ([c082ab8])
 - Definitions for `ConversationSentimentNegativeEvent` (`zwerm.conversations.sentiment.negative` event). ([c44d389], [2e4402b])

## [0.4.0] - 2018-06-19

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
    Once this package is released publicly, it'll be added back.
    This (hopefully) shouldn't screw over the typings too much.

## [0.3.0] - 2018-06-19

The `Events` update! This release contains the initial definitions and structure for Zwerms
'system' events, including both typescript typings & static constant getters to `ZwermAPI`.

### Added
 - `Events` namespace. ([c0d770c])
 - Definitions for `UnknownMessageEvent` (`zwerm.unknown` event). ([c0d770c], [b0917d6])
 - Definitions for `ChannelErrorEvent` (`zwerm.channels.error` event). ([9b0877b], [917116c])
 - Definitions for `EngineErrorEvent` (`zwerm.engines.error` event). ([45e6a58], [0d5c100])
 - Definitions for `NewUserEvent` (`zwerm.users.new` event). ([af4d820], [a8c31dd])
 - Definitions for `UpdateUserRouteEvent` (`zwerm.users.route.update` event). ([dcdc14d], [3873251])
 - Definitions for `NewConversationEvent` (`zwerm.conversations.new` event). ([42405b3], [ad6254e])
 - Definitions for `UpdateConversationRouteEvent` (`zwerm.conversations.route.update` event). ([35aaba8], [0b3bcd2])
 - `Zwerm.Database.EventTransactionEntry` interface. ([6e7250c])

### Changed
 - The `Zwerm.Database.ChannelService` union type now has type `string`, so that it won't
    complain when using channel services that have not yet been added. ([9b52c22])
 - Renamed `StaMPTransaction` to `StaMPTransactionEntry` (in `Zwerm.Database` namespace). ([1a9652f])
 - Minor cleanup to typings code layout; mainly adding region tags and property overrides
    to make IDEs a bit happier. ([1fff938], [f3b12c5], [4a6f7d6])

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

[Unreleased]: https://github.com/zwerm/api-client-js/compare/v0.7.0...HEAD

[0.7.0]: https://github.com/zwerm/api-client-js/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/zwerm/api-client-js/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/zwerm/api-client-js/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/zwerm/api-client-js/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/zwerm/api-client-js/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/zwerm/api-client-js/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/zwerm/api-client-js/compare/v0.1.0...v0.1.0

[17b683a]: https://github.com/zwerm/api-client-js/commit/17b683a
[e737cf4]: https://github.com/zwerm/api-client-js/commit/e737cf4
[7fde191]: https://github.com/zwerm/api-client-js/commit/7fde191
[b986018]: https://github.com/zwerm/api-client-js/commit/b986018
[0071d05]: https://github.com/zwerm/api-client-js/commit/0071d05
[b686e4b]: https://github.com/zwerm/api-client-js/commit/b686e4b
[5261272]: https://github.com/zwerm/api-client-js/commit/5261272
[2910329]: https://github.com/zwerm/api-client-js/commit/2910329
[cb72e4b]: https://github.com/zwerm/api-client-js/commit/cb72e4b
[c082ab8]: https://github.com/zwerm/api-client-js/commit/c082ab8
[c0d770c]: https://github.com/zwerm/api-client-js/commit/c0d770c
[b0917d6]: https://github.com/zwerm/api-client-js/commit/b0917d6
[9b0877b]: https://github.com/zwerm/api-client-js/commit/9b0877b
[917116c]: https://github.com/zwerm/api-client-js/commit/917116c
[45e6a58]: https://github.com/zwerm/api-client-js/commit/45e6a58
[0d5c100]: https://github.com/zwerm/api-client-js/commit/0d5c100
[af4d820]: https://github.com/zwerm/api-client-js/commit/af4d820
[a8c31dd]: https://github.com/zwerm/api-client-js/commit/a8c31dd
[dcdc14d]: https://github.com/zwerm/api-client-js/commit/dcdc14d
[3873251]: https://github.com/zwerm/api-client-js/commit/3873251
[42405b3]: https://github.com/zwerm/api-client-js/commit/42405b3
[ad6254e]: https://github.com/zwerm/api-client-js/commit/ad6254e
[35aaba8]: https://github.com/zwerm/api-client-js/commit/35aaba8
[0b3bcd2]: https://github.com/zwerm/api-client-js/commit/0b3bcd2
[6e7250c]: https://github.com/zwerm/api-client-js/commit/6e7250c
[2e4402b]: https://github.com/zwerm/api-client-js/commit/2e4402b
[c44d389]: https://github.com/zwerm/api-client-js/commit/c44d389
[1a9652f]: https://github.com/zwerm/api-client-js/commit/1a9652f
[9b52c22]: https://github.com/zwerm/api-client-js/commit/9b52c22
[1fff938]: https://github.com/zwerm/api-client-js/commit/1fff938
[f3b12c5]: https://github.com/zwerm/api-client-js/commit/f3b12c5
[4a6f7d6]: https://github.com/zwerm/api-client-js/commit/4a6f7d6
