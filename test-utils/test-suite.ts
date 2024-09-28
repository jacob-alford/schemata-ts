import * as fc from 'fast-check'
import * as B_ from 'fp-ts/boolean'
import * as Cons from 'fp-ts/Console'
import * as E from 'fp-ts/Either'
import { constVoid, flow, pipe, tuple, unsafeCoerce } from 'fp-ts/function'
import type * as IO from 'fp-ts/IO'
import type * as J from 'fp-ts/Json'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as RTup from 'fp-ts/ReadonlyTuple'
import * as Sg from 'fp-ts/Semigroup'
import * as Str from 'fp-ts/string'
import * as TE from 'fp-ts/TaskEither'
import { Draft07 } from 'json-schema-library'
import { deriveArbitrary } from 'schemata-ts/Arbitrary'
import { deriveInformation } from 'schemata-ts/derivations/information-schemable'
import { deriveEq } from 'schemata-ts/Eq'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import * as TS from 'schemata-ts/internal/type-string'
import { fold } from 'schemata-ts/internal/type-string'
import { deriveJsonSchema } from 'schemata-ts/JsonSchema'
import * as JS from 'schemata-ts/JsonSchema'
import { type MergeStrategy, deriveMergeSemigroup } from 'schemata-ts/MergeSemigroup'
import { type Schema } from 'schemata-ts/Schema'
import { PrimitivesGuard } from 'schemata-ts/schemables/primitives/instances/guard'
import * as TCE from 'schemata-ts/TranscodeError'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { deriveTranscoderPar } from 'schemata-ts/TranscoderPar'
import { deriveTypeString } from 'schemata-ts/TypeString'

const { BooleanAlgebra: B } = B_

const isValidNumber = PrimitivesGuard.float().is

type TestItem<I, T> = readonly [I, T]
type SchemableTest<I, T> = ReadonlyArray<TestItem<I, T>>

export interface TestSuite<I, O> {
  /** Tests transcoder and transcoderPar > decoder against a set of expected values */
  readonly testDecoder: (
    ...suites: ReadonlyArray<SchemableTest<unknown, E.Either<TCE.TranscodeErrors, O>>>
  ) => IO.IO<void>

  /** Tests transcoder and transcoderPar > encoder against a set of expected values */
  readonly testEncoder: (
    ...suites: ReadonlyArray<SchemableTest<O, E.Either<TCE.TranscodeErrors, I>>>
  ) => IO.IO<void>

  /** Tests guard against a set of expected values */
  readonly testGuard: (
    ...suites: ReadonlyArray<SchemableTest<unknown, boolean>>
  ) => IO.IO<void>

  /** Tests Eq against a set of expected values */
  readonly testEq: (
    ...suites: ReadonlyArray<SchemableTest<readonly [O, O], boolean>>
  ) => IO.IO<void>

  /** Tests MergeSemigroup against a set of expected combinations */
  readonly testSemigroup: (
    ...suites: ReadonlyArray<
      SchemableTest<readonly ['first' | 'last' | MergeStrategy | undefined, O, O], O>
    >
  ) => IO.IO<void>

  /** Tests JsonSchema against a set of expected values */
  readonly assertJsonSchema: (
    jsonSchema2019: JS.JsonSchema,
    jsonSchema2007?: JS.JsonSchema,
    jsonSchema2020?: JS.JsonSchema,
  ) => IO.IO<void>

  /** Tests type string against an expected value */
  readonly assertTypeString: (typeString: string) => IO.IO<void>

  /** Ensures information is a number */
  readonly assertValidInformation: IO.IO<void>

  /** Ensures generated json-schema are compliant */
  readonly validateJsonSchemas: IO.IO<void>

  /**
   * Uses arbitrary to generate random domain values and tests transcoder and
   * transcoderPar's idempotence
   */
  readonly testTranscoderLaws: IO.IO<void>

  /** Uses arbitrary to test semigroup associativity */
  readonly testSemigroupLaws: (params: {
    skipFirst?: boolean
    skipLast?: boolean
    skipMany?: boolean
  }) => IO.IO<void>

  /** Uses arbitrary to generate random domain values and tests the eq identity law */
  readonly testEqLaws: IO.IO<void>

  /** Uses arbitrary to generate random domain values and validates them using the guard */
  readonly testArbitraryGuard: IO.IO<void>

  /**
   * Uses arbitrary to generate domain values, encode them to input types, and then use
   * `inputGuard` to validate them
   */
  readonly testArbitraryInputGuard: IO.IO<void>
}

const mapArrayStruct: (
  input: Record<string, unknown> | Array<unknown>,
) => Readonly<Record<string, unknown>> | ReadonlyArray<unknown> = _ =>
  Array.isArray(_)
    ? pipe(
        _,
        RA.mapWithIndex((i, _) => safeJsonify(_, i)),
      )
    : pipe(
        _,
        RR.mapWithIndex((i, _) => safeJsonify(_, i)),
      )

const safeJsonify = (input: unknown, fallback: number | string): J.Json => {
  if (typeof input === 'string' || typeof input === 'number' || input === null) {
    return input
  }

  if (typeof input === 'bigint') {
    return String(input)
  }

  try {
    JSON.stringify(input)
  } catch (_) {
    return String(fallback)
  }

  if (typeof input === 'object') {
    return mapArrayStruct(input as Record<string, unknown> | Array<unknown>) as any
  }

  return String(fallback)
}

const foldTestSuites =
  <T>(prepend: (result: T) => string = () => '') =>
  <I>(
    ...suites: ReadonlyArray<SchemableTest<I, T>>
  ): ReadonlyArray<ReadonlyArray<readonly [name: string, test: TestItem<I, T>]>> =>
    pipe(
      suites,
      RA.map(suite =>
        pipe(
          suite,
          RA.mapWithIndex((i, [testValue, result]) =>
            tuple(
              `${prepend(result)} ${JSON.stringify(safeJsonify(testValue, i))}`,
              tuple(testValue, result),
            ),
          ),
        ),
      ),
    )

export const getTestSuite = <I, O>(schema: Schema<I, O>): TestSuite<I, O> => {
  const transcoder = deriveTranscoder(schema)
  const transcodePar = deriveTranscoderPar(schema)
  const guard = deriveGuard(schema)
  const eq = deriveEq(schema)
  const information = deriveInformation(schema)
  const jsonSchema = deriveJsonSchema(schema)
  const jsonSchema2007 = deriveJsonSchema(schema, 'Draft-07')
  const jsonSchema2020 = deriveJsonSchema(schema, '2020-12')
  const typeString = deriveTypeString(schema)
  const semigroup_ = deriveMergeSemigroup(schema)
  const firstSemigroup = semigroup_.semigroup('first')
  const lastSemigroup = semigroup_.semigroup()
  const manySemigroup = semigroup_.semigroup({
    string: Str.Semigroup,
    number: Sg.last(),
    boolean: B_.SemigroupAll,
    unknown: Sg.last(),
    fallback: 'first',
  })
  return {
    testDecoder: flow(
      foldTestSuites(
        E.fold(
          () => 'fails',
          () => 'passes',
        ),
      ),
      testSuites => () => {
        for (const testSuite of testSuites) {
          if (testSuite.length > 0)
            describe.each(testSuite)('%s', (_, [input, expected]) => {
              const actual = transcoder.decode(input)
              const actualPar = transcodePar.decode(input)
              test(`sequential`, () => {
                expect(actual).toStrictEqual(expected)
              })
              test(`parallel`, async () => {
                expect(await actualPar()).toEqual(expected)
              })
            })
        }
      },
    ),
    testEncoder: flow(
      foldTestSuites(
        E.fold(
          () => 'fails',
          () => 'encodes',
        ),
      ),
      testSuites => () => {
        for (const testSuite of testSuites) {
          if (testSuite.length > 0)
            describe.each(testSuite)('%s', (_, [input, expected]) => {
              const actual = transcoder.encode(input)
              const actualPar = transcodePar.encode(input)
              test(`sequential`, () => {
                expect(actual).toStrictEqual(expected)
              })
              test(`parallel`, async () => {
                expect(await actualPar()).toStrictEqual(expected)
              })
            })
        }
      },
    ),
    testGuard: flow(
      foldTestSuites(b => (b ? 'validates' : 'invalidates')),
      testSuites => () => {
        for (const testSuite of testSuites) {
          if (testSuite.length > 0)
            describe.each(testSuite)('%s', (name, [input, expected]) => {
              const actual = guard.is(input)
              test(name, () => {
                expect(actual).toStrictEqual(expected)
              })
            })
        }
      },
    ),
    testEq: flow(
      foldTestSuites(b => (b ? 'equates' : 'disequates')),
      testSuites => () => {
        for (const testSuite of testSuites) {
          if (testSuite.length > 0)
            test.each(testSuite)('%s', (_, [[a, b], expected]) => {
              const actual = eq.equals(a, b)
              expect(actual).toStrictEqual(expected)
            })
        }
      },
    ),
    testSemigroup: flow(
      foldTestSuites(() => 'combines'),
      testSuites => () => {
        for (const testSuite of testSuites) {
          if (testSuite.length > 0) {
            test.each(testSuite)('%s', (_, [[strategy, a, b], expected]) => {
              const actual =
                strategy === 'first'
                  ? firstSemigroup.concat(a, b)
                  : strategy === 'last'
                  ? lastSemigroup.concat(a, b)
                  : deriveMergeSemigroup(schema).semigroup(strategy).concat(a, b)
              expect(actual).toStrictEqual(expected)
            })
          }
        }
      },
    ),
    assertJsonSchema: (expected, expected2007, expected2020) => () => {
      test('2019-09 matches expected', () => {
        expect(jsonSchema).toStrictEqual(JS.stripIdentity(expected))
      })
      if (expected2007 !== undefined) {
        test('Draft-07 matches expected', () => {
          expect(jsonSchema2007).toStrictEqual(JS.stripIdentity(expected2007))
        })
      }
      if (expected2020 !== undefined) {
        test('2020-12 matches expected', () => {
          expect(jsonSchema2020).toStrictEqual(JS.stripIdentity(expected2020))
        })
      }
    },
    assertTypeString: expected => () => {
      test('matches expected', () => {
        expect(TS.fold(typeString)).toStrictEqual(expected)
      })
    },
    assertValidInformation: () => {
      it('constructs valid information', () => {
        expect(isValidNumber(information)).toBe(true)
      })
    },
    validateJsonSchemas: () => {
      const arbitrary = deriveArbitrary(schema).arbitrary(fc)
      const draft2007 = new Draft07(jsonSchema2007)
      test('Draft-2007', () => {
        fc.assert(
          fc.property(
            arbitrary.filter(u => u !== undefined),
            input => {
              const encoded = pipe(
                transcoder.encode(input),
                E.map(_ => draft2007.validate(_)),
              )
              expect(encoded).toStrictEqual(E.right([]))
            },
          ),
        )
      })
    },
    testTranscoderLaws: () => {
      const arbitrary = deriveArbitrary(schema).arbitrary(fc)
      describe('idempotence', () => {
        test('sequential', () => {
          fc.assert(
            fc.property(arbitrary, output => {
              const initial = pipe(output, transcoder.encode, E.chainW(transcoder.decode))
              const result = pipe(
                initial,
                E.chainW(transcoder.encode),
                E.chainW(transcoder.decode),
              )
              expect(
                pipe(
                  result,
                  E.bindTo('result'),
                  E.apS('initial', initial),
                  E.map(({ result, initial }) => eq.equals(result, initial)),
                ),
              ).toStrictEqual(E.right(true))
            }),
          )
        })
        test('parallel', async () => {
          const arbitrary = deriveArbitrary(schema).arbitrary(fc)
          await fc.assert(
            fc.asyncProperty(arbitrary, async output => {
              const initial = pipe(
                output,
                transcodePar.encode,
                TE.chainW(transcodePar.decode),
              )
              const result = pipe(
                initial,
                TE.chainW(transcodePar.encode),
                TE.chainW(transcodePar.decode),
              )
              expect(
                await pipe(
                  result,
                  TE.bindTo('result'),
                  TE.apS('initial', initial),
                  TE.bind('equals', ({ result, initial }) =>
                    TE.right(eq.equals(result, initial)),
                  ),
                  TE.chainFirstIOK(({ result, initial, equals }) =>
                    !equals ? Cons.log({ result, initial, output, equals }) : constVoid,
                  ),
                  TE.map(({ equals }) => equals),
                )(),
              ).toStrictEqual(E.right(true))
            }),
          )
        })
      })
    },
    testSemigroupLaws:
      (params = {}) =>
      () => {
        const { skipMany = false, skipFirst = false, skipLast = false } = params
        const arbitrary = deriveArbitrary(schema).arbitrary(fc)
        describe('associativity', () => {
          // eslint-disable-next-line @typescript-eslint/no-extra-semi
          ;(skipFirst ? test.skip : test)('firstSemigroup', () => {
            fc.assert(
              fc.property(arbitrary, arbitrary, arbitrary, (a, b, c) => {
                const left = firstSemigroup.concat(firstSemigroup.concat(a, b), c)
                const right = firstSemigroup.concat(a, firstSemigroup.concat(b, c))
                expect(eq.equals(left, right)).toBe(true)
              }),
            )
          })
          ;(skipLast ? test.skip : test)('lastSemigroup', () => {
            fc.assert(
              fc.property(arbitrary, arbitrary, arbitrary, (a, b, c) => {
                const left = lastSemigroup.concat(lastSemigroup.concat(a, b), c)
                const right = lastSemigroup.concat(a, lastSemigroup.concat(b, c))
                expect(eq.equals(left, right)).toBe(true)
              }),
            )
          })
          ;(skipMany ? test.skip : test)('manySemigroup', () => {
            fc.assert(
              fc.property(arbitrary, arbitrary, arbitrary, (a, b, c) => {
                const left = manySemigroup.concat(manySemigroup.concat(a, b), c)
                const right = manySemigroup.concat(a, manySemigroup.concat(b, c))
                expect(eq.equals(left, right)).toBe(true)
              }),
            )
          })
        })
      },
    testEqLaws: () => {
      const arbitrary = deriveArbitrary(schema).arbitrary(fc)
      test('reflexivity', () => {
        fc.assert(
          fc.property(arbitrary, output => {
            expect(eq.equals(output, output)).toStrictEqual(true)
          }),
        )
      })
      test('symmetry', () => {
        fc.assert(
          fc.property(arbitrary, arbitrary, (a, b) => {
            expect(B.implies(eq.equals(a, b), eq.equals(b, a))).toStrictEqual(true)
          }),
        )
      })
      test('transitivity', () => {
        fc.assert(
          fc.property(arbitrary, arbitrary, arbitrary, (a, b, c) => {
            expect(
              B.implies(eq.equals(a, b) && eq.equals(b, c), eq.equals(a, c)),
            ).toStrictEqual(true)
          }),
        )
      })
    },
    testArbitraryGuard: () => {
      const arbitrary = deriveArbitrary(schema).arbitrary(fc)
      test('arbitrary <~> output', () => {
        fc.assert(
          fc.property(arbitrary, output => {
            expect(guard.is(output)).toStrictEqual(true)
          }),
        )
      })
    },
    testArbitraryInputGuard: () => {
      const arbitrary = deriveArbitrary(schema).arbitrary(fc)
      const inputGuard = deriveInputGuard(schema)
      test('arbitrary <~> input', () => {
        fc.assert(
          fc.property(arbitrary, input => {
            const result = pipe(input, transcoder.encode, E.map(inputGuard.is), E.toUnion)
            expect(result).toStrictEqual(true)
          }),
        )
      })
    },
  }
}

type GetFirstArg<T extends (...args: ReadonlyArray<any>) => any> = T extends (
  arg: infer U,
) => unknown
  ? U
  : never

type StandardTestInputs<I, T> = {
  readonly decoderTests?: GetFirstArg<TestSuite<I, T>['testDecoder']>
  readonly encoderTests?: GetFirstArg<TestSuite<I, T>['testEncoder']>
  readonly guardTests?: GetFirstArg<TestSuite<I, T>['testGuard']>
  readonly eqTests?: GetFirstArg<TestSuite<I, T>['testEq']>
  readonly jsonSchema?: GetFirstArg<TestSuite<I, T>['assertJsonSchema']>
  readonly jsonSchema2007?: GetFirstArg<TestSuite<I, T>['assertJsonSchema']>
  readonly jsonSchema2020?: GetFirstArg<TestSuite<I, T>['assertJsonSchema']>
  readonly typeString?: GetFirstArg<TestSuite<I, T>['assertTypeString']>
  readonly semigroupTests?: GetFirstArg<TestSuite<I, T>['testSemigroup']>
  readonly additionalTests?: (testSuite: TestSuite<I, T>) => IO.IO<void>
}

export const deriveGuardTests = <I, T>(
  encoderTests: StandardTestInputs<I, T>['encoderTests'],
): NonNullable<Exclude<StandardTestInputs<I, T>['guardTests'], 'derive'>> =>
  pipe(
    encoderTests as ReadonlyArray<TestItem<T, E.Either<TCE.TranscodeErrors, I>>>,
    RA.map(RTup.mapSnd(E.isRight)),
  )

export const deriveEqTests = <I, T>(
  encoderTests: StandardTestInputs<I, T>['encoderTests'],
): NonNullable<Exclude<StandardTestInputs<I, T>['eqTests'], 'derive'>> =>
  pipe(
    encoderTests as ReadonlyArray<TestItem<T, E.Either<TCE.TranscodeErrors, I>>>,
    RA.filterMap(([_, e]) =>
      pipe(
        O.fromEither(e),
        O.map(() => tuple(tuple(_, _), true)),
      ),
    ),
  )

export type MakeTestValues<I, O> = {
  readonly c: <A>(_: unknown) => A
  readonly decoder: {
    readonly pass: (
      preDecode: unknown,
      postDecode?: unknown,
    ) => readonly [unknown, E.Either<TCE.TranscodeErrors, O>]
    readonly fail: (
      preDecode: unknown,
      getError?: (input: unknown) => TCE.TranscodeErrors,
    ) => readonly [unknown, E.Either<TCE.TranscodeErrors, O>]
  }
  readonly encoder: {
    readonly pass: (
      preEncode: O,
      postEncode?: I,
    ) => readonly [O, E.Either<TCE.TranscodeErrors, I>]
    readonly fail: (
      preEncode: O,
      getError?: (input: O) => TCE.TranscodeErrors,
    ) => readonly [O, E.Either<TCE.TranscodeErrors, I>]
  }
  readonly eq: {
    readonly equate: (a: O, b: O) => readonly [readonly [O, O], boolean]
    readonly disequate: (a: O, b: O) => readonly [readonly [O, O], boolean]
  }
  readonly semigroup: {
    readonly combinesFirst: (
      a: O,
      b: O,
      result: O,
    ) => readonly [readonly ['first' | { readonly fallback: 'first' }, O, O], O]
    readonly combinesLast: (
      a: O,
      b: O,
      result: O,
    ) => readonly [readonly ['last' | { readonly fallback: 'last' }, O, O], O]
    readonly combinesWith: (
      strategy?: MergeStrategy,
    ) => (
      a: O,
      b: O,
      result: O,
    ) => readonly [readonly [MergeStrategy | undefined, O, O], O]
  }
  readonly guard: {
    is: (input: unknown) => readonly [unknown, true]
    isNot: (input: unknown) => readonly [unknown, false]
  }
}

export type StandardTestSuiteOptions = {
  readonly makeDecodeError?: (value: unknown) => TCE.TranscodeErrors
  readonly skipArbitraryChecks?: boolean
  readonly skipAll?: boolean
  readonly skip?: ReadonlyArray<
    | 'semigroup-many-associativity'
    | 'semigroup-first-associativity'
    | 'semigroup-last-associativity'
    | 'transcoder-idempotence'
    | 'json-schema-validation'
    | 'arbitrary-guard'
    | 'arbitrary-input-guard'
    | 'derived-guard-tests'
  >
}

type StandardTestSuiteFn = <I, O>(
  schema: Schema<I, O>,
  makeTestValues?: (helpers: MakeTestValues<I, O>) => StandardTestInputs<I, O>,
  options?: StandardTestSuiteOptions,
) => IO.IO<void>

type RunStandardTestSuite = StandardTestSuiteFn & {
  readonly skip: StandardTestSuiteFn
}

const runStandardTestSuite_: StandardTestSuiteFn =
  (schema, makeTestValues = () => ({}), options = {}) =>
  () => {
    const name = deriveTypeString(schema)
    const {
      makeDecodeError = (value: unknown) =>
        new TCE.TranscodeErrors([new TCE.TypeMismatch(fold(name), value)]),
      skipArbitraryChecks = false,
      skipAll = false,
      skip: skip_ = [],
    } = options
    const skip = new Set(skip_)
    const _ = getTestSuite(schema)
    const {
      decoderTests = [],
      encoderTests = [],
      guardTests = [],
      eqTests = [],
      semigroupTests = [],
      additionalTests,
      jsonSchema,
      jsonSchema2007,
      jsonSchema2020,
      typeString,
    } = makeTestValues({
      c: unsafeCoerce,
      decoder: {
        pass: (preDecode, postDecode) =>
          tuple(preDecode, E.right(postDecode ?? (preDecode as any))),
        fail: (preDecode, getError = () => makeDecodeError(preDecode)) =>
          tuple(preDecode, E.left(getError(preDecode))),
      },
      encoder: {
        pass: (preEncode, postEncode) =>
          tuple(preEncode, E.right(postEncode ?? (preEncode as any))),
        fail: (preEncode, getError = () => makeDecodeError(preEncode)) =>
          tuple(preEncode, E.left(getError(preEncode))),
      },
      eq: {
        equate: (a, b) => tuple(tuple(a, b), true),
        disequate: (a, b) => tuple(tuple(a, b), false),
      },
      semigroup: {
        combinesFirst: (a, b, result) =>
          tuple(tuple({ fallback: 'first' }, a, b), result),
        combinesLast: (a, b, result) => tuple(tuple({ fallback: 'last' }, a, b), result),
        combinesWith: strategy => (a, b, result) => tuple(tuple(strategy, a, b), result),
      },
      guard: {
        is: input => tuple(input, true),
        isNot: input => tuple(input, false),
      },
    })

    ;(skipAll ? describe.skip : describe)(`${fold(name)} Standard Test Suite`, () => {
      describe('decoder', _.testDecoder(decoderTests))
      describe('encoder', _.testEncoder(encoderTests))
      skip.has('derived-guard-tests')
        ? describe('guard', _.testGuard(guardTests))
        : describe('guard', _.testGuard(guardTests, deriveGuardTests(encoderTests)))
      describe('eq', _.testEq(eqTests, deriveEqTests(encoderTests)))
      if (jsonSchema !== undefined) {
        describe(
          'jsonSchema',
          _.assertJsonSchema(jsonSchema, jsonSchema2007, jsonSchema2020),
        )
      }
      if (typeString !== undefined) {
        describe('typeString', _.assertTypeString(typeString))
      }
      describe('information', _.assertValidInformation)
      describe('semigroup', _.testSemigroup(semigroupTests))
      if (!skipArbitraryChecks) {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(skip.has('json-schema-validation') ? describe.skip : describe)(
          'json-schema validation',
          _.validateJsonSchemas,
        )
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(skip.has('transcoder-idempotence') ? describe.skip : describe)(
          'transcoder laws',
          _.testTranscoderLaws,
        )
        describe(
          'semigroup laws',
          _.testSemigroupLaws({
            skipFirst: skip.has('semigroup-first-associativity'),
            skipLast: skip.has('semigroup-last-associativity'),
            skipMany: skip.has('semigroup-many-associativity'),
          }),
        )
        describe('eq laws', _.testEqLaws)
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(skip.has('arbitrary-guard') ? describe.skip : describe)(
          'arbitrary <-> guard',
          _.testArbitraryGuard,
        )
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(skip.has('arbitrary-input-guard') ? describe.skip : describe)(
          'arbitrary <-> inputGuard',
          _.testArbitraryInputGuard,
        )
      }
      if (additionalTests) {
        describe('additional tests', additionalTests(_))
      }
    })
  }

const skip: RunStandardTestSuite['skip'] = (schema, makeTestValues, options = {}) =>
  runStandardTestSuite_(schema, makeTestValues, { ...options, skipAll: true })

const makeStandardTestSuite: (fn: StandardTestSuiteFn) => RunStandardTestSuite = fn =>
  Object.assign(fn, {
    skip,
  })

export const runStandardTestSuite: RunStandardTestSuite =
  makeStandardTestSuite(runStandardTestSuite_)
