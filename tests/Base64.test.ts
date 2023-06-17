import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

runStandardTestSuite('Base64', S.Base64, _ => ({
  decoderTests: [_.decoder.pass(''), _.decoder.fail('12345')],
  encoderTests: [_.encoder.pass('' as any)],
  guardTests: 'derive',
  eqTests: 'derive',
  jsonSchema: JS.intersection(JS.string({}))(
    JS.string({
      pattern: '^((([A-Za-z0-9+/]{4})*?[A-Za-z0-9+/]{2,4}={0,2})?)$',
    }),
  ),
}))()
