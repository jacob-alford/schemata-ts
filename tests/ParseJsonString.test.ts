import * as D from 'schemata-ts/Decoder'
import { getTranscoder } from 'schemata-ts/derivations/transcoder-schemable'
import { ParseJsonString } from 'schemata-ts/schemata/ParseJsonString'

const Schema = ParseJsonString()

const Transcoder = getTranscoder(Schema)

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
