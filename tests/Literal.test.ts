import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

runStandardTestSuite(
  S.Literal('hi', 'hey', 'lmao', null),
  _ => ({
    decoderTests: [
      _.decoder.pass('hi'),
      _.decoder.pass('hey'),
      _.decoder.pass('lmao'),
      _.decoder.pass(null),
      _.decoder.fail(''),
      _.decoder.fail('h'),
      _.decoder.fail('hii'),
      _.decoder.fail('hiiii'),
      _.decoder.fail('hiiiiii'),
      _.decoder.fail('lameo'),
      _.decoder.fail({}),
      _.decoder.fail([]),
      _.decoder.fail(undefined),
      _.decoder.fail(NaN),
    ],
    encoderTests: [],
    guardTests: [],
    eqTests: [],
    jsonSchema: JS.union(
      JS.literal('hi'),
      JS.literal('hey'),
      JS.literal('lmao'),
      JS.literal(null),
    ),
    typeString: 'hi | hey | lmao | null',
  }),
  {
    makeDecodeError: expected =>
      TC.transcodeErrors(
        TC.errorAtUnionMember(0, TC.typeMismatch('hi', expected)),
        TC.errorAtUnionMember(1, TC.typeMismatch('hey', expected)),
        TC.errorAtUnionMember(2, TC.typeMismatch('lmao', expected)),
        TC.errorAtUnionMember(3, TC.typeMismatch('null', expected)),
      ),
  },
)()

runStandardTestSuite(S.Literal(null), () => ({
  jsonSchema: JS.literal(null),
  typeString: 'null',
}))()

runStandardTestSuite(S.Literal('foo'), () => ({
  jsonSchema: JS.literal('foo'),
  typeString: 'foo',
}))()
