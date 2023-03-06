import { Alt2 } from 'fp-ts/Alt'
import { Functor2 } from 'fp-ts/Functor'
import { Invariant2 } from 'fp-ts/Invariant'
import * as IOE from 'fp-ts/IOEither'
import { DecodeFailure } from 'schemata-ts/DecodeError'
import { makeDecodeInterpreter } from 'schemata-ts/DecoderT'
import * as DT from 'schemata-ts/DecoderT'
import { Schema } from 'schemata-ts/Schema'

/**
 * A decoder that decodes into a TaskEither
 *
 * @since 2.0.0
 * @category Model
 */
export interface IODecoder<I, A> {
  readonly decode: (u: unknown) => IOE.IOEither<DecodeFailure<I>, A>
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
export const getIODecoder: <I, A>(schema: Schema<I, A>) => IODecoder<I, A> =
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
  interface URItoKind2<E, A> {
    readonly [URI]: IODecoder<E, A>
  }
}

// non-pipeables
const map_: Functor2<URI>['map'] = DT.map(IOE.Functor)
const altW_ = DT.altW(IOE.Alt)

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const imap: <A, B>(
  f: (a: A) => B,
  g: (b: B) => A,
) => <I>(fa: IODecoder<I, A>) => IODecoder<I, B> = f => fa => map_(fa, f)

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
export const map: <A, B>(f: (a: A) => B) => <I>(fa: IODecoder<I, A>) => IODecoder<I, B> =
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
  that: () => IODecoder<I2, A>,
) => <I1>(fa: IODecoder<I1, A>) => IODecoder<I1 | I2, A> = that => fa => altW_(fa, that)

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const alt: <I, A>(
  that: () => IODecoder<I, A>,
) => (fa: IODecoder<I, A>) => IODecoder<I, A> = altW

/**
 * @since 2.0.0
 * @category Instances
 */
export const Alt: Alt2<URI> = {
  ...Functor,
  alt: altW_,
}
