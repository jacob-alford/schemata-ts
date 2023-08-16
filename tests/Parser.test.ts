import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const Parser = pipe(
  S.String(),
  S.Parse(
    'Parser',
    E.right,
    E.fromPredicate(
      s => s !== 'foo',
      () => 'foo is not allowed',
    ),
  ),
)

runStandardTestSuite(
  Parser,
  _ => ({
    encoderTests: [
      _.encoder.fail('foo', () =>
        TC.transcodeErrors(TC.serializationError('Parser', 'foo is not allowed', 'foo')),
      ),
    ],
    jsonSchema: JS.string(),
    typeString: 'Parser → string',
  }),
  {
    skip: ['derived-guard-tests'],
  },
)()

const WithTranscodeError = pipe(
  S.String(),
  S.Parse(
    'WithTranscodeError',
    E.fromPredicate(
      s => s !== 'foo',
      () => TC.transcodeErrors(TC.typeMismatch('not foo', 'foo')),
    ),
    E.fromPredicate(
      s => s !== 'foo',
      () => TC.transcodeErrors(TC.typeMismatch('not foo', 'foo')),
    ),
  ),
)

runStandardTestSuite(
  WithTranscodeError,
  _ => ({
    decoderTests: [
      _.decoder.fail('foo', () => TC.transcodeErrors(TC.typeMismatch('not foo', 'foo'))),
    ],
    encoderTests: [
      _.encoder.fail('foo', () => TC.transcodeErrors(TC.typeMismatch('not foo', 'foo'))),
    ],
    jsonSchema: JS.string(),
    typeString: 'WithTranscodeError → string',
  }),
  {
    skip: ['derived-guard-tests'],
  },
)()
