import { expectTypeOf } from 'expect-type'
import * as S from 'schemata-ts'
import { type ImplicitOptional } from 'schemata-ts/internal/struct'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const OptionalWithDefault = S.Optional(S.String(), 'default-string')

test('OptionalWithDefault types', () => {
  expectTypeOf(OptionalWithDefault).toEqualTypeOf<
    ImplicitOptional & S.Schema<string | undefined, string>
  >()
})

runStandardTestSuite(OptionalWithDefault, _ => ({
  decoderTests: [
    _.decoder.pass('string'),
    _.decoder.pass(undefined, 'default-string'),
    _.decoder.fail(1, () =>
      TC.transcodeErrors(
        TC.errorAtUnionMember('undefined', TC.typeMismatch('undefined', 1)),
        TC.errorAtUnionMember('string', TC.typeMismatch('string', 1)),
      ),
    ),
  ],
  encoderTests: [_.encoder.pass('string'), _.encoder.pass(_.c(undefined), undefined)],
  guardTests: [_.guard.is('string'), _.guard.is(undefined)],
  eqTests: [],
  jsonSchema: {
    type: 'string',
    default: 'default-string',
  },
  typeString: 'string? → string',
}))()

const Optional = S.Optional(S.String())

test('Optional types', () => {
  expectTypeOf(Optional).toEqualTypeOf<
    ImplicitOptional & S.Schema<string | undefined, string | undefined>
  >()
})

runStandardTestSuite(Optional, _ => ({
  decoderTests: [
    _.decoder.pass('string'),
    _.decoder.pass(undefined),
    _.decoder.fail(1, () =>
      TC.transcodeErrors(
        TC.errorAtUnionMember('undefined', TC.typeMismatch('undefined', 1)),
        TC.errorAtUnionMember('string', TC.typeMismatch('string', 1)),
      ),
    ),
  ],
  encoderTests: [_.encoder.pass('string'), _.encoder.pass(undefined)],
  guardTests: [_.guard.is('string'), _.guard.is(undefined)],
  eqTests: [],
  jsonSchema: {
    type: 'string',
  },
  typeString: 'string?',
}))()
