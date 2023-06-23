/** @since 1.0.0 */
import { pipe } from 'fp-ts/function'
import { type Branded } from 'schemata-ts/brand'
import * as PB from 'schemata-ts/PatternBuilder'
import { type Schema } from 'schemata-ts/Schema'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Pattern } from 'schemata-ts/schemata/Pattern'

interface EmailAddressBrand {
  readonly EmailAddress: unique symbol
}

/**
 * Represents strings (email addresses) that conform to the RFC 5322 standard.
 *
 * @since 1.0.0
 * @category Model
 */
export type EmailAddress = Branded<string, EmailAddressBrand>

// (".+")
const localPartQuoted = pipe(
  PB.char('"'),
  PB.then(PB.atLeastOne({ greedy: true })(PB.characterClass(true, '"', [0, 0x1f]))),
  PB.then(PB.char('"')),
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
  '"',
)

// [^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*
const localPartUnquoted = pipe(
  PB.atLeastOne({ greedy: true })(localPartUnquotedAllowedCharacters),
  PB.then(
    pipe(
      PB.char('.'),
      PB.then(PB.atLeastOne({ greedy: true })(localPartUnquotedAllowedCharacters)),
      PB.subgroup,
      PB.anyNumber({ greedy: true }),
    ),
  ),
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
    PB.char(']'),
  ),
)

// ([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}
const domainName = pipe(
  PB.alnum,
  PB.and('-'),
  PB.anyNumber({ greedy: true }),
  PB.then(PB.char('.')),
  PB.subgroup,
  PB.atLeastOne({ greedy: true }),
  PB.then(PB.atLeast(2)(PB.alpha)),
)

const domain = pipe(domainIpAddress, PB.or(domainName), PB.subgroup)

/**
 * @since 1.0.0
 * @category Pattern
 */
export const emailAddress: PB.Pattern = pipe(
  localPart,
  PB.then(PB.char('@')),
  PB.then(domain),
)

/**
 * Represents strings (email addresses) that conform to the RFC 5322 standard.
 *
 * @since 1.0.0
 * @category String
 */
export const EmailAddress: Schema<EmailAddress> = Brand<EmailAddressBrand>()(
  Pattern(emailAddress, 'EmailAddress'),
)
