import * as E from 'fp-ts/Either'

import { CreditCard } from '../../../src/schemata/string/CreditCard'
import { getAllInstances, validateArbitrary } from '../../../test-utils'

const instances = getAllInstances(CreditCard)

describe('CreditCard', () => {
  // this was generated with a random site, afaik it's not a "real" number
  const realishCC = '4485550236684973'

  describe('Decoder', () => {
    it('catches an invalid string', () => {
      const result = instances.Decoder.decode('1234')
      expect(result._tag).toBe('Left')
    })

    it('validates a valid CreditCard string', () => {
      const result = instances.Decoder.decode(realishCC)
      expect(result._tag).toBe('Right')
    })
  })

  describe('Guard', () => {
    it('guards against invalid CreditCard characters', () => {
      expect(instances.Guard.is('123')).toBe(false)
    })

    it('permits a valid CreditCard characters', () => {
      expect(instances.Guard.is(realishCC)).toBe(true)
    })
  })

  describe('TaskDecoder', () => {
    it('invalidates an invalid CreditCard string', async () => {
      const result = await instances.TaskDecoder.decode('1234')()
      expect(result._tag).toBe('Left')
    })

    it('validates an valid CreditCard string', async () => {
      const result = await instances.TaskDecoder.decode(realishCC)()
      expect(result._tag).toBe('Right')
    })
  })

  describe('Type', () => {
    it('decodes an invalid CreditCard string', () => {
      const result = instances.Type.decode('123')
      expect(result._tag).toBe('Left')
    })

    it('decodes an invalid CreditCard string', () => {
      const result = instances.Type.decode(realishCC)
      expect(result._tag).toBe('Right')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid CreditCard strings', () => {
      validateArbitrary(instances, instances.Guard.is)
    })
  })

  describe('validators.js test cases', () => {
    // NOTE: If a test case here is commented out,
    // it existed in the validators.js test cases but I cannot find any
    // corroboration that it should be considered valid.
    test.each([
      '375556917985515',
      '36050234196908',
      '4716461583322103',
      '4716221051885662',
      '4929722653797141',
      '5398228707871527',
      '6283875070985593',
      '6263892624162870',
      //'6234917882863855',
      //'6234698580215388',
      '6226050967750613',
      '6246281879460688',
      '2222155765072228',
      '2225855203075256',
      '2720428011723762',
      '2718760626256570',
      // '6765780016990268',
      // '4716989580001715211',
      '8171999927660000',
      // '8171999900000000021',
    ])('%s is valid', ccn => {
      expect(instances.Guard.is(ccn)).toBe(true)
    })

    test.each([
      'foo',
      'foo',
      '5398228707871528',
      '2718760626256571',
      '2721465526338453',
      '2220175103860763',
      '375556917985515999999993',
      '899999996234917882863855',
      'prefix6234917882863855',
      '623491788middle2863855',
      '6234917882863855suffix',
      '4716989580001715213',
    ])('%s is invalid', ccn => {
      expect(instances.Guard.is(ccn)).toBe(false)
    })
  })

  describe('printer', () => {
    it('prints a valid CreditCard string', () => {
      expect(instances.Printer.print(realishCC as any)).toStrictEqual(E.right(realishCC))
    })
  })
})
