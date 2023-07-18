import * as S from 'schemata-ts'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const Schema = S.Annotate({
  typeString: 'In-between-the-leap-years',
  description: 'This is a test schema',
})(
  S.Date({
    afterDate: new Date('2020-01-29'),
    beforeDate: new Date('2024-01-29'),
  }),
)

runStandardTestSuite(
  Schema,
  _ => ({
    decoderTests: [
      _.decoder.pass(new Date('2023-07-30')),
      _.decoder.fail(new Date('2025-07-30'), () =>
        TC.transcodeErrors(
          TC.typeMismatch(
            'Date<2020-01-29T00:00:00.000Z,2024-01-29T00:00:00.000Z>',
            new Date('2025-07-30'),
          ),
        ),
      ),
      _.decoder.fail(new Date('2019-07-30'), () =>
        TC.transcodeErrors(
          TC.typeMismatch(
            'Date<2020-01-29T00:00:00.000Z,2024-01-29T00:00:00.000Z>',
            new Date('2019-07-30'),
          ),
        ),
      ),
      _.decoder.fail('not-a-date', () =>
        TC.transcodeErrors(
          TC.typeMismatch(
            'Date<2020-01-29T00:00:00.000Z,2024-01-29T00:00:00.000Z>',
            'not-a-date',
          ),
        ),
      ),
    ],
    eqTests: [_.eq.equate(_.c(new Date('2023-07-30')), _.c(new Date('2023-07-30')))],
    typeString: 'In-between-the-leap-years',
    jsonSchema: {
      description: 'This is a test schema',
    },
  }),
  {
    skip: ['json-schema-validation'],
  },
)()
