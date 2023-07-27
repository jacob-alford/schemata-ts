import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const Schema = S.Annotate({
  title: 'Test Schema',
})(
  S.DateFromString({
    afterDate: new Date('2020-01-29'),
    beforeDate: new Date('2024-01-29'),
  }),
)

runStandardTestSuite(Schema, _ => ({
  decoderTests: [
    _.decoder.pass('2023-07-30', new Date('2023-07-30')),
    _.decoder.fail('2025-07-30', () =>
      TC.transcodeErrors(
        TC.typeMismatch(
          'DateString<2020-01-29T00:00:00.000Z,2024-01-29T00:00:00.000Z>',
          '2025-07-30',
        ),
      ),
    ),
    _.decoder.fail('2019-07-30', () =>
      TC.transcodeErrors(
        TC.typeMismatch(
          'DateString<2020-01-29T00:00:00.000Z,2024-01-29T00:00:00.000Z>',
          '2019-07-30',
        ),
      ),
    ),
    _.decoder.fail('not-a-date', () =>
      TC.transcodeErrors(
        TC.typeMismatch(
          'DateString<2020-01-29T00:00:00.000Z,2024-01-29T00:00:00.000Z>',
          'not-a-date',
        ),
      ),
    ),
  ],
  encoderTests: [
    _.encoder.pass(
      _.c(new Date('2023-07-30')),
      _.c(new Date('2023-07-30').toISOString()),
    ),
  ],
  typeString:
    'DateString<2020-01-29T00:00:00.000Z,2024-01-29T00:00:00.000Z> → Date<2020-01-29T00:00:00.000Z,2024-01-29T00:00:00.000Z>',
  jsonSchema: JS.annotate({
    title: 'Test Schema',
  })(
    JS.union(
      JS.string({
        format: 'date-time',
      }),
      JS.string({
        format: 'date',
      }),
    ),
  ),
}))()
