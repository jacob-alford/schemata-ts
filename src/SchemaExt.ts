/**
 * Schema combinators for SchemableExt
 *
 * @since 0.0.1
 */
import { unsafeCoerce } from 'fp-ts/function'
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import { interpreter as interpreter_ } from 'io-ts/Schema'
import { memoize } from 'io-ts/Schemable'

import {
  SchemableExt,
  SchemableExt1,
  SchemableExt2,
  SchemableExt2C,
} from './SchemableExt'

/**
 * @since 1.0.0
 * @category Model
 */
export interface SchemaExt<E, A> {
  <S>(S: SchemableExt<S>): HKT2<S, E, A>
}

/**
 * @since 1.0.0
 * @category Model
 */
export type Interpreter = {
  <S extends URIS2>(S: SchemableExt2<S>): <E, A>(
    schema: SchemaExt<E, A>,
  ) => Kind2<S, E, A>
  <S extends URIS2>(S: SchemableExt2C<S>): <A>(
    schema: SchemaExt<unknown, A>,
  ) => Kind2<S, unknown, A>
  <S extends URIS>(S: SchemableExt1<S>): <A>(schema: SchemaExt<unknown, A>) => Kind<S, A>
}

/**
 * @since 1.0.0
 * @category Constructors
 */
export function make<E, A>(f: SchemaExt<E, A>): SchemaExt<E, A> {
  return memoize(f)
}

/**
 * Extract the output of a schema
 *
 * @since 1.0.0
 * @category Utilities
 * @example
 *   import * as O from 'fp-ts/Option'
 *   import * as S from 'schemata-ts/schemata'
 *   import { getGuard } from 'schemata-ts/Guard'
 *   import { getEncoder } from 'schemata-ts/Encoder'
 *
 *   const guardString = getGuard(S.String)
 *
 *   const optionFromNullable = S.OptionFromNullable(guardString)(S.String)
 *
 *   // type Input = S.InputOf<typeof optionFromNullable>
 *   // type Input = string | null
 *
 *   // type Output = S.OutputOf<typeof optionFromNullable>
 *   // Option<string>
 *
 *   const encoder = getEncoder(optionFromNullable)
 *
 *   assert.deepStrictEqual(encoder.encode(O.some('a')), 'a')
 *   assert.deepStrictEqual(encoder.encode(O.none), null)
 */
export type TypeOf<S> = S extends SchemaExt<unknown, infer A> ? A : never

/**
 * Extract the output of a schema.
 *
 * Alias of `TypeOf`
 *
 * @since 1.0.0
 * @category Utilities
 * @example
 *   import * as O from 'fp-ts/Option'
 *   import * as S from 'schemata-ts/schemata'
 *   import { getGuard } from 'schemata-ts/Guard'
 *   import { getEncoder } from 'schemata-ts/Encoder'
 *
 *   const guardString = getGuard(S.String)
 *
 *   const optionFromNullable = S.OptionFromNullable(guardString)(S.String)
 *
 *   // type Input = S.InputOf<typeof optionFromNullable>
 *   // type Input = string | null
 *
 *   // type Output = S.OutputOf<typeof optionFromNullable>
 *   // Option<string>
 *
 *   const encoder = getEncoder(optionFromNullable)
 *
 *   assert.deepStrictEqual(encoder.encode(O.some('a')), 'a')
 *   assert.deepStrictEqual(encoder.encode(O.none), null)
 */
export type OutputOf<S> = TypeOf<S>

/**
 * Extract the input type of a schema.
 *
 * @since 1.0.0
 * @category Utilities
 * @example
 *   import * as O from 'fp-ts/Option'
 *   import * as S from 'schemata-ts/schemata'
 *   import { getGuard } from 'schemata-ts/Guard'
 *   import { getEncoder } from 'schemata-ts/Encoder'
 *
 *   const guardString = getGuard(S.String)
 *
 *   const optionFromNullable = S.OptionFromNullable(guardString)(S.String)
 *
 *   // type Input = S.InputOf<typeof optionFromNullable>
 *   // type Input = string | null
 *
 *   // type Output = S.OutputOf<typeof optionFromNullable>
 *   // Option<string>
 *
 *   const encoder = getEncoder(optionFromNullable)
 *
 *   assert.deepStrictEqual(encoder.encode(O.some('a')), 'a')
 *   assert.deepStrictEqual(encoder.encode(O.none), null)
 */
export type InputOf<S> = S extends SchemaExt<infer I, unknown> ? I : never

/**
 * Derives a typeclass instance from a Schema by supplying Schemable. i.e. `schemata-ts/Decoder`
 *
 * @since 1.0.0
 * @category Destructors
 */
export const interpret: Interpreter = unsafeCoerce(interpreter_)
