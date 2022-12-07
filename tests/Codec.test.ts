import { getCodec } from '../src/Codec'
import * as S from '../src/schemata'

describe('Codec', () => {
  describe('getCodec', () => {
    test('decoding', () => {
      const codec = getCodec(S.FloatFromString())
      expect(codec.decode('1')).toEqual({ _tag: 'Right', right: 1 })
    })
    test('encoding', () => {
      const codec = getCodec(S.FloatFromString())
      expect(codec.encode(1 as S.TypeOf<ReturnType<typeof S.Float>>)).toEqual('1')
    })
    test('guarding', () => {
      const codec = getCodec(S.FloatFromString())
      expect(codec.is(1)).toEqual(true)
    })
  })
})
