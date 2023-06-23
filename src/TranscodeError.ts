/**
 * Represents an error ADT that occurs while encoding or decoding
 *
 * @since 2.0.0
 */
import { flow, pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import type * as Sg from 'fp-ts/Semigroup'
import * as Str from 'fp-ts/string'

/**
 * Represents an error ADT that occurs while encoding or decoding
 *
 * @since 2.0.0
 * @category Model
 */
export type TranscodeError =
  | TypeMismatch
  | UnexpectedValue
  | SerializationError
  | ErrorAtIndex
  | ErrorAtKey
  | ErrorAtUnionMember

/**
 * A readonly non-empty array of transcode errors
 *
 * @since 2.0.0
 * @category Model
 */
export class TranscodeErrors {
  readonly _tag = 'TranscodeErrors'
  constructor(readonly errors: RNEA.ReadonlyNonEmptyArray<TranscodeError>) {}
}

/**
 * Represents a mismatched value
 *
 * @since 2.0.0
 * @category Model
 */
export class TypeMismatch {
  readonly _tag = 'TypeMismatch'
  constructor(readonly expected: string, readonly actual: unknown) {}
}

/**
 * Represents an error serializing or deserializing a value
 *
 * @since 2.0.0
 * @category Model
 */
export class SerializationError {
  readonly _tag = 'SerializationError'
  constructor(
    readonly expected: string,
    readonly error: unknown,
    readonly actual: unknown,
  ) {}
}

/**
 * Represents an error for when a value is present but was not expected
 *
 * @since 2.0.0
 * @category Model
 */
export class UnexpectedValue {
  readonly _tag = 'UnexpectedValue'
  constructor(readonly actual: unknown) {}
}

/**
 * Represents an error at a specific index
 *
 * @since 2.0.0
 * @category Model
 */
export class ErrorAtIndex {
  readonly _tag = 'ErrorAtIndex'
  constructor(readonly index: number, readonly errors: TranscodeErrors) {}
}

/**
 * Represents an error at a specific key
 *
 * @since 2.0.0
 * @category Model
 */
export class ErrorAtKey {
  readonly _tag = 'ErrorAtKey'
  constructor(readonly key: string, readonly errors: TranscodeErrors) {}
}

/**
 * Represents an error that occurred for a particular union member
 *
 * @since 2.0.0
 * @category Model
 */
export class ErrorAtUnionMember {
  readonly _tag = 'ErrorAtUnionMember'
  constructor(readonly member: number | string, readonly errors: TranscodeErrors) {}
}

/**
 * @since 2.0.0
 * @category Instances
 */
export const Semigroup: Sg.Semigroup<TranscodeErrors> = {
  concat: (x, y) =>
    x.errors.length === 0
      ? y
      : y.errors.length === 0
      ? x
      : new TranscodeErrors(RNEA.concat(y.errors)(x.errors)),
}

/**
 * Flattens a `DecodeError` tree into a common Monoid
 *
 * @since 2.0.0
 * @category Destructors
 */
export const fold =
  <S>(S: Sg.Semigroup<S>) =>
  (matchers: {
    readonly TypeMismatch: (e: TypeMismatch) => S
    readonly UnexpectedValue: (e: UnexpectedValue) => S
    readonly SerializationError: (e: SerializationError) => S
    readonly ErrorAtIndex: (e: ErrorAtIndex) => S
    readonly ErrorAtKey: (e: ErrorAtKey) => S
    readonly ErrorAtUnionMember: (e: ErrorAtUnionMember) => S
  }) =>
  (e: TranscodeErrors): S =>
    pipe(
      e.errors,
      RNEA.foldMap(S)(err => {
        switch (err._tag) {
          case 'TypeMismatch':
            return matchers.TypeMismatch(err)
          case 'UnexpectedValue':
            return matchers.UnexpectedValue(err)
          case 'SerializationError':
            return matchers.SerializationError(err)
          case 'ErrorAtIndex':
            return matchers.ErrorAtIndex(err)
          case 'ErrorAtKey':
            return matchers.ErrorAtKey(err)
          case 'ErrorAtUnionMember':
            return matchers.ErrorAtUnionMember(err)
        }
      }),
    )

/**
 * Flattens a `DecodeError` tree into a common Monoid with access to the current
 * accumulation and current level of depth
 *
 * @since 2.0.0
 * @category Destructors
 */
export const foldMap =
  <S>(S: Sg.Semigroup<S>) =>
  (matchers: {
    readonly TypeMismatch: (expected: string, actual: unknown, depth: number) => S
    readonly UnexpectedValue: (actual: unknown, depth: number) => S
    readonly SerializationError: (
      expected: string,
      error: unknown,
      actual: unknown,
      depth: number,
    ) => S
    readonly ErrorAtIndex: (index: number, errors: S, depth: number) => S
    readonly ErrorAtKey: (key: string, errors: S, depth: number) => S
    readonly ErrorAtUnionMember: (member: number | string, errors: S, depth: number) => S
  }) =>
  (e: TranscodeErrors): S => {
    const go =
      (depth: number) =>
      (e: TranscodeErrors): S =>
        pipe(
          e.errors,
          RNEA.foldMap(S)(err => {
            switch (err._tag) {
              case 'TypeMismatch':
                return matchers.TypeMismatch(err.expected, err.actual, depth)
              case 'UnexpectedValue':
                return matchers.UnexpectedValue(err.actual, depth)
              case 'SerializationError':
                return matchers.SerializationError(
                  err.expected,
                  err.error,
                  err.actual,
                  depth,
                )
              case 'ErrorAtIndex':
                return matchers.ErrorAtIndex(err.index, go(depth + 1)(err.errors), depth)
              case 'ErrorAtKey':
                return matchers.ErrorAtKey(err.key, go(depth + 1)(err.errors), depth)
              case 'ErrorAtUnionMember':
                return matchers.ErrorAtUnionMember(
                  err.member,
                  go(depth + 1)(err.errors),
                  depth,
                )
            }
          }),
        )
    return go(0)(e)
  }

/**
 * Draws a tree of `DecodeError` values with configurable markings
 *
 * @since 2.0.0
 * @category Destructors
 */
export const drawLinesWithMarkings = (params: {
  readonly getIndentationString: (
    err: string,
    depth: number,
    isLastChild: boolean,
  ) => string
}): ((err: TranscodeErrors) => ReadonlyArray<string>) =>
  foldMap(RA.getMonoid<string>())({
    TypeMismatch: (expected, actual) => [
      `Expected ${expected} but got ${String(actual)}`,
    ],
    UnexpectedValue: actual => [`Unexpected value: ${String(actual)}`],
    SerializationError: (expected, error, actual) => [
      `Expected ${expected}, but ran into Serialization error: ${String(
        error,
      )}; got ${actual}`,
    ],
    ErrorAtIndex: (index, errors, depth) =>
      pipe(
        [`Error at index ${index}`],
        RA.concat(
          pipe(
            errors,
            RA.mapWithIndex((i, e) =>
              params.getIndentationString(e, depth, i === errors.length - 1),
            ),
          ),
        ),
      ),
    ErrorAtKey: (key, errors, depth) =>
      pipe(
        [`Error at key ${key}`],
        RA.concat(
          pipe(
            errors,
            RA.mapWithIndex((i, e) =>
              params.getIndentationString(e, depth, i === errors.length - 1),
            ),
          ),
        ),
      ),
    ErrorAtUnionMember: (member, errors, depth) =>
      pipe(
        [`Error at union member ${member}`],
        RA.concat(
          pipe(
            errors,
            RA.mapWithIndex(
              (i, e) =>
                `${params.getIndentationString(e, depth, i === errors.length - 1)}${
                  e.includes('─') ? '─' : ' '
                }${e}`,
            ),
          ),
        ),
      ),
  })

/**
 * Draws a tree of `DecodeError` values
 *
 * @since 2.0.0
 * @category Destructors
 */
export const drawTree = flow(
  drawLinesWithMarkings({
    getIndentationString: (e, depth, isLastChild) =>
      `${depth === 0 ? (isLastChild ? '└─' : '├─') : '─'}${'─'.repeat(depth * 2)}${
        e.includes('─') ? '─' : ' '
      }${e}`,
  }),
  as =>
    pipe(
      as,
      RA.foldMapWithIndex(Str.Monoid)((i, e) => e + (i === as.length - 1 ? '' : `\n`)),
    ),
)
