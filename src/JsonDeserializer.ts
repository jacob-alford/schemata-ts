/**
 * Interprets a schema to parse a JSON string, and decode to a domain object.
 *
 * @since 1.1.0
 */
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import * as J from 'fp-ts/Json'
import { DecodeError } from 'schemata-ts/base/DecoderBase'
import { getDecoder } from 'schemata-ts/Decoder'
import { SchemaExt } from 'schemata-ts/SchemaExt'

/**
 * @since 1.1.0
 * @category Model
 */
export class ParseError {
  /** @since 1.1.0 */
  readonly _tag = 'ParseError'
  constructor(readonly error: unknown) {}
}

/**
 * @since 1.1.0
 * @category Model
 */
export interface JsonDeserializer<A> {
  readonly parse: (a: string) => E.Either<ParseError | DecodeError, A>
}

/**
 * @since 1.1.0
 * @category Guards
 */
export const isParseError = (u: unknown): u is ParseError => u instanceof ParseError

/**
 * Interprets a schema to parse a JSON string, and decode to a domain object.
 *
 * @since 1.1.0
 * @category Interpreters
 */
export const getJsonDeserializer = <E, A>(
  schema: SchemaExt<E, A>,
): JsonDeserializer<A> => {
  const decoder = getDecoder(schema)
  return {
    parse: flow(
      J.parse,
      E.mapLeft(err => new ParseError(err)),
      E.chainW(decoder.decode),
    ),
  }
}
