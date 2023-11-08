import { expectTypeOf } from 'expect-type'
import * as S from 'schemata-ts'
import { type Integer, type MaxSafeInt, type MinSafeInt } from 'schemata-ts/integer'
import { type IntString } from 'schemata-ts/schemata/IntFromString'
import * as TC from 'schemata-ts/Transcoder'

import { runStandardTestSuite } from '../test-utils/test-suite'

const valid = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '1e+1',
  '1e1',
  '-1',
  '11',
  '1.1e1',
]
const invalid = ['1.1', '1e-1', '1.1e-1', '', ' ', 'a', '1a', 'a1']

const Unbounded = S.ParseInt()

runStandardTestSuite(Unbounded, _ => ({
  decoderTests: [
    ...valid.map(v => _.decoder.pass(v, Number(v))),
    ...invalid.map(v =>
      _.decoder.fail(v, () =>
        TC.transcodeErrors(TC.serializationError('IntString', expect.any(String), v)),
      ),
    ),
  ],
  encoderTests: [
    _.encoder.pass(_.c(0), _.c('0')),
    _.encoder.pass(_.c(Number.MIN_SAFE_INTEGER), _.c('-9007199254740991')),
    _.encoder.pass(_.c(Number.MAX_SAFE_INTEGER), _.c('9007199254740991')),
  ],
}))()

test('Unbounded types', () => {
  expectTypeOf(Unbounded).toEqualTypeOf<
    S.Schema<IntString<MinSafeInt, MaxSafeInt>, Integer<MinSafeInt, MaxSafeInt>>
  >()
})

const Bounded = S.ParseInt({ min: 0, max: 10 })

test('Bounded types', () => {
  expectTypeOf(Bounded).toEqualTypeOf<S.Schema<IntString<0, 10>, Integer<0, 10>>>()
})

runStandardTestSuite(Bounded, _ => ({
  decoderTests: [
    _.decoder.fail('-1', () =>
      TC.transcodeErrors(
        TC.serializationError('IntString<0,10>', expect.any(String), '-1'),
      ),
    ),
    _.decoder.pass('0', 0),

    _.decoder.pass('1', 1),
    _.decoder.fail('11', () =>
      TC.transcodeErrors(
        TC.serializationError('IntString<0,10>', expect.any(String), '11'),
      ),
    ),
  ],
  encoderTests: [_.encoder.pass(_.c(0), _.c('0')), _.encoder.pass(_.c(10), _.c('10'))],
}))()
