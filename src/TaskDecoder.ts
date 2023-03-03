import { Alt1 } from 'fp-ts/Alt'
import { Functor1 } from 'fp-ts/Functor'
import { Invariant1 } from 'fp-ts/Invariant'
import { ReadonlyNonEmptyArray } from 'fp-ts/ReadonlyNonEmptyArray'
import * as TE from 'fp-ts/TaskEither'
import { DecodeError } from 'schemata-ts/DecodeError'
import * as DT from 'schemata-ts/DecoderT'
import * as hkt from 'schemata-ts/HKT'
import { Schema } from 'schemata-ts/Schema'

/**
 * A decoder that decodes into a TaskEither
 *
 * @since 2.0.0
 * @category Model
 */
export interface TaskDecoder<A> {
  readonly decode: (u: unknown) => TE.TaskEither<ReadonlyNonEmptyArray<DecodeError>, A>
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
 * A failure case for a value that does not match the expected type
 *
 * @since 2.0.0
 * @category Constructors
 */
export const typeMismatch = DT.typeMismatch(TE.MonadThrow)

/**
 * A failure case for an unexpected value
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unexpectedValue = DT.unexpectedValue(TE.MonadThrow)

/**
 * A failure case at a specific index
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtIndex = DT.errorAtIndex(TE.MonadThrow)

/**
 * A failure case at a specific key
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtKey = DT.errorAtKey(TE.MonadThrow)

/**
 * A failure case for a union member
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtUnionMember = DT.errorAtUnionMember(TE.MonadThrow)

// ------------------
// combinators
// ------------------

/**
 * @since 2.0.0
 * @category Interpreters
 */
export const getTaskDecoder: <E, A>(schema: Schema<E, A>) => TaskDecoder<A> =
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
  interface URItoKind<A> {
    readonly [URI]: TaskDecoder<A>
  }
}

/**
 * @since 2.0.0
 * @category Type Lambdas
 */
export interface TypeLambda extends hkt.TypeLambda {
  readonly type: TaskDecoder<this['Target']>
}

// non-pipeables
const map_: Functor1<URI>['map'] = DT.map(TE.Functor)
const alt_: Alt1<URI>['alt'] = DT.alt(TE.Alt)

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const imap: <A, B>(
  f: (a: A) => B,
  g: (b: B) => A,
) => (fa: TaskDecoder<A>) => TaskDecoder<B> = f => fa => map_(fa, f)

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
export const map: <A, B>(f: (a: A) => B) => (fa: TaskDecoder<A>) => TaskDecoder<B> =
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
export const alt: <A>(
  that: () => TaskDecoder<A>,
) => (fa: TaskDecoder<A>) => TaskDecoder<A> = that => fa => alt_(fa, that)

/**
 * @since 2.0.0
 * @category Instances
 */
export const Alt: Alt1<URI> = {
  ...Functor,
  alt: alt_,
}
