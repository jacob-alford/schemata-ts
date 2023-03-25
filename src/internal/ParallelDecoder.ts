/**
 * A decoder is a typeclass and data-type for parsing unknown values and transforming them
 *
 * @since 2.0.0
 */
import { Alt1 } from 'fp-ts/Alt'
import { flow, Lazy } from 'fp-ts/function'
import { Functor1 } from 'fp-ts/Functor'
import { Invariant1 } from 'fp-ts/Invariant'
import { NaturalTransformation11 } from 'fp-ts/NaturalTransformation'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as TE from 'fp-ts/TaskEither'
import * as DE from 'schemata-ts/DecodeError'
import * as G from 'schemata-ts/Guard'
import * as hkt from 'schemata-ts/HKT'
import * as D from 'schemata-ts/internal/Decoder'

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
export const success: <A>(a: A) => TE.TaskEither<DE.DecodeErrors, A> = TE.right

/**
 * @since 2.0.0
 * @category Constructors
 */
export const failure: <A>(e: DE.DecodeErrors) => TE.TaskEither<DE.DecodeErrors, A> =
  TE.throwError

// ------------------
// combinators
// ------------------

// export {
//   /**
//    * Interprets a schema as a decoder
//    *
//    * @since 2.0.0
//    * @category Interpreters
//    */
//   getDecoder,
// } from 'schemata-ts/derivations/DecoderSchemable'

// ------------------
// natural transformations
// ------------------

/**
 * @since 2.0.0
 * @category Constructors
 */
export const fromDecoder: NaturalTransformation11<D.URI, URI> = decoder => ({
  decode: flow(decoder.decode, TE.fromEither),
})

/**
 * Constructs a decoder from a guard
 *
 * @since 2.0.0
 * @category Natural Transformations
 */
export const fromGuard: (
  onError: (u: unknown) => DE.DecodeErrors,
) => NaturalTransformation11<G.URI, URI> = onError => guard => ({
  decode: TE.fromPredicate(guard.is, onError),
})

/**
 * Constructs a decoder from a predicate
 *
 * @since 2.0.0
 * @category Natural Transformations
 */
export const fromPredicate: <A>(
  predicate: (u: unknown) => u is A,
  onError: (u: unknown) => DE.DecodeErrors,
) => ParallelDecoder<A> = (predicate, onError) => ({
  decode: TE.fromPredicate(predicate, onError),
})

// ------------------
// instances
// ------------------

/**
 * @since 2.0.0
 * @category Instances
 */
export const URI = 'schemata-ts/ParallelDecoder'

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
 * @category Type Lambdas
 */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: ParallelDecoder<this['Output']>
}

// non-pipeables
const map_: Functor1<URI>['map'] = (fa, f) => ({
  decode: u => TE.Functor.map(fa.decode(u), f),
})
const alt_ = <A>(
  self: ParallelDecoder<A>,
  that: Lazy<ParallelDecoder<A>>,
): ParallelDecoder<A> => ({
  decode: u => TE.Alt.alt(self.decode(u), () => that().decode(u) as any),
})

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const imap: <A, B>(
  f: (a: A) => B,
  g: (b: B) => A,
) => (fa: ParallelDecoder<A>) => ParallelDecoder<B> = f => fa => map_(fa, f)

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
export const map: <A, B>(
  f: (a: A) => B,
) => (fa: ParallelDecoder<A>) => ParallelDecoder<B> = f => fa => map_(fa, f)

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
export const alt: <A>(
  that: () => ParallelDecoder<A>,
) => (fa: ParallelDecoder<A>) => ParallelDecoder<A> = that => self => alt_(self, that)

/**
 * @since 2.0.0
 * @category Instances
 */
export const Alt: Alt1<URI> = {
  ...Functor,
  alt: alt_,
}
