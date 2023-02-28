/**
 * Represents an optional type which encodes to / decodes from undefined
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as G from 'schemata-ts/Guard'
import { getGuard } from 'schemata-ts/Guard'
import { make, Schema } from 'schemata-ts/Schema'
import { ImplicitOptional, makeImplicitOptional } from 'schemata-ts/struct'

/**
 * Represents an optional type which encodes to / decodes from undefined
 *
 * @since 1.0.0
 * @category Schema
 */
export const OptionFromUndefined: <A, O>(
  sA: Schema<O, A>,
) => ImplicitOptional & Schema<O | undefined, O.Option<A>> = <A, O>(
  sA: Schema<O, A>,
): ImplicitOptional & Schema<O | undefined, O.Option<A>> =>
  makeImplicitOptional(
    make(S =>
      pipe(
        S.optional(sA(S)),
        S.imap(
          G.union(
            G.struct({ _tag: G.literal('None') }),
            G.struct({ _tag: G.literal('Some'), value: getGuard(sA) }),
          ),
          'OptionFromUndefined',
        )(
          O.fromPredicate((a): a is A => a !== undefined),
          O.toUndefined,
        ),
      ),
    ),
    schema => schema.bind({}),
  )
