import * as NonEmptyString from '../../../src/schemata/string/NonEmptyString'
import { getAllInstances, validateArbitrary } from '../../../test-utils'
import { unsafeCoerce } from 'fp-ts/function'

const _: (n: string) => NonEmptyString.NonEmptyString = unsafeCoerce

const make: () => NonEmptyString.NonEmptyString = () => _(`${Math.random()}`)

const { Arbitrary, Decoder, Eq, Guard, Type } = getAllInstances(
  NonEmptyString.NonEmptyString,
)

describe('NonEmptyString', () => {
  describe('Decoder', () => {
    it('catches an invalid NonEmptyString', () => {
      const result = Decoder.decode('')
      expect(result._tag).toBe('Left')
    })
    it('validates a valid NonEmptyString', () => {
      const result = Decoder.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Eq', () => {
    it('returns true for similar NonEmptyStrings', () => {
      const test = make()
      expect(Eq.equals(test, test)).toBe(true)
    })
    it('returns false for dissimilar NonEmptyStrings', () => {
      expect(Eq.equals(_('1'), _('2'))).toBe(false)
    })
  })
  describe('Guard', () => {
    it('guards against invalid NonEmptyString', () => {
      expect(Guard.is('')).toBe(false)
    })
    it('permits a valid NonEmptyString', () => {
      expect(Guard.is(make())).toBe(true)
    })
  })
  describe('Type', () => {
    it('decodes an invalid NonEmptyString', () => {
      const result = Type.decode('')
      expect(result._tag).toBe('Left')
    })
    it('decodes an valid NonEmptyString', () => {
      const result = Type.decode(make())
      expect(result._tag).toBe('Right')
    })
  })
  describe('Arbitrary', () => {
    it('generates valid NonEmptyStrings', () => {
      validateArbitrary({ Arbitrary }, Guard.is)
    })
  })
})
