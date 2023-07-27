/** @since 1.0.0 */
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { deriveTypeString } from 'schemata-ts/derivations/type-string-schemable'
import { deriveGuard } from 'schemata-ts/Guard'
import {
  type ImplicitOptional,
  makeImplicitOptionalType,
} from 'schemata-ts/internal/struct'
import { type Schema } from 'schemata-ts/Schema'
import { Imap } from 'schemata-ts/schemata/Imap'
import { Nullable } from 'schemata-ts/schemata/Nullable'
import { Option } from 'schemata-ts/schemata/Option'

/**
 * Represents an optional type which decodes from null and undefined and encodes to null
 *
 * @since 1.0.0
 * @category Conversion
 */
export const OptionFromNullable = <A, O>(
  inner: Schema<O, A>,
): ImplicitOptional & Schema<O | null | undefined, O.Option<NonNullable<A>>> => {
  const guard = deriveGuard(Option(inner))
  return makeImplicitOptionalType(
    pipe(
      Nullable(inner),
      Imap(
        {
          is: (u): u is O.Option<NonNullable<A>> =>
            guard.is(u) &&
            pipe(
              u,
              O.fold(
                () => true,
                a => a !== undefined && a !== null,
              ),
            ),
        },
        O.fromNullable,
        O.toNullable,
        `Option<${deriveTypeString(inner)[1]}>`,
      ),
    ),
  )
}
