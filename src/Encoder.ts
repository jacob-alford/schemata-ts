/**
 * Represents a typeclass and data type for encoding values that are the transformed
 * output of decoder to its expected input
 *
 * @since 2.0.0
 */
import { Category2 } from 'fp-ts/Category'
import { Contravariant2 } from 'fp-ts/Contravariant'
import { flow, identity } from 'fp-ts/function'
import { Invariant2 } from 'fp-ts/Invariant'
import { Semigroupoid2 } from 'fp-ts/Semigroupoid'
import * as hkt from 'schemata-ts/HKT'

/**
 * Represents a typeclass and data type for encoding values that are the transformed
 * output of decoder to its expected input
 *
 * @since 2.0.0
 * @category Model
 */
export interface Encoder<I, O> {
  readonly encode: (a: O) => I
}

// ------------------
// combinators
// ------------------

export {
  /**
   * Interprets a schema as a decoder
   *
   * @since 2.0.0
   * @category Interpreters
   */
  getEncoder,
} from 'schemata-ts/derivations/EncoderSchemable'

// ------------------
// instances
// ------------------

/**
 * @since 2.0.0
 * @category Instances
 */
export const URI = 'schemata-ts/Encoder'

/**
 * @since 2.0.0
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Encoder<E, A>
  }
}

/**
 * @since 2.0.0
 * @category Type Lambdas
 */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Encoder<this['Input'], this['Output']>
}

// non-pipeables
const contramap_: Contravariant2<URI>['contramap'] = (fa, f) => ({
  encode: flow(f, fa.encode),
})
const compose_: Semigroupoid2<URI>['compose'] = (bc, ab) => ({
  encode: flow(bc.encode, ab.encode),
})
const imap_: Invariant2<URI>['imap'] = (fa, _, g) => contramap_(fa, g)

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const imap: <A, B>(
  f: (a: A) => B,
  g: (b: B) => A,
) => <I>(fa: Encoder<I, A>) => Encoder<I, B> = (f, g) => fa => imap_(fa, f, g)

/**
 * @since 2.0.0
 * @category Instances
 */
export const Invariant: Invariant2<URI> = {
  URI,
  imap: imap_,
}

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const compose: <B, C>(
  ab: Encoder<B, C>,
) => <A>(bc: Encoder<A, B>) => Encoder<A, C> = bc => ab => compose_(bc, ab)

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const id: Category2<URI>['id'] = () => ({
  encode: identity,
})

/**
 * @since 2.0.0
 * @category Instances
 */
export const Category: Category2<URI> = {
  URI,
  compose: compose_,
  id,
}
