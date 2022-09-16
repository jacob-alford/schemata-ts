/**
 * TODO: Add module comment
 *
 * @since 0.0.2
 */
import { Kind, Kind2, URIS, URIS2, HKT } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as Str from 'fp-ts/string'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import { pipe } from 'fp-ts/function'

/**
 * @since 0.0.2
 * @category Internal
 */
interface TestBrand {
  readonly Test: unique symbol
}

/**
 * TODO: Add module comment
 *
 * @since 0.0.2
 * @category Model
 */
export type Test = string & TestBrand

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams<S> = HKT<S, Test>

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, Test>

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, Test>

/**
 * @since 0.0.2
 * @category Refinements
 */
export const isTest = (s: string): s is Test => {
  throw new Error('not implemented')
}

/**
 * @since 0.0.2
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(D.string, D.refine(isTest, 'Test'))

/**
 * @since 0.0.2
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = Str.Eq

/**
 * @since 0.0.2
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = pipe(G.string, G.refine(isTest))

/**
 * @since 0.0.2
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isTest, 'Test')
)

/**
 * @since 0.0.2
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(t.string, t.refine(isTest, 'Test'))
