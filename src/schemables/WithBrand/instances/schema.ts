/**
 * Schemable for constructing a branded newtype
 *
 * @since 1.0.0
 */
import * as SC from '../../../SchemaExt'
import { Branded } from 'io-ts'

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Schema =
  <B>() =>
  <O, A>(target: SC.SchemaExt<O, A>): SC.SchemaExt<O, Branded<A, B>> =>
    SC.make(_ => _.brand<B>()<O, A>(target(_)))
