import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const base10Valid = [
  '-1',
  '0',
  '1',
  `${Number.MAX_SAFE_INTEGER}`,
  `${Number.MIN_SAFE_INTEGER}`,
]
const base10Invalid = [
  '123e4',
  '123.4',
  `${Math.random() + 1}`,
  '1.1',
  `${-Math.random() - 1}`,
  '-1.1',
  `${Infinity}`,
  `${-Infinity}`,
  `${NaN}`,
  'some other string',
  {},
  [],
  null,
  undefined,
  '',
]

const base16Valid = [`0xabc`, '0x123e5', '0x123e5']
const base16Invalid = ['0x']

const base8Valid = [`0o123`]
const base8Invalid = ['0o', '0o123e5']

const base2Valid = [`0b101`]
const base2Invalid = ['0b123e5', '0o123e5', true]

runStandardTestSuite(S.IntFromString, _ => ({
  decoderTests: [
    ...base10Valid.map(v => _.decoder.pass(v, Number(v))),
    ...base10Invalid.map(i =>
      _.decoder.fail(i, () => TC.transcodeErrors(TC.typeMismatch('IntString', i))),
    ),
  ],
  jsonSchema: JS.string({
    pattern: '^((0b)[0-1]{1,53}|(0o)[0-7]{1,18}|-?\\d{1,16}|(0x)[0-9A-Fa-f]{1,14})$',
  }),
  typeString: 'IntString → Integer',
}))()

runStandardTestSuite(S.IntFromString, _ => ({
  decoderTests: [
    ...base16Valid.map(v => _.decoder.pass(v, Number(v))),
    ...base16Invalid.map(i =>
      _.decoder.fail(i, () => TC.transcodeErrors(TC.typeMismatch('IntString', i))),
    ),
  ],
  jsonSchema: JS.string({
    pattern: '^((0b)[0-1]{1,53}|(0o)[0-7]{1,18}|-?\\d{1,16}|(0x)[0-9A-Fa-f]{1,14})$',
  }),
  typeString: 'IntString → Integer',
}))()

runStandardTestSuite(S.IntFromString, _ => ({
  decoderTests: [
    ...base8Valid.map(v => _.decoder.pass(v, Number(v))),
    ...base8Invalid.map(i =>
      _.decoder.fail(i, () => TC.transcodeErrors(TC.typeMismatch('IntString', i))),
    ),
  ],
  jsonSchema: JS.string({
    pattern: '^((0b)[0-1]{1,53}|(0o)[0-7]{1,18}|-?\\d{1,16}|(0x)[0-9A-Fa-f]{1,14})$',
  }),
  typeString: 'IntString → Integer',
}))()

runStandardTestSuite(S.IntFromString, _ => ({
  decoderTests: [
    ...base2Valid.map(v => _.decoder.pass(v, Number(v))),
    ...base2Invalid.map(i =>
      _.decoder.fail(i, () => TC.transcodeErrors(TC.typeMismatch('IntString', i))),
    ),
  ],
  jsonSchema: JS.string({
    pattern: '^((0b)[0-1]{1,53}|(0o)[0-7]{1,18}|-?\\d{1,16}|(0x)[0-9A-Fa-f]{1,14})$',
  }),
  typeString: 'IntString → Integer',
}))()
