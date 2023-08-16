import * as S from 'schemata-ts'

import { runStandardTestSuite } from '../test-utils/test-suite'

runStandardTestSuite(S.DateFromUnixTime, () => ({
  typeString: 'Float<-8640000000000,8640000000000> → Date',
}))()
