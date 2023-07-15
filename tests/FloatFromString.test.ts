import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

runStandardTestSuite(S.FloatFromString, () => ({
  jsonSchema: JS.string({
    pattern:
      '^((-\\d{1,308}(\\.\\d*?)?|-\\d{0,308}(\\.\\d+?)?|\\d{1,308}(\\.\\d*?)?|\\d{0,308}(\\.\\d+?)?)(e(\\+?(\\d|[1-8]\\d|9\\d|[1-2]\\d\\d|3(0[0-8]))|-(\\d+?)))?)$',
  }),
  typeString: 'FloatString → Float',
}))()
