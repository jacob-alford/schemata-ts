/**
 * Transcoder par is a transcoder that executes its task in parallel for transactions that
 * are parallelizable such as for arrays and structs.
 *
 * @since 2.0.0
 */
import { type Const } from 'fp-ts/Const'
import { pipe, unsafeCoerce } from 'fp-ts/function'
import { type Invariant2 } from 'fp-ts/Invariant'
import type * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import { type Semigroupoid2 } from 'fp-ts/Semigroupoid'
import type * as TE from 'fp-ts/TaskEither'
import { getTranscoderPar as getTranscoderPar_ } from 'schemata-ts/derivations/transcoder-par-schemable'
import * as I from 'schemata-ts/internal/transcoder-par'
import { type Schema } from 'schemata-ts/Schema'
import type * as TCE from 'schemata-ts/TranscodeError'

// ------------------
// models
// ------------------

/**
 * @since 2.0.0
 * @category Model
 */
export interface TranscoderPar<I, O> {
  readonly decode: (u: unknown) => TE.TaskEither<Const<TCE.TranscodeErrors, I>, O>
  readonly encode: (o: O) => TE.TaskEither<Const<TCE.TranscodeErrors, O>, I>
}

// ------------------
// constructors
// ------------------

/**
 * @since 2.0.0
 * @category Constructors
 */
export const success: <A>(a: A) => TE.TaskEither<TCE.TranscodeErrors, A> = I.success

/**
 * @since 2.0.0
 * @category Constructors
 */
export const failure: <A>(
  e: TCE.TranscodeErrors,
) => TE.TaskEither<TCE.TranscodeErrors, A> = I.failure

/**
 * A collection of failure cases
 *
 * @since 2.0.0
 * @category Constructors
 */
export const decodeErrors: (
  ...errors: RNEA.ReadonlyNonEmptyArray<TCE.TranscodeError>
) => TCE.TranscodeErrors = I.transcodeErrors
/**
 * A failure case for a value that does not match the expected type
 *
 * @since 2.0.0
 * @category Constructors
 */
export const typeMismatch: (
  ...args: ConstructorParameters<typeof TCE.TypeMismatch>
) => TCE.TranscodeError = I.typeMismatch

/**
 * A failure case for an unexpected value
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unexpectedValue: (
  ...args: ConstructorParameters<typeof TCE.TranscodeErrors>
) => TCE.TranscodeError = I.unexpectedValue

/**
 * A failure case at a specific index
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtIndex: (
  ...args: ConstructorParameters<typeof TCE.ErrorAtIndex>
) => TCE.TranscodeError = I.errorAtIndex

/**
 * A failure case at a specific key
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtKey: (
  ...args: ConstructorParameters<typeof TCE.ErrorAtKey>
) => TCE.TranscodeError = I.errorAtKey

/**
 * A failure case for a union member
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtUnionMember: (
  ...args: ConstructorParameters<typeof TCE.ErrorAtUnionMember>
) => TCE.TranscodeError = I.errorAtUnionMember

// ------------------
// combinators
// ------------------

/**
 * Interprets a schema as a decoder
 *
 * @since 2.0.0
 * @category Interpreters
 */
export const getTranscoderPar: <I, O>(schema: Schema<I, O>) => TranscoderPar<I, O> =
  unsafeCoerce(getTranscoderPar_)

// ------------------
// instances
// ------------------

/** @since 2.0.0 */
export const URI = 'schemata-ts/TranscoderPar'

/** @since 2.0.0 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: TranscoderPar<E, A>
  }
}

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const imap: <A, B>(
  f: (a: A) => B,
  g: (b: B) => A,
) => <I>(fa: TranscoderPar<I, A>) => TranscoderPar<I, B> = unsafeCoerce(I.imap)

/**
 * @since 2.0.0
 * @category Instances
 */
export const Invariant: Invariant2<URI> = {
  URI,
  imap: (fa, f, g) => pipe(fa, imap(f, g)),
}

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const alt: <I, A>(
  that: () => TranscoderPar<I, A>,
) => (fa: TranscoderPar<I, A>) => TranscoderPar<I, A> = unsafeCoerce(I.alt)

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const compose: <B, C>(
  tAB: TranscoderPar<B, C>,
) => <A>(tAC: TranscoderPar<A, B>) => TranscoderPar<A, C> = unsafeCoerce(I.compose)

/**
 * @since 2.0.0
 * @category Instances
 */
export const Semigroupoid: Semigroupoid2<URI> = {
  URI,
  compose: (tBC, tAB) => compose(tBC)(tAB),
}
