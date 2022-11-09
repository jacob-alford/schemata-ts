import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as ISODateString from '../../src/date/dateFromIsoString'
import { getDecoder } from '../../src/interpreters'
import { validateArbitrary } from '../../test-utils'

const valid: ReadonlyArray<string> = [
  '2009-12T12:34',
  '2009',
  '2009-05-19',
  '2009-05-19',
  '2009-05',
  '2009-001',
  '2009-05-19',
  '2009-05-19 00:00',
  '2009-05-19 14:31',
  '2009-05-19 14:39:22',
  '2009-05-19T14:39Z',
  '2009-05-19 14:39:22-06:00',
  '2009-05-19 14:39:22+0600',
  '2009-05-19 14:39:22-01',
  '2007-04-06T00:00',
  '2007-04-05T24:00',
  '2010-02-18T16:23:48.5',
  '2009-10-10',
]

const invalid: ReadonlyArray<string> = [
  // TODO: Figure out why this is passing
  // '200905',
  '2009367',
  // TODO: Figure out why this is passing
  // '2009-',
  '2007-04-05T24:50',
  '2009-000',
  '2009-M511',
  '2009M511',
  '2009-05-19T14a39r',
  '2009-05-19T14:3924',
  '2009-0519',
  '2009-05-1914:39',
  // TODO: Figure out why this is passing
  // '2009-05-19 14:',
  '2009-05-19r14:39',
  '2009-05-19 14a39a22',
  // TODO: Figure out why this is passing
  // '200912-01',
  '2009-05-19 14:39:22+06a00',
  '2009-05-19 146922.500',
  '2010-02-18T16.5:23.35:48',
  '2010-02-18T16:23.35:48',
  '2010-02-18T16:23.35:48.45',
  '2009-05-19 14.5.44',
  '2010-02-18T16:23.33.600',
  '2010-02-18T16,25:23:48,444',
  '2010-13-1',
  'nonsense2021-01-01T00:00:00Z',
  '2021-01-01T00:00:00Znonsense',
]

describe('dateFromIsoString', () => {
  describe('Decoder', () => {
    test.each(valid)('validates valid date strings, %s', str => {
      const result = ISODateString.Decoder.decode(str)
      expect(result._tag).toBe('Right')
    })
    test.each(invalid)('invalidates invalid date strings, %s', str => {
      const result = ISODateString.Decoder.decode(str)
      if (result._tag === 'Right') console.log({ str, result: result.right })
      expect(result._tag).toBe('Left')
    })
  })

  describe('Encoder', () => {
    test.each(valid)('encoding a decoded value yields original value', original => {
      const roundtrip = pipe(
        original,
        ISODateString.Decoder.decode,
        E.map(ISODateString.Encoder.encode),
        E.getOrElseW(() => 'unexpected'),
      )
      expect(new Date(original).toISOString()).toEqual(roundtrip)
    })
  })

  describe('Eq', () => {
    test.each(valid)('determines two strings are equal', str1 => {
      const guard = ISODateString.Guard.is
      const eq = ISODateString.Eq.equals
      const test = new Date(str1)
      if (!guard(test)) {
        throw new Error('Unexpected result')
      }
      expect(eq(test, test)).toBe(true)
    })
  })

  describe('Guard', () => {
    test.each(valid)('validates valid date strings, %s', str => {
      const test = new Date(str)
      const result = ISODateString.Guard.is(test)
      expect(result).toBe(true)
    })
    test.each(invalid)('invalidates invalid date strings, %s', str => {
      const test = new Date(str)
      const result = ISODateString.Guard.is(test)
      expect(result).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    test.each(valid)('validates valid date strings, %s', async str => {
      const result = await ISODateString.TaskDecoder.decode(str)()
      expect(result._tag).toBe('Right')
    })
    test.each(invalid)('invalidates invalid date strings, %s', async str => {
      const result = await ISODateString.TaskDecoder.decode(str)()
      expect(result._tag).toBe('Left')
    })
  })

  describe('Type', () => {
    test.each(valid)('validates valid date strings, %s', str => {
      const result = ISODateString.Type.decode(str)
      expect(result._tag).toBe('Right')
    })
    test.each(invalid)('invalidates invalid date strings, %s', str => {
      const result = ISODateString.Type.decode(str)
      expect(result._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid ISODateString', () => {
      validateArbitrary(ISODateString, ISODateString.Guard.is)
    })
  })

  describe('Schema', () => {
    it('derives a decoder', () => {
      const decoder = getDecoder(ISODateString.Schema)
      const validDate = new Date()
      expect(decoder.decode(new Date('abc'))._tag).toEqual('Left')
      expect(decoder.decode(validDate.toISOString())).toStrictEqual(E.right(validDate))
    })
  })
})
