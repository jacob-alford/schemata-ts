/**
 * A transcoder is a printer-parser that decodes from unknown value of an expected input
 * type to a known value, and encodes an input value to an output type. Decoding and
 * encoding are fallible operations that returns `Lefts` upon invalid input types and
 * encoding failures respectively.
 *
 * @since 2.0.0
 */
import { Const } from 'fp-ts/Const'
import * as E from 'fp-ts/Either'
import { unsafeCoerce } from 'fp-ts/function'
import { Invariant2 } from 'fp-ts/Invariant'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import { Semigroupoid2 } from 'fp-ts/Semigroupoid'
import { getTranscoder as getTranscoder_ } from 'schemata-ts/derivations/transcoder-schemable'
import * as I from 'schemata-ts/internal/transcoder'
import { Schema } from 'schemata-ts/Schema'
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

// ------------------
// constructors
// ------------------

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
  ...args: ConstructorParameters<typeof TE.TranscodeErrors>
) => TE.TranscodeError = I.unexpectedValue

/**
 * A failure case at a specific index
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtIndex: (
  ...args: ConstructorParameters<typeof TE.ErrorAtIndex>
) => TE.TranscodeError = I.errorAtIndex

/**
 * A failure case at a specific key
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtKey: (
  ...args: ConstructorParameters<typeof TE.ErrorAtKey>
) => TE.TranscodeError = I.errorAtKey

/**
 * A failure case for a union member
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtUnionMember: (
  ...args: ConstructorParameters<typeof TE.ErrorAtUnionMember>
) => TE.TranscodeError = I.errorAtUnionMember

// ------------------
// combinators
// ------------------

/**
 * Interprets a schema as a decoder
 *
 * @since 2.0.0
 * @category Interpreters
 */
export const getTranscoder: <I, O>(schema: Schema<I, O>) => Transcoder<I, O> =
  unsafeCoerce(getTranscoder_)

// ------------------
// instances
// ------------------

/**
 * @since 2.0.0
 * @category Instances
 */
export const URI = I.URI

/**
 * @since 2.0.0
 * @category Instances
 */
export type URI = typeof URI

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
export const Invariant: Invariant2<URI> = I.Invariant

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const alt: <I, A>(
  that: () => Transcoder<I, A>,
) => (fa: Transcoder<I, A>) => Transcoder<I, A> = unsafeCoerce(I.alt)

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const compose: <B, C>(
  tAB: Transcoder<B, C>,
) => <A>(tAC: Transcoder<A, B>) => Transcoder<A, C> = unsafeCoerce(I.compose)

/**
 * @since 2.0.0
 * @category Instances
 */
export const Semigroupoid: Semigroupoid2<URI> = I.Semigroupoid
