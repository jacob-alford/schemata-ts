import * as fc from 'fast-check'
import * as B_ from 'fp-ts/boolean'
import * as E from 'fp-ts/Either'
import { flow, pipe, tuple } from 'fp-ts/function'
import type * as IO from 'fp-ts/IO'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as RTup from 'fp-ts/ReadonlyTuple'
import * as Sg from 'fp-ts/Semigroup'
import * as Str from 'fp-ts/string'
import * as TE from 'fp-ts/TaskEither'
import { getArbitrary } from 'schemata-ts/derivations/arbitrary-schemable'
import { getEq } from 'schemata-ts/derivations/eq-schemable'
import { getGuard } from 'schemata-ts/derivations/guard-schemable'
import { getInformation } from 'schemata-ts/derivations/information-schemable'
import { getJsonSchema } from 'schemata-ts/derivations/json-schema-schemable'
import { getTranscoderPar } from 'schemata-ts/derivations/transcoder-par-schemable'
import { getTranscoder } from 'schemata-ts/derivations/transcoder-schemable'
import { getTypeString } from 'schemata-ts/derivations/type-string-schemable'
import * as JS from 'schemata-ts/internal/json-schema'
import * as TS from 'schemata-ts/internal/type-string'
import { fold } from 'schemata-ts/internal/type-string'
import { getMergeSemigroup } from 'schemata-ts/MergeSemigroup'
import { type Schema } from 'schemata-ts/Schema'
import { PrimitivesGuard } from 'schemata-ts/schemables/primitives/instances/guard'
import * as TCE from 'schemata-ts/TranscodeError'

const { BooleanAlgebra: B } = B_

const isValidNumber = PrimitivesGuard.float().is

type TestItem<I, T> = readonly [I, T]
type SchemableTest<I, T> =
  | RR.ReadonlyRecord<string, TestItem<I, T>>
  | ReadonlyArray<TestItem<I, T>>

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
    ...suites: ReadonlyArray<SchemableTest<readonly [O, O], O>>
  ) => IO.IO<void>

  /** Tests JsonSchema against a set of expected values */
  readonly assertJsonSchema: (jsonSchema: JS.JsonSchema) => IO.IO<void>

  /** Tests type string against an expected value */
  readonly assertTypeString: (typeString: string) => IO.IO<void>

  /** Ensures information is a number */
  readonly assertValidInformation: IO.IO<void>

  /**
   * Uses arbitrary to generate random domain values and tests transcoder and
   * transcoderPar's idempotence
   */
  readonly testTranscoderLaws: IO.IO<void>

  /** Uses arbitrary to test semigroup associativity */
  readonly testSemigroupLaws: IO.IO<void>

  /** Uses arbitrary to generate random domain values and tests the eq identity law */
  readonly testEqLaws: IO.IO<void>

  /** Uses arbitrary to generate random domain values and validates them using the guard */
  readonly testArbitraryGuard: IO.IO<void>
}

const replaceBigInts: (
  input: Record<string, unknown> | Array<unknown>,
) => Readonly<Record<string, unknown>> | ReadonlyArray<unknown> = _ =>
  Array.isArray(_)
    ? pipe(
        _,
        RA.mapWithIndex((i, _) => safeStringify(_, i)),
      )
    : pipe(
        _,
        RR.mapWithIndex((i, _) => safeStringify(_, i)),
      )

const safeStringify = (input: unknown, fallback: number | string): string => {
  if (
    typeof input === 'string' ||
    typeof input === 'number' ||
    typeof input === 'bigint' ||
    input === null
  ) {
    return String(input)
  }

  if (typeof input === 'object') {
    return JSON.stringify(
      replaceBigInts(input as Record<string, unknown> | Array<unknown>),
    )
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
        Array.isArray(suite)
          ? pipe(
              suite as ReadonlyArray<TestItem<I, T>>,
              RA.mapWithIndex((i, [testValue, result]) =>
                tuple(
                  `${prepend(result)} ${safeStringify(testValue, i)}`,
                  tuple(testValue, result),
                ),
              ),
            )
          : pipe(
              suite as RR.ReadonlyRecord<string, TestItem<I, T>>,
              RR.collect(Str.Ord)(tuple),
            ),
      ),
    )

export const getTestSuite = <I, O>(schema: Schema<I, O>): TestSuite<I, O> => {
  const transcoder = getTranscoder(schema)
  const transcodePar = getTranscoderPar(schema)
  const guard = getGuard(schema)
  const eq = getEq(schema)
  const information = getInformation(schema)
  const jsonSchema = getJsonSchema(schema)
  const typeString = getTypeString(schema)
  const semigroup_ = getMergeSemigroup(schema)
  const firstSemigroup = semigroup_.semigroup(Sg.first())
  const lastSemigroup = semigroup_.semigroup(Sg.last())
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
                expect(await actualPar()).toStrictEqual(expected)
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
          if (testSuite.length > 0)
            test.each(testSuite)('%s', (_, [[a, b], expected]) => {
              const actual = firstSemigroup.concat(a, b)
              expect(actual).toStrictEqual(expected)
            })
          test.each(testSuite)('%s', (_, [[a, b], expected]) => {
            const actual = lastSemigroup.concat(a, b)
            expect(actual).toStrictEqual(expected)
          })
        }
      },
    ),
    assertJsonSchema: expected => () => {
      test('matches expected', () => {
        expect(JS.stripIdentity(jsonSchema)).toStrictEqual(
          JS.stripIdentity(expected as any),
        )
      })
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
    testTranscoderLaws: () => {
      const arbitrary = getArbitrary(schema).arbitrary(fc)
      describe('idempotence', () => {
        test('sequential', () => {
          fc.assert(
            fc.property(arbitrary, output => {
              const initial = pipe(output, transcoder.encode, E.chain(transcoder.decode))
              const result = pipe(
                initial,
                E.chain(transcoder.encode),
                E.chain(transcoder.decode),
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
          const arbitrary = getArbitrary(schema).arbitrary(fc)
          fc.assert(
            fc.asyncProperty(arbitrary, async output => {
              const initial = pipe(
                output,
                transcodePar.encode,
                TE.chain(transcodePar.decode),
              )
              const result = pipe(
                initial,
                TE.chain(transcodePar.encode),
                TE.chain(transcodePar.decode),
              )
              expect(
                await pipe(
                  result,
                  TE.bindTo('result'),
                  TE.apS('initial', initial),
                  TE.map(({ result, initial }) => eq.equals(result, initial)),
                )(),
              ).toStrictEqual(E.right(true))
            }),
          )
        })
      })
    },
    testSemigroupLaws: () => {
      const arbitrary = getArbitrary(schema).arbitrary(fc)
      describe('associativity', () => {
        test('firstSemigroup', () => {
          fc.assert(
            fc.property(arbitrary, arbitrary, arbitrary, (a, b, c) => {
              const left = firstSemigroup.concat(firstSemigroup.concat(a, b), c)
              const right = firstSemigroup.concat(a, firstSemigroup.concat(b, c))
              expect(eq.equals(left, right)).toBe(true)
            }),
          )
        })
        test('lastSemigroup', () => {
          fc.assert(
            fc.property(arbitrary, arbitrary, arbitrary, (a, b, c) => {
              const left = lastSemigroup.concat(lastSemigroup.concat(a, b), c)
              const right = lastSemigroup.concat(a, lastSemigroup.concat(b, c))
              expect(eq.equals(left, right)).toBe(true)
            }),
          )
        })
      })
    },
    testEqLaws: () => {
      const arbitrary = getArbitrary(schema).arbitrary(fc)
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
      const arbitrary = getArbitrary(schema).arbitrary(fc)
      test('arbitraries', () => {
        fc.assert(
          fc.property(arbitrary, output => {
            expect(guard.is(output)).toStrictEqual(true)
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
  readonly jsonSchema: GetFirstArg<TestSuite<I, T>['assertJsonSchema']>
  readonly typeString: GetFirstArg<TestSuite<I, T>['assertTypeString']>
  readonly additionalTests?: (testSuite: TestSuite<I, T>) => IO.IO<void>
}

export const deriveGuardTests = <I, T>(
  encoderTests: StandardTestInputs<I, T>['encoderTests'],
): NonNullable<Exclude<StandardTestInputs<I, T>['guardTests'], 'derive'>> =>
  Array.isArray(encoderTests)
    ? pipe(
        encoderTests as ReadonlyArray<TestItem<T, E.Either<TCE.TranscodeErrors, I>>>,
        RA.map(RTup.mapSnd(E.isRight)),
      )
    : pipe(
        encoderTests as Exclude<
          SchemableTest<T, E.Either<TCE.TranscodeErrors, I>>,
          { length: number }
        >,
        RR.map(RTup.mapSnd(E.isRight)),
      )

export const deriveEqTests = <I, T>(
  encoderTests: StandardTestInputs<I, T>['encoderTests'],
): NonNullable<Exclude<StandardTestInputs<I, T>['eqTests'], 'derive'>> =>
  Array.isArray(encoderTests)
    ? pipe(
        encoderTests as ReadonlyArray<TestItem<T, E.Either<TCE.TranscodeErrors, I>>>,
        RA.map(([_]) => tuple(tuple(_, _), true)),
      )
    : pipe(
        encoderTests as Exclude<
          SchemableTest<T, E.Either<TCE.TranscodeErrors, I>>,
          { length: number }
        >,
        RR.map(([_]) => tuple(tuple(_, _), true)),
      )

export type MakeTestValues<I, O> = {
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
}

export type StandardTestSuiteOptions = {
  readonly makeDecodeError?: (value: unknown) => TCE.TranscodeErrors
  readonly skipArbitraryChecks?: boolean
  readonly skipAll?: boolean
}

type StandardTestSuiteFn = <I, O>(
  schema: Schema<I, O>,
  makeTestValues: (helpers: MakeTestValues<I, O>) => StandardTestInputs<I, O>,
  options?: StandardTestSuiteOptions,
) => IO.IO<void>

type RunStandardTestSuite = StandardTestSuiteFn & {
  readonly skip: StandardTestSuiteFn
}

const runStandardTestSuite_: StandardTestSuiteFn =
  (schema, makeTestValues, options = {}) =>
  () => {
    const name = getTypeString(schema)
    const {
      makeDecodeError = (value: unknown) =>
        new TCE.TranscodeErrors([new TCE.TypeMismatch(fold(name), value)]),
      skipArbitraryChecks = false,
      skipAll = false,
    } = options
    const _ = getTestSuite(schema)
    const {
      decoderTests = [],
      encoderTests = [],
      guardTests = [],
      eqTests = [],
      additionalTests,
      jsonSchema,
      typeString,
    } = makeTestValues({
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
    })

    ;(skipAll ? describe.skip : describe)(`${fold(name)} Standard Test Suite`, () => {
      describe('decoder', _.testDecoder(decoderTests))
      describe('encoder', _.testEncoder(encoderTests))
      describe('guard', _.testGuard(guardTests, deriveGuardTests(encoderTests)))
      describe('eq', _.testEq(eqTests, deriveEqTests(encoderTests)))
      describe('jsonSchema', _.assertJsonSchema(jsonSchema))
      describe('typeString', _.assertTypeString(typeString))
      describe('information', _.assertValidInformation)
      if (!skipArbitraryChecks) {
        describe('transcoder laws', _.testTranscoderLaws)
        describe('semigroup laws', _.testSemigroupLaws)
        describe('eq laws', _.testEqLaws)
        describe('arbitrary <-> guard', _.testArbitraryGuard)
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
