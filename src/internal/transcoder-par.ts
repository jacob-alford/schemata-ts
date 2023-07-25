import * as Ap from 'fp-ts/Apply'
import { flow } from 'fp-ts/function'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import type * as hkt from 'schemata-ts/internal/schemable'
import { type Transcoder } from 'schemata-ts/internal/transcoder'
import * as TCE from 'schemata-ts/TranscodeError'

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
export const applicativeValidationPar = TE.getApplicativeTaskValidation(
  T.ApplicativePar,
  TCE.Semigroup,
)

/** @internal */
export const apSecond = Ap.apSecond(applicativeValidationPar)

/** @internal */
export const apS = Ap.apS(applicativeValidationPar)

/** @internal */
export const fromTranscoder: <I, O>(
  transcoder: Transcoder<I, O>,
) => TranscoderPar<I, O> = tc => ({
  decode: flow(tc.decode, TE.fromEither),
  encode: flow(tc.encode, TE.fromEither),
})

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
