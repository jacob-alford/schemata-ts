/**
 * A collection SchemaExt interpreters.
 *
 * @since 1.0.0
 */
import * as SC from './SchemaExt'
import * as Arb from './Arbitrary'
import * as D from './Decoder'
import * as Enc from './Encoder'
import * as Eq from './Eq'
import * as G from './Guard'

/**
 * Returns an `Arbitrary` given a Schema
 *
 * @since 1.0.0
 * @category Interpreters
 */
export const getArbitrary: () => <A>(
  schema: SC.SchemaExt<unknown, A>,
) => Arb.Arbitrary<A> = () => SC.interpreter(Arb.Schemable)

/**
 * Returns a `Decoder` given a Schema
 *
 * @since 1.0.0
 * @category Interpreters
 */
export const getDecoder: () => <A>(
  schema: SC.SchemaExt<unknown, A>,
) => D.Decoder<unknown, A> = () => SC.interpreter(D.Schemable)

/**
 * Returns an `Encoder` given a Schema
 *
 * @since 1.0.0
 * @category Interpreters
 */
export const getEncoder: () => <E, A>(
  schema: SC.SchemaExt<E, A>,
) => Enc.Encoder<E, A> = () => SC.interpreter(Enc.Schemable)

/**
 * Returns an `Eq` instance given a Schema
 *
 * @since 1.0.0
 * @category Interpreters
 */
export const getEq: () => <A>(schema: SC.SchemaExt<unknown, A>) => Eq.Eq<A> = () =>
  SC.interpreter(Eq.Schemable)

/**
 * Returns a `Guard` given a Schema
 *
 * @since 1.0.0
 * @category Interpreters
 */
export const getGuard: () => <A>(
  schema: SC.SchemaExt<unknown, A>,
) => G.Guard<unknown, A> = () => SC.interpreter(G.Schemable)
