import { flow, pipe } from 'fp-ts/function'
import type * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import type * as G from 'schemata-ts/Guard'
import type * as hkt from 'schemata-ts/internal/schemable'
import { type Transcoder } from 'schemata-ts/internal/transcoder'
import * as TCE from 'schemata-ts/TranscodeError'

/** @internal */
export interface TranscoderPar<I, O> {
  readonly decode: (u: unknown) => TE.TaskEither<TCE.TranscodeErrors, O>
  readonly encode: (out: O) => TE.TaskEither<TCE.TranscodeErrors, I>
}

/** @internal */
export const success: <A>(a: A) => TE.TaskEither<TCE.TranscodeErrors, A> = TE.right

/** @internal */
export const failure: <A>(
  e: TCE.TranscodeErrors,
) => TE.TaskEither<TCE.TranscodeErrors, A> = TE.throwError

/** @internal */
export const transcodeErrors = (
  ...errors: RNEA.ReadonlyNonEmptyArray<TCE.TranscodeError>
): TCE.TranscodeErrors => new TCE.TranscodeErrors(errors)

/** @internal */
export const typeMismatch = (
  ...args: ConstructorParameters<typeof TCE.TypeMismatch>
): TCE.TranscodeError => new TCE.TypeMismatch(...args)

/** @internal */
export const unexpectedValue = (
  ...args: ConstructorParameters<typeof TCE.UnexpectedValue>
): TCE.TranscodeError => new TCE.UnexpectedValue(...args)

/** @internal */
export const errorAtIndex = (
  ...args: ConstructorParameters<typeof TCE.ErrorAtIndex>
): TCE.TranscodeError => new TCE.ErrorAtIndex(...args)

/** @internal */
export const errorAtKey = (
  ...args: ConstructorParameters<typeof TCE.ErrorAtKey>
): TCE.TranscodeError => new TCE.ErrorAtKey(...args)

/** @internal */
export const errorAtUnionMember = (
  ...args: ConstructorParameters<typeof TCE.ErrorAtUnionMember>
): TCE.TranscodeError => new TCE.ErrorAtUnionMember(...args)

/** @internal */
export const applicativeValidationPar = TE.getApplicativeTaskValidation(
  T.ApplicativePar,
  TCE.Semigroup,
)

/** @internal */
export const fromGuard: <I, O>(
  encoder: (out: O) => I,
  onError: (u: unknown) => TCE.TranscodeErrors,
) => (guard: G.Guard<O>) => TranscoderPar<I, O> = (encode, onError) => guard => ({
  decode: TE.fromPredicate(guard.is, onError),
  encode: flow(encode, TE.right),
})

/** @internal */
export const fromPredicate: <I, O>(
  predicate: (u: unknown) => u is O,
  encode: (out: O) => I,
  onError: (u: unknown) => TCE.TranscodeErrors,
) => TranscoderPar<I, O> = (predicate, encode, onError) => ({
  encode: flow(encode, TE.right),
  decode: TE.fromPredicate(predicate, onError),
})

/** @internal */
export const fromTranscoder: <I, O>(
  transcoder: Transcoder<I, O>,
) => TranscoderPar<I, O> = tc => ({
  decode: flow(tc.decode, TE.fromEither),
  encode: flow(tc.encode, TE.fromEither),
})

/** @since 2.0.0 */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: TranscoderPar<this['Input'], this['Output']>
}

/** @internal */
export const imap: <A, B>(
  f: (a: A) => B,
  g: (b: B) => A,
) => <I>(fa: TranscoderPar<I, A>) => TranscoderPar<I, B> = (f, g) => fa => ({
  decode: u => TE.Functor.map(fa.decode(u), f),
  encode: out => fa.encode(g(out)),
})

/** @internal */
export const alt: <I, A>(
  that: () => TranscoderPar<I, A>,
) => (fa: TranscoderPar<I, A>) => TranscoderPar<I, A> = that => self => ({
  decode: u =>
    pipe(
      self.decode(u),
      TE.alt(() => that().decode(u)),
    ),
  encode: out =>
    pipe(
      self.encode(out),
      TE.alt(() => that().encode(out)),
    ),
})

/** @internal */
export const compose: <B, C>(
  tBC: TranscoderPar<B, C>,
) => <A>(tAB: TranscoderPar<A, B>) => TranscoderPar<A, C> = tBC => tAB => ({
  decode: flow(tAB.decode, TE.chain(tBC.decode)),
  encode: flow(tBC.encode, TE.chain(tAB.encode)),
})
