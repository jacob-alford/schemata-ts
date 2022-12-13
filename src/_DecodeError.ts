/** @since 2.0.0 */
import { NonEmptyReadonlyArray } from '@fp-ts/data/ReadonlyArray'

/**
 * A collection of different error types that can occur during decoding
 *
 * @since 2.0.0
 * @category Model
 */
export type DecodeError<E> =
  | Message<E>
  | NotType
  | FailedConstraint
  | UnexpectedIndex
  | UnexpectedKey
  | Index<E>
  | Key<E>

/**
 * A message to wrap a group of decode errors
 *
 * @since 2.0.0
 * @category Model
 */
export class Message<E> {
  readonly _tag = 'Message'
  constructor(
    readonly message: string,
    readonly errors: NonEmptyReadonlyArray<DecodeError<E>>,
  ) {}
}

/**
 * A message to wrap a group of decode errors
 *
 * @since 2.0.0
 * @category Constructor
 */
export const message =
  (message: string) =>
  <E>(errors: NonEmptyReadonlyArray<DecodeError<E>>): Message<E> =>
    new Message(message, errors)

/**
 * Indicates a mismatched type
 *
 * @since 2.0.0
 * @category Model
 */
export class NotType {
  readonly _tag = 'NotType'
  constructor(readonly actual: unknown, readonly expected: string) {}
}

/**
 * Indicates a mismatched type
 *
 * @since 2.0.0
 * @category Constructor
 */
export const notType =
  (expected: string) =>
  (actual: unknown): NotType =>
    new NotType(actual, expected)

/**
 * Indicates that type does not meet constraint
 *
 * @since 2.0.0
 * @category Model
 */
export class FailedConstraint {
  readonly _tag = 'FailedConstraint'
  constructor(readonly actual: unknown, readonly constraint: string) {}
}

/**
 * Indicates that type does not meet constraint
 *
 * @since 2.0.0
 * @category Constructor
 */
export const failedConstraint =
  (constraint: string) =>
  (actual: unknown): FailedConstraint =>
    new FailedConstraint(actual, constraint)

/**
 * Errors at a particular index
 *
 * @since 2.0.0
 * @category Model
 */
export class Index<E> {
  readonly _tag = 'Index'
  constructor(
    readonly key: number,
    readonly value: NonEmptyReadonlyArray<DecodeError<E>>,
  ) {}
}

/**
 * Errors at a particular index
 *
 * @since 2.0.0
 * @category Constructor
 */
export const index =
  (key: number) =>
  <E>(value: NonEmptyReadonlyArray<DecodeError<E>>): Index<E> =>
    new Index(key, value)

/**
 * Errors at a particular key
 *
 * @since 2.0.0
 * @category Model
 */
export class Key<E> {
  readonly _tag = 'Key'
  constructor(
    readonly key: string,
    readonly value: NonEmptyReadonlyArray<DecodeError<E>>,
  ) {}
}

/**
 * Errors at a particular key
 *
 * @since 2.0.0
 * @category Model
 */
export const key =
  (key: string) =>
  <E>(value: NonEmptyReadonlyArray<DecodeError<E>>): Key<E> =>
    new Key(key, value)

/**
 * Encountered unexpected index
 *
 * @since 2.0.0
 * @category Model
 */
export class UnexpectedIndex {
  readonly _tag = 'UnexpectedIndex'
  constructor(readonly index: number, readonly value: unknown) {}
}

/**
 * Encountered unexpected index
 *
 * @since 2.0.0
 * @category Constructor
 */
export const unexpectedIndex =
  (index: number) =>
  (value: unknown): UnexpectedIndex =>
    new UnexpectedIndex(index, value)

/**
 * Encountered unexpected key
 *
 * @since 2.0.0
 * @category Model
 */
export class UnexpectedKey {
  readonly _tag = 'UnexpectedKey'
  constructor(readonly key: string, readonly value: unknown) {}
}

/**
 * Encountered unexpected key
 *
 * @since 2.0.0
 * @category Constructor
 */
export const unexpectedKey =
  (key: string) =>
  (value: unknown): UnexpectedKey =>
    new UnexpectedKey(key, value)
