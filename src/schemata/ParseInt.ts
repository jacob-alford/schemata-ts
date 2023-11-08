/** @since 2.2.0 */
import * as E from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/function'
import * as Str from 'fp-ts/string'
import { type Integer, type MaxSafeInt, type MinSafeInt } from 'schemata-ts/integer'
import { type Schema } from 'schemata-ts/Schema'
import { type NumberParams } from 'schemata-ts/schemables/primitives/definition'
import { getNumberBoundsInt, isInt } from 'schemata-ts/schemables/primitives/utils'
import { Int } from 'schemata-ts/schemata/Int'
import { type IntString } from 'schemata-ts/schemata/IntFromString'
import { Parse } from 'schemata-ts/schemata/Parse'

/**
 * Parses a string into an integer. A slightly more performant variant of the now
 * deprecated `S.IntFromString` with the additional ability to specify `min` / `max` bounds.
 *
 * @since 2.2.0
 * @category Printer Parsers
 */
export const ParseInt = <
  Min extends number | undefined = undefined,
  Max extends number | undefined = undefined,
>(
  params?: NumberParams<Min, Max>,
): Schema<
  IntString<
    Min extends undefined ? MinSafeInt : Min,
    Max extends undefined ? MaxSafeInt : Max
  >,
  Integer<
    Min extends undefined ? MinSafeInt : Min,
    Max extends undefined ? MaxSafeInt : Max
  >
> =>
  pipe(
    Int(params),
    Parse<
      Integer<
        Min extends undefined ? MinSafeInt : Min,
        Max extends undefined ? MaxSafeInt : Max
      >,
      IntString<
        Min extends undefined ? MinSafeInt : Min,
        Max extends undefined ? MaxSafeInt : Max
      >
    >(
      `IntString${getNumberBoundsInt(params)}`,
      flow(
        Str.trim,
        E.fromPredicate(
          s => s.length > 0,
          () => 'Expected a non-empty integer string',
        ),
        E.map(Number),
        E.filterOrElse(
          isInt<Min, Max>(params),
          n =>
            `Expected an integer between ${params?.min ?? Number.MIN_SAFE_INTEGER} and ${
              params?.max ?? Number.MAX_SAFE_INTEGER
            }, but got ${n}`,
        ),
      ),
      flow(
        String,
        _ =>
          _ as IntString<
            Min extends undefined ? MinSafeInt : Min,
            Max extends undefined ? MaxSafeInt : Max
          >,
        E.right,
      ),
    ),
  )
