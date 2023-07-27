import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const validNone: ReadonlyArray<string> = [
  '2009-12T12:34',
  '2009',
  '+002022',
  '2009-05-19',
  '2009-05-19',
  '2009-05',
  '2009-05-19',
  '2009-05-19T00:00',
  '2009-05-19T14:31',
  '2009-05-19T14:39:22',
  '2009-05-19T14:39Z',
  '2009-05-19T14:39:22-06:00',
  '2007-04-06T00:00',
  '2010-02-18T16:23:48.5',
  '2009-10-10',
  '+002022-10-10',
  '-002022-10-10',
  '-002022-10-10T16:23:48.5',
  '-002022-10-10T16:23:48.5-06:00',
]

const validTime: ReadonlyArray<string> = [
  '2009-12T12:34',
  '2009-05-19T00:00',
  '2009-05-19T14:31',
  '2009-05-19T14:39:22',
  '2009-05-19T14:39Z',
  '2009-05-19T14:39:22-06:00',
  '2007-04-06T00:00',
  '2010-02-18T16:23:48.5',
  '-002022-10-10T16:23:48.5',
  '-002022-10-10T16:23:48.5-06:00',
  '2009-12 12:34',
  '2009-05-19 00:00',
  '2009-05-19 14:31',
  '2009-05-19 14:39:22',
  '2009-05-19 14:39Z',
  '2009-05-19 14:39:22-06:00',
  '2007-04-06 00:00',
  '2010-02-18 16:23:48.5',
  '-002022-10-10 16:23:48.5',
  '-002022-10-10 16:23:48.5-06:00',
]

const validTimeAndOffset: ReadonlyArray<string> = [
  '2009-05-19T14:39Z',
  '2009-05-19T14:39:22-06:00',
  '-002022-10-10T16:23:48.5-06:00',
  '2009-05-19 14:39Z',
  '2009-05-19 14:39:22-06:00',
  '-002022-10-10 16:23:48.5-06:00',
]

const invalid: ReadonlyArray<string> = [
  // This passes in Node 18, but not Firefox 105.0.3
  // '200905',
  '2009367',
  // This passes in Node 18 but not Firefox 105.0.3
  // '2009-',
  '2007-04-05T24:50',
  '2009-000',
  '2009-M511',
  '2009M511',
  '2009-05-19T14a39r',
  '2009-05-19T14:3924',
  '2009-0519',
  '2009-05-1914:39',
  // This passes in Node 18 but not Firefox 105.0.3
  // '2009-05-19 14:',
  '2009-05-19r14:39',
  '2009-05-19 14a39a22',
  // This passes in Node 18 but not Firefox 105.0.3
  // '200912-01',
  '2009-05-19 14:39:22+06a00',
  '2009-05-19 146922.500',
  '2010-02-18T16.5:23.35:48',
  '2010-02-18T16:23.35:48',
  '2010-02-18T16:23.35:48.45',
  '2009-05-19 14.5.44',
  '2010-02-18T16:23.33.600',
  '2010-02-18T16,25:23:48,444',
  '2010-13-1',
  'nonsense2021-01-01T00:00:00Z',
  '2021-01-01T00:00:00Znonsense',
]

runStandardTestSuite(S.DateFromIsoString({ requireTime: 'None' }), _ => ({
  decoderTests: [
    ...validNone.map(d => _.decoder.pass(d, new Date(d))),
    ...invalid.map(d =>
      _.decoder.fail(d, () => TC.transcodeErrors(TC.typeMismatch('IsoDateString', d))),
    ),
  ],
  jsonSchema: JS.string({
    pattern:
      '^(((\\d{4}|[+\\x2d]\\d{6})-((0[1-9])|(1[0-2]))-((0[1-9])|(1\\d|[2]\\d|3[0-1]))|((\\d{4}|[+\\x2d]\\d{6})-((0[1-9])|(1[0-2])))|\\d{4}|[+\\x2d]\\d{6})((T| )(((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d)):((0\\d)|(1\\d|[2-4]\\d|5\\d))\\.(\\d+?)|((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d)):((0\\d)|(1\\d|[2-4]\\d|5\\d))|((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d))))?(Z|[+\\x2d]((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d)))?)$',
  }),
  typeString: 'IsoDateString → SafeDate',
}))()

runStandardTestSuite(S.DateFromIsoString({ requireTime: 'Time' }), _ => ({
  decoderTests: [
    ...validTime.map(d => _.decoder.pass(d, new Date(d))),
    ...invalid.map(d =>
      _.decoder.fail(d, () =>
        TC.transcodeErrors(TC.typeMismatch('IsoDateTimeString', d)),
      ),
    ),
  ],
  jsonSchema: JS.string({
    pattern:
      '^(((\\d{4}|[+\\x2d]\\d{6})-((0[1-9])|(1[0-2]))-((0[1-9])|(1\\d|[2]\\d|3[0-1]))|((\\d{4}|[+\\x2d]\\d{6})-((0[1-9])|(1[0-2])))|\\d{4}|[+\\x2d]\\d{6})(T| )(((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d)):((0\\d)|(1\\d|[2-4]\\d|5\\d))\\.(\\d+?)|((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d)):((0\\d)|(1\\d|[2-4]\\d|5\\d))|((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d)))(Z|[+\\x2d]((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d)))?)$',
  }),
  typeString: 'IsoDateTimeString → SafeDate',
}))()

runStandardTestSuite(S.DateFromIsoString({ requireTime: 'TimeAndOffset' }), _ => ({
  decoderTests: [
    ...validTimeAndOffset.map(d => _.decoder.pass(d, new Date(d))),
    ...invalid.map(d =>
      _.decoder.fail(d, () =>
        TC.transcodeErrors(TC.typeMismatch('IsoDateTimeStringZ', d)),
      ),
    ),
  ],
  jsonSchema: JS.string({
    pattern:
      '^(((\\d{4}|[+\\x2d]\\d{6})-((0[1-9])|(1[0-2]))-((0[1-9])|(1\\d|[2]\\d|3[0-1]))|((\\d{4}|[+\\x2d]\\d{6})-((0[1-9])|(1[0-2])))|\\d{4}|[+\\x2d]\\d{6})(T| )(((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d)):((0\\d)|(1\\d|[2-4]\\d|5\\d))\\.(\\d+?)|((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d)):((0\\d)|(1\\d|[2-4]\\d|5\\d))|((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d)))(Z|[+\\x2d]((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d))))$',
  }),
  typeString: 'IsoDateTimeStringZ → SafeDate',
}))()
