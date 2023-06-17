import * as fc from 'fast-check'
import * as B_ from 'fp-ts/boolean'
import * as E from 'fp-ts/Either'
import { flow, pipe, tuple } from 'fp-ts/function'
import * as IO from 'fp-ts/IO'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as RTup from 'fp-ts/ReadonlyTuple'
import * as Str from 'fp-ts/string'
import * as TE from 'fp-ts/TaskEither'
import { getArbitrary } from 'schemata-ts/derivations/arbitrary-schemable'
import { getEq } from 'schemata-ts/derivations/eq-schemable'
import { getGuard } from 'schemata-ts/derivations/guard-schemable'
import { getJsonSchema } from 'schemata-ts/derivations/json-schema-schemable'
import { getTranscoderPar } from 'schemata-ts/derivations/transcoder-par-schemable'
import { getTranscoder } from 'schemata-ts/derivations/transcoder-schemable'
import * as JS from 'schemata-ts/internal/json-schema'
import { Schema } from 'schemata-ts/Schema'
import * as TCE from 'schemata-ts/TranscodeError'

const { BooleanAlgebra: B } = B_

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

  /** Tests JsonSchema against a set of expected values */
  readonly assertJsonSchema: (jsonSchema: JS.JsonSchema) => IO.IO<void>

  /**
   * Uses arbitrary to generate random domain values and tests transcoder and
   * transcoderPar's idempotence
   */
  readonly testTranscoderLaws: IO.IO<void>

  /** Uses arbitrary to generate random domain values and tests the eq identity law */
  readonly testEqLaws: IO.IO<void>

  /** Uses arbitrary to generate random domain values and validates them using the guard */
  readonly testArbitraryGuard: IO.IO<void>
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
                  `${prepend(result)} ${
                    typeof testValue === 'string' ||
                    typeof testValue === 'number' ||
                    testValue === null
                      ? String(testValue)
                      : typeof testValue === 'object'
                      ? JSON.stringify(testValue)
                      : String(i)
                  }`,
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

const getPassFailString: (e: E.Either<any, any>) => string = E.fold(
  () => 'fails',
  () => 'passes',
)

export const getTestSuite = <I, O>(schema: Schema<I, O>): TestSuite<I, O> => {
  const transcoder = getTranscoder(schema)
  const transcodePar = getTranscoderPar(schema)
  const guard = getGuard(schema)
  const eq = getEq(schema)
  const arbitrary = getArbitrary(schema).arbitrary(fc)
  const jsonSchema = getJsonSchema(schema)
  return {
    testDecoder: flow(foldTestSuites(getPassFailString), testSuites => () => {
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
    }),
    testEncoder: flow(foldTestSuites(getPassFailString), testSuites => () => {
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
    }),
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
    assertJsonSchema: expected => () => {
      test('matches expected', () => {
        expect(jsonSchema).toStrictEqual(expected)
      })
    },
    testTranscoderLaws: () => {
      test('idempotence > sequential', () => {
        fc.assert(
          fc.property(arbitrary, output => {
            const result = pipe(
              output,
              transcoder.encode,
              E.chain(transcoder.decode),
              E.chain(transcoder.encode),
              E.chain(transcoder.decode),
            )
            expect(
              pipe(
                result,
                E.map(result => eq.equals(result, output)),
              ),
            ).toStrictEqual(E.right(true))
          }),
        )
      })
      test('idempotence > parallel', () => {
        fc.assert(
          fc.asyncProperty(arbitrary, async output => {
            const result = pipe(
              output,
              transcodePar.encode,
              TE.chain(transcodePar.decode),
              TE.chain(transcodePar.encode),
              TE.chain(transcodePar.decode),
            )
            expect(
              pipe(
                result,
                TE.map(result => eq.equals(result, output)),
              )(),
            ).resolves.toStrictEqual(E.right(true))
          }),
        )
      })
    },
    testEqLaws: () => {
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
  readonly decoderTests: GetFirstArg<TestSuite<I, T>['testDecoder']>
  readonly encoderTests: GetFirstArg<TestSuite<I, T>['testEncoder']>
  readonly guardTests: GetFirstArg<TestSuite<I, T>['testGuard']>
  readonly eqTests: GetFirstArg<TestSuite<I, T>['testEq']>
  readonly jsonSchema: GetFirstArg<TestSuite<I, T>['assertJsonSchema']>
}

export const deriveGuardTests = <I, T>(
  encoderTests: StandardTestInputs<I, T>['encoderTests'],
): Exclude<StandardTestInputs<I, T>['guardTests'], 'derive'> =>
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
): Exclude<StandardTestInputs<I, T>['eqTests'], 'derive'> =>
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
}

export type StandardErrors = {
  readonly makeDecodeError: (value: unknown) => TCE.TranscodeErrors
}

export const runStandardTestSuite =
  <I, O>(
    name: string,
    schema: Schema<I, O>,
    makeTestValues: (helpers: MakeTestValues<I, O>) => StandardTestInputs<I, O>,
    standardErrors: StandardErrors = {
      makeDecodeError: value =>
        new TCE.TranscodeErrors([new TCE.TypeMismatch(name, value)]),
    },
  ): IO.IO<void> =>
  () => {
    const _ = getTestSuite(schema)
    const testValues = makeTestValues({
      decoder: {
        pass: (preDecode, postDecode) =>
          tuple(preDecode, E.right(postDecode ?? (preDecode as any))),
        fail: (preDecode, getError = () => standardErrors.makeDecodeError(preDecode)) =>
          tuple(preDecode, E.left(getError(preDecode))),
      },
      encoder: {
        pass: (preEncode, postEncode) =>
          tuple(preEncode, E.right(postEncode ?? (preEncode as any))),
        fail: (preEncode, getError = () => standardErrors.makeDecodeError(preEncode)) =>
          tuple(preEncode, E.left(getError(preEncode))),
      },
    })
    describe(`${name} Standard Test Suite`, () => {
      describe('decoder', _.testDecoder(testValues.decoderTests))
      describe('encoder', _.testEncoder(testValues.encoderTests))
      describe(
        'guard',
        _.testGuard(testValues.guardTests, deriveGuardTests(testValues.encoderTests)),
      )
      describe('eq', _.testEq(testValues.eqTests, deriveEqTests(testValues.encoderTests)))
      describe('jsonSchema', _.assertJsonSchema(testValues.jsonSchema))
      describe('transcoder laws', _.testTranscoderLaws)
      describe('eq laws', _.testEqLaws)
      describe('arbitrary <-> guard', _.testArbitraryGuard)
    })
  }
