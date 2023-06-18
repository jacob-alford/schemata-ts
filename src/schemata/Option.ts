import { Schema } from 'schemata-ts/Schema'
import { Literal } from 'schemata-ts/schemata/Literal'
import { Struct } from 'schemata-ts/schemata/Struct'
import { Union } from 'schemata-ts/schemata/Union'

/**
 * A schema that represents the `Option` type from fp-ts.
 *
 * @since 2.0.0
 */
export const Option = <I, O>(inner: Schema<I, O>): Schema<O.Option<I>, O.Option<O>> =>
  Union(
    'Option',
    Struct({
      _tag: Literal('None'),
    }),
    Struct({
      _tag: Literal('Some'),
      value: inner,
    }),
  )
