import * as fc from 'fast-check'
import * as E from 'fp-ts/Either'
import { flow, pipe, tuple } from 'fp-ts/function'
import * as IO from 'fp-ts/IO'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
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

type TestItem<I, T> = readonly [I, T]
type SchemableTest<I, T> =
  | RR.ReadonlyRecord<string, TestItem<I, T>>
  | RNEA.ReadonlyNonEmptyArray<TestItem<I, T>>

export interface TestSuite<I, O> {
  /** Tests transcoder and transcoderPar > decoder against a set of expected values */
  readonly testDecoder: (
    suite: SchemableTest<unknown, E.Either<TCE.TranscodeErrors, O>>,
  ) => IO.IO<void>

  /** Tests transcoder and transcoderPar > encoder against a set of expected values */
  readonly testEncoder: (
    suite: SchemableTest<O, E.Either<TCE.TranscodeErrors, I>>,
  ) => IO.IO<void>

  /** Tests guard against a set of expected values */
  readonly testGuard: (suite: SchemableTest<unknown, boolean>) => IO.IO<void>

  /** Tests Eq against a set of expected values */
  readonly testEq: (suite: SchemableTest<readonly [O, O], boolean>) => IO.IO<void>

  /** Tests JsonSchema against a set of expected values */
  readonly assertJsonSchema: (jsonSchema: JS.JsonSchema) => IO.IO<void>

  /**
   * Uses arbitrary to generate random domain values and tests transcoder and
   * transcoderPar's idempotence
   */
  readonly testTranscoderLaws: IO.IO<void>

  /** Uses arbitrary to generate random domain values and tests the eq identity law */
  readonly testEqIdentityLaw: IO.IO<void>

  /** Uses arbitrary to generate random domain values and validates them using the guard */
  readonly testArbitraryGuard: IO.IO<void>
}

const foldTestSuite = <I, T>(
  suite: SchemableTest<I, T>,
): ReadonlyArray<readonly [name: string, test: TestItem<I, T>]> =>
  Array.isArray(suite)
    ? pipe(
        suite as ReadonlyArray<TestItem<I, T>>,
        RA.mapWithIndex(
          flow(
            tuple,
            RTup.mapFst(k => `test ${k}`),
          ),
        ),
      )
    : pipe(suite as RR.ReadonlyRecord<string, TestItem<I, T>>, RR.collect(Str.Ord)(tuple))

export const getTestSuite = <I, O>(schema: Schema<I, O>): TestSuite<I, O> => {
  const transcoder = getTranscoder(schema)
  const transcodePar = getTranscoderPar(schema)
  const guard = getGuard(schema)
  const eq = getEq(schema)
  const arbitrary = getArbitrary(schema).arbitrary(fc)
  const jsonSchema = getJsonSchema(schema)
  return {
    testDecoder: flow(foldTestSuite, testSuite => () => {
      test.each(testSuite)('%s', (name, [input, expected]) => {
        const actual = transcoder.decode(input)
        const actualPar = transcodePar.decode(input)
        test(`${name} > sequential`, () => {
          expect(actual).toStrictEqual(expected)
        })
        test(`${name} > parallel`, async () => {
          expect(await actualPar()).toStrictEqual(expected)
        })
      })
    }),
    testEncoder: flow(foldTestSuite, testSuite => () => {
      test.each(testSuite)('%s', (name, [input, expected]) => {
        const actual = transcoder.encode(input)
        const actualPar = transcodePar.encode(input)
        test(`${name} > sequential`, () => {
          expect(actual).toStrictEqual(expected)
        })
        test(`${name} > parallel`, async () => {
          expect(await actualPar()).toStrictEqual(expected)
        })
      })
    }),
    testGuard: flow(foldTestSuite, testSuite => () => {
      test.each(testSuite)('%s', (name, [input, expected]) => {
        const actual = guard.is(input)
        test(name, () => {
          expect(actual).toStrictEqual(expected)
        })
      })
    }),
    testEq: flow(foldTestSuite, testSuite => () => {
      test.each(testSuite)('%s', (name, [[a, b], expected]) => {
        const actual = eq.equals(a, b)
        test(name, () => {
          expect(actual).toStrictEqual(expected)
        })
      })
    }),
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
    testEqIdentityLaw: () => {
      fc.assert(
        fc.property(arbitrary, output => {
          expect(eq.equals(output, output)).toStrictEqual(true)
        }),
      )
    },
    testArbitraryGuard: () => {
      fc.assert(
        fc.property(arbitrary, output => {
          expect(guard.is(output)).toStrictEqual(true)
        }),
      )
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

export const runStandardTestSuite =
  <I, O>(schema: Schema<I, O>, testValues: StandardTestInputs<I, O>): IO.IO<void> =>
  () => {
    const _ = getTestSuite(schema)
    describe('Standard Test Suite', () => {
      describe('decoder', _.testDecoder(testValues.decoderTests))
      describe('encoder', _.testEncoder(testValues.encoderTests))
      describe('guard', _.testGuard(testValues.guardTests))
      describe('eq', _.testEq(testValues.eqTests))
      describe('jsonSchema', _.assertJsonSchema(testValues.jsonSchema))
      describe('transcoder laws', _.testTranscoderLaws)
      describe('eq identity law', _.testEqIdentityLaw)
      describe('arbitrary guard', _.testArbitraryGuard)
    })
  }
