/**
 * Represents an optional type which encodes to / decodes from null
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as G from 'schemata-ts/base/GuardBase'
import { getGuard } from 'schemata-ts/Guard'
import { make, SchemaExt } from 'schemata-ts/SchemaExt'

/**
 * @since 1.0.0
 * @category Model
 */
export type OptionFromNullableS = <A, O>(
  sA: SchemaExt<O, A>,
) => SchemaExt<O | null, O.Option<A>>

/**
 * Represents an optional type which encodes to / decodes from null
 *
 * @since 1.0.0
 * @category Schema
 */
export const OptionFromNullable: OptionFromNullableS = <A, O>(
  sA: SchemaExt<O, A>,
): SchemaExt<O | null, O.Option<A>> =>
  make(S =>
    pipe(
      S.nullable(sA(S)),
      S.imap(
        G.union(
          G.struct({ _tag: G.literal('None') }),
          G.struct({ _tag: G.literal('Some'), value: getGuard(sA) }),
        ),
        'OptionFromNullable',
      )(
        O.fromPredicate((a): a is A => a !== null),
        O.toNullable,
      ),
    ),
  )
