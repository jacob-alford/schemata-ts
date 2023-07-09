import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const valid = [
  // this was generated with a random site, afaik it's not a "real" number
  '4485550236684973',
  '375556917985515',
  '36050234196908',
  '4716461583322103',
  '4716221051885662',
  '4929722653797141',
  '5398228707871527',
  '6283875070985593',
  '6263892624162870',
  //'6234917882863855',
  //'6234698580215388',
  '6226050967750613',
  '6246281879460688',
  '2222155765072228',
  '2225855203075256',
  '2720428011723762',
  '2718760626256570',
  // '6765780016990268',
  // '4716989580001715211',
  '8171999927660000',
  // '8171999900000000021',
]

const invalid = [
  'foo',
  'foo',
  '2721465526338453',
  '2220175103860763',
  '375556917985515999999993',
  '899999996234917882863855',
  'prefix6234917882863855',
  '623491788middle2863855',
  '6234917882863855suffix',
  '4716989580001715213',
]

const checkDigitTests: ReadonlyArray<readonly [string, string]> = [
  ['5398228707871528', '5398228707871527'],
  ['2718760626256571', '2718760626256570'],
]

runStandardTestSuite(S.CreditCard, _ => ({
  decoderTests: [
    ...valid.map(input => _.decoder.pass(input)),
    ...invalid.map(input => _.decoder.fail(input)),
    ...checkDigitTests.map(([input, expected]) =>
      _.decoder.fail(input, () => TC.transcodeErrors(TC.typeMismatch(expected, input))),
    ),
  ],
  encoderTests: [...valid.map(expected => _.encoder.pass(_.c(expected), _.c(expected)))],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.string({
    pattern:
      '^(4(\\d{12}|\\d{15})|(5[1-5]\\d{4}|(222)[1-9]\\d{2}|(22)[3-9]\\d{3}|(2)[3-6]\\d{4}|(27)[01]\\d{3}|(2720)\\d{2})\\d{10}|3[47]\\d{13}|(3(0([0-5]\\d{5}|(95)\\d{4})|[89]\\d{6})\\d{8,11}|(36)\\d{6}\\d{6,11})|((6011)(0[5-9]\\d{2}|[2-4]\\d{3}|(74)\\d{2}|(7)[7-9]\\d{2}|(8)[6-9]\\d{2}|(9)\\d{3})|(64)[4-9]\\d{5}|(650)[0-5]\\d{4}|(65060)[1-9]\\d{2}|(65061)[1-9]\\d{2}|(6506)[2-9]\\d{3}|(650)[7-9]\\d{4}|(65)[1-9]\\d{5})\\d{8,11}|((352)[89]\\d{4}|(35)[3-8]\\d{5})\\d{8,11}|(((60)|(65)|(81)|(82))\\d{14}|(508)\\d{14})|(62)(2((12)[6-9]\\d{2}|1[3-9]\\d{3}|[2-8]\\d|(9)[01]\\d{3}|(92)[0-5]\\d{2})|[4-6]\\d{5}|(8)[2-8]\\d{4})\\d{8,11})$',
  }),
  typeString: 'CreditCard',
}))()
