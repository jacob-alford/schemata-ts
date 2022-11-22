/**
 * Represents an optional type which encodes to / decodes from undefined
 *
 * @since 1.0.0
 */
import * as G from '../../base/GuardBase'
import * as O from 'fp-ts/Option'
import { SchemaExt, make } from '../../SchemaExt'
import { pipe } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Model
 */
export type OptionFromUndefinedS = <A>(
  guardA: G.Guard<unknown, A>,
) => <O>(sA: SchemaExt<O, A>) => SchemaExt<O | undefined, O.Option<A>>

/**
 * Represents an optional type which encodes to / decodes from undefined
 *
 * @since 1.0.0
 * @category Schema
 */
export const OptionFromUndefined: OptionFromUndefinedS =
  <A>(gA: G.Guard<unknown, A>) =>
  <O>(sA: SchemaExt<O, A>): SchemaExt<O | undefined, O.Option<A>> =>
    make(S =>
      pipe(
        S.optional(sA(S)),
        S.imap(
          G.union(
            G.struct({ _tag: G.literal('None') }),
            G.struct({ _tag: G.literal('Some'), value: gA }),
          ),
          'OptionFromUndefined',
        )(
          O.fromPredicate((a): a is A => a !== undefined),
          O.toUndefined,
        ),
      ),
    )
