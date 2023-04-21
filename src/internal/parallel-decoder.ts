import { Alt1 } from 'fp-ts/Alt'
import { flow, Lazy } from 'fp-ts/function'
import { Functor1 } from 'fp-ts/Functor'
import { Invariant1 } from 'fp-ts/Invariant'
import { NaturalTransformation11 } from 'fp-ts/NaturalTransformation'
import * as TE from 'fp-ts/TaskEither'
import * as DE from 'schemata-ts/DecodeError'
import * as G from 'schemata-ts/Guard'
import * as hkt from 'schemata-ts/HKT'
import * as D from 'schemata-ts/internal/Decoder'

/** @internal */
export interface ParallelDecoder<A> {
  readonly decode: (u: unknown) => TE.TaskEither<DE.DecodeErrors, A>
}

/** @internal */
export const success: <A>(a: A) => TE.TaskEither<DE.DecodeErrors, A> = TE.right

/** @internal */
export const failure: <A>(e: DE.DecodeErrors) => TE.TaskEither<DE.DecodeErrors, A> =
  TE.throwError

/** @internal */
export const fromDecoder: NaturalTransformation11<D.URI, URI> = decoder => ({
  decode: flow(decoder.decode, TE.fromEither),
})

/** @internal */
export const fromGuard: (
  onError: (u: unknown) => DE.DecodeErrors,
) => NaturalTransformation11<G.URI, URI> = onError => guard => ({
  decode: TE.fromPredicate(guard.is, onError),
})

/** @internal */
export const fromPredicate: <A>(
  predicate: (u: unknown) => u is A,
  onError: (u: unknown) => DE.DecodeErrors,
) => ParallelDecoder<A> = (predicate, onError) => ({
  decode: TE.fromPredicate(predicate, onError),
})

/** @since 2.0.0 */
export const URI = 'schemata-ts/ParallelDecoder'

/** @since 2.0.0 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly [URI]: ParallelDecoder<A>
  }
}

/** @since 2.0.0 */
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

/** @internal */
export const imap: <A, B>(
  f: (a: A) => B,
  g: (b: B) => A,
) => (fa: ParallelDecoder<A>) => ParallelDecoder<B> = f => fa => map_(fa, f)

/** @internal */
export const Invariant: Invariant1<URI> = {
  URI,
  imap: map_,
}

/** @internal */
export const map: <A, B>(
  f: (a: A) => B,
) => (fa: ParallelDecoder<A>) => ParallelDecoder<B> = f => fa => map_(fa, f)

/** @internal */
export const Functor: Functor1<URI> = {
  URI,
  map: map_,
}

/** @internal */
export const alt: <A>(
  that: () => ParallelDecoder<A>,
) => (fa: ParallelDecoder<A>) => ParallelDecoder<A> = that => self => alt_(self, that)

/** @internal */
export const Alt: Alt1<URI> = {
  ...Functor,
  alt: alt_,
}
