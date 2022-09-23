import * as CreditCard from '../../src/string/CreditCard'
import { validateArbitrary } from '../../test-utils'

describe('CreditCard', () => {
  // this was generated with a random site, afaik it's not a "real" number
  const realishCC = '4485-5502-3668-4973'

  describe('Decoder', () => {
    it('catches an invalid string', () => {
      const result = CreditCard.Decoder.decode('1234')
      expect(result._tag).toBe('Left')
    })

    it('validates a valid CreditCard string', () => {
      const result = CreditCard.Decoder.decode(realishCC)
      expect(result._tag).toBe('Right')
    })
  })

  describe('Guard', () => {
    it('guards against invalid CreditCard characters', () => {
      expect(CreditCard.Guard.is('123')).toBe(false)
    })

    it('permits a valid CreditCard characters', () => {
      expect(CreditCard.Guard.is(realishCC)).toBe(true)
    })
  })

  describe('TaskDecoder', () => {
    it('invalidates an invalid CreditCard string', async () => {
      const result = await CreditCard.TaskDecoder.decode('1234')()
      expect(result._tag).toBe('Left')
    })

    it('validates an valid CreditCard string', async () => {
      const result = await CreditCard.TaskDecoder.decode(realishCC)()
      expect(result._tag).toBe('Right')
    })
  })

  describe('Type', () => {
    it('decodes an invalid CreditCard string', () => {
      const result = CreditCard.Type.decode('123')
      expect(result._tag).toBe('Left')
    })

    it('decodes an invalid CreditCard string', () => {
      const result = CreditCard.Type.decode(realishCC)
      expect(result._tag).toBe('Right')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid CreditCard strings', () => {
      validateArbitrary(CreditCard, CreditCard.isCreditCard)
    })
  })
})
