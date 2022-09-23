import { flow } from 'fp-ts/function'
import { MonoidSum } from 'fp-ts/number'
import * as RA from 'fp-ts/ReadonlyArray'
import * as Str from 'fp-ts/string'

/**
 * This calculates the Luhn checksum for a given string of digits.
 *
 * @internal
 */
export const luhn: (cc: string) => number = flow(
  Str.split(''),
  RA.reverse,
  RA.map(d => parseInt(d)),
  RA.foldMapWithIndex(MonoidSum)((i, d) =>
    i % 2 === 1
      ? // numbers of odd rank stay the same
        d
      : // numbers of even rank get doubled, then their digits are summed
      d * 2 >= 10
      ? 1 + (d * 2 - 10)
      : d * 2
  ),
  sum => (sum % 10) % 10,
  checksum => (checksum === 0 ? 0 : 10 - checksum)
)
