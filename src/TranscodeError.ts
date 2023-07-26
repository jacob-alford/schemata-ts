/**
 * Represents an error ADT that occurs while encoding or decoding
 *
 * @since 2.0.0
 */
import { constant, pipe } from 'fp-ts/function'
import * as N from 'fp-ts/number'
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
      depth: number,
      recurseDepthFirst: (errs: TranscodeErrors) => S,
    ) => S
    readonly ErrorAtKey: (
      err: ErrorAtKey,
      depth: number,
      recurseDepthFirst: (errs: TranscodeErrors) => S,
    ) => S
    readonly ErrorAtUnionMember: (
      err: ErrorAtUnionMember,
      depth: number,
      recurseDepthFirst: (errs: TranscodeErrors) => S,
    ) => S
  }): ((e: TranscodeErrors) => S) => {
    const depthFirst =
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
                return matchers.ErrorAtIndex(err, depth, depthFirst(depth + 1))
              case 'ErrorAtKey':
                return matchers.ErrorAtKey(err, depth, depthFirst(depth + 1))
              case 'ErrorAtUnionMember':
                return matchers.ErrorAtUnionMember(err, depth, depthFirst(depth + 1))
            }
          }),
        )
    return depthFirst(0)
  }

/**
 * Flattens a `DecodeError` tree into a common Monoid with access to the current
 * accumulation and current level of depth
 *
 * @since 2.0.0
 * @category Destructors
 */
export const foldMapDepthFirst =
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
      ErrorAtIndex: (err, depth, recurse) =>
        matchers.ErrorAtIndex(err.index, recurse(err.errors), depth),
      ErrorAtKey: (err, depth, recurse) =>
        matchers.ErrorAtKey(err.key, recurse(err.errors), depth),
      ErrorAtUnionMember: (err, depth, recurse) =>
        matchers.ErrorAtUnionMember(err.member, recurse(err.errors), depth),
    })

/**
 * Draws a tree of `TranscodeErrors` as lines with configurable prefix characters.
 *
 * The first argument, `prefix` appends any string or character to a concrete node. The
 * depth represents how many generations are between the root node and the current node.
 * The total children represents the total number of children the current node has. If a
 * node has zero children, it is a concrete node; i.e. type-mismatch, unepexted value, or
 * serialization error. If a node has one or more children, it is a container node; i.e.
 * error-at-key, error-at-index, or error-at-union-member.
 *
 * The second argument, `prefixChildren` appends any string or character to a child node,
 * which would have already been prefixed by the first argument. It will be called for
 * nodes that have perhapds been prefixed many times.
 *
 * The third argument, `errorStrings` is a configuration object that can be used to
 * override the default error type templates
 *
 * @since 2.0.0
 * @category Destructors
 */
export const prefixedLines = (
  prefix: (node: readonly [depth: number, totalChildren: number]) => string,
  // istanbul ignore next
  prefixChildren: (
    node: readonly [
      depth: number,
      childIndex: number,
      totalSiblings: number,
      innerNode: string,
    ],
  ) => string = constant(''),
  errorStrings: {
    readonly TypeMismatch?: (expected: string, actual: unknown) => string
    readonly UnexpectedValue?: (actual: unknown) => string
    readonly SerializationError?: (
      expected: string,
      error: unknown,
      actual: unknown,
    ) => string
    readonly ErrorAtIndex?: (index: number) => string
    readonly ErrorAtKey?: (key: string) => string
    readonly ErrorAtUnionMember?: (member: number | string) => string
  } = {},
): ((err: TranscodeErrors) => RNEA.ReadonlyNonEmptyArray<string>) => {
  const {
    TypeMismatch = (expected, actual) =>
      `Expected ${expected} but got \`${String(actual)}\``,
    UnexpectedValue = actual => `Unexpected value: \`${String(actual)}\``,
    SerializationError = (expected, error, actual) =>
      `Expected ${expected}, but ran into serialization error: \`${String(
        error,
      )}\`; got ${actual}`,
    ErrorAtIndex = index => `at index ${index}:`,
    ErrorAtKey = key => `at key ${key}:`,
    ErrorAtUnionMember = member => `at union member \`${member}\`:`,
  } = errorStrings

  return foldMapDepthFirst(RNEA.getSemigroup<string>())({
    TypeMismatch: (expected, actual, depth) => [
      `${prefix([depth, 0])}${TypeMismatch(expected, actual)}`,
    ],
    UnexpectedValue: (actual, depth) => [
      `${prefix([depth, 0])}${UnexpectedValue(actual)}`,
    ],
    SerializationError: (expected, error, actual, depth) => [
      `${prefix([depth, 0])}${SerializationError(expected, error, actual)}`,
    ],
    ErrorAtIndex: (index, errors, depth) =>
      pipe(
        [`${prefix([depth, errors.length])}${ErrorAtIndex(index)}`],
        RNEA.concat(
          pipe(
            errors,
            RA.mapWithIndex(
              (i, e) => `${prefixChildren([depth, i, errors.length, e])}${e}`,
            ),
          ),
        ),
      ),
    ErrorAtKey: (key, errors, depth) =>
      pipe(
        [`${prefix([depth, errors.length])}${ErrorAtKey(key)}`],
        RNEA.concat(
          pipe(
            errors,
            RA.mapWithIndex(
              (i, e) => `${prefixChildren([depth, i, errors.length, e])}${e}`,
            ),
          ),
        ),
      ),
    ErrorAtUnionMember: (member, errors, depth) =>
      pipe(
        [`${prefix([depth, errors.length])}${ErrorAtUnionMember(member)}`],
        RNEA.concat(
          pipe(
            errors,
            RA.mapWithIndex(
              (i, e) => `${prefixChildren([depth, i, errors.length, e])}${e}`,
            ),
          ),
        ),
      ),
  })
}

/**
 * Returns the total number of transcode errors
 *
 * @since 2.0.0
 * @category Destructors
 */
export const totalErrors = foldMapDepthFirst(N.SemigroupSum)({
  TypeMismatch: () => 1,
  UnexpectedValue: () => 1,
  SerializationError: () => 1,
  ErrorAtIndex: (_, errors) => errors,
  ErrorAtKey: (_, errors) => errors,
  ErrorAtUnionMember: (_, errors) => errors,
})

/**
 * Draws a tree of `TranscodeErrors`
 *
 * @since 2.0.0
 * @category Destructors
 */
export const drawTree: (
  errors: TranscodeErrors,
  configuration?: {
    readonly showHeading?: boolean
  },
) => string = (errors, configuration = {}) => {
  const { showHeading = true } = configuration
  const errorCount = totalErrors(errors)
  return pipe(
    errors,
    prefixedLines(
      ([depth, totalChildren]) => {
        switch (totalChildren) {
          case 0:
            return '─ '
          default:
            return depth === 0 ? '┌ ' : '─ '
        }
      },
      ([depth, childIndex, totalChildren]) => {
        switch (depth) {
          case 0:
            return childIndex === totalChildren - 1 ? '└─' : '├─'
          default:
            return '─'
        }
      },
    ),
    RA.intercalate(Str.Monoid)('\n'),
    _ =>
      `${
        showHeading
          ? `Encountered ${totalErrors(errors)} transcode error${
              errorCount === 1 ? '' : 's'
            }:\n`
          : ''
      }${_}`,
  )
}

/**
 * Alias for `drawTree`
 *
 * @since 2.0.0
 * @category Destructors
 */
export const draw: (errors: TranscodeErrors) => string = drawTree
