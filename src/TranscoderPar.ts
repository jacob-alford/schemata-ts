/**
 * Transcoder par is a transcoder that executes its task in parallel for transactions that
 * are parallelizable such as for arrays and structs.
 *
 * @since 2.0.0
 */
import { Invariant2 } from 'fp-ts/Invariant'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import { Semigroupoid2 } from 'fp-ts/Semigroupoid'
import * as TE from 'fp-ts/TaskEither'
import * as I from 'schemata-ts/internal/transcoder-par'
import * as TCE from 'schemata-ts/TranscodeError'

// ------------------
// models
// ------------------

/**
 * @since 2.0.0
 * @category Model
 */
export interface TranscoderPar<I, O> {
  readonly decode: (u: unknown) => TE.TaskEither<TCE.TranscodeErrors, O>
  readonly encode: (o: O) => TE.TaskEither<TCE.TranscodeErrors, I>
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
) => TCE.TranscodeErrors = I.decodeErrors
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

export {
  /**
   * Interprets a schema as a decoder
   *
   * @since 2.0.0
   * @category Interpreters
   */
  getTranscoderPar,
} from 'schemata-ts/derivations/TranscoderParSchemable'

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
) => <I>(fa: TranscoderPar<I, A>) => TranscoderPar<I, B> = I.imap

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
  that: () => TranscoderPar<I, A>,
) => (fa: TranscoderPar<I, A>) => TranscoderPar<I, A> = I.alt

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const compose: <B, C>(
  tAB: TranscoderPar<B, C>,
) => <A>(tAC: TranscoderPar<A, B>) => TranscoderPar<A, C> = I.compose

/**
 * @since 2.0.0
 * @category Instances
 */
export const Semigroupoid: Semigroupoid2<URI> = I.Semigroupoid
