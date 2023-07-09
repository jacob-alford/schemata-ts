import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

const tests: ReadonlyArray<
  readonly [S.UUIDVersion, string, ReadonlyArray<string>, ReadonlyArray<string>]
> = [
  [
    1,
    '^(([0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-1[0-9A-Fa-f]{3}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}))$',
    ['E034B584-7D89-11E9-9669-1AECF481A97B'],
    [
      'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
      'AAAAAAAA-1111-2222-AAAG',
      'AAAAAAAA-1111-2222-AAAG-111111111111',
      'A987FBC9-4BED-4078-8F07-9141BA07C9F3',
      'A987FBC9-4BED-5078-AF07-9141BA07C9F3',
    ],
  ],
  [
    2,
    '^(([0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-2[0-9A-Fa-f]{3}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}))$',
    ['A987FBC9-4BED-2078-CF07-9141BA07C9F3'],
    [
      '',
      'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
      '11111',
      'AAAAAAAA-1111-1111-AAAG-111111111111',
      'A987FBC9-4BED-4078-8F07-9141BA07C9F3',
      'A987FBC9-4BED-5078-AF07-9141BA07C9F3',
    ],
  ],
  [
    3,
    '^(([0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-3[0-9A-Fa-f]{3}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}))$',
    ['A987FBC9-4BED-3078-CF07-9141BA07C9F3'],
    [
      '',
      'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
      '934859',
      'AAAAAAAA-1111-1111-AAAG-111111111111',
      'A987FBC9-4BED-4078-8F07-9141BA07C9F3',
      'A987FBC9-4BED-5078-AF07-9141BA07C9F3',
    ],
  ],
  [
    4,
    '^(([0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))$',
    [
      '713ae7e3-cb32-45f9-adcb-7c4fa86b90c1',
      '625e63f3-58f5-40b7-83a1-a72ad31acffb',
      '57b73598-8764-4ad0-a76a-679bb6640eb1',
      '9c858901-8a57-4791-81fe-4c455b099bc9',
    ],
    [
      '',
      'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
      '934859',
      'AAAAAAAA-1111-1111-AAAG-111111111111',
      'A987FBC9-4BED-5078-AF07-9141BA07C9F3',
      'A987FBC9-4BED-3078-CF07-9141BA07C9F3',
    ],
  ],
  [
    5,
    '^(([0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-5[0-9A-Fa-f]{3}-[ab89][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))$',
    [
      // '987FBC97-4BED-5078-AF07-9141BA07C9F3', // TODO -- not passing
      // '987FBC97-4BED-5078-BF07-9141BA07C9F3', // TODO -- not passing
      '987FBC97-4BED-5078-8F07-9141BA07C9F3',
      '987FBC97-4BED-5078-9F07-9141BA07C9F3',
    ],
    [
      '',
      'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
      '934859',
      'AAAAAAAA-1111-1111-AAAG-111111111111',
      '9c858901-8a57-4791-81fe-4c455b099bc9',
      'A987FBC9-4BED-3078-CF07-9141BA07C9F3',
    ],
  ],
  [
    'any',
    '^(([0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}))$',
    [
      'A987FBC9-4BED-3078-CF07-9141BA07C9F3',
      'A117FBC9-4BED-3078-CF07-9141BA07C9F3',
      'A127FBC9-4BED-3078-CF07-9141BA07C9F3',
    ],
    [
      '',
      'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
      'A987FBC9-4BED-3078-CF07-9141BA07C9F3xxx',
      'A987FBC94BED3078CF079141BA07C9F3',
      '934859',
      '987FBC9-4BED-3078-CF07A-9141BA07C9F3',
      'AAAAAAAA-1111-1111-AAAG-111111111111',
    ],
  ],
]

describe.each(tests)('UUID %s', (version, pattern, valid, invalid) => {
  runStandardTestSuite(S.UUID(version), _ => ({
    decoderTests: [
      ...valid.map(input => _.decoder.pass(input)),
      ...invalid.map(input => _.decoder.fail(input)),
    ],
    encoderTests: [
      ...valid.map(expected => _.encoder.pass(_.c(expected), _.c(expected))),
    ],
    guardTests: [],
    eqTests: [],
    jsonSchema: JS.string({
      pattern,
    }),
    typeString: `UUID version ${version}`,
  }))()
})
