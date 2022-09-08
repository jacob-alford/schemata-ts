/**
 * Schema combinators for SchemableExt
 *
 * @since 0.0.1
 */
import { Kind, Kind2, URIS, URIS2, HKT } from 'fp-ts/HKT'
import { unsafeCoerce } from 'fp-ts/function'
import { memoize } from 'io-ts/Schemable'
import { interpreter as interpreter_ } from 'io-ts/Schema'
import { SchemableExt, SchemableExt1, SchemableExt2C } from './SchemableExt'

/**
 * @since 0.0.1
 * @category Model
 */
export interface SchemaExt<A> {
  <S>(S: SchemableExt<S>): HKT<S, A>
}

/**
 * @since 0.0.1
 * @category Constructors
 */
export function make<A>(f: SchemaExt<A>): SchemaExt<A> {
  return memoize(f)
}

/**
 * Generator a typeclass instance to a Schema by supplying Schemable. i.e.
 * `schemable-ts-types/Decoder`
 *
 * @since 0.0.1
 * @category Destructors
 */
export const interpreter: {
  <S extends URIS2>(S: SchemableExt2C<S>): <A>(
    schema: SchemaExt<A>
  ) => Kind2<S, unknown, A>
  <S extends URIS>(S: SchemableExt1<S>): <A>(schema: SchemaExt<A>) => Kind<S, A>
} = unsafeCoerce(interpreter_)
