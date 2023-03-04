/**
 * A decoder is a typeclass and data-type for parsing unknown values and transforming them
 *
 * @since 2.0.0
 */
import { Alt1 } from 'fp-ts/Alt'
import * as E from 'fp-ts/Either'
import { Functor1 } from 'fp-ts/Functor'
import { Invariant1 } from 'fp-ts/Invariant'
import { NaturalTransformation11 } from 'fp-ts/lib/NaturalTransformation'
import { ReadonlyNonEmptyArray } from 'fp-ts/ReadonlyNonEmptyArray'
import * as DE from 'schemata-ts/DecodeError'
import * as DT from 'schemata-ts/DecoderT'
import * as G from 'schemata-ts/Guard'
import * as hkt from 'schemata-ts/HKT'

// ------------------
// models
// ------------------

/**
 * @since 2.0.0
 * @category Model
 */
export interface Decoder<A> {
  readonly decode: (u: unknown) => E.Either<ReadonlyNonEmptyArray<DE.DecodeError>, A>
}

// ------------------
// constructors
// ------------------

/**
 * @since 2.0.0
 * @category Constructors
 */
export const success = DT.success(E.Pointed)

/**
 * @since 2.0.0
 * @category Constructors
 */
export const failure = DT.failure(E.MonadThrow)

/**
 * A failure case for a value that does not match the expected type
 *
 * @since 2.0.0
 * @category Constructors
 */
export const typeMismatch = (
  ...args: ConstructorParameters<typeof DE.TypeMismatch>
): ReadonlyNonEmptyArray<DE.DecodeError> => [new DE.TypeMismatch(...args)]

/**
 * A failure case for an unexpected value
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unexpectedValue = (
  ...args: ConstructorParameters<typeof DE.UnexpectedValue>
): ReadonlyNonEmptyArray<DE.DecodeError> => [new DE.UnexpectedValue(...args)]

/**
 * A failure case at a specific index
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtIndex = (
  ...args: ConstructorParameters<typeof DE.ErrorAtIndex>
): ReadonlyNonEmptyArray<DE.DecodeError> => [new DE.ErrorAtIndex(...args)]

/**
 * A failure case at a specific key
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtKey = (
  ...args: ConstructorParameters<typeof DE.ErrorAtKey>
): ReadonlyNonEmptyArray<DE.DecodeError> => [new DE.ErrorAtKey(...args)]

/**
 * A failure case for a union member
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtUnionMember = (
  ...args: ConstructorParameters<typeof DE.ErrorAtUnionMember>
): ReadonlyNonEmptyArray<DE.DecodeError> => [new DE.ErrorAtUnionMember(...args)]

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
  onError: (u: unknown) => ReadonlyNonEmptyArray<DE.DecodeError>,
) => NaturalTransformation11<G.URI, URI> = onError => guard => ({
  decode: E.fromPredicate(guard.is, onError),
})

// ------------------
// instances
// ------------------

/**
 * @since 2.0.0
 * @category Instances
 */
export const URI = 'schemata-ts/Decoder'

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
 * @category Type Lambdas
 */
export interface TypeLambda extends hkt.TypeLambda {
  readonly type: Decoder<this['Target']>
}

/**
 * @since 2.0.0
 * @category Type Lambdas
 */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Decoder<this['Output']>
}

// non-pipeables
const map_: Functor1<URI>['map'] = DT.map(E.Functor)
const alt_: Alt1<URI>['alt'] = DT.alt(E.Alt)

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const imap: <A, B>(
  f: (a: A) => B,
  g: (b: B) => A,
) => (fa: Decoder<A>) => Decoder<B> = f => fa => map_(fa, f)

/**
 * @since 2.0.0
 * @category Instances
 */
export const Invariant: Invariant1<URI> = {
  URI,
  imap: map_,
}

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Decoder<A>) => Decoder<B> = f => fa =>
  map_(fa, f)

/**
 * @since 2.0.0
 * @category Instances
 */
export const Functor: Functor1<URI> = {
  URI,
  map: map_,
}

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const alt: <A>(that: () => Decoder<A>) => (fa: Decoder<A>) => Decoder<A> =
  that => fa =>
    alt_(fa, that)

/**
 * @since 2.0.0
 * @category Instances
 */
export const Alt: Alt1<URI> = {
  ...Functor,
  alt: alt_,
}
