import { Alt1 } from 'fp-ts/Alt'
import { Functor1 } from 'fp-ts/Functor'
import { Invariant1 } from 'fp-ts/Invariant'
import * as IOE from 'fp-ts/IOEither'
import { ReadonlyNonEmptyArray } from 'fp-ts/ReadonlyNonEmptyArray'
import { DecodeError } from 'schemata-ts/DecodeError'
import { makeDecodeInterpreter } from 'schemata-ts/DecoderT'
import * as DT from 'schemata-ts/DecoderT'
import * as hkt from 'schemata-ts/HKT'
import { Schema } from 'schemata-ts/Schema'

/**
 * A decoder that decodes into a TaskEither
 *
 * @since 2.0.0
 * @category Model
 */
export interface IODecoder<A> {
  readonly decode: (u: unknown) => IOE.IOEither<ReadonlyNonEmptyArray<DecodeError>, A>
}

// ------------------
// constructors
// ------------------

/**
 * @since 2.0.0
 * @category Constructors
 */
export const success = DT.success(IOE.Pointed)

/**
 * @since 2.0.0
 * @category Constructors
 */
export const failure = DT.failure(IOE.MonadThrow)

// ------------------
// constructors
// ------------------

/**
 * @since 2.0.0
 * @category Interpreters
 */
export const getIODecoder: <E, A>(schema: Schema<E, A>) => IODecoder<A> =
  makeDecodeInterpreter(IOE.FromEither)

// ------------------
// instances
// ------------------

/**
 * @since 2.0.0
 * @category Instances
 */
export const URI = 'schemata-ts/IODecoder'

/**
 * @since 2.0.0
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly [URI]: IODecoder<A>
  }
}

/**
 * @since 2.0.0
 * @category Type Lambdas
 */
export interface TypeLambda extends hkt.TypeLambda {
  readonly type: IODecoder<this['Target']>
}

// non-pipeables
const map_: Functor1<URI>['map'] = DT.map(IOE.Functor)
const alt_: Alt1<URI>['alt'] = DT.alt(IOE.Alt)

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const imap: <A, B>(
  f: (a: A) => B,
  g: (b: B) => A,
) => (fa: IODecoder<A>) => IODecoder<B> = f => fa => map_(fa, f)

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
export const map: <A, B>(f: (a: A) => B) => (fa: IODecoder<A>) => IODecoder<B> =
  f => fa =>
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
export const alt: <A>(that: () => IODecoder<A>) => (fa: IODecoder<A>) => IODecoder<A> =
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
