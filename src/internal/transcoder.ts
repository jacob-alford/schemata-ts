import * as Ap from 'fp-ts/Apply'
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import type * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import type * as G from 'schemata-ts/Guard'
import { type Either } from 'schemata-ts/internal/either'
import type * as hkt from 'schemata-ts/internal/schemable'
import * as TE from 'schemata-ts/TranscodeError'

export interface Transcoder<I, O> {
  readonly decode: (u: unknown) => Either<TE.TranscodeErrors, O>
  readonly encode: (out: O) => Either<TE.TranscodeErrors, I>
}

/** @internal */
export const success: <A>(a: A) => Either<TE.TranscodeErrors, A> = E.right

/** @internal */
export const failure: <A>(e: TE.TranscodeErrors) => Either<TE.TranscodeErrors, A> =
  E.throwError

/** @internal */
export const transcodeErrors = (
  ...errors: RNEA.ReadonlyNonEmptyArray<TE.TranscodeError>
): TE.TranscodeErrors => new TE.TranscodeErrors(errors)

/** @internal */
export const typeMismatch = (
  ...args: ConstructorParameters<typeof TE.TypeMismatch>
): TE.TranscodeError => new TE.TypeMismatch(...args)

/** @internal */
export const unexpectedValue = (
  ...args: ConstructorParameters<typeof TE.UnexpectedValue>
): TE.TranscodeError => new TE.UnexpectedValue(...args)

/** @internal */
export const serializationError = (
  ...args: ConstructorParameters<typeof TE.SerializationError>
): TE.TranscodeError => new TE.SerializationError(...args)

/** @internal */
export const errorAtIndex = (
  ...args: ConstructorParameters<typeof TE.ErrorAtIndex>
): TE.TranscodeError => new TE.ErrorAtIndex(...args)

/** @internal */
export const errorAtKey = (
  ...args: ConstructorParameters<typeof TE.ErrorAtKey>
): TE.TranscodeError => new TE.ErrorAtKey(...args)

/** @internal */
export const errorAtUnionMember = (
  ...args: ConstructorParameters<typeof TE.ErrorAtUnionMember>
): TE.TranscodeError => new TE.ErrorAtUnionMember(...args)

/** @internal */
export const applicativeValidation = E.getApplicativeValidation(TE.Semigroup)

/** @internal */
export const apSecond = Ap.apSecond(applicativeValidation)

/** @internal */
export const apS = Ap.apS(applicativeValidation)

/** @internal */
export const fromGuard: <I, O>(
  encoder: (out: O) => I,
  onError: (u: unknown) => TE.TranscodeErrors,
) => (guard: G.Guard<O>) => Transcoder<I, O> = (encode, onError) => guard => ({
  decode: E.fromPredicate(guard.is, onError),
  encode: flow(encode, E.right),
})

export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Transcoder<this['Input'], this['Output']>
}

/** @internal */
export const imap: <A, B>(
  f: (a: A) => B,
  g: (b: B) => A,
) => <I>(fa: Transcoder<I, A>) => Transcoder<I, B> = (f, g) => fa => ({
  decode: u => E.Functor.map(fa.decode(u), f),
  encode: out => fa.encode(g(out)),
})
