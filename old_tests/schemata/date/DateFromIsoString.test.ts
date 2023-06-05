import * as E from 'fp-ts/Either'
import { pipe, tuple } from 'fp-ts/function'

import * as ISODateString_ from '../../../src/schemata/DateFromIsoString'
import { getAllInstances, validateArbitrary } from '../../../test-utils'
import * as D from '../../../test-utils/schemable-exports/WithDate'

const validNone: ReadonlyArray<string> = [
  '2009-12T12:34',
  '2009',
  '+002022',
  '2009-05-19',
  '2009-05-19',
  '2009-05',
  '2009-05-19',
  '2009-05-19T00:00',
  '2009-05-19T14:31',
  '2009-05-19T14:39:22',
  '2009-05-19T14:39Z',
  '2009-05-19T14:39:22-06:00',
  '2007-04-06T00:00',
  '2010-02-18T16:23:48.5',
  '2009-10-10',
  '+002022-10-10',
  '-002022-10-10',
  '-002022-10-10T16:23:48.5',
  '-002022-10-10T16:23:48.5-06:00',
]

const validTime: ReadonlyArray<string> = [
  '2009-12T12:34',
  '2009-05-19T00:00',
  '2009-05-19T14:31',
  '2009-05-19T14:39:22',
  '2009-05-19T14:39Z',
  '2009-05-19T14:39:22-06:00',
  '2007-04-06T00:00',
  '2010-02-18T16:23:48.5',
  '-002022-10-10T16:23:48.5',
  '-002022-10-10T16:23:48.5-06:00',
  '2009-12 12:34',
  '2009-05-19 00:00',
  '2009-05-19 14:31',
  '2009-05-19 14:39:22',
  '2009-05-19 14:39Z',
  '2009-05-19 14:39:22-06:00',
  '2007-04-06 00:00',
  '2010-02-18 16:23:48.5',
  '-002022-10-10 16:23:48.5',
  '-002022-10-10 16:23:48.5-06:00',
]

const validTimeAndOffset: ReadonlyArray<string> = [
  '2009-05-19T14:39Z',
  '2009-05-19T14:39:22-06:00',
  '-002022-10-10T16:23:48.5-06:00',
  '2009-05-19 14:39Z',
  '2009-05-19 14:39:22-06:00',
  '-002022-10-10 16:23:48.5-06:00',
]

const invalid: ReadonlyArray<string> = [
  // This passes in Node 18, but not Firefox 105.0.3
  // '200905',
  '2009367',
  // This passes in Node 18 but not Firefox 105.0.3
  // '2009-',
  '2007-04-05T24:50',
  '2009-000',
  '2009-M511',
  '2009M511',
  '2009-05-19T14a39r',
  '2009-05-19T14:3924',
  '2009-0519',
  '2009-05-1914:39',
  // This passes in Node 18 but not Firefox 105.0.3
  // '2009-05-19 14:',
  '2009-05-19r14:39',
  '2009-05-19 14a39a22',
  // This passes in Node 18 but not Firefox 105.0.3
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

describe('DateFromIsoString', () => {
  for (const [requireTime, valid] of [
    tuple('None' as const, validNone),
    tuple('Time' as const, validTime),
    tuple('TimeAndOffset' as const, validTimeAndOffset),
    tuple(undefined, validTimeAndOffset),
    tuple(null, validTimeAndOffset),
  ]) {
    describe(`require ${requireTime}`, () => {
      const ISODateString = getAllInstances(
        ISODateString_.DateFromIsoString(
          requireTime === null ? undefined : { requireTime },
        ),
      )
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
          validateArbitrary({ Arbitrary: ISODateString.Arbitrary }, D.Guard.date.is)
        })
      })

      describe('Printer', () => {
        test.each(valid)('validates valid date strings, %s', str => {
          const date = new Date(str)
          const result = ISODateString.Printer.domainToJson(date)
          const resultLeft = ISODateString.Printer.codomainToJson(str)
          expect(result).toStrictEqual(E.right(date.toISOString()))
          expect(resultLeft).toStrictEqual(E.right(str))
        })
      })
    })
  }
})
