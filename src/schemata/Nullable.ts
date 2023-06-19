import { Schema } from 'schemata-ts/Schema'
import { Literal } from 'schemata-ts/schemata/Literal'
import { Optional } from 'schemata-ts/schemata/Optional'
import { Union } from 'schemata-ts/schemata/Union'
import { ImplicitOptional, makeImplicitOptionalType } from 'schemata-ts/struct'

/**
 * Widens a schema to include null and undefined
 *
 * @since 1.0.0
 */
export const Nullable: <I, O>(
  schema: Schema<I, O>,
) => ImplicitOptional & Schema<I | null | undefined, O | null | undefined> = inner =>
  makeImplicitOptionalType(Union('Nullable')(Literal(null), Optional(inner)))
