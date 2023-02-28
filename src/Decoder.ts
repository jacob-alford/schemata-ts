/**
 * A decoder is a typeclass and data-type for parsing unknown values and transforming them
 *
 * @since 2.0.0
 */
import { Alt1 } from 'fp-ts/Alt'
import * as E from 'fp-ts/Either'
import { Functor1 } from 'fp-ts/Functor'
import { Invariant1 } from 'fp-ts/Invariant'
import { NaturalTransformation11 } from 'fp-ts/NaturalTransformation'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as DE from 'schemata-ts/DecodeError'
import * as G from 'schemata-ts/Guard'
import * as I from 'schemata-ts/internal/Decoder'

// ------------------
// models
// ------------------

/**
 * @since 2.0.0
 * @category Model
 */
export interface Decoder<A> {
  readonly decode: (u: unknown) => E.Either<DE.DecodeErrors, A>
}

// ------------------
// constructors
// ------------------

/**
 * @since 2.0.0
 * @category Constructors
 */
export const success: <A>(a: A) => E.Either<DE.DecodeErrors, A> = I.success

/**
 * @since 2.0.0
 * @category Constructors
 */
export const failure: <A>(e: DE.DecodeErrors) => E.Either<DE.DecodeErrors, A> = I.failure

/**
 * A collection of failure cases
 *
 * @since 2.0.0
 * @category Constructors
 */
export const decodeErrors: (
  ...errors: RNEA.ReadonlyNonEmptyArray<DE.DecodeError>
) => DE.DecodeErrors = I.decodeErrors
/**
 * A failure case for a value that does not match the expected type
 *
 * @since 2.0.0
 * @category Constructors
 */
export const typeMismatch: (
  ...args: ConstructorParameters<typeof DE.TypeMismatch>
) => DE.DecodeError = I.typeMismatch

/**
 * A failure case for an unexpected value
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unexpectedValue: (
  ...args: ConstructorParameters<typeof DE.UnexpectedValue>
) => DE.DecodeError = I.unexpectedValue

/**
 * A failure case at a specific index
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtIndex: (
  ...args: ConstructorParameters<typeof DE.ErrorAtIndex>
) => DE.DecodeError = I.errorAtIndex

/**
 * A failure case at a specific key
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtKey: (
  ...args: ConstructorParameters<typeof DE.ErrorAtKey>
) => DE.DecodeError = I.errorAtKey

/**
 * A failure case for a union member
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtUnionMember: (
  ...args: ConstructorParameters<typeof DE.ErrorAtUnionMember>
) => DE.DecodeError = I.errorAtUnionMember

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
) => Decoder<A> = I.fromPredicate

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
    readonly [URI]: Decoder<A>
  }
}

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const imap: <A, B>(
  f: (a: A) => B,
  g: (b: B) => A,
) => (fa: Decoder<A>) => Decoder<B> = I.imap

/**
 * @since 2.0.0
 * @category Instances
 */
export const Invariant: Invariant1<URI> = I.Invariant

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Decoder<A>) => Decoder<B> = I.map

/**
 * @since 2.0.0
 * @category Instances
 */
export const Functor: Functor1<URI> = I.Functor

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const alt: <A>(that: () => Decoder<A>) => (fa: Decoder<A>) => Decoder<A> = I.alt

/**
 * @since 2.0.0
 * @category Instances
 */
export const Alt: Alt1<URI> = I.Alt
