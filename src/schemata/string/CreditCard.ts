/**
 * Represents (some) valid credit card numbers.
 *
 * At the moment, this mostly handles Visa, Mastercard, American Express, Diners Club,
 * Discover, and JCB.
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { Branded } from 'io-ts'
import { luhn } from 'schemata-ts/internal/algorithms'
import * as PB from 'schemata-ts/PatternBuilder'
import { make } from 'schemata-ts/SchemaExt'

interface CreditCardBrand {
  readonly CreditCard: unique symbol
}

/**
 * @since 1.0.0
 * @category Model
 */
export type CreditCard = Branded<string, CreditCardBrand>

// source: https://en.wikipedia.org/w/index.php?title=Payment_card_number&oldid=1110892430
// afaict the 13-digit variant has not been a thing for years, but maybe there
// are still some valid cards floating around?
// /(^4(\d{12}|\d{15})$)/
const visa = pipe(
  PB.char('4'),
  PB.then(pipe(PB.exactly(12)(PB.digit), PB.or(PB.exactly(15)(PB.digit)), PB.subgroup)),
)

// source: https://web.archive.org/web/20180514224309/https://www.mastercard.us/content/dam/mccom/global/documents/mastercard-rules.pdf
// /(^(5[1-5]\d{4}|222[1-9]\d{2}|22[3-9]\d{3}|2[3-6]\d{4}|27[01]\d{3}|2720\d{2})\d{10}$)/
const mastercard = pipe(
  PB.subgroup(
    pipe(
      PB.sequence(
        PB.char('5'),
        PB.characterClass(false, ['1', '5']),
        PB.exactly(4)(PB.digit),
      ),
      PB.or(
        PB.sequence(
          PB.exactString('222'),
          PB.characterClass(false, ['1', '9']),
          PB.exactly(2)(PB.digit),
        ),
      ),
      PB.or(
        PB.sequence(
          PB.exactString('22'),
          PB.characterClass(false, ['3', '9']),
          PB.exactly(3)(PB.digit),
        ),
      ),
      PB.or(
        PB.sequence(
          PB.exactString('2'),
          PB.characterClass(false, ['3', '6']),
          PB.exactly(4)(PB.digit),
        ),
      ),
      PB.or(
        PB.sequence(
          PB.exactString('27'),
          PB.characterClass(false, '0', '1'),
          PB.exactly(3)(PB.digit),
        ),
      ),
      PB.or(PB.sequence(PB.exactString('2720'), PB.exactly(2)(PB.digit))),
    ),
  ),
  PB.then(PB.exactly(10)(PB.digit)),
)

// source: https://web.archive.org/web/20210504163517/https://www.americanexpress.com/content/dam/amex/hk/en/staticassets/merchant/pdf/support-and-services/useful-information-and-downloads/GuidetoCheckingCardFaces.pdf
// /(^3[47]\d{13}$)/
const amex = PB.sequence(
  PB.char('3'),
  PB.characterClass(false, '4', '7'),
  PB.exactly(13)(PB.digit),
)

// US/Canada DCI cards will match as Mastercard (source: https://web.archive.org/web/20081204135437/http://www.mastercard.com/in/merchant/en/solutions_resources/dinersclub.html)
// Others match regex below (source: https://web.archive.org/web/20170822221741/https://www.discovernetwork.com/downloads/IPP_VAR_Compliance.pdf)
// /^(3(0([0-5]\d{5}|95\d{4})|[89]\d{6})\d{8,11}|36\d{6}\d{6,11})$/
const dinersClub = pipe(
  PB.sequence(
    PB.char('3'),
    PB.subgroup(
      pipe(
        PB.sequence(
          PB.char('0'),
          PB.subgroup(
            pipe(
              PB.sequence(PB.characterClass(false, ['0', '5']), PB.exactly(5)(PB.digit)),
              PB.or(PB.sequence(PB.exactString('95'), PB.exactly(4)(PB.digit))),
            ),
          ),
        ),
        PB.or(PB.sequence(PB.characterClass(false, '8', '9'), PB.exactly(6)(PB.digit))),
      ),
    ),
    PB.between(8, 11)(PB.digit),
  ),
  PB.or(
    PB.sequence(
      PB.exactString('36'),
      PB.exactly(6)(PB.digit),
      PB.between(6, 11)(PB.digit),
    ),
  ),
  PB.subgroup,
)

// source: https://web.archive.org/web/20170822221741/https://www.discovernetwork.com/downloads/IPP_VAR_Compliance.pdf
// /(^(6011(0[5-9]\d{2}|[2-4]\d{3}|74\d{2}|7[7-9]\d{2}|8[6-9]\d{2}|9\d{3})|64[4-9]\d{5}|650[0-5]\d{4}|65060[1-9]\d{2}|65061[1-9]\d{2}|6506[2-9]\d{3}|650[7-9]\d{4}|65[1-9]\d{5})\d{8,11}$)/,
const discover = pipe(
  PB.oneOf(
    pipe(
      PB.exactString('6011'),
      PB.then(
        PB.subgroup(
          PB.oneOf(
            PB.sequence(
              PB.char('0'),
              PB.characterClass(false, ['5', '9']),
              PB.exactly(2)(PB.digit),
            ),
            PB.sequence(PB.characterClass(false, ['2', '4']), PB.exactly(3)(PB.digit)),
            PB.sequence(PB.exactString('74'), PB.exactly(2)(PB.digit)),
            PB.sequence(
              PB.exactString('7'),
              PB.characterClass(false, ['7', '9']),
              PB.exactly(2)(PB.digit),
            ),
            PB.sequence(
              PB.exactString('8'),
              PB.characterClass(false, ['6', '9']),
              PB.exactly(2)(PB.digit),
            ),
            PB.sequence(PB.exactString('9'), PB.exactly(3)(PB.digit)),
          ),
        ),
      ),
    ),
    PB.sequence(
      PB.exactString('64'),
      PB.characterClass(false, ['4', '9']),
      PB.exactly(5)(PB.digit),
    ),
    PB.sequence(
      PB.exactString('650'),
      PB.characterClass(false, ['0', '5']),
      PB.exactly(4)(PB.digit),
    ),
    PB.sequence(
      PB.exactString('65060'),
      PB.characterClass(false, ['1', '9']),
      PB.exactly(2)(PB.digit),
    ),
    PB.sequence(
      PB.exactString('65061'),
      PB.characterClass(false, ['1', '9']),
      PB.exactly(2)(PB.digit),
    ),
    PB.sequence(
      PB.exactString('6506'),
      PB.characterClass(false, ['2', '9']),
      PB.exactly(3)(PB.digit),
    ),
    PB.sequence(
      PB.exactString('650'),
      PB.characterClass(false, ['7', '9']),
      PB.exactly(4)(PB.digit),
    ),
    PB.sequence(
      PB.exactString('65'),
      PB.characterClass(false, ['1', '9']),
      PB.exactly(5)(PB.digit),
    ),
  ),
  PB.subgroup,
  PB.then(PB.between(8, 11)(PB.digit)),
)

// /^(352[89]\d{4}|35[3-8]\d{5})\d{8,11}$/
const jcb = pipe(
  PB.sequence(
    PB.exactString('352'),
    PB.characterClass(false, '8', '9'),
    PB.exactly(4)(PB.digit),
  ),
  PB.or(
    PB.sequence(
      PB.exactString('35'),
      PB.characterClass(false, ['3', '8']),
      PB.exactly(5)(PB.digit),
    ),
  ),
  PB.subgroup,
  PB.then(PB.between(8, 11)(PB.digit)),
)

// Rupay
// some are JCB co-branded so will match as JCB above
// for the rest, best source I could find is just wikipedia:
// https://en.wikipedia.org/w/index.php?title=Payment_card_number&oldid=1110892430
// /^((60|65|81|82)\d{14}|508\d{14})$/
const rupay = PB.subgroup(
  PB.oneOf(
    PB.sequence(
      PB.subgroup(
        PB.oneOf(
          PB.exactString('60'),
          PB.exactString('65'),
          PB.exactString('81'),
          PB.exactString('82'),
        ),
      ),
      PB.exactly(14)(PB.digit),
    ),
    PB.sequence(PB.exactString('508'), PB.exactly(14)(PB.digit)),
  ),
)

// /^62(2(12[6-9]\d{2}|1[3-9]\d{3}|[2-8]\d|9[01]\d{3}|92[0-5]\d{2})|[4-6]\d{5}|8[2-8]\d{4})\d{8,11}$/
const unionPay = PB.sequence(
  PB.exactString('62'),
  PB.subgroup(
    PB.oneOf(
      PB.sequence(
        PB.char('2'),
        PB.subgroup(
          PB.oneOf(
            PB.sequence(
              PB.exactString('12'),
              PB.characterClass(false, ['6', '9']),
              PB.exactly(2)(PB.digit),
            ),
            PB.sequence(
              PB.char('1'),
              PB.characterClass(false, ['3', '9']),
              PB.exactly(3)(PB.digit),
            ),
            PB.sequence(PB.characterClass(false, ['2', '8']), PB.digit),
            PB.sequence(
              PB.exactString('9'),
              PB.characterClass(false, '0', '1'),
              PB.exactly(3)(PB.digit),
            ),
            PB.sequence(
              PB.exactString('92'),
              PB.characterClass(false, ['0', '5']),
              PB.exactly(2)(PB.digit),
            ),
          ),
        ),
      ),
      PB.sequence(PB.characterClass(false, ['4', '6']), PB.exactly(5)(PB.digit)),
      PB.sequence(
        PB.exactString('8'),
        PB.characterClass(false, ['2', '8']),
        PB.exactly(4)(PB.digit),
      ),
    ),
  ),
  PB.between(8, 11)(PB.digit),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
export const creditCard = PB.oneOf(
  visa,
  mastercard,
  amex,
  dinersClub,
  discover,
  jcb,
  rupay,
  unionPay,
)

/**
 * Represents a credit card number; currently this should accept Visa, Mastercard,
 * American Express, Diners Club, Discover, JCB, Rupay, and UnionPay.
 *
 * @since 1.0.0
 * @category Schema
 */
export const CreditCard = make(s =>
  pipe(
    s.pattern(creditCard, 'CreditCard'),
    s.checkDigit(
      ccn => luhn(ccn.substring(0, ccn.length - 1)).toString(10),
      ccn => ccn.length - 1,
    ),
    s.brand<CreditCardBrand>(),
  ),
)
