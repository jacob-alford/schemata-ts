import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

const valid = ['#ff0000ff', '#ff0034', '#CCCCCC', '0f38', 'fff', '#f00']

const invalid = ['#ff', 'fff0a', '#ff12FG', '#bbh']

runStandardTestSuite(S.HexColor, _ => ({
  decoderTests: [
    ...valid.map(input => _.decoder.pass(input)),
    ...invalid.map(input => _.decoder.fail(input)),
  ],
  encoderTests: [...valid.map(expected => _.encoder.pass(_.c(expected), _.c(expected)))],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.string({
    pattern: '^(#?([0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8}))$',
  }),
  typeString: 'HexColor',
}))()
