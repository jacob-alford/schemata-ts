/**
 * Utilies for `WithInt`
 *
 * @since 1.0.0
 */
import {
  BoundedParams,
  Float,
  Integer,
  MaxNegativeFloat,
  MaxPositiveFloat,
  MaxSafeInt,
  MinSafeInt,
} from 'schemata-ts/schemables/WithPrimitives/definition'

/** @since 1.0.0 */
export const isInt =
  <
    Min extends number | undefined = undefined,
    Max extends number | undefined = undefined,
  >(
    params: BoundedParams<Min, Max> = {},
  ) =>
  (
    n: unknown,
  ): n is Integer<
    Min extends undefined ? MinSafeInt : Min,
    Max extends undefined ? MaxSafeInt : Max
  > => {
    const { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = params
    return (
      typeof n === 'number' &&
      !Number.isNaN(n) &&
      Number.isSafeInteger(n) &&
      n >= min &&
      n <= max
    )
  }

/** @since 1.0.0 */
export const isFloat =
  <
    Min extends number | undefined = undefined,
    Max extends number | undefined = undefined,
  >(
    params: BoundedParams<Min, Max> = {},
  ) =>
  (
    n: unknown,
  ): n is Float<
    Min extends undefined ? MaxNegativeFloat : Min,
    Max extends undefined ? MaxPositiveFloat : Max
  > => {
    const { min = -Number.MAX_VALUE, max = Number.MAX_VALUE } = params
    return typeof n === 'number' && !Number.isNaN(n) && n >= min && n <= max
  }