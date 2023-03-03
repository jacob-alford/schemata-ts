/**
 * A monad transformer for decoding an unknown value into an HKT2, intended for fallible kinds
 *
 * @since 2.0.0
 */
import { Alt, Alt1, Alt2, Alt3, Alt4 } from 'fp-ts/Alt'
import {
  FromEither,
  FromEither1,
  FromEither2,
  FromEither3,
  FromEither4,
} from 'fp-ts/FromEither'
import { flow, Lazy } from 'fp-ts/function'
import { Functor, Functor1, Functor2, Functor3, Functor4 } from 'fp-ts/Functor'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from 'fp-ts/HKT'
import {
  Invariant,
  Invariant1,
  Invariant2,
  Invariant3,
  Invariant4,
} from 'fp-ts/Invariant'
import {
  MonadThrow,
  MonadThrow1,
  MonadThrow2,
  MonadThrow3,
  MonadThrow4,
} from 'fp-ts/lib/MonadThrow'
import { Pointed, Pointed1, Pointed2, Pointed3, Pointed4 } from 'fp-ts/lib/Pointed'
import { ReadonlyNonEmptyArray } from 'fp-ts/ReadonlyNonEmptyArray'
import * as DE from 'schemata-ts/DecodeError'
import { getDecoder } from 'schemata-ts/derivations/DecoderSchemable'
import { Schema } from 'schemata-ts/Schema'

// ------------------
// models
// ------------------

/**
 * A monad transformer for decoding an unknown value into an HKT, intended for fallible kinds
 *
 * @since 2.0.0
 * @category Model
 */
interface DecoderT<M, A> {
  readonly decode: (u: unknown) => HKT<M, A>
}

/**
 * A monad transformer for decoding an unknown value into a Kind, intended for fallible kinds
 *
 * @since 2.0.0
 * @category Model
 */
export type DecoderT1<M extends URIS, A> = {
  readonly decode: (u: unknown) => Kind<M, A>
}

/**
 * A monad transformer for decoding an unknown value into a Kind2, intended for fallible kinds
 *
 * @since 2.0.0
 * @category Model
 */
export type DecoderT2<M extends URIS2, A> = {
  readonly decode: (u: unknown) => Kind2<M, ReadonlyNonEmptyArray<DE.DecodeError>, A>
}

/**
 * A monad transformer for decoding an unknown value into a Kind3, intended for fallible kinds
 *
 * @since 2.0.0
 * @category Model
 */
export type DecoderT3<M extends URIS3, A> = {
  readonly decode: (
    u: unknown,
  ) => Kind3<M, unknown, ReadonlyNonEmptyArray<DE.DecodeError>, A>
}

/**
 * A monad transformer for decoding an unknown value into a Kind3, intended for fallible kinds
 *
 * @since 2.0.0
 * @category Model
 */
export type DecoderT4<M extends URIS4, A> = {
  readonly decode: (
    u: unknown,
  ) => Kind4<M, never, unknown, ReadonlyNonEmptyArray<DE.DecodeError>, A>
}

// ------------------
// combinators
// ------------------

/**
 * Used to construct a decode interpreter in a kind that's derivable from either
 *
 * @since 2.0.0
 * @category Combinators
 */
export const makeDecodeInterpreter: {
  <M extends URIS4>(FE: FromEither4<M>): <E, A>(schema: Schema<E, A>) => DecoderT4<M, A>
  <M extends URIS3>(FE: FromEither3<M>): <E, A>(schema: Schema<E, A>) => DecoderT3<M, A>
  <M extends URIS2>(FE: FromEither2<M>): <E, A>(schema: Schema<E, A>) => DecoderT2<M, A>
  <M extends URIS>(FE: FromEither1<M>): <E, A>(schema: Schema<E, A>) => DecoderT1<M, A>
  <M>(FE: FromEither<M>): <E, A>(schema: Schema<E, A>) => DecoderT<M, A>
} =
  <M>(FE: FromEither<M>) =>
  <E, A>(schema: Schema<E, A>): DecoderT<M, A> => {
    const decoder = getDecoder(schema)
    return {
      decode: flow(decoder.decode, FE.fromEither),
    }
  }

// ------------------
// constructors
// ------------------

/**
 * @since 2.0.0
 * @category Constructors
 */
export const success: {
  <M extends URIS4>(M: Pointed4<M>): <A>(
    a: A,
  ) => Kind4<M, never, unknown, ReadonlyNonEmptyArray<DE.DecodeError>, A>
  <M extends URIS3>(M: Pointed3<M>): <A>(
    a: A,
  ) => Kind3<M, unknown, ReadonlyNonEmptyArray<DE.DecodeError>, A>
  <M extends URIS2>(M: Pointed2<M>): <A>(
    a: A,
  ) => Kind2<M, ReadonlyNonEmptyArray<DE.DecodeError>, A>
  <M extends URIS>(M: Pointed1<M>): <A>(a: A) => Kind<M, A>
  <M>(M: Pointed<M>): <A>(a: A) => HKT<M, A>
} =
  <M>(M: Pointed<M>) =>
  <A>(a: A): HKT<M, A> =>
    M.of(a)

/**
 * A failure case for a value that does not match the expected type
 *
 * @since 2.0.0
 * @category Constructors
 */
export const typeMismatch: {
  <M extends URIS4>(M: MonadThrow4<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.TypeMismatch>
  ) => Kind4<M, never, unknown, ReadonlyNonEmptyArray<DE.DecodeError>, A>
  <M extends URIS3>(M: MonadThrow3<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.TypeMismatch>
  ) => Kind3<M, unknown, ReadonlyNonEmptyArray<DE.DecodeError>, A>
  <M extends URIS2>(M: MonadThrow2<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.TypeMismatch>
  ) => Kind2<M, ReadonlyNonEmptyArray<DE.DecodeError>, A>
  <M extends URIS>(M: MonadThrow1<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.TypeMismatch>
  ) => Kind<M, A>
  <M>(M: MonadThrow<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.TypeMismatch>
  ) => HKT<M, A>
} =
  <M>(M: MonadThrow<M>) =>
  <A = never>(...args: ConstructorParameters<typeof DE.TypeMismatch>): HKT<M, A> =>
    M.throwError([new DE.TypeMismatch(...args)])

/**
 * A failure case for an unexpected value
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unexpectedValue: {
  <M extends URIS4>(M: MonadThrow4<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.UnexpectedValue>
  ) => Kind4<M, never, unknown, ReadonlyNonEmptyArray<DE.DecodeError>, A>
  <M extends URIS3>(M: MonadThrow3<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.UnexpectedValue>
  ) => Kind3<M, unknown, ReadonlyNonEmptyArray<DE.DecodeError>, A>
  <M extends URIS2>(M: MonadThrow2<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.UnexpectedValue>
  ) => Kind2<M, ReadonlyNonEmptyArray<DE.DecodeError>, A>
  <M extends URIS>(M: MonadThrow1<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.UnexpectedValue>
  ) => Kind<M, A>
  <M>(M: MonadThrow<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.UnexpectedValue>
  ) => HKT<M, A>
} =
  <M>(M: MonadThrow<M>) =>
  <A = never>(...args: ConstructorParameters<typeof DE.UnexpectedValue>): HKT<M, A> =>
    M.throwError([new DE.UnexpectedValue(...args)])

/**
 * A failure case at a specific index
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtIndex: {
  <M extends URIS4>(M: MonadThrow4<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.ErrorAtIndex>
  ) => Kind4<M, never, unknown, ReadonlyNonEmptyArray<DE.DecodeError>, A>
  <M extends URIS3>(M: MonadThrow3<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.ErrorAtIndex>
  ) => Kind3<M, unknown, ReadonlyNonEmptyArray<DE.DecodeError>, A>
  <M extends URIS2>(M: MonadThrow2<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.ErrorAtIndex>
  ) => Kind2<M, ReadonlyNonEmptyArray<DE.DecodeError>, A>
  <M extends URIS>(M: MonadThrow1<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.ErrorAtIndex>
  ) => Kind<M, A>
  <M>(M: MonadThrow<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.ErrorAtIndex>
  ) => HKT<M, A>
} =
  <M>(M: MonadThrow<M>) =>
  <A = never>(...args: ConstructorParameters<typeof DE.ErrorAtIndex>): HKT<M, A> =>
    M.throwError([new DE.ErrorAtIndex(...args)])

/**
 * A failure case at a specific key
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtKey: {
  <M extends URIS4>(M: MonadThrow4<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.ErrorAtKey>
  ) => Kind4<M, never, unknown, ReadonlyNonEmptyArray<DE.DecodeError>, A>
  <M extends URIS3>(M: MonadThrow3<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.ErrorAtKey>
  ) => Kind3<M, unknown, ReadonlyNonEmptyArray<DE.DecodeError>, A>
  <M extends URIS2>(M: MonadThrow2<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.ErrorAtKey>
  ) => Kind2<M, ReadonlyNonEmptyArray<DE.DecodeError>, A>
  <M extends URIS>(M: MonadThrow1<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.ErrorAtKey>
  ) => Kind<M, A>
  <M>(M: MonadThrow<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.ErrorAtKey>
  ) => HKT<M, A>
} =
  <M>(M: MonadThrow<M>) =>
  <A = never>(...args: ConstructorParameters<typeof DE.ErrorAtKey>): HKT<M, A> =>
    M.throwError([new DE.ErrorAtKey(...args)])

/**
 * A failure case for a union member
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtUnionMember: {
  <M extends URIS4>(M: MonadThrow4<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.ErrorAtUnionMember>
  ) => Kind4<M, never, unknown, ReadonlyNonEmptyArray<DE.DecodeError>, A>
  <M extends URIS3>(M: MonadThrow3<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.ErrorAtUnionMember>
  ) => Kind3<M, unknown, ReadonlyNonEmptyArray<DE.DecodeError>, A>
  <M extends URIS2>(M: MonadThrow2<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.ErrorAtUnionMember>
  ) => Kind2<M, ReadonlyNonEmptyArray<DE.DecodeError>, A>
  <M extends URIS>(M: MonadThrow1<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.ErrorAtUnionMember>
  ) => Kind<M, A>
  <M>(M: MonadThrow<M>): <A = never>(
    ...args: ConstructorParameters<typeof DE.ErrorAtUnionMember>
  ) => HKT<M, A>
} =
  <M>(M: MonadThrow<M>) =>
  <A = never>(...args: ConstructorParameters<typeof DE.ErrorAtUnionMember>): HKT<M, A> =>
    M.throwError([new DE.ErrorAtUnionMember(...args)])

// ------------------
// instance methods
// ------------------

/**
 * Constructs a non-pipeable map for decode transformers
 *
 * @since 2.0.0
 * @category Instance Methods
 */
export const map: {
  <F extends URIS4>(F: Functor4<F>): <A, B>(
    fa: DecoderT4<F, A>,
    f: (a: A) => B,
  ) => DecoderT4<F, B>
  <F extends URIS3>(F: Functor3<F>): <A, B>(
    fa: DecoderT3<F, A>,
    f: (a: A) => B,
  ) => DecoderT3<F, B>
  <F extends URIS2>(F: Functor2<F>): <A, B>(
    fa: DecoderT2<F, A>,
    f: (a: A) => B,
  ) => DecoderT2<F, B>
  <F extends URIS>(F: Functor1<F>): <A, B>(
    fa: DecoderT1<F, A>,
    f: (a: A) => B,
  ) => DecoderT1<F, B>
  <F>(F: Functor<F>): <A, B>(fa: DecoderT<F, A>, f: (a: A) => B) => DecoderT<F, B>
} =
  <F>(F: Functor<F>) =>
  <A, B>(fa: DecoderT<F, A>, f: (a: A) => B): DecoderT<F, B> => ({
    decode: u => F.map(fa.decode(u), f),
  })

/**
 * Constructs a non-pipeable alt for decode transformers
 *
 * @since 2.0.0
 * @category Instance Methods
 */
export const alt: {
  <F extends URIS4>(F: Alt4<F>): <A>(
    self: DecoderT4<F, A>,
    that: Lazy<DecoderT4<F, A>>,
  ) => DecoderT4<F, A>
  <F extends URIS3>(F: Alt3<F>): <A>(
    self: DecoderT3<F, A>,
    that: Lazy<DecoderT3<F, A>>,
  ) => DecoderT3<F, A>
  <F extends URIS2>(F: Alt2<F>): <A>(
    self: DecoderT2<F, A>,
    that: Lazy<DecoderT2<F, A>>,
  ) => DecoderT2<F, A>
  <F extends URIS>(F: Alt1<F>): <A>(
    self: DecoderT1<F, A>,
    that: Lazy<DecoderT1<F, A>>,
  ) => DecoderT1<F, A>
  <F>(F: Alt<F>): <A>(self: DecoderT<F, A>, that: Lazy<DecoderT<F, A>>) => DecoderT<F, A>
} =
  <F>(F: Alt<F>) =>
  <A>(self: DecoderT<F, A>, that: Lazy<DecoderT<F, A>>): DecoderT<F, A> => ({
    decode: u => F.alt(self.decode(u), () => that().decode(u)),
  })

/**
 * Constructs a non-pipeable imap for decode transformers
 *
 * @since 2.0.0
 * @category Instance Methods
 */
export const imap: {
  <F extends URIS4>(F: Invariant4<F>): <A, B>(
    fa: DecoderT4<F, A>,
    f: (a: A) => B,
    g: (b: B) => A,
  ) => DecoderT4<F, B>
  <F extends URIS3>(F: Invariant3<F>): <A, B>(
    fa: DecoderT3<F, A>,
    f: (a: A) => B,
    g: (b: B) => A,
  ) => DecoderT3<F, B>
  <F extends URIS2>(F: Invariant2<F>): <A, B>(
    fa: DecoderT2<F, A>,
    f: (a: A) => B,
    g: (b: B) => A,
  ) => DecoderT2<F, B>
  <F extends URIS>(F: Invariant1<F>): <A, B>(
    fa: DecoderT1<F, A>,
    f: (a: A) => B,
    g: (b: B) => A,
  ) => DecoderT1<F, B>
  <F>(F: Invariant<F>): <A, B>(
    fa: DecoderT<F, A>,
    f: (a: A) => B,
    g: (b: B) => A,
  ) => DecoderT<F, B>
} =
  <F>(F: Invariant<F>) =>
  <A, B>(fa: DecoderT<F, A>, f: (a: A) => B, g: (b: B) => A): DecoderT<F, B> => ({
    decode: u => F.imap(fa.decode(u), f, g),
  })
