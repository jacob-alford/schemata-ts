/**
 * A collection SchemaExt interpreters.
 *
 * @since 1.0.0
 */
import * as Arb from './Arbitrary'
import * as D from './Decoder'
import * as Enc from './Encoder'
import * as Eq from './Eq'
import * as G from './Guard'
import * as SC from './SchemaExt'

/**
 * Returns an `Arbitrary` given a Schema
 *
 * @since 1.0.0
 * @category Interpreters
 */
export const getArbitrary = SC.interpreter(Arb.Schemable)

/**
 * Returns a `Decoder` given a Schema
 *
 * @since 1.0.0
 * @category Interpreters
 */
export const getDecoder = SC.interpreter(D.Schemable)

/**
 * Returns an `Encoder` given a Schema
 *
 * @since 1.0.0
 * @category Interpreters
 */
export const getEncoder = SC.interpreter(Enc.Schemable)

/**
 * Returns an `Eq` instance given a Schema
 *
 * @since 1.0.0
 * @category Interpreters
 */
export const getEq = SC.interpreter(Eq.Schemable)

/**
 * Returns a `Guard` given a Schema
 *
 * @since 1.0.0
 * @category Interpreters
 */
export const getGuard = SC.interpreter(G.Schemable)
