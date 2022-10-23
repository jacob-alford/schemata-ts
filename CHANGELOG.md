# 0.0.3

## New Modules

- [#20] Add string module: ASCII by @newswim in https://github.com/jacob-alford/schemata-ts/pull/24
- [#15] Add BtcAddress string module by @jacob-alford in https://github.com/jacob-alford/schemata-ts/pull/35
- [#5] Add PositiveFloat number module by @jacob-alford in https://github.com/jacob-alford/schemata-ts/pull/37
- [#4] Add PositiveFloat string module by @jacob-alford in https://github.com/jacob-alford/schemata-ts/pull/39
- [#27] Add NonNegativeFloat and NonNegativeFloatString by @jacob-alford in https://github.com/jacob-alford/schemata-ts/pull/41
- [#23][#44] Add module: Base64 by @newswim in https://github.com/jacob-alford/schemata-ts/pull/40
- [#9] Add JWT module by @newswim in https://github.com/jacob-alford/schemata-ts/pull/47
- [#22][#3] Add NegativeFloat, NegativeFloatString by @jacob-alford in https://github.com/jacob-alford/schemata-ts/pull/48
- [#56] feat: add `Schemable2` and `Encoder` instances by @0x706b in https://github.com/jacob-alford/schemata-ts/pull/57
- [#61][#18] Add `Hexadecimal` and `HexColor` modules by @newswim in https://github.com/jacob-alford/schemata-ts/pull/63
- [#54][#55] Add Arbitrary instances by @skeate in https://github.com/jacob-alford/schemata-ts/pull/68
- [#14] Add CreditCard string module by @skeate in https://github.com/jacob-alford/schemata-ts/pull/69
- [#17] Add HslColor module by @newswim in https://github.com/jacob-alford/schemata-ts/pull/78

## Miscellaneous

- chore: Prevent pull requests from building docs by @jacob-alford in https://github.com/jacob-alford/schemata-ts/pull/26
- Regenerate documentation and add instructions to README by @newswim in https://github.com/jacob-alford/schemata-ts/pull/25
- chore: Replace `master` with `main` by @newswim in https://github.com/jacob-alford/schemata-ts/pull/32
- chore: Add links in docs by @newswim in https://github.com/jacob-alford/schemata-ts/pull/33
- feat: Add `yarn generate:template` script by @jacob-alford in https://github.com/jacob-alford/schemata-ts/pull/34
- fix: Fix inconsistencies when generating number modules by @jacob-alford in https://github.com/jacob-alford/schemata-ts/pull/38
- [#49] Add fast-check, add ArbitraryBase > Schemable by @jacob-alford in https://github.com/jacob-alford/schemata-ts/pull/50
- chore: fix docs-ts, ignore internal by @jacob-alford in https://github.com/jacob-alford/schemata-ts/pull/59
- chore: Add husky by @skeate in https://github.com/jacob-alford/schemata-ts/pull/60
- [#62] Add `Encoder` to template generator by @newswim in https://github.com/jacob-alford/schemata-ts/pull/64
- [#65] Add internal > EncoderBase.ts + UUID tests, add missing boolean combinator by @jacob-alford in https://github.com/jacob-alford/schemata-ts/pull/67
- [#58] Add Arbitrary to schemableGen by @jacob-alford in https://github.com/jacob-alford/schemata-ts/pull/74
- [#1] Update readme: Add badges by @newswim in https://github.com/jacob-alford/schemata-ts/pull/71
- chore: add Arbitrary / util tests by @jacob-alford in https://github.com/jacob-alford/schemata-ts/pull/77
- fix: `HslColor` example comment by @newswim in https://github.com/jacob-alford/schemata-ts/pull/81
- [#73] Add module header JSDoc comments to SchemableExt methods by @jacob-alford in https://github.com/jacob-alford/schemata-ts/pull/82
- chore: add docs check to PRs by @jacob-alford in https://github.com/jacob-alford/schemata-ts/pull/80

## New Contributors

- @jacob-alford made their first contribution in https://github.com/jacob-alford/schemata-ts/pull/26
- @newswim made their first contribution in https://github.com/jacob-alford/schemata-ts/pull/24
- @0x706b made their first contribution in https://github.com/jacob-alford/schemata-ts/pull/57
- @skeate made their first contribution in https://github.com/jacob-alford/schemata-ts/pull/60

**Full Changelog**: https://github.com/jacob-alford/schemata-ts/compare/0.0.1...0.0.3

# 0.0.1

Initial NPM release! 🎉

1. Add date > SafeDate
2. Add number > Int
3. Add number > Natural
4. Add number > NegativeInt
5. Add number > PositiveInt
6. Add string > EmailAddress
7. Add string > IntString
8. Add string > ISODateString
9. Add string > NaturalString
10. Add string > NegativeIntString
11. Add string > NonemptyString
12. Add string > PositiveIntString
13. Add string > UUID
14. Add Decoder
15. Add Eq
16. Add Guard
17. Add index common namespace exports
18. Add SchemableExt
19. Add SchamaExt
20. Add TaskDecoder
21. Add Type
22. Add tests
