import * as Jwt from '../../../src/schemata/string/Jwt'
import { getAllInstances, validateArbitrary } from '../../../test-utils'

const { Arbitrary, Decoder, Eq, Guard, TaskDecoder, Type } = getAllInstances(Jwt.Jwt)

const validStrings = [
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb3JlbSI6Imlwc3VtIn0.ymiJSsMJXR6tMSr8G9usjQ15_8hKPDv_CArLhxw28MI',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2xvciI6InNpdCIsImFtZXQiOlsibG9yZW0iLCJpcHN1bSJdfQ.rRpe04zbWbbJjwM43VnHzAboDzszJtGrNsUxaqQ-GQ8',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqb2huIjp7ImFnZSI6MjUsImhlaWdodCI6MTg1fSwiamFrZSI6eyJhZ2UiOjMwLCJoZWlnaHQiOjI3MH19.YRLPARDmhGMC3BBk_OhtwwK21PIkVCqQe8ncIRPKo-E',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ', // No signature
]

const invalidStrings = [
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqb2huIjp7ImFnZSI6MjUsImhlaWdodCI6MTg1fSwiamFrZSI6eyJhZ2UiOjMwLCJoZWlnaHQiOjI3MH19.YRLPARDmhGMC3BBk_OhtwwK21PIkVCqQe8ncIRPKo-E.YRLPARDmhGMC3BBk_OhtwwK21PIkVCqQe8ncIRPKo-E',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqb2huIjp7ImFnZSI6MjUsImhlaWdodCI6MTg1fSwiamFrZSI6eyJhZ2UiOjMwLCJoZWlnaHQiOjI3MH19.YRLPARDmhGMC3BBk_OhtwwK21PIkVCqQe8ncIRPKo-E.YRLPARDmhGMC3BBk_OhtwwK21PIkVCqQe8ncIRPKo-E.YRLPARDmhGMC3BBk_OhtwwK21PIkVCqQe8ncIRPKo-E',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  '$Zs.ewu.su84',
  'ks64$S/9.dy$§kz.3sd73b',
]

describe('JWT', () => {
  describe('Decoder', () => {
    test.each(validStrings)('validates valid jwt strings, %s', num => {
      const result = Decoder.decode(num)

      expect(result._tag).toBe('Right')
    })
    test.each(invalidStrings)('invalidates invalid jwt strings, %s', num => {
      const result = Decoder.decode(num)

      expect(result._tag).toBe('Left')
    })
  })

  describe('Eq', () => {
    test.each(validStrings)('determines two strings are equal', num1 => {
      const guard = Guard.is
      const eq = Eq.equals

      if (!guard(num1)) {
        throw new Error('Unexpected result')
      }

      expect(eq(num1, num1)).toBe(true)
    })
  })

  describe('Guard', () => {
    test.each(validStrings)('validates valid jwt strings, %s', num => {
      const result = Guard.is(num)

      expect(result).toBe(true)
    })
    test.each(invalidStrings)('invalidates invalid jwt strings, %s', num => {
      const result = Guard.is(num)

      expect(result).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    test.each(validStrings)('validates valid jwt strings, %s', async num => {
      const result = await TaskDecoder.decode(num)()

      expect(result._tag).toBe('Right')
    })
    test.each(invalidStrings)('invalidates invalid jwt strings, %s', async num => {
      const result = await TaskDecoder.decode(num)()

      expect(result._tag).toBe('Left')
    })
  })

  describe('Type', () => {
    test.each(validStrings)('validates valid jwt strings, %s', num => {
      const result = Type.decode(num)

      expect(result._tag).toBe('Right')
    })
    test.each(invalidStrings)('invalidates invalid jwt strings, %s', num => {
      const result = Type.decode(num)

      expect(result._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid JWTs', () => {
      validateArbitrary({ Arbitrary }, Guard.is)
    })
  })
})
