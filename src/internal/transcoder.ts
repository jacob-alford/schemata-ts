import * as E from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/function'
import { Invariant2 } from 'fp-ts/Invariant'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as Sgd from 'fp-ts/Semigroupoid'
import * as G from 'schemata-ts/Guard'
import * as hkt from 'schemata-ts/HKT'
import * as TE from 'schemata-ts/TranscodeError'

/** @internal */
export interface Transcoder<I, O> {
  readonly decode: (u: unknown) => E.Either<TE.TranscodeErrors, O>
  readonly encode: (out: O) => E.Either<TE.TranscodeErrors, I>
}

/** @internal */
export const success: <A>(a: A) => E.Either<TE.TranscodeErrors, A> = E.right

/** @internal */
export const failure: <A>(e: TE.TranscodeErrors) => E.Either<TE.TranscodeErrors, A> =
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
export const fromGuard: <I, O>(
  encoder: (out: O) => I,
  onError: (u: unknown) => TE.TranscodeErrors,
) => (guard: G.Guard<O>) => Transcoder<I, O> = (encode, onError) => guard => ({
  decode: E.fromPredicate(guard.is, onError),
  encode: flow(encode, E.right),
})

/** @internal */
export const fromPredicate: <I, O>(
  predicate: (u: unknown) => u is O,
  encode: (out: O) => I,
  onError: (u: unknown) => TE.TranscodeErrors,
) => Transcoder<I, O> = (predicate, encode, onError) => ({
  encode: flow(encode, E.right),
  decode: E.fromPredicate(predicate, onError),
})

/** @since 2.0.0 */
export const URI = 'schemata-ts/Transcoder'

/** @since 2.0.0 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Transcoder<E, A>
  }
}

/** @since 2.0.0 */
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

/** @internal */
export const Invariant: Invariant2<URI> = {
  URI,
  imap: (fa, f, g) => pipe(fa, imap(f, g)),
}

/** @internal */
export const alt: <I, A>(
  that: () => Transcoder<I, A>,
) => (fa: Transcoder<I, A>) => Transcoder<I, A> = that => self => ({
  decode: u =>
    pipe(
      self.decode(u),
      E.alt(() => that().decode(u)),
    ),
  encode: out =>
    pipe(
      self.encode(out),
      E.alt(() => that().encode(out)),
    ),
})

/** @internal */
export const compose: <B, C>(
  tBC: Transcoder<B, C>,
) => <A>(tAB: Transcoder<A, B>) => Transcoder<A, C> = tBC => tAB => ({
  decode: flow(tAB.decode, E.chain(tBC.decode)),
  encode: flow(tBC.encode, E.chain(tAB.encode)),
})

/** @internal */
export const Semigroupoid: Sgd.Semigroupoid2<URI> = {
  URI,
  compose: (tBC, tAB) => compose(tBC)(tAB),
}
