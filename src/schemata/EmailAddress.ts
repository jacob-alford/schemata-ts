/** @since 1.0.0 */
import * as k from 'kuvio'
import { type Branded } from 'schemata-ts/brand'
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

/**
 * Represents strings (email addresses) that conform to the RFC 5322 standard.
 *
 * @since 1.0.0
 * @category String
 */
export const EmailAddress: Schema<EmailAddress> = Brand<EmailAddressBrand>()(
  Pattern(k.patterns.emailAddress, 'EmailAddress'),
)
