/**
 * Transcoder par is a transcoder that executes its decoding/encoding task in parallel for
 * transactions that are parallelizable such as for arrays and structs.
 *
 * Lawful transcoders must be idempotent, and all derivable transcoders exported by
 * schemata (unless otherwise specified) are lawful.
 *
 * @since 2.0.0
 */
import { type Const } from 'fp-ts/Const'
import { pipe, unsafeCoerce } from 'fp-ts/function'
import { type Invariant2 } from 'fp-ts/Invariant'
import { deriveTranscoderPar as deriveTranscoderPar_ } from 'schemata-ts/derivations/transcoder-par-schemable'
import { type TaskEither } from 'schemata-ts/internal/task-either'
import * as I from 'schemata-ts/internal/transcoder-par'
import { type Schema } from 'schemata-ts/Schema'
import type * as TCE from 'schemata-ts/TranscodeError'

// -------------------------------------------------------------------------------------
// models
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 * @category Model
 */
export interface TranscoderPar<I, O> {
  readonly decode: (u: unknown) => TaskEither<Const<TCE.TranscodeErrors, I>, O>
  readonly encode: (o: O) => TaskEither<Const<TCE.TranscodeErrors, O>, I>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 * @category Constructors
 */
export const success: <A>(a: A) => TaskEither<TCE.TranscodeErrors, A> = I.success

/**
 * @since 2.0.0
 * @category Constructors
 */
export const failure: <A>(e: TCE.TranscodeErrors) => TaskEither<TCE.TranscodeErrors, A> =
  I.failure

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Interprets a schema as a decoder
 *
 * @since 2.0.0
 * @category Interpreters
 */
export const deriveTranscoderPar: <I, O>(schema: Schema<I, O>) => TranscoderPar<I, O> =
  unsafeCoerce(deriveTranscoderPar_)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 * @category URI
 */
export const URI = 'schemata-ts/TranscoderPar'

/**
 * @since 2.0.0
 * @category URI
 */
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
// istanbul ignore next
export const Invariant: Invariant2<URI> = {
  URI,
  imap: (fa, f, g) => pipe(fa, imap(f, g)),
}
