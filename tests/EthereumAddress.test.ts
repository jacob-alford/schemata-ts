import * as S from 'schemata-ts'
import * as JS from 'schemata-ts/JsonSchema'

import { runStandardTestSuite } from '../test-utils/test-suite'

const valid = [
  '0x0000000000000000000000000000000000000001',
  '0x683E07492fBDfDA84457C16546ac3f433BFaa128',
  '0x88dA6B6a8D3590e88E0FcadD5CEC56A7C9478319',
  '0x8a718a84ee7B1621E63E680371e0C03C417cCaF6',
  '0xFCb5AFB808b5679b4911230Aa41FfCD0cd335b42',
]

const invalid = [
  '0xGHIJK05pwm37asdf5555QWERZCXV2345AoEuIdHt',
  '0xFCb5AFB808b5679b4911230Aa41FfCD0cd335b422222',
  '0xFCb5AFB808b5679b4911230Aa41FfCD0cd33',
  '0b0110100001100101011011000110110001101111',
  '683E07492fBDfDA84457C16546ac3f433BFaa128',
]

runStandardTestSuite(S.EthereumAddress, _ => ({
  decoderTests: [
    ...valid.map(input => _.decoder.pass(input)),
    ...invalid.map(input => _.decoder.fail(input)),
  ],
  encoderTests: [...valid.map(expected => _.encoder.pass(_.c(expected), _.c(expected)))],
  guardTests: [],
  eqTests: [],
  jsonSchema: JS.string({
    pattern: '^((0x)[0-9A-Fa-f]{40})$',
  }),
  typeString: 'EthereumAddress',
}))()
