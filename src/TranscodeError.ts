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
  /** @since 2.0.0 */
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
  /** @since 2.0.0 */
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
  /** @since 2.0.0 */
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
  /** @since 2.0.0 */
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
  /** @since 2.0.0 */
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
  /** @since 2.0.0 */
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
  /** @since 2.0.0 */
  readonly _tag = 'ErrorAtUnionMember'
  constructor(readonly member: number | string, readonly errors: TranscodeErrors) {}
}

/**
 * @since 2.0.0
 * @category Instances
 */
export const Semigroup: Sg.Semigroup<TranscodeErrors> = {
  concat: (x, y) => new TranscodeErrors(RNEA.concat(y.errors)(x.errors)),
}

/**
 * Flattens a `DecodeError` tree into a common Semigroup
 *
 * @since 2.0.0
 * @category Destructors
 */
export const fold =
  <S>(S: Sg.Semigroup<S>) =>
  (matchers: {
    readonly TypeMismatch: (e: TypeMismatch, depth: number) => S
    readonly UnexpectedValue: (e: UnexpectedValue, depth: number) => S
    readonly SerializationError: (e: SerializationError, depth: number) => S
    readonly ErrorAtIndex: (
      err: ErrorAtIndex,
      recurse: (errs: TranscodeErrors) => S,
      depth: number,
    ) => S
    readonly ErrorAtKey: (
      err: ErrorAtKey,
      recurse: (errs: TranscodeErrors) => S,
      depth: number,
    ) => S
    readonly ErrorAtUnionMember: (
      err: ErrorAtUnionMember,
      recurse: (errs: TranscodeErrors) => S,
      depth: number,
    ) => S
  }): ((e: TranscodeErrors) => S) => {
    const go =
      (depth: number) =>
      (err: TranscodeErrors): S =>
        pipe(
          err.errors,
          RNEA.foldMap(S)(err => {
            switch (err._tag) {
              case 'TypeMismatch':
                return matchers.TypeMismatch(err, depth)
              case 'UnexpectedValue':
                return matchers.UnexpectedValue(err, depth)
              case 'SerializationError':
                return matchers.SerializationError(err, depth)
              case 'ErrorAtIndex':
                return matchers.ErrorAtIndex(err, go(depth + 1), depth)
              case 'ErrorAtKey':
                return matchers.ErrorAtKey(err, go(depth + 1), depth)
              case 'ErrorAtUnionMember':
                return matchers.ErrorAtUnionMember(err, go(depth + 1), depth)
            }
          }),
        )
    return go(0)
  }

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
  }): ((e: TranscodeErrors) => S) =>
    fold(S)({
      TypeMismatch: (err, depth) =>
        matchers.TypeMismatch(err.expected, err.actual, depth),
      UnexpectedValue: (err, depth) => matchers.UnexpectedValue(err.actual, depth),
      SerializationError: (err, depth) =>
        matchers.SerializationError(err.expected, err.error, err.actual, depth),
      ErrorAtIndex: (err, recurse, depth) =>
        matchers.ErrorAtIndex(err.index, recurse(err.errors), depth),
      ErrorAtKey: (err, recurse, depth) =>
        matchers.ErrorAtKey(err.key, recurse(err.errors), depth),
      ErrorAtUnionMember: (err, recurse, depth) =>
        matchers.ErrorAtUnionMember(err.member, recurse(err.errors), depth),
    })

/**
 * Draws a tree of `TranscodeErrors` as lines with configurable child prefixes
 *
 * @since 2.0.0
 * @category Destructors
 */
export const drawLinesWithMarkings = (
  markChildren: (err: string, depth: number, isLastChild: boolean) => string,
  markParent: (parentError: string, depth: number) => string,
): ((err: TranscodeErrors) => ReadonlyArray<string>) =>
  foldMap(RA.getMonoid<string>())({
    TypeMismatch: (expected, actual, depth) => [
      markParent(`Expected ${expected} but got \`${String(actual)}\``, depth),
    ],
    UnexpectedValue: (actual, depth) => [
      markParent(`Unexpected value: \`${String(actual)}\``, depth),
    ],
    SerializationError: (expected, error, actual, depth) => [
      markParent(
        `Expected ${expected}, but ran into serialization error: \`${String(
          error,
        )}\`; got ${actual}`,
        depth,
      ),
    ],
    ErrorAtIndex: (index, errors, depth) =>
      pipe(
        [markParent(`Error at index ${index}:`, depth)],
        RA.concat(
          pipe(
            errors,
            RA.mapWithIndex((i, e) => markChildren(e, depth, i === errors.length - 1)),
          ),
        ),
      ),
    ErrorAtKey: (key, errors, depth) =>
      pipe(
        [markParent(`Error at key ${key}:`, depth)],
        RA.concat(
          pipe(
            errors,
            RA.mapWithIndex((i, e) => markChildren(e, depth, i === errors.length - 1)),
          ),
        ),
      ),
    ErrorAtUnionMember: (member, errors, depth) =>
      pipe(
        [markParent(`Error at union member \`${member}\`:`, depth)],
        RA.concat(
          pipe(
            errors,
            RA.mapWithIndex((i, e) => markChildren(e, depth, i === errors.length - 1)),
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
  drawLinesWithMarkings(
    (e, depth, isLastChild) =>
      `${depth === 0 ? (isLastChild ? '  └─' : '  ├─') : '─'}${'─'.repeat(depth)}${
        e.includes('─') ? '─' : ' '
      }${e}`,
    (parent, depth) => (depth === 0 ? `  ┌ ${parent}` : parent),
  ),
  as =>
    pipe(
      as,
      RA.foldMapWithIndex(Str.Monoid)((i, e) => e + (i === as.length - 1 ? '' : `\n`)),
    ),
)
