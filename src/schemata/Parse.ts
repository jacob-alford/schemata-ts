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
export const Parse: <I, IO extends string = string>(
  inputName: string,
  parse: (raw: string) => Either<unknown, unknown>,
  print: (a: I) => Either<unknown, IO>,
  options?: ParserOptions,
) => <O>(inner: Schema<I, O>) => Schema<IO, O> =
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
