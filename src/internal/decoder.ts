import { Alt1 } from 'fp-ts/Alt'
import * as E from 'fp-ts/Either'
import { Lazy } from 'fp-ts/function'
import { Functor1 } from 'fp-ts/Functor'
import { Invariant1 } from 'fp-ts/Invariant'
import { NaturalTransformation11 } from 'fp-ts/NaturalTransformation'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as DE from 'schemata-ts/DecodeError'
import * as G from 'schemata-ts/Guard'
import * as hkt from 'schemata-ts/HKT'

export interface Decoder<A> {
  readonly decode: (u: unknown) => E.Either<DE.DecodeErrors, A>
}

/** @internal */
export const success: <A>(a: A) => E.Either<DE.DecodeErrors, A> = E.right

/** @internal */
export const failure: <A>(e: DE.DecodeErrors) => E.Either<DE.DecodeErrors, A> =
  E.throwError

/** @internal */
export const decodeErrors = (
  ...errors: RNEA.ReadonlyNonEmptyArray<DE.DecodeError>
): DE.DecodeErrors => new DE.DecodeErrors(errors)

/** @internal */
export const typeMismatch = (
  ...args: ConstructorParameters<typeof DE.TypeMismatch>
): DE.DecodeError => new DE.TypeMismatch(...args)

/** @internal */
export const unexpectedValue = (
  ...args: ConstructorParameters<typeof DE.UnexpectedValue>
): DE.DecodeError => new DE.UnexpectedValue(...args)

/** @internal */
export const errorAtIndex = (
  ...args: ConstructorParameters<typeof DE.ErrorAtIndex>
): DE.DecodeError => new DE.ErrorAtIndex(...args)

/** @internal */
export const errorAtKey = (
  ...args: ConstructorParameters<typeof DE.ErrorAtKey>
): DE.DecodeError => new DE.ErrorAtKey(...args)

/** @internal */
export const errorAtUnionMember = (
  ...args: ConstructorParameters<typeof DE.ErrorAtUnionMember>
): DE.DecodeError => new DE.ErrorAtUnionMember(...args)

/** @internal */
export const fromGuard: (
  onError: (u: unknown) => DE.DecodeErrors,
) => NaturalTransformation11<G.URI, URI> = onError => guard => ({
  decode: E.fromPredicate(guard.is, onError),
})

/** @internal */
export const fromPredicate: <A>(
  predicate: (u: unknown) => u is A,
  onError: (u: unknown) => DE.DecodeErrors,
) => Decoder<A> = (predicate, onError) => ({
  decode: E.fromPredicate(predicate, onError),
})

/** @since 2.0.0 */
export const URI = 'schemata-ts/Decoder'

/** @since 2.0.0 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly [URI]: Decoder<A>
  }
}

/** @internal */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Decoder<this['Output']>
}

// non-pipeables
const map_: Functor1<URI>['map'] = (fa, f) => ({
  decode: u => E.Functor.map(fa.decode(u), f),
})
const alt_ = <A>(self: Decoder<A>, that: Lazy<Decoder<A>>): Decoder<A> => ({
  decode: u => E.Alt.alt(self.decode(u), () => that().decode(u) as any),
})

/** @internal */
export const imap: <A, B>(
  f: (a: A) => B,
  g: (b: B) => A,
) => (fa: Decoder<A>) => Decoder<B> = f => fa => map_(fa, f)

/** @internal */
export const Invariant: Invariant1<URI> = {
  URI,
  imap: map_,
}

/** @internal */
export const map: <A, B>(f: (a: A) => B) => (fa: Decoder<A>) => Decoder<B> = f => fa =>
  map_(fa, f)

/** @internal */
export const Functor: Functor1<URI> = {
  URI,
  map: map_,
}

/** @internal */
export const alt: <A>(that: () => Decoder<A>) => (fa: Decoder<A>) => Decoder<A> =
  that => self =>
    alt_(self, that)

/** @internal */
export const Alt: Alt1<URI> = {
  ...Functor,
  alt: alt_,
}
