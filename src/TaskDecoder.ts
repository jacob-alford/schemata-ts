import { Alt2 } from 'fp-ts/Alt'
import { Functor2 } from 'fp-ts/Functor'
import { Invariant2 } from 'fp-ts/Invariant'
import * as TE from 'fp-ts/TaskEither'
import { DecodeFailure } from 'schemata-ts/DecodeError'
import * as DT from 'schemata-ts/DecoderT'
import { Schema } from 'schemata-ts/Schema'

/**
 * A decoder that decodes into a TaskEither
 *
 * @since 2.0.0
 * @category Model
 */
export interface TaskDecoder<I, A> {
  readonly decode: (u: unknown) => TE.TaskEither<DecodeFailure<I>, A>
}

// ------------------
// constructors
// ------------------

/**
 * @since 2.0.0
 * @category Constructors
 */
export const success = DT.success(TE.Pointed)

/**
 * @since 2.0.0
 * @category Constructors
 */
export const failure = DT.failure(TE.MonadThrow)

// ------------------
// combinators
// ------------------

/**
 * @since 2.0.0
 * @category Interpreters
 */
export const getTaskDecoder: <I, A>(schema: Schema<I, A>) => TaskDecoder<I, A> =
  DT.makeDecodeInterpreter(TE.FromEither)

// ------------------
// instances
// ------------------

/**
 * @since 2.0.0
 * @category Instances
 */
export const URI = 'schemata-ts/TaskDecoder'

/**
 * @since 2.0.0
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: TaskDecoder<E, A>
  }
}

// non-pipeables
const map_: Functor2<URI>['map'] = DT.map(TE.Functor)
const altW_ = DT.altW(TE.Alt)

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const imap: <A, B>(
  f: (a: A) => B,
  g: (b: B) => A,
) => <I>(fa: TaskDecoder<I, A>) => TaskDecoder<I, B> = f => fa => map_(fa, f)

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
export const map: <A, B>(
  f: (a: A) => B,
) => <I>(fa: TaskDecoder<I, A>) => TaskDecoder<I, B> = f => fa => map_(fa, f)

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
  that: () => TaskDecoder<I2, A>,
) => <I1>(fa: TaskDecoder<I1, A>) => TaskDecoder<I1 | I2, A> = that => fa =>
  altW_(fa, that)

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const alt: <I, A>(
  that: () => TaskDecoder<I, A>,
) => (fa: TaskDecoder<I, A>) => TaskDecoder<I, A> = altW

/**
 * @since 2.0.0
 * @category Instances
 */
export const Alt: Alt2<URI> = {
  ...Functor,
  alt: altW_,
}
