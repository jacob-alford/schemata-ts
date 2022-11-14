import * as E from 'fp-ts/Either'
import * as D from '../../src/Decoder'
import { pipe } from 'fp-ts/function'
import * as CheckDigit from '../../src/schemables/WithCheckDigit'
import * as CC from '../../src/schemata/string/CreditCard'
import { Schema as Pattern } from '../../src/schemables/WithPattern'
import { interpreter } from '../../src/SchemaExt'
import { luhn } from '../../src/internal/algorithms'

describe('WithCheckDigit', () => {
  test('Schema', () => {
    const decode = interpreter(D.Schemable)(
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
