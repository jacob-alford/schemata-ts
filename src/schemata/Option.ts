/** @since 2.0.0 */
import { pipe } from 'fp-ts/function'
import { type Option as Option_ } from 'fp-ts/Option'
import { deriveTypeString } from 'schemata-ts/derivations/type-string-schemable'
import { type Schema } from 'schemata-ts/Schema'
import { Annotate } from 'schemata-ts/schemata/Annotate'
import { Literal } from 'schemata-ts/schemata/Literal'
import { Struct } from 'schemata-ts/schemata/Struct'
import { Union } from 'schemata-ts/schemata/Union'

/**
 * A schema that represents the `Option` type from fp-ts.
 *
 * @since 2.0.0
 * @category Combinators
 */
export const Option = <I, O>(inner: Schema<I, O>): Schema<Option_<I>, Option_<O>> =>
  pipe(
    Union(
      Struct({
        _tag: Literal('None'),
      }),
      Struct({
        _tag: Literal('Some'),
        value: inner,
      }),
    ),
    Annotate({
      typeString: pipe(
        deriveTypeString(inner),
        ([input, output]) => `Option<${input}, ${output}>`,
      ),
    }),
  )
