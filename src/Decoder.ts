/**
 * A decoder is a typeclass and data-type for parsing unknown values and transforming them
 *
 * @since 2.0.0
 */
import { Alt2 } from 'fp-ts/Alt'
import { make } from 'fp-ts/Const'
import * as E from 'fp-ts/Either'
import { Lazy } from 'fp-ts/function'
import { Functor2 } from 'fp-ts/Functor'
import { Invariant2 } from 'fp-ts/Invariant'
import { NaturalTransformation12C } from 'fp-ts/NaturalTransformation'
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
export interface Decoder<I, A> {
  readonly decode: (u: unknown) => E.Either<DE.DecodeFailure<I>, A>
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
): DE.DecodeErrors => new DE.DecodeErrors([new DE.TypeMismatch(...args)])

/**
 * A failure case for an unexpected value
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unexpectedValue = (
  ...args: ConstructorParameters<typeof DE.UnexpectedValue>
): DE.DecodeErrors => new DE.DecodeErrors([new DE.UnexpectedValue(...args)])

/**
 * A failure case at a specific index
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtIndex = (
  ...args: ConstructorParameters<typeof DE.ErrorAtIndex>
): DE.DecodeErrors => new DE.DecodeErrors([new DE.ErrorAtIndex(...args)])

/**
 * A failure case at a specific key
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtKey = (
  ...args: ConstructorParameters<typeof DE.ErrorAtKey>
): DE.DecodeErrors => new DE.DecodeErrors([new DE.ErrorAtKey(...args)])

/**
 * A failure case for a union member
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtUnionMember = (
  ...args: ConstructorParameters<typeof DE.ErrorAtUnionMember>
): DE.DecodeErrors => new DE.DecodeErrors([new DE.ErrorAtUnionMember(...args)])

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
export const fromGuard: <E>(
  onError: (u: unknown) => DE.DecodeFailure<E>,
) => NaturalTransformation12C<G.URI, URI, E> = onError => guard => ({
  decode: E.fromPredicate(guard.is, onError),
})

/**
 * Constructs a decoder from a predicate
 *
 * @since 2.0.0
 * @category Natural Transformations
 */
export const fromPredicate: <I, A>(
  predicate: (u: unknown) => u is A,
  onError: (u: unknown) => DE.DecodeFailure<I>,
) => Decoder<I, A> = (predicate, onError) => ({
  decode: E.fromPredicate(predicate, onError),
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
  interface URItoKind2<E, A> {
    readonly [URI]: Decoder<E, A>
  }
}

/**
 * @since 2.0.0
 * @category Type Lambdas
 */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Decoder<this['Input'], this['Output']>
}

/** @internal */
export const liftDecodeError: <I>(failure: DE.DecodeErrors) => DE.DecodeFailure<I> = make

// non-pipeables
const map_: Functor2<URI>['map'] = DT.map(E.Functor)
const altW_ = DT.altW(E.Alt)

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const imap: <A, B>(
  f: (a: A) => B,
  g: (b: B) => A,
) => <I>(fa: Decoder<I, A>) => Decoder<I, B> = f => fa => map_(fa, f)

/**
 * @since 2.0.0
 * @category Instances
 */
export const Invariant: Invariant2<URI> = {
  URI,
  imap: map_,
}

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Decoder<E, A>) => Decoder<E, B> =
  f => fa =>
    map_(fa, f)

/**
 * @since 2.0.0
 * @category Instances
 */
export const Functor: Functor2<URI> = {
  URI,
  map: map_,
}

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const altW: <I2, A>(
  that: Lazy<Decoder<I2, A>>,
) => <I1>(fa: Decoder<I1, A>) => Decoder<I1 | I2, A> = that => fa => altW_(fa, that)

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const alt: <I, A>(
  that: () => Decoder<I, A>,
) => (fa: Decoder<I, A>) => Decoder<I, A> = altW

/**
 * @since 2.0.0
 * @category Instances
 */
export const Alt: Alt2<URI> = {
  ...Functor,
  alt: altW_,
}
