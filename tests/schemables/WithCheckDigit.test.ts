import * as D from '../../src/Decoder'
import * as CC from '../../src/schemata/string/CreditCard'
import * as CheckDigit from '../../test-utils/schemable-exports/WithCheckDigit'
import * as E from 'fp-ts/Either'
import { interpreter } from '../../src/SchemaExt'
import { luhn } from '../../src/internal/algorithms'
import { Schema as Pattern } from '../../test-utils/schemable-exports/WithPattern'
import { pipe } from 'fp-ts/function'

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
