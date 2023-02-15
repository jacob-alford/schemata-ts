/**
 * Parses a string and turns it into camelCase.
 *
 * @since 1.4.0
 */
import { tailRec } from 'fp-ts/ChainRec'
import * as E from 'fp-ts/Either'
import { flow, identity, pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as Pred from 'fp-ts/Predicate'
import * as RA from 'fp-ts/ReadonlyArray'
import * as Str from 'fp-ts/string'
import * as PB from 'schemata-ts/PatternBuilder'
import { type CamelCase } from 'type-fest'

/** Convert a character code to character */
const cc: (code: number) => string = String.fromCharCode

/** A list of whitespace + "-" + "_" patterns to match type-fest's type-level camelcase */
const delimiters = PB.characterClass(
  false,
  cc(9), // tab
  cc(10), // line feed
  cc(11), // vertical tab
  cc(12), // form feed
  cc(13), // carriage return
  cc(32), // space
  cc(133), // next line
  cc(160), // non-breaking space
  cc(5760), // ogham space mark
  cc(8192), // en quad
  cc(8193), // em quad
  cc(8194), // en space
  cc(8195), // em space
  cc(8196), // three-per-em space
  cc(8197), // four-per-em space
  cc(8198), // six-per-em space
  cc(8199), // figure space
  cc(8200), // punctuation space
  cc(8201), // thin space
  cc(8202), // hair space
  cc(8232), // line separator
  cc(8233), // paragraph separator
  cc(8239), // narrow no-break space
  cc(8287), // medium mathematical space
  cc(12288), // ideographic space
  cc(65279), // zero width no-break space
  '-', // hyphen-minus
  '_', // low line
)

const delimiterRegex = PB.regexFromPattern(delimiters)

const dropRightWhile: (
  predicate: (a: string) => boolean,
) => (as: ReadonlyArray<string>) => ReadonlyArray<string> = predicate => as =>
  pipe(
    as,
    RA.findLastIndex(Pred.not(predicate)),
    O.fold(
      () => [],
      i => as.slice(0, i + 1),
    ),
  )

const trimDelimiters: (s: string) => string = flow(
  Str.trim,
  Str.split(''),
  RA.dropLeftWhile(s => delimiterRegex.test(s)),
  dropRightWhile(s => delimiterRegex.test(s)),
  RA.foldMap(Str.Monoid)(identity),
)

const isUppercase = (s: string): boolean => s === s.toUpperCase()
const isNumber = (char: string): boolean => /[0-9]/.test(char)
const hasLowercase = (s: string): boolean => /[a-z]/gm.test(s)

type Stream = {
  readonly input: string
  readonly output: string
  readonly index: number
  readonly lastCharWasDelimiter: boolean
  readonly lastCharWasNumber: boolean
  readonly hasBeenScreaming: boolean
}

/**
 * Parses a string and turns it into camelCase.
 *
 * @since 1.4.0
 */
export const camelCase = <S extends string>(
  input: S,
): CamelCase<S, { preserveConsecutiveUppercase: true }> => {
  if (input.length === 0) return input as any

  const go: (s: Stream) => E.Either<Stream, string> = s => {
    const char = s.input.charAt(s.index)
    const nextChar = pipe(
      s.input.charAt(s.index + 1),
      O.fromPredicate(s => s.length > 0),
    )

    // Stream is exhausted
    if (char === '') {
      return E.right(s.output)
    }

    // Lowercase the first char
    if (s.index === 0) {
      return E.left({
        input: s.input,
        output: s.output + char.toLowerCase(),
        index: s.index + 1,
        lastCharWasDelimiter: false,
        lastCharWasNumber: isNumber(char),
        hasBeenScreaming: isUppercase(char),
      })
    }

    // If the character is a delimiter, skip it
    if (delimiterRegex.test(char)) {
      return E.left({
        input: s.input,
        output: s.output,
        index: s.index + 1,
        lastCharWasDelimiter: true,
        lastCharWasNumber: false,
        hasBeenScreaming: false,
      })
    }

    // If the last char was screaming, lowercase the current char if the next char is uppercase
    if (s.hasBeenScreaming && isUppercase(char)) {
      return E.left({
        input: s.input,
        output:
          s.output +
          (O.isSome(nextChar) && isUppercase(nextChar.value) ? char.toLowerCase() : char),
        index: s.index + 1,
        lastCharWasDelimiter: false,
        lastCharWasNumber: isNumber(char),
        hasBeenScreaming: true,
      })
    }

    // If the last char was a delimiter (or number), uppercase the current char
    if (s.lastCharWasDelimiter || s.lastCharWasNumber) {
      return E.left({
        input: s.input,
        output: s.output + char.toUpperCase(),
        index: s.index + 1,
        hasBeenScreaming: isUppercase(char),
        lastCharWasNumber: isNumber(char),
        lastCharWasDelimiter: false,
      })
    }

    return E.left({
      input: s.input,
      output: s.output + char,
      index: s.index + 1,
      lastCharWasDelimiter: false,
      lastCharWasNumber: isNumber(char),
      hasBeenScreaming: isUppercase(char),
    })
  }

  const trimmed = trimDelimiters(input)

  if (trimmed.length === 0) return trimmed as any

  return tailRec(
    {
      input: hasLowercase(trimmed) ? trimmed : trimmed.toLowerCase(),
      output: '',
      index: 0,
      lastCharWasDelimiter: false,
      lastCharWasNumber: false,
      hasBeenScreaming: isUppercase(trimmed.charAt(0)),
    },
    go,
  ) as any
}
