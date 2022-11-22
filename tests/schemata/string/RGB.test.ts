import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { RGB } from '../../../src/schemata/string/RGB'
import { getAllInstances, validateArbitrary } from '../../../test-utils'
import { pipe, tuple } from 'fp-ts/function'

const instances = getAllInstances(RGB)

const valid: ReadonlyArray<string> = [
  'rgb(0,0,0)',
  'rgb(255,255,255)',
  'rgba(0,0,0,0)',
  'rgba(255,255,255,1)',
  'rgba(255,255,255,.1)',
  'rgba(255,255,255,0.1)',
  'rgba(255,255,255,.12)',
  'rgb(5%,5%,5%)',
  'rgba(5%,5%,5%,.3)',
]

const invalid: ReadonlyArray<string> = [
  'rgb(0,0,0,)',
  'rgb(0,0,)',
  'rgb(0,0,256)',
  'rgb()',
  'rgba(0,0,0)',
  'rgba(255,255,255,2)',
  'rgba(255,255,256,0.1)',
  'rgb(4,4,5%)',
  'rgba(5%,5%,5%)',
  'rgba(3,3,3%,.3)',
  'rgb(101%,101%,101%)',
  'rgba(3%,3%,101%,0.3)',
]

describe('RGB', () => {
  describe('Decoder', () => {
    test.each(valid)('validates valid string %s', str => {
      const result = instances.Decoder.decode(str)
      expect(result._tag).toBe('Right')
    })

    test.each(invalid)('catches bad string %s', str => {
      const result = instances.Decoder.decode(str)
      expect(result._tag).toBe('Left')
    })
  })

  describe('Encoder', () => {
    test.each(valid)('encoding a decoded value yields original value', original => {
      const roundtrip = pipe(
        original,
        instances.Decoder.decode,
        E.map(instances.Encoder.encode),
        E.getOrElseW(() => 'unexpected'),
      )
      expect(original).toEqual(roundtrip)
    })
  })

  describe('Eq', () => {
    test.each(RA.zipWith(valid, valid, tuple))(
      'determines two strings are equal',
      (str1, str2) => {
        const guard = instances.Guard.is
        const eq = instances.Eq.equals
        if (!guard(str1) || !guard(str2)) {
          throw new Error('Unexpected result')
        }
        expect(eq(str1, str2)).toBe(true)
      },
    )
  })

  describe('Guard', () => {
    test.each(valid)('validates valid string %s', str => {
      const result = instances.Guard.is(str)
      expect(result).toBe(true)
    })

    test.each(invalid)('catches bad string %s', str => {
      const result = instances.Guard.is(str)
      expect(result).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    test.each(valid)('validates valid string %s', async str => {
      const result = await instances.TaskDecoder.decode(str)()
      expect(result._tag).toBe('Right')
    })

    test.each(invalid)('catches bad string %s', async str => {
      const result = await instances.TaskDecoder.decode(str)()
      expect(result._tag).toBe('Left')
    })
  })

  describe('Type', () => {
    test.each(valid)('validates valid string %s', str => {
      const result = instances.Type.decode(str)
      expect(result._tag).toBe('Right')
    })

    test.each(invalid)('catches bad string %s', str => {
      const result = instances.Type.decode(str)
      expect(result._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid RGB', () => {
      validateArbitrary(instances, instances.Guard.is)
    })
  })
})
