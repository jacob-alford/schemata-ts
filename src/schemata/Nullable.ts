/** @since 1.0.0 */
import {
  type ImplicitOptional,
  makeImplicitOptionalType,
} from 'schemata-ts/internal/struct'
import { type Schema } from 'schemata-ts/Schema'
import { Literal } from 'schemata-ts/schemata/Literal'
import { Optional } from 'schemata-ts/schemata/Optional'
import { Union } from 'schemata-ts/schemata/Union'

/**
 * Widens a schema to include null and undefined
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Nullable: <I, O>(
  schema: Schema<I, O>,
) => ImplicitOptional & Schema<I | null | undefined, O | null | undefined> = inner =>
  makeImplicitOptionalType(Union(Literal(null), Optional(inner)))
