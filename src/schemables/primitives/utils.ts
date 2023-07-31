import {
  type Float,
  type MaxNegativeFloat,
  type MaxPositiveFloat,
} from 'schemata-ts/float'
import { type Integer, type MaxSafeInt, type MinSafeInt } from 'schemata-ts/integer'
import {
  type NumberParams,
  type StringParams,
} from 'schemata-ts/schemables/primitives/definition'

export const isInt =
  <
    Min extends number | undefined = undefined,
    Max extends number | undefined = undefined,
  >(
    params: NumberParams<Min, Max> = {},
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

export const isFloat =
  <
    Min extends number | undefined = undefined,
    Max extends number | undefined = undefined,
  >(
    params: NumberParams<Min, Max> = {},
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

// istanbul ignore next
export const getLengthBoundsString: (
  params?: StringParams,
  lchar?: string,
  rchar?: string,
) => string = (params = {}, lchar = '<', rchar = '>') => {
  const { minLength, maxLength } = params
  if (minLength === undefined && maxLength === undefined) return ''
  return `${lchar}${minLength ?? ''},${maxLength ?? ''}${rchar}`
}

export const getNumberBoundsInt: (params?: NumberParams<any, any>) => string = (
  // istanbul ignore next
  params = {},
) => {
  const { min, max } = params
  if (min === undefined && max === undefined) return ''
  return `<${min ?? ''},${max ?? ''}>`
}
