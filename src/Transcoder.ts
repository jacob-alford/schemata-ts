/**
 * A transcoder is a data-type that `decode`s from unknown type of an expected input shape
 * to an output type, and `encode`s from an output type to the expected input shape. Can
 * be represented as printer/parsers, and transformations.
 *
 * Lawful transcoders must be idempotent, and all derivable transcoders exported by
 * schemata (unless otherwise specified) are lawful.
 *
 * @since 2.0.0
 */
import { type Const } from 'fp-ts/Const'
import type * as E from 'fp-ts/Either'
import { pipe, unsafeCoerce } from 'fp-ts/function'
import { type Invariant2 } from 'fp-ts/Invariant'
import type * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import { deriveTranscoder as deriveTranscoder_ } from 'schemata-ts/derivations/transcoder-schemable'
import * as I from 'schemata-ts/internal/transcoder'
import { type Schema } from 'schemata-ts/Schema'
import * as TE from 'schemata-ts/TranscodeError'

// ------------------
// models
// ------------------

/**
 * @since 2.0.0
 * @category Model
 */
export interface Transcoder<I, O> {
  readonly decode: (u: unknown) => E.Either<Const<TE.TranscodeErrors, I>, O>
  readonly encode: (o: O) => E.Either<Const<TE.TranscodeErrors, O>, I>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 * @category Constructors
 */
export const success: <A>(a: A) => E.Either<TE.TranscodeErrors, A> = I.success

/**
 * @since 2.0.0
 * @category Constructors
 */
export const failure: <A>(e: TE.TranscodeErrors) => E.Either<TE.TranscodeErrors, A> =
  I.failure

/**
 * A collection of failure cases
 *
 * @since 2.0.0
 * @category Constructors
 */
export const transcodeErrors: (
  ...errors: RNEA.ReadonlyNonEmptyArray<TE.TranscodeError>
) => TE.TranscodeErrors = I.transcodeErrors
/**
 * A failure case for a value that does not match the expected type
 *
 * @since 2.0.0
 * @category Constructors
 */
export const typeMismatch: (
  ...args: ConstructorParameters<typeof TE.TypeMismatch>
) => TE.TranscodeError = I.typeMismatch

/**
 * A failure case for an unexpected value
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unexpectedValue: (
  ...errors: ConstructorParameters<typeof TE.UnexpectedValue>
) => TE.TranscodeError = I.unexpectedValue

/**
 * A failure case for a serialization or deserialization error
 *
 * @since 2.0.0
 * @category Constructors
 */
export const serializationError: (
  ...args: ConstructorParameters<typeof TE.SerializationError>
) => TE.TranscodeError = I.serializationError

/**
 * A failure case at a specific index
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtIndex: (
  index: number,
  ...errors: RNEA.ReadonlyNonEmptyArray<TE.TranscodeError>
) => TE.TranscodeError = (i, ...errs) =>
  I.errorAtIndex(i, transcodeErrors(...(errs as any)))

/**
 * A failure case at a specific key
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtKey: (
  key: string,
  ...errors: RNEA.ReadonlyNonEmptyArray<TE.TranscodeError>
) => TE.TranscodeError = (key, ...errs) =>
  I.errorAtKey(key, transcodeErrors(...(errs as any)))

/**
 * A failure case for a union member
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtUnionMember: (
  member: string | number,
  ...errors: RNEA.ReadonlyNonEmptyArray<TE.TranscodeError>
) => TE.TranscodeError = (member, ...errs) =>
  I.errorAtUnionMember(member, transcodeErrors(...(errs as any)))

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 * @category Destructors
 */
export const drawErrorTree: (...params: Parameters<typeof TE.drawTree>) => string =
  TE.drawTree

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Interprets a schema as a decoder
 *
 * @since 2.0.0
 * @category Interpreters
 */
export const deriveTranscoder: <I, O>(schema: Schema<I, O>) => Transcoder<I, O> =
  unsafeCoerce(deriveTranscoder_)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 * @category URI
 */
export const URI = 'schemata-ts/Transcoder'

/**
 * @since 2.0.0
 * @cateogry URI
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Transcoder<E, A>
  }
}

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const imap: <A, B>(
  f: (a: A) => B,
  g: (b: B) => A,
) => <I>(fa: Transcoder<I, A>) => Transcoder<I, B> = unsafeCoerce(I.imap)

/**
 * @since 2.0.0
 * @category Instances
 */
// istanbul ignore next
export const Invariant: Invariant2<URI> = {
  URI,
  imap: (fa, f, g) => pipe(fa, imap(f, g)),
}
