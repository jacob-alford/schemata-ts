/** @since 2.1.0 */
import { type Either as Either_ } from 'schemata-ts/internal/either'
import { type Schema } from 'schemata-ts/Schema'
import { Literal } from 'schemata-ts/schemata/Literal'
import { Struct } from 'schemata-ts/schemata/Struct'
import { Union } from 'schemata-ts/schemata/Union'

/**
 * The fp-ts Either type as a schemata-ts schema.
 *
 * @since 2.1.0
 * @category Combinators
 */
export const Either: <EI, EO, AI, AO>(
  left: Schema<EI, EO>,
  right: Schema<AI, AO>,
) => Schema<
  | { readonly _tag: 'Left'; readonly left: EI }
  | {
      readonly _tag: 'Right'
      readonly right: AI
    },
  Either_<EO, AO>
> = (left, right) =>
  Union(
    Struct({
      _tag: Literal('Left'),
      left,
    }),
    Struct({
      _tag: Literal('Right'),
      right,
    }),
  )
