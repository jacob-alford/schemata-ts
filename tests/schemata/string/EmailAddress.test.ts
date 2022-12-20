import * as E from 'fp-ts/Either'
import { pipe, tuple } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'

import * as PE from '../../../src/PrintError'
import { EmailAddress } from '../../../src/schemata/string/EmailAddress'
import {
  cat,
  combineExpected,
  getAllInstances,
  validateArbitrary,
} from '../../../test-utils'

const repeat: (s: string, times: number) => string = (s, times) => s.repeat(times)

const valid: ReadonlyArray<string> = [
  'foo@bar.com',
  'x@x.au',
  'foo@bar.com.au',
  'foo+bar@bar.com',
  'hans.m端ller@test.com',
  // 'hans@m端ller.com', // fails (but shouldn't)
  // 'test|123@m端ller.com', // fails (but shouldn't)
  'test123+ext@gmail.com',
  'some.name.midd.leNa.me.and.locality+extension@GoogleMail.com',
  '"foobar"@example.com',
  '"  foo  m端ller "@example.com',
  '"foo\\@bar"@example.com',
  `${repeat('a', 64)}@${repeat('a', 63)}.com`,
  `${repeat('a', 64)}@${repeat('a', 63)}.com`,
  `${repeat('a', 31)}@gmail.com`,
  'test@gmail.com',
  'test.1@gmail.com',
  'test@1337.com',
]

const invalid: ReadonlyArray<string> = [
  'invalidemail@',
  'invalid.com',
  '@invalid.com',
  'foo@bar.com.',
  'somename@ｇｍａｉｌ.com',
  'foo@bar.co.uk.',
  'z@co.c',
  // 'ｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌ@gmail.com', // passes (but shouldn't)
  // `${repeat('a', 64)}@${repeat('a', 251)}.com`, // passes (but shouldn't)
  // `${repeat('a', 65)}@${repeat('a', 250)}.com`, // passes (but shouldn't)
  // `${repeat('a', 64)}@${repeat('a', 64)}.com`, // passes (but shouldn't)
  // `${repeat('a', 64)}@${repeat('a', 63)}.${repeat('a', 63)}.${repeat('a', 63)}.${repeat(
  // 'a',
  // 58
  // )}.com`, //passes (but shouldn't)
  'test1@invalid.co m',
  'test2@invalid.co m',
  'test3@invalid.co m',
  'test4@invalid.co m',
  'test5@invalid.co m',
  'test6@invalid.co m',
  'test7@invalid.co m',
  'test8@invalid.co m',
  'test9@invalid.co m',
  'test10@invalid.co m',
  'test11@invalid.co m',
  'test12@invalid.co　m',
  'test13@invalid.co　m',
  'multiple..dots@stillinvalid.com',
  'test123+invalid! sub_address@gmail.com',
  'gmail...ignores...dots...@gmail.com',
  'ends.with.dot.@gmail.com',
  'multiple..dots@gmail.com',
  'wrong()[]",:;<>@@gmail.com',
  '"wrong()[]",:;<>@@gmail.com',
  'username@domain.com�',
  'username@domain.com©',
]

describe('EmailAddress', () => {
  const instances = getAllInstances(EmailAddress)

  describe('Decoder', () => {
    test.each(valid)('validates valid email %s', str => {
      const result = instances.Decoder.decode(str)
      expect(result._tag).toBe('Right')
    })

    test.each(invalid)('catches invalid email %s', str => {
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
    test.each(cat(combineExpected(valid, true), combineExpected(invalid, false)))(
      'validates valid strings, and catches bad strings',
      (str, expectedTag) => {
        const result = instances.Guard.is(str)
        expect(result).toBe(expectedTag)
      },
    )
  })

  describe('TaskDecoder', () => {
    test.each(valid)('validates valid email %s', async str => {
      const result = await instances.TaskDecoder.decode(str)()
      expect(result._tag).toBe('Right')
    })

    test.each(invalid)('catches invalid email %s', async str => {
      const result = await instances.TaskDecoder.decode(str)()
      expect(result._tag).toBe('Left')
    })
  })

  describe('Type', () => {
    test.each(valid)('validates valid email %s', str => {
      const result = instances.Type.decode(str)
      expect(result._tag).toBe('Right')
    })

    test.each(invalid)('catches invalid email %s', str => {
      const result = instances.Type.decode(str)
      expect(result._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid EmailAddress', () => {
      validateArbitrary(instances, instances.Guard.is)
    })
  })

  describe('Printer', () => {
    test.each(valid)('validates valid email %s', str => {
      const result = instances.Printer.domainToJson(str as EmailAddress)
      expect(result).toStrictEqual(E.right(str))
    })
    test.each(invalid)('catches invalid email %s', str => {
      const result = instances.Printer.domainToJson(str as EmailAddress)
      expect(result).toStrictEqual(
        E.left(new PE.NamedError('EmailAddress', new PE.InvalidValue(str))),
      )
    })
  })
})
