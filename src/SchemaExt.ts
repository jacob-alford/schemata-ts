/**
 * Schema combinators for SchemableExt
 *
 * @since 0.0.1
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import { unsafeCoerce } from 'fp-ts/function'
import { memoize } from 'io-ts/Schemable'
import { interpreter as interpreter_ } from 'io-ts/Schema'
import {
  SchemableExt,
  SchemableExt1,
  SchemableExt2,
  SchemableExt2C,
} from './SchemableExt'

/**
 * @since 0.0.1
 * @category Model
 */
export interface SchemaExt<E, A> {
  <S>(S: SchemableExt<S>): HKT2<S, E, A>
}

/**
 * @since 0.0.1
 * @category Constructors
 */
export function make<E, A>(f: SchemaExt<E, A>): SchemaExt<E, A> {
  return memoize(f)
}

/**
 * @since 2.2.0
 * @category Utilities
 */
export type TypeOf<S> = S extends SchemaExt<unknown, infer A> ? A : never

/**
 * Derives a typeclass instance from a Schema by supplying Schemable. i.e. `schemata-ts/Decoder`
 *
 * @since 0.0.1
 * @category Destructors
 */
export const interpreter: {
  <S extends URIS2>(S: SchemableExt2<S>): <E, A>(
    schema: SchemaExt<E, A>
  ) => Kind2<S, E, A>
  <S extends URIS2>(S: SchemableExt2C<S>): <A>(
    schema: SchemaExt<unknown, A>
  ) => Kind2<S, unknown, A>
  <S extends URIS>(S: SchemableExt1<S>): <A>(schema: SchemaExt<unknown, A>) => Kind<S, A>
} = unsafeCoerce(interpreter_)
