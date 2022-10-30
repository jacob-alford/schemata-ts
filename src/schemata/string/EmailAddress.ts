/**
 * Represents strings (email addresses) that conform to the RFC 5322 standard.
 *
 * See: https://emailregex.com/
 *
 * **Note: Does not validate international addresses**
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import * as PB from '../../PatternBuilder'
import { make } from '../../SchemaExt'
import { Brand } from 'io-ts'

/** @internal */
type EmailAddressBrand = Brand<{ readonly x: unique symbol }['x']>

/**
 * Represents strings (email addresses) that conform to the RFC 5322 standard.
 *
 * @since 1.0.0
 * @category Model
 */
export type EmailAddress = string & EmailAddressBrand

// (".+")
const localPartQuoted = pipe(
  PB.char('"'),
  PB.then(PB.atLeastOne({ greedy: true })(PB.characterClass(true, '"', [0, 0x1f]))),
  PB.then(PB.char('"'))
)

const localPartUnquotedAllowedCharacters = PB.characterClass(
  true,
  '<',
  '>',
  '(',
  ')',
  '[',
  ']',
  '\\',
  '.',
  ',',
  ';',
  ':',
  ' ',
  '\t',
  '@',
  '"'
)

// [^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*
const localPartUnquoted = pipe(
  PB.atLeastOne({ greedy: true })(localPartUnquotedAllowedCharacters),
  PB.then(
    pipe(
      PB.char('.'),
      PB.then(PB.atLeastOne({ greedy: true })(localPartUnquotedAllowedCharacters)),
      PB.subgroup,
      PB.anyNumber({ greedy: true })
    )
  )
)
const localPart = pipe(localPartUnquoted, PB.or(localPartQuoted), PB.subgroup)

const ipAddressByte = PB.between(1, 3)(PB.digit)

// \[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]
const domainIpAddress = pipe(
  PB.sequence(
    PB.char('['),
    ipAddressByte,
    PB.char('.'),
    ipAddressByte,
    PB.char('.'),
    ipAddressByte,
    PB.char('.'),
    ipAddressByte,
    PB.char(']')
  )
)

// ([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}
const domainName = pipe(
  PB.alnum,
  PB.and('-'),
  PB.anyNumber({ greedy: true }),
  PB.then(PB.char('.')),
  PB.subgroup,
  PB.atLeastOne({ greedy: true }),
  PB.then(PB.atLeast(2)(PB.alpha))
)

const domain = pipe(domainIpAddress, PB.or(domainName), PB.subgroup)

/**
 * @since 1.0.0
 * @category Pattern
 */
export const emailAddress: PB.Pattern = pipe(
  localPart,
  PB.then(PB.char('@')),
  PB.then(domain)
)

/**
 * @since 1.0.0
 * @category Schema
 */
export const EmailAddress = make(s =>
  s.brand<EmailAddressBrand>()(s.pattern(emailAddress, 'EmailAddress'))
)
