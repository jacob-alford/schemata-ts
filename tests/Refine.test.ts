import { pipe } from 'fp-ts/function'
import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

runStandardTestSuite(
  pipe(
    S.Literal('foo', 'bar', 'quux', null),
    S.Refine((s): s is 'foo' | 'bar' => s === 'foo' || s === 'bar', 'foo | bar'),
  ),
  _ => ({
    decoderTests: [
      _.decoder.pass('foo'),
      _.decoder.fail('quux', () =>
        TC.transcodeErrors(TC.typeMismatch('foo | bar', 'quux')),
      ),
    ],
    jsonSchema: JS.union(
      JS.literal('foo'),
      JS.literal('bar'),
      JS.literal('quux'),
      JS.literal(null),
    ),
    typeString: 'foo | bar | quux | null → foo | bar',
  }),
)()
