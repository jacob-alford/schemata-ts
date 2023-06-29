import * as assert from 'assert'
import * as O from 'fp-ts/Option'
  import * as S from '../../src/schemata'
  import { getEncoder } from '../../src/Encoder'

  const optionFromNullable = S.OptionFromNullable(S.String)

  // type Input = S.InputOf<typeof optionFromNullable>
  // type Input = string | null

  // type Output = S.OutputOf<typeof optionFromNullable>
  // Option<string>

  const encoder = getEncoder(optionFromNullable)

  assert.deepStrictEqual(encoder.encode(O.some('a')), 'a')
  assert.deepStrictEqual(encoder.encode(O.none), null)
