import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const valid: ReadonlyArray<string> = ['0', '10', '-1', '11']

const invalid: ReadonlyArray<string> = [
  '5.5',
  '-5.5',
  '',
  ' ',
  'a',
  'a5',
  '1n',
  '0x',
  '0b',
  '0o',
  '-0b1010',
  '-0o12',
  '-0xA',
]

runStandardTestSuite(S.BigIntFromString, _ => ({
  decoderTests: [
    ...valid.map(v => _.decoder.pass(v, BigInt(v))),
    ...invalid.map(i =>
      _.decoder.fail(i, () => TC.transcodeErrors(TC.typeMismatch('BigIntString', i))),
    ),
    _.decoder.pass('0b1010', 10n),
    _.decoder.pass('0o12', 10n),
    _.decoder.pass('0xA', 10n),
  ],
  jsonSchema: JS.string({
    pattern: '^((0b)[0-1]+?|(0o)[0-7]+?|-?\\d+?|(0x)[0-9A-Fa-f]+?)$',
  }),
  typeString: 'BigIntString → bigint',
}))()
