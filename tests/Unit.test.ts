import * as S from 'schemata-ts'

import { runStandardTestSuite } from '../test-utils/test-suite'

runStandardTestSuite(
  S.Unit,
  _ => ({
    decoderTests: [_.decoder.pass(undefined)],
    encoderTests: [_.encoder.pass(undefined)],
    jsonSchema: {},
  }),
  {
    // The JSON schema validation library doesn't do well with undefined values :/
    skip: ['json-schema-validation'],
  },
)()
