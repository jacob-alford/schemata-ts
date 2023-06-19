import { Branded } from 'schemata-ts/brand'
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

export type DateParams = {
  readonly afterDate?: Date
  readonly beforeDate?: Date
}

declare const SafeDateSymbol: unique symbol
type SafeDateSymbol = typeof SafeDateSymbol
type SafeDateBrand = { readonly SafeDate: SafeDateSymbol }

declare const SafeDateStringSymbol: unique symbol
type SafeDateStringSymbol = typeof SafeDateStringSymbol
export type SafeDateStringBrand = { readonly SafeDateString: SafeDateStringSymbol }

/**
 * A valid date object
 *
 * @since 2.0.0
 */
export type SafeDate = Branded<Date, SafeDateBrand>

/**
 * A valid date string
 *
 * @since 2.0.0
 */
export type SafeDateString = Branded<string, SafeDateStringBrand>

export interface WithDate<S extends SchemableLambda> {
  readonly date: (params?: DateParams) => SchemableKind<S, SafeDate, SafeDate>
  readonly dateFromString: (
    params?: DateParams,
  ) => SchemableKind<S, SafeDateString, SafeDate>
}
