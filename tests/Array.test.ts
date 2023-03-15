import * as D from 'schemata-ts/Decoder'
import { getDecoder } from 'schemata-ts/derivations/DecoderSchemable'
import { getEncoder } from 'schemata-ts/derivations/EncoderSchemable'
// import * as Arb from 'schemata-ts/Arbitrary'
// import * as G from 'schemata-ts/Guard'
// import * as Eq from 'schemata-ts/Eq'
// import * as P from 'schemata-ts/Printer'
import { Array } from 'schemata-ts/schemata/Array'
import { String } from 'schemata-ts/schemata/String'

const Schema = Array(String())

const Decoder = getDecoder(Schema)
const Encoder = getEncoder(Schema)

describe('Array.Decoder', () => {
  it('should decode an array of strings', () => {
    expect(Decoder.decode(['a', 'b', 'c'])).toEqual(D.success(['a', 'b', 'c']))
  })
  it('should fail to decode a non-array', () => {
    expect(Decoder.decode('a')).toEqual(
      D.failure(D.decodeErrors(D.typeMismatch('array', 'a'))),
    )
  })
  it('should collect errors for non-strings', () => {
    expect(Decoder.decode(['a', 1, 'c', 3])).toEqual(
      D.failure(
        D.decodeErrors(
          D.errorAtIndex(1, D.decodeErrors(D.typeMismatch('string', 1))),
          D.errorAtIndex(3, D.decodeErrors(D.typeMismatch('string', 3))),
        ),
      ),
    )
  })
})

describe('Array.Encoder', () => {
  it('should encode an array of strings', () => {
    expect(Encoder.encode(['a', 'b', 'c'])).toEqual(['a', 'b', 'c'])
  })
})
