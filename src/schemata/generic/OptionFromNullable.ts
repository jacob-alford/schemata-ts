/**
 * Represents an optional type which encodes to / decodes from null
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'

import * as G from '../../base/GuardBase'
import { make, SchemaExt } from '../../SchemaExt'

/**
 * @since 1.0.0
 * @category Model
 */
export type OptionFromNullableS = <A>(
  guardA: G.Guard<unknown, A>,
) => <O>(sA: SchemaExt<O, A>) => SchemaExt<O | null, O.Option<A>>

/**
 * Represents an optional type which encodes to / decodes from null
 *
 * @since 1.0.0
 * @category Schema
 */
export const OptionFromNullable: OptionFromNullableS =
  <A>(gA: G.Guard<unknown, A>) =>
  <O>(sA: SchemaExt<O, A>): SchemaExt<O | null, O.Option<A>> =>
    make(S =>
      pipe(
        S.nullable(sA(S)),
        S.imap(
          G.union(
            G.struct({ _tag: G.literal('None') }),
            G.struct({ _tag: G.literal('Some'), value: gA }),
          ),
          'OptionFromNullable',
        )(
          O.fromPredicate((a): a is A => a !== null),
          O.toNullable,
        ),
      ),
    )
