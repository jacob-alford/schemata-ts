import * as assert from 'assert'
import * as E from 'fp-ts/Either'
  import * as S from '../../src/schemata'
  import { getDecoder } from '../../src/Decoder'

  const SomeDomainType = S.Struct({
    a: S.String,
    b: S.BooleanFromNumber,
  })

  // SomeDomainType will have the type:
  // Schema<{ a: string, b: number }, { a: string, b: boolean }>

  const decoder = getDecoder(SomeDomainType)

  assert.deepStrictEqual(
    decoder.decode({
      a: 'foo',
      b: 0,
    }),
    E.right({
      a: 'foo',
      b: false,
    }),
  )
