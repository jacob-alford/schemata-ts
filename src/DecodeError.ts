/**
 * Represents an error ADT that occurs while parsing an unknown value
 *
 * @since 2.0.0
 */
import { ReadonlyNonEmptyArray } from 'fp-ts/ReadonlyNonEmptyArray'

/**
 * Represents an error ADT that occurs while parsing an unknown value
 *
 * @since 2.0.0
 * @category Model
 */
export type DecodeError =
  | TypeMismatch
  | UnexpectedValue
  | ErrorAtIndex
  | ErrorAtKey
  | ErrorAtUnionMember

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
  constructor(
    readonly index: number,
    readonly errors: ReadonlyNonEmptyArray<DecodeError>,
  ) {}
}

/**
 * Represents an error at a specific key
 *
 * @since 2.0.0
 * @category Model
 */
export class ErrorAtKey {
  readonly _tag = 'ErrorAtKey'
  constructor(
    readonly key: string,
    readonly errors: ReadonlyNonEmptyArray<DecodeError>,
  ) {}
}

/**
 * Represents an error that occurred for a particular union member
 *
 * @since 2.0.0
 * @category Model
 */
export class ErrorAtUnionMember {
  readonly _tag = 'ErrorForUnionMember'
  constructor(
    readonly member: number | string,
    readonly errors: ReadonlyNonEmptyArray<DecodeError>,
  ) {}
}
