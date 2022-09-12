/**
 * Represents strings that are UUIDs.
 *
 * @since 0.0.1
 */
import { Kind, Kind2, URIS, URIS2, HKT } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as Str from 'fp-ts/string'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import { pipe } from 'fp-ts/function'

/**
 * @since 0.0.1
 * @category Internal
 */
interface UUIDBrand {
  readonly UUID: unique symbol
}

/**
 * See: https://github.com/validatorjs/validator.js/blob/master/src/lib/isUUID.js
 *
 * @since 0.0.1
 * @category Internal
 */
const uuidRegex = {
  1: /^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  2: /^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
}

/**
 * Represents strings that are UUIDs.
 *
 * @since 0.0.1
 * @category Model
 */
export type UUID = string & UUIDBrand

/**
 * @since 0.0.1
 * @category Model
 */
export type UUIDSchemableOptions = {
  version?: keyof typeof uuidRegex
}

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams<S> = (options: UUIDSchemableOptions) => HKT<S, UUID>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams1<S extends URIS> = (
  options: UUIDSchemableOptions
) => Kind<S, UUID>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = (
  options: UUIDSchemableOptions
) => Kind2<S, unknown, UUID>

/**
 * @since 0.0.1
 * @category Refinements
 */
export const isUUID =
  (options: UUIDSchemableOptions) =>
  (s: string): s is UUID =>
    typeof s === 'string' &&
    !Number.isNaN(new Date(s).getTime()) &&
    uuidRegex[options.version ?? 'all'].test(s)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = options =>
  pipe(D.string, D.refine(isUUID(options), 'UUID'))

/**
 * @since 0.0.1
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = () => Str.Eq

/**
 * @since 0.0.1
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = options =>
  pipe(G.string, G.refine(isUUID(options)))

/**
 * @since 0.0.1
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = options =>
  pipe(TD.string, TD.refine(isUUID(options), 'UUID'))

/**
 * @since 0.0.1
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = options =>
  pipe(t.string, t.refine(isUUID(options), 'UUID'))

/**
 * @since 0.0.1
 * @category Destructors
 */
export const toDate: (iso: UUID) => Date = iso => new Date(iso)
