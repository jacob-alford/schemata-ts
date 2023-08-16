/** @since 2.0.0 */
import { type Either } from 'schemata-ts/internal/either'
import { make } from 'schemata-ts/internal/schema'
import { type Schema } from 'schemata-ts/Schema'

/** @since 2.0.0 */
export type ParserOptions = {
  readonly contentEncoding?: string
  readonly contentMediaType?: string
  readonly format?: string
}

/**
 * A schema for pre-parsing/printing a string
 *
 * @since 2.0.0
 * @category Combinators
 */
export const Parse: <I>(
  name: string,
  parse: (raw: string) => Either<unknown, unknown>,
  print: (a: I) => Either<unknown, string>,
  options?: ParserOptions,
) => <O>(inner: Schema<I, O>) => Schema<string, O> =
  (name, parse, print, options = {}) =>
  inner =>
    make(_ =>
      _.parse(
        name,
        parse,
        print,
        options.contentEncoding,
        options.contentMediaType,
        options.format,
      )(inner.runSchema(_)),
    )
