import { unsafeCoerce } from 'fp-ts/function'
import * as NonemptyString from '../src/string/NonemptyString'
import { validateArbitrary } from '../test-utils'

const _: (n: string) => NonemptyString.NonemptyString = unsafeCoerce

const make: () => NonemptyString.NonemptyString = () => _(`${Math.random()}`)

describe('NonemptyString', () => {
  describe('Decoder', () => {
    it('catches an invalid NonemptyString', () => {
      const result = NonemptyString.Decoder.decode('')
      expect(result._tag).toBe('Left')
    })
    it('validates a valid NonemptyString', () => {
      const result = NonemptyString.Decoder.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar NonemptyStrings', () => {
      const test = make()
      expect(NonemptyString.Eq.equals(test, test)).toBe(true)
    })
    it('returns false for dissimilar NonemptyStrings', () => {
      expect(NonemptyString.Eq.equals(_('1'), _('2'))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid NonemptyString', () => {
      expect(NonemptyString.Guard.is('')).toBe(false)
    })
    it('permits a valid NonemptyString', () => {
      expect(NonemptyString.Guard.is(make())).toBe(true)
    })
  })
  describe('Type', () => {
    it('decodes an invalid NonemptyString', () => {
      const result = NonemptyString.Type.decode('')
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid NonemptyString', () => {
      const result = NonemptyString.Type.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Arbitrary', () => {
    it('generates valid NonemptyStrings', () => {
      validateArbitrary(NonemptyString, NonemptyString.isNonemptyString)
    })
  })
})
