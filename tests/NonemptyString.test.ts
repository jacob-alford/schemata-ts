import { unsafeCoerce } from 'fp-ts/function'
import { Eq, Decoder, Guard, NonemptyString, Type } from '../src/string/NonemptyString'

const _: (n: string) => NonemptyString = unsafeCoerce

const make: () => NonemptyString = () => _(`${Math.random()}`)

describe('NonemptyString', () => {
  describe('Decoder', () => {
    it('catches an invalid NonemptyString', () => {
      const result = Decoder.decode('')
      expect(result._tag).toBe('Left')
    })
    it('validates a valid NonemptyString', () => {
      const result = Decoder.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar NonemptyStrings', () => {
      const test = make()
      expect(Eq.equals(test, test)).toBe(true)
    })
    it('returns false for dissimilar NonemptyStrings', () => {
      expect(Eq.equals(_('1'), _('2'))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid NonemptyString', () => {
      expect(Guard.is('')).toBe(false)
    })
    it('permits a valid NonemptyString', () => {
      expect(Guard.is(make())).toBe(true)
    })
  })
  describe('Type', () => {
    it('decodes an invalid NonemptyString', () => {
      const result = Type.decode('')
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid NonemptyString', () => {
      const result = Type.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
})
