import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import * as D from '../../src/Decoder'
import { luhn } from '../../src/internal/algorithms'
import { interpret } from '../../src/Schema'
import * as CC from '../../src/schemata/string/CreditCard'
import * as CheckDigit from '../../test-utils/schemable-exports/WithCheckDigit'
import { Schema as Pattern } from '../../test-utils/schemable-exports/WithPattern'

describe('WithCheckDigit', () => {
  test('Schema', () => {
    const decode = interpret(D.Schemable)(
      pipe(
        Pattern(CC.creditCard, 'CreditCard'),
        CheckDigit.Schema(
          ccn => luhn(ccn.substring(0, ccn.length - 1)).toString(10),
          ccn => ccn.length - 1,
        ),
      ),
    )
    expect(decode.decode('4485550236684973')).toStrictEqual(E.right('4485550236684973'))
  })
})
