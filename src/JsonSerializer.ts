/**
 * Interprets a schema to encode a domain object, print it safely to Json, and stringify it.
 *
 * @since 1.1.0
 */
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'

import { JsonString, safeStringify } from './base/PrinterBase'
import { getEncoder } from './Encoder'
import { getPrinter } from './Printer'
import { PrintError } from './PrintError'
import { SchemaExt } from './SchemaExt'

/**
 * @since 1.1.0
 * @category Model
 */
export interface JsonSerializer<A> {
  readonly print: (a: A) => E.Either<PrintError, JsonString>
}

/**
 * Interprets a schema to encode a domain object, print it safely to Json, and stringify it.
 *
 * @since 1.1.0
 * @category Interpreters
 */
export const getJsonSerializer = <E, A>(schema: SchemaExt<E, A>): JsonSerializer<A> => {
  const printer = getPrinter(schema)
  const encoder = getEncoder(schema)
  return {
    print: flow(encoder.encode, printer.codomainToJson, E.map(safeStringify)),
  }
}
