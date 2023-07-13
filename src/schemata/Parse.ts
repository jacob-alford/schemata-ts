import type * as E from 'fp-ts/Either'
import { type Schema, make } from 'schemata-ts/Schema'

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
  parse: (raw: string) => E.Either<unknown, unknown>,
  print: (a: I) => E.Either<unknown, string>,
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
