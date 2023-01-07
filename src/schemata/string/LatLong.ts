/**
 * Representing a Lat/Long coordinate.
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { Branded } from 'io-ts'
import * as PB from 'schemata-ts/PatternBuilder'
import { make, SchemaExt } from 'schemata-ts/SchemaExt'

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

/**
 * @since 1.0.0
 * @category Model
 */
export type LatLongS = SchemaExt<string, LatLong>

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
export const LatLongPattern = PB.oneOf(
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
 * Representing a Lat/Long coordinate.
 *
 * @since 1.0.0
 * @category Schema
 */
export const LatLong: LatLongS = make(s =>
  s.brand<LatLongBrand>()(s.pattern(LatLongPattern, 'LatLong')),
)
