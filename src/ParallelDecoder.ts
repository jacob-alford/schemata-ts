/**
 * A parallel decoder is identical to a decoder except in instances when multiple items
 * are decoded at once, for instance with Arrays and Structs.
 *
 * @since 2.0.0
 */
import { Alt1 } from 'fp-ts/Alt'
import { Functor1 } from 'fp-ts/Functor'
import { Invariant1 } from 'fp-ts/Invariant'
import { NaturalTransformation11 } from 'fp-ts/NaturalTransformation'
import * as TE from 'fp-ts/TaskEither'
import * as DE from 'schemata-ts/DecodeError'
import * as G from 'schemata-ts/Guard'
import * as I from 'schemata-ts/internal/parallel-decoder'

// ------------------
// models
// ------------------

/**
 * @since 2.0.0
 * @category Model
 */
export interface ParallelDecoder<A> {
  readonly decode: (u: unknown) => TE.TaskEither<DE.DecodeErrors, A>
}

// ------------------
// constructors
// ------------------

/**
 * @since 2.0.0
 * @category Constructors
 */
export const success: <A>(a: A) => TE.TaskEither<DE.DecodeErrors, A> = I.success

/**
 * @since 2.0.0
 * @category Constructors
 */
export const failure: <A>(e: DE.DecodeErrors) => TE.TaskEither<DE.DecodeErrors, A> =
  I.failure

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
  getDecoder,
} from 'schemata-ts/derivations/DecoderSchemable'

// ------------------
// natural transformations
// ------------------

/**
 * Constructs a decoder from a guard
 *
 * @since 2.0.0
 * @category Natural Transformations
 */
export const fromGuard: (
  onError: (u: unknown) => DE.DecodeErrors,
) => NaturalTransformation11<G.URI, URI> = I.fromGuard

/**
 * Constructs a decoder from a predicate
 *
 * @since 2.0.0
 * @category Natural Transformations
 */
export const fromPredicate: <A>(
  predicate: (u: unknown) => u is A,
  onError: (u: unknown) => DE.DecodeErrors,
) => ParallelDecoder<A> = I.fromPredicate

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

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly [URI]: ParallelDecoder<A>
  }
}

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const imap: <A, B>(
  f: (a: A) => B,
  g: (b: B) => A,
) => (fa: ParallelDecoder<A>) => ParallelDecoder<B> = I.imap

/**
 * @since 2.0.0
 * @category Instances
 */
export const Invariant: Invariant1<URI> = I.Invariant

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const map: <A, B>(
  f: (a: A) => B,
) => (fa: ParallelDecoder<A>) => ParallelDecoder<B> = I.map

/**
 * @since 2.0.0
 * @category Instances
 */
export const Functor: Functor1<URI> = I.Functor

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const alt: <A>(
  that: () => ParallelDecoder<A>,
) => (fa: ParallelDecoder<A>) => ParallelDecoder<A> = I.alt

/**
 * @since 2.0.0
 * @category Instances
 */
export const Alt: Alt1<URI> = I.Alt
