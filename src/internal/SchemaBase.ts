import * as SC from '../SchemaExt'
import * as S from '../SchemableExt'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as R from 'fp-ts/Reader'
import * as D from '../Decoder'
import { Refinement } from 'fp-ts/Refinement'
import { HKT2, Kind2 } from 'fp-ts/HKT'
import { WithRefine2 } from './Schemable2'
import { flow, pipe } from 'fp-ts/function'
import { sequenceS } from 'fp-ts/Apply'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any

export const URI = 'SchemaExt'

export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    readonly SchemaExt: SC.SchemaExt<E, A>
  }
}

/**
 * @since 1.0.0
 * @category Primitives
 */
export const String: S.SchemableExt2<URI>['string'] = SC.make(_ => _.string)

/**
 * @since 1.0.0
 * @category Primitives
 */
export const Number: S.SchemableExt2<URI>['number'] = SC.make(_ => _.number)

/**
 * @since 1.0.0
 * @category Primitives
 */
export const Boolean: S.SchemableExt2<URI>['boolean'] = SC.make(_ => _.boolean)

/**
 * @since 1.0.0
 * @category Primitives
 */
export const UnknownArray: S.SchemableExt2<URI>['UnknownArray'] = SC.make(
  _ => _.UnknownArray
)

/**
 * @since 1.0.0
 * @category Primitives
 */
export const UnknownRecord: S.SchemableExt2<URI>['UnknownRecord'] = SC.make(
  _ => _.UnknownRecord
)

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Refine =
  <O, A, B extends A>(refinement: Refinement<A, B>, id: string) =>
  (from: SC.SchemaExt<O, A>): SC.SchemaExt<O, B> =>
    SC.make(_ => _.refine<O, A, B>(refinement, id)(from(_)))

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Nullable: S.SchemableExt2<URI>['nullable'] = or =>
  SC.make(_ => _.nullable(or(_)))

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Struct: <O, A>(props: {
  [K in keyof A]: SC.SchemaExt<O, A[K]>
}) => SC.SchemaExt<O, { [K in keyof A]: A[K] }> = flow(sequenceS(R.Apply), SC.make)

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Partial: <O, A>(props: {
  [K in keyof A]: SC.SchemaExt<O, A[K]>
}) => SC.SchemaExt<O, Partial<{ [K in keyof A]: A[K] }>> = flow(
  sequenceS(R.Apply),
  props => SC.make(_ => _.partial(props(_)))
)

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Literal: S.SchemableExt2<URI>['literal'] = (...values) =>
  SC.make(_ => _.literal(...values))
