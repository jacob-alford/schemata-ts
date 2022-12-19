/**
 * Errors that arise when serializing to JSON
 *
 * @since 1.1.0
 */
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as Sg from 'fp-ts/Semigroup'

// -------------------------------------------------------------------------------------
// Model
// -------------------------------------------------------------------------------------

/**
 * @since 1.1.0
 * @category Model
 */
export type PrintError =
  | ErrorGroup
  | ErrorAtIndex
  | ErrorAtKey
  | NamedError
  | CircularReference
  | InfiniteValue
  | NotANumber
  | InvalidValue

// -------------------------------------------------------------------------------------
// Guards
// -------------------------------------------------------------------------------------

/**
 * @since 1.1.0
 * @category Guards
 */
export const isPrintError = (u: unknown): u is PrintError =>
  u instanceof ErrorGroup ||
  u instanceof ErrorAtIndex ||
  u instanceof ErrorAtKey ||
  u instanceof NamedError ||
  u instanceof CircularReference ||
  u instanceof InfiniteValue ||
  u instanceof NotANumber ||
  u instanceof InvalidValue

// -------------------------------------------------------------------------------------
// Constructors
// -------------------------------------------------------------------------------------

/**
 * @since 1.1.0
 * @category Constructors
 */
export class ErrorGroup {
  /** @since 1.1.0 */
  readonly _tag = 'ErrorGroup'
  constructor(readonly errors: RNEA.ReadonlyNonEmptyArray<PrintError>) {}
}

/**
 * @since 1.1.0
 * @category Constructors
 */
export class ErrorAtIndex {
  /** @since 1.1.0 */
  readonly _tag = 'ErrorAtIndex'
  constructor(readonly index: number, readonly error: PrintError) {}
}

/**
 * @since 1.1.0
 * @category Constructors
 */
export class ErrorAtKey {
  /** @since 1.1.0 */
  readonly _tag = 'ErrorAtKey'
  constructor(readonly key: string, readonly error: PrintError) {}
}

/**
 * @since 1.1.0
 * @category Constructors
 */
export class NamedError {
  /** @since 1.1.0 */
  readonly _tag = 'NamedError'
  constructor(readonly expected: string, readonly error: PrintError) {}
}

/**
 * @since 1.1.0
 * @category Constructors
 */
export class CircularReference {
  /** @since 1.1.0 */
  readonly _tag = 'CircularReference'
  constructor(readonly circularValue: unknown) {}
}

/**
 * @since 1.1.0
 * @category Constructors
 */
export class InfiniteValue {
  /** @since 1.1.0 */
  readonly _tag = 'Infinity'
}

/**
 * @since 1.1.0
 * @category Constructors
 */
export class NotANumber {
  /** @since 1.1.0 */
  readonly _tag = 'NaN'
}

/**
 * @since 1.1.0
 * @category Constructors
 */
export class InvalidValue {
  /** @since 1.1.0 */
  readonly _tag = 'InvalidValue'
  constructor(readonly value: unknown) {}
}

// -------------------------------------------------------------------------------------
// Instances
// -------------------------------------------------------------------------------------

/**
 * @since 1.1.0
 * @category Instances
 */
export const semigroupPrintingError: Sg.Semigroup<PrintError> = {
  concat: (x, y): PrintError =>
    x instanceof ErrorGroup && y instanceof ErrorGroup
      ? new ErrorGroup(RNEA.concat(y.errors)(x.errors))
      : x instanceof ErrorGroup
      ? new ErrorGroup(RNEA.concat(RNEA.of(y))(x.errors))
      : y instanceof ErrorGroup
      ? new ErrorGroup(RNEA.concat(y.errors)(RNEA.of(x)))
      : new ErrorGroup(RNEA.concat(RNEA.of(y))(RNEA.of(x))),
}
