/**
 * Representing a Lat/Long coordinate.
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { type Branded } from 'schemata-ts/brand'
import * as PB from 'schemata-ts/PatternBuilder'
import { type Schema } from 'schemata-ts/Schema'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Pattern } from 'schemata-ts/schemata/Pattern'

interface LatLongBrand {
  readonly LatLong: unique symbol
}

/**
 * Representing a Lat/Long coordinate.
 *
 * @since 1.0.0
 * @category Model
 */
export type LatLong = Branded<string, LatLongBrand>

const latPattern = pipe(
  PB.maybe(PB.characterClass(false, '+', '-')),
  PB.then(
    PB.subgroup(
      PB.oneOf(
        PB.sequence(
          PB.char('9'),
          PB.char('0'),
          PB.maybe(
            PB.subgroup(
              pipe(PB.char('.'), PB.then(PB.atLeastOne({ greedy: true })(PB.char('0')))),
            ),
          ),
        ),
        pipe(
          PB.integerRange(0, 89),
          PB.subgroup,
          PB.then(
            PB.maybe(
              PB.subgroup(
                pipe(PB.char('.'), PB.then(PB.atLeastOne({ greedy: true })(PB.digit))),
              ),
            ),
          ),
        ),
      ),
    ),
  ),
)

const longPattern = pipe(
  PB.maybe(PB.characterClass(false, '+', '-')),
  PB.then(
    PB.subgroup(
      PB.oneOf(
        PB.sequence(
          PB.char('1'),
          PB.char('8'),
          PB.char('0'),
          PB.maybe(
            PB.subgroup(
              pipe(PB.char('.'), PB.then(PB.atLeastOne({ greedy: true })(PB.char('0')))),
            ),
          ),
        ),
        pipe(
          PB.integerRange(0, 179),
          PB.subgroup,
          PB.then(
            PB.maybe(
              PB.subgroup(
                pipe(PB.char('.'), PB.then(PB.atLeastOne({ greedy: true })(PB.digit))),
              ),
            ),
          ),
        ),
      ),
    ),
  ),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
export const latLongPattern = PB.oneOf(
  pipe(
    latPattern,
    PB.then(PB.char(',')),
    PB.then(PB.anyNumber({ greedy: true })(PB.space)),
    PB.then(longPattern),
  ),
  pipe(
    PB.char('('),
    PB.then(latPattern),
    PB.then(PB.char(',')),
    PB.then(PB.anyNumber({ greedy: true })(PB.space)),
    PB.then(longPattern),
    PB.then(PB.char(')')),
  ),
)

/**
 * Represents a Lat/Long coordinate.
 *
 * @since 1.0.0
 * @category String
 */
export const LatLong: Schema<LatLong> = Brand<LatLongBrand>()(
  Pattern(latLongPattern, 'LatLong'),
)
