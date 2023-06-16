/**
 * Represents an optional type which encodes to / decodes from null
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { getGuard } from 'schemata-ts/Guard'
import { Schema } from 'schemata-ts/Schema'
import { Imap } from 'schemata-ts/schemata/Imap'
import { Nullable } from 'schemata-ts/schemata/Nullable'
import { Option } from 'schemata-ts/schemata/Option'
import { ImplicitOptional, makeImplicitOptional } from 'schemata-ts/struct'

/**
 * Represents an optional type which decodes from null and undefined and encodes to null
 *
 * @since 1.0.0
 * @category Schema
 */
export const OptionFromNullable = <A, O>(
  inner: Schema<O, A>,
): ImplicitOptional & Schema<O | null | undefined, O.Option<NonNullable<A>>> =>
  makeImplicitOptional(
    pipe(Nullable(inner), Imap(getGuard(Option(inner)), O.fromNullable, O.toNullable)),
    _ => _.bind({}),
  )
