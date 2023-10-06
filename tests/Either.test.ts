import * as E from 'fp-ts/Either'
import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const Schema = S.Either(
  S.String(),
  S.Struct({
    foo: S.Tuple(S.Boolean),
  }),
)

const JsonSchema = JS.union(
  JS.struct({ _tag: JS.literal('Left'), left: JS.string() }, ['_tag', 'left']),
  JS.struct(
    {
      _tag: JS.literal('Right'),
      right: JS.struct({ foo: JS.tuple(JS.booleanSchema) }, ['foo']),
    },
    ['_tag', 'right'],
  ),
)

runStandardTestSuite(Schema, _ => ({
  decoderTests: [
    _.decoder.pass({ _tag: 'Left', left: 'foo' }, E.left('foo')),
    _.decoder.pass({ _tag: 'Right', right: { foo: [true] } }, E.right({ foo: [true] })),
    _.decoder.fail({ _tag: 'None' }, () =>
      TC.transcodeErrors(
        TC.errorAtUnionMember(
          '{ _tag: Left, left: string }',
          TC.errorAtKey('_tag', TC.typeMismatch('Left', 'None')),
          TC.errorAtKey('left', TC.typeMismatch('string', undefined)),
        ),
        TC.errorAtUnionMember(
          '{ _tag: Right, right: { foo: [boolean] } }',
          TC.errorAtKey('_tag', TC.typeMismatch('Right', 'None')),
          TC.errorAtKey('right', TC.typeMismatch('{ foo: [boolean] }', undefined)),
        ),
      ),
    ),
    _.decoder.fail({ _tag: 'Left', right: { foo: [true] } }, () =>
      TC.transcodeErrors(
        TC.errorAtUnionMember(
          '{ _tag: Left, left: string }',
          TC.errorAtKey('left', TC.typeMismatch('string', undefined)),
        ),
        TC.errorAtUnionMember(
          '{ _tag: Right, right: { foo: [boolean] } }',
          TC.errorAtKey('_tag', TC.typeMismatch('Right', 'Left')),
        ),
      ),
    ),
    _.decoder.fail({ _tag: 'Right', right: { foo: [1] } }, () =>
      TC.transcodeErrors(
        TC.errorAtUnionMember(
          '{ _tag: Left, left: string }',
          TC.errorAtKey('_tag', TC.typeMismatch('Left', 'Right')),
          TC.errorAtKey('left', TC.typeMismatch('string', undefined)),
        ),
        TC.errorAtUnionMember(
          '{ _tag: Right, right: { foo: [boolean] } }',
          TC.errorAtKey(
            'right',
            TC.errorAtKey('foo', TC.errorAtIndex(0, TC.typeMismatch('boolean', 1))),
          ),
        ),
      ),
    ),
  ],
  encoderTests: [_.encoder.pass({ _tag: 'Left', left: 'huh' })],
  guardTests: [],
  eqTests: [],
  jsonSchema: JsonSchema,
  typeString: '{ _tag: Left, left: string } | { _tag: Right, right: { foo: [boolean] } }',
}))()
