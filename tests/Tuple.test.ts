import * as D from 'schemata-ts/Decoder'
import { getDecoder } from 'schemata-ts/derivations/DecoderSchemable'
// import { getEncoder } from 'schemata-ts/derivations/EncoderSchemable'
import { Float } from 'schemata-ts/schemata/Float'
import { Int } from 'schemata-ts/schemata/Int'
import { String } from 'schemata-ts/schemata/String'
// import * as Arb from 'schemata-ts/Arbitrary'
// import * as G from 'schemata-ts/Guard'
// import * as Eq from 'schemata-ts/Eq'
// import * as P from 'schemata-ts/Printer'
import { Tuple } from 'schemata-ts/schemata/Tuple'

const Schema = Tuple(String(), Float(), Int())

const Decoder = getDecoder(Schema)
// const Encoder = getEncoder(Schema)

describe('Tuple.Decoder', () => {
  it('should work with a valid input', () => {
    expect(Decoder.decode(['hello', Number.MAX_VALUE, Number.MAX_SAFE_INTEGER])).toEqual(
      D.success(['hello', Number.MAX_VALUE, Number.MAX_SAFE_INTEGER]),
    )
  })
  it('should fail for non-arrays', () => {
    expect(Decoder.decode('hello')).toEqual(
      D.failure(D.decodeErrors(D.typeMismatch('array', 'hello'))),
    )
    expect(Decoder.decode(1)).toEqual(
      D.failure(D.decodeErrors(D.typeMismatch('array', 1))),
    )
  })
  it('should fail with different lengths of tuples', () => {
    expect(Decoder.decode(['hello', Number.MAX_VALUE])).toEqual(
      D.failure(
        D.decodeErrors(D.typeMismatch('tuple of length 3', ['hello', Number.MAX_VALUE])),
      ),
    )
  })
  it('should fail with an invalid input (wrong type)', () => {
    expect(Decoder.decode(['hello', Infinity, NaN])).toEqual(
      D.failure(
        D.decodeErrors(
          D.errorAtIndex(1, D.decodeErrors(D.typeMismatch('float', Infinity))),
          D.errorAtIndex(2, D.decodeErrors(D.typeMismatch('int', NaN))),
        ),
      ),
    )
  })
})

// describe('Array.Encoder', () => {})
