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
export type PrintingError =
  | ErrorGroup
  | ErrorAtIndex
  | ErrorAtKey
  | NamedError
  | CircularReference
  | InfiniteValue
  | NotANumber
  | InvalidValue

// -------------------------------------------------------------------------------------
// Constructors
// -------------------------------------------------------------------------------------

/**
 * @since 1.1.0
 * @category Constructors
 */
export class NamedError {
  readonly _tag = 'Message'
  constructor(readonly expected: string, readonly error: PrintingError) {}
}

/**
 * @since 1.1.0
 * @category Constructors
 */
export class ErrorGroup {
  readonly _tag = 'ErrorGroup'
  constructor(readonly errors: RNEA.ReadonlyNonEmptyArray<PrintingError>) {}
}

/**
 * @since 1.1.0
 * @category Constructors
 */
export class ErrorAtIndex {
  readonly _tag = 'ErrorAtIndex'
  constructor(readonly index: number, readonly error: PrintingError) {}
}

/**
 * @since 1.1.0
 * @category Constructors
 */
export class ErrorAtKey {
  readonly _tag = 'ErrorAtKey'
  constructor(readonly key: string, readonly error: PrintingError) {}
}

/**
 * @since 1.1.0
 * @category Constructors
 */
export class CircularReference {
  readonly _tag = 'CircularReference'
  constructor(readonly circularValue: unknown) {}
}

/**
 * @since 1.1.0
 * @category Constructors
 */
export class InfiniteValue {
  readonly _tag = 'Infinity'
}

/**
 * @since 1.1.0
 * @category Constructors
 */
export class NotANumber {
  readonly _tag = 'NaN'
}

/**
 * @since 1.1.0
 * @category Constructors
 */
export class InvalidValue {
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
export const semigroupPrintingError: Sg.Semigroup<PrintingError> = {
  concat: (x, y): PrintingError =>
    x instanceof ErrorGroup && y instanceof ErrorGroup
      ? new ErrorGroup(RNEA.concat(y.errors)(x.errors))
      : x instanceof ErrorGroup
      ? new ErrorGroup(RNEA.concat(RNEA.of(y))(x.errors))
      : y instanceof ErrorGroup
      ? new ErrorGroup(RNEA.concat(y.errors)(RNEA.of(x)))
      : new ErrorGroup(RNEA.concat(RNEA.of(y))(RNEA.of(x))),
}
