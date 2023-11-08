/** @since 2.2.0 */
import * as E from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/function'
import * as Str from 'fp-ts/string'
import {
  type Float as Floating,
  type MaxNegativeFloat,
  type MaxPositiveFloat,
} from 'schemata-ts/float'
import { type Schema } from 'schemata-ts/Schema'
import { type NumberParams } from 'schemata-ts/schemables/primitives/definition'
import { getNumberBoundsInt, isFloat } from 'schemata-ts/schemables/primitives/utils'
import { Float } from 'schemata-ts/schemata/Float'
import { type FloatString } from 'schemata-ts/schemata/FloatFromString'
import { Parse } from 'schemata-ts/schemata/Parse'

/**
 * Parses a string into an float. A slightly more performant variant of the now deprecated
 * `S.FloatFromString` with the additional ability to specify `min` / `max` bounds.
 *
 * @since 2.2.0
 * @category Printer Parsers
 */
export const ParseFloat = <
  Min extends number | undefined = undefined,
  Max extends number | undefined = undefined,
>(
  params?: NumberParams<Min, Max>,
): Schema<
  FloatString<
    Min extends undefined ? MaxNegativeFloat : Min,
    Max extends undefined ? MaxPositiveFloat : Max
  >,
  Floating<
    Min extends undefined ? MaxNegativeFloat : Min,
    Max extends undefined ? MaxPositiveFloat : Max
  >
> =>
  pipe(
    Float(params),
    Parse<
      Floating<
        Min extends undefined ? MaxNegativeFloat : Min,
        Max extends undefined ? MaxPositiveFloat : Max
      >,
      FloatString<
        Min extends undefined ? MaxNegativeFloat : Min,
        Max extends undefined ? MaxPositiveFloat : Max
      >
    >(
      `FloatString${getNumberBoundsInt(params)}`,
      flow(
        Str.trim,
        E.fromPredicate(
          s => s.length > 0,
          () => 'Expected a non-empty float string',
        ),
        E.map(Number),
        E.filterOrElse(
          isFloat<Min, Max>(params),
          n =>
            `Expected a floating point number between ${
              params?.min ?? Number.MIN_SAFE_INTEGER
            } and ${params?.max ?? Number.MAX_SAFE_INTEGER}, but got ${n}`,
        ),
      ),
      flow(
        String,
        _ =>
          _ as FloatString<
            Min extends undefined ? MaxNegativeFloat : Min,
            Max extends undefined ? MaxPositiveFloat : Max
          >,
        E.right,
      ),
    ),
  )
