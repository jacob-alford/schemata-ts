/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import { Branded } from 'schemata-ts/brand'
import * as D from 'schemata-ts/internal/Decoder'
import * as PD from 'schemata-ts/internal/parallel-decoder'
import {
  CheckDigitVerified,
  WithCheckDigit,
} from 'schemata-ts/schemables/WithCheckDigit/definition'
import {
  locationToIndex,
  replaceCharAt,
} from 'schemata-ts/schemables/WithCheckDigit/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const ParallelDecoder: WithCheckDigit<PD.SchemableLambda> = {
  checkDigit: (algorithm, location) => dec => ({
    decode: s =>
      pipe(
        dec.decode(s),
        TE.chain(
          TE.fromPredicate(
            (s): s is Branded<string, CheckDigitVerified> =>
              s[locationToIndex(s, location)] === algorithm(s),
            s =>
              D.decodeErrors(
                D.typeMismatch(
                  s,
                  replaceCharAt(s, locationToIndex(s, location), algorithm(s)),
                ),
              ),
          ),
        ),
      ),
  }),
}
