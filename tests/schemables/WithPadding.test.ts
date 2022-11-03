import * as E from 'fp-ts/Either'
import * as D from '../../src/internal/DecoderBase'
import * as G from '../../src/internal/GuardBase'
import * as TD from '../../src/internal/TaskDecoderBase'
import * as Enc from '../../src/internal/EncoderBase'
import * as Eq from '../../src/internal/EqBase'
import * as t from '../../src/internal/TypeBase'
import * as Arb from '../../src/internal/ArbitraryBase'
import { pipe } from 'fp-ts/function'
import * as WithPadding from '../../src/schemables/WithPadding'
import { validateArbitrary } from '../../test-utils'
import { interpreter } from '../../src/SchemaExt'
import { Schemable as GuardSchemableExt } from '../../src/Guard'
import * as SC from '../../src/internal/SchemaBase'
import { Arbitrary as arbPattern } from '../../src/schemables/WithPattern'
import * as PB from '../../src/PatternBuilder'

const exact: WithPadding.PaddingLength = { by: 'ExactLength', exactLength: 4 }
const max: WithPadding.PaddingLength = { by: 'MaxLength', maxLength: 4 }

const tests: ReadonlyArray<
  [
    WithPadding.PaddingLength,
    {
      validL: ReadonlyArray<string>
      invalidL: ReadonlyArray<string>
      validR: ReadonlyArray<string>
      invalidR: ReadonlyArray<string>
    }
  ]
> = [
  [
    exact,
    {
      validR: ['a===', 'ab==', 'abc=', 'abcd'],
      invalidR: ['a', 'ab', 'abc', 'abcd='],
      validL: ['===a', '==ab', '=abc', 'abcd'],
      invalidL: ['a', 'ab', 'abc', 'abcd='],
    },
  ],
  [
    max,
    {
      validR: ['a===', 'ab==', 'abc=', 'abcd', 'a', 'ab', 'abc'],
      invalidR: ['abcd='],
      validL: ['===a', '==ab', '=abc', 'abcd', 'a', 'ab', 'abc'],
      invalidL: ['abcd='],
    },
  ],
]

describe('WithPadding', () => {
  for (const [paddingParams, { validL, validR, invalidL, invalidR }] of tests) {
    describe(paddingParams.by, () => {
      const char = '='

      const decoderL = WithPadding.Decoder.padLeft(paddingParams, char)(D.string)
      const decoderR = WithPadding.Decoder.padRight(paddingParams, char)(D.string)

      const eqL = WithPadding.Eq.padLeft(paddingParams, char)(Eq.string)
      const eqR = WithPadding.Eq.padRight(paddingParams, char)(Eq.string)

      const encoderL = WithPadding.Encoder.padLeft(
        paddingParams,
        char
      )(Enc.Schemable.string)
      const encoderR = WithPadding.Encoder.padRight(
        paddingParams,
        char
      )(Enc.Schemable.string)

      const guardL = WithPadding.Guard.padLeft(paddingParams, char)(G.string)
      const guardR = WithPadding.Guard.padRight(paddingParams, char)(G.string)

      const taskDecoderL = WithPadding.TaskDecoder.padLeft(paddingParams, char)(TD.string)
      const taskDecoderR = WithPadding.TaskDecoder.padRight(
        paddingParams,
        char
      )(TD.string)

      const typeL = WithPadding.Type.padLeft(paddingParams, char)(t.string)
      const typeR = WithPadding.Type.padRight(paddingParams, char)(t.string)

      const arbitraryL = WithPadding.Arbitrary.padLeft(paddingParams, char)(Arb.string)
      const arbitraryR = WithPadding.Arbitrary.padRight(paddingParams, char)(Arb.string)

      describe(`Decoder`, () => {
        test.each(validL)('validates valid strings, %s', str => {
          expect(decoderL.decode(str)).toStrictEqual(E.right(str))
        })
        test.each(invalidL)('invalidates invalid strings, %s', str => {
          expect(decoderL.decode(str)._tag).toBe('Left')
        })
        test.each(validR)('validates valid strings, %s', str => {
          expect(decoderR.decode(str)).toStrictEqual(E.right(str))
        })
        test.each(invalidR)('invalidates invalid strings, %s', str => {
          expect(decoderR.decode(str)._tag).toBe('Left')
        })
      })

      describe(`Encoder`, () => {
        test.each(validL)(
          'encoding a decoded value yields original value, %s',
          original => {
            const roundtrip = pipe(
              original,
              decoderL.decode,
              E.map(encoderL.encode),
              E.getOrElseW(() => 'unexpected')
            )
            expect(original).toEqual(roundtrip)
          }
        )
        test.each(validR)(
          'encoding a decoded value yields original value, %s',
          original => {
            const roundtrip = pipe(
              original,
              decoderR.decode,
              E.map(encoderR.encode),
              E.getOrElseW(() => 'unexpected')
            )
            expect(original).toEqual(roundtrip)
          }
        )
      })

      describe(`Eq`, () => {
        test.each(validL)('determines two strings are equal, %s', str1 => {
          if (!guardL.is(str1)) {
            throw new Error('Unexpected result')
          }
          expect(eqL.equals(str1, str1)).toBe(true)
        })
        test.each(validR)('determines two strings are equal, %s', str1 => {
          if (!guardR.is(str1)) {
            throw new Error('Unexpected result')
          }
          expect(eqR.equals(str1, str1)).toBe(true)
        })
      })

      describe(`Guard`, () => {
        test.each(validL)('validates validly padded strings, %s', str => {
          const result = guardL.is(str)
          expect(result).toBe(true)
        })
        test.each(validR)('validates validly padded strings, %s', str => {
          const result = guardR.is(str)
          expect(result).toBe(true)
        })
        test.each(invalidL)('invalidates invalidly padded strings, %s', str => {
          const result = guardL.is(str)
          expect(result).toBe(false)
        })
        test.each(invalidR)('invalidates invalidly padded strings, %s', str => {
          const result = guardR.is(str)
          expect(result).toBe(false)
        })
      })

      describe(`TaskDecoder`, () => {
        test.each(validL)('validates valid strings, %s', async str => {
          const result = await taskDecoderL.decode(str)()
          expect(result).toStrictEqual(E.right(str))
        })
        test.each(validR)('validates valid strings, %s', async str => {
          const result = await taskDecoderR.decode(str)()
          expect(result).toStrictEqual(E.right(str))
        })
        test.each(invalidL)('invalidates invalid strings, %s', async str => {
          const result = await taskDecoderL.decode(str)()
          expect(result._tag).toBe('Left')
        })
        test.each(invalidR)('invalidates invalid strings, %s', async str => {
          const result = await taskDecoderR.decode(str)()
          expect(result._tag).toBe('Left')
        })
      })

      describe(`Type`, () => {
        test.each(validL)('validates valid strings, %s', str => {
          expect(typeL.decode(str)).toStrictEqual(E.right(str))
        })
        test.each(invalidL)('invalidates invalid strings, %s', str => {
          expect(typeL.decode(str)._tag).toBe('Left')
        })
        test.each(validR)('validates valid strings, %s', str => {
          expect(typeR.decode(str)).toStrictEqual(E.right(str))
        })
        test.each(invalidR)('invalidates invalid strings, %s', str => {
          expect(typeR.decode(str)._tag).toBe('Left')
        })
      })

      describe(`Arbitrary`, () => {
        it('generates validly left padded strings', () => {
          validateArbitrary({ Arbitrary: arbitraryL }, guardL.is)
        })
        it('generates validly right padded strings', () => {
          validateArbitrary({ Arbitrary: arbitraryR }, guardR.is)
        })
      })

      describe(`Schema`, () => {
        const L = WithPadding.Schema.padLeft(paddingParams, char)(SC.String)
        const R = WithPadding.Schema.padRight(paddingParams, char)(SC.String)
        const guardL = interpreter(GuardSchemableExt)(L)
        const guardR = interpreter(GuardSchemableExt)(R)
        test.each(validL)('validates validly padded strings, %s', str => {
          const result = guardL.is(str)
          expect(result).toBe(true)
        })
        test.each(validR)('validates validly padded strings, %s', str => {
          const result = guardR.is(str)
          expect(result).toBe(true)
        })
        test.each(invalidL)('invalidates invalidly padded strings, %s', str => {
          const result = guardL.is(str)
          expect(result).toBe(false)
        })
        test.each(invalidR)('invalidates invalidly padded strings, %s', str => {
          const result = guardR.is(str)
          expect(result).toBe(false)
        })
      })
    })
  }

  /** This is necessary to test stripping left padding of arbitraries */
  test('arbitrarily stripping padding on the left', () => {
    validateArbitrary(
      {
        Arbitrary: WithPadding.Arbitrary.padLeft(
          { by: 'ExactLength', exactLength: 4 },
          '='
        )(
          arbPattern.pattern(
            pipe(
              PB.characterClass(false, '='),
              PB.between(0, 2),
              PB.subgroup,
              PB.then(
                pipe(PB.alnum, PB.and(PB.characterClass(false, '+', '/')), PB.anyNumber())
              )
            ),
            'Reverse base64'
          )
        ),
      },
      (s): s is string => typeof s === 'string' && s.length === 4
    )
  })
})
