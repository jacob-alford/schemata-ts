import * as E from 'fp-ts/Either'
import * as S from 'schemata-ts'
import { drawTree } from 'schemata-ts/TranscodeError'
import * as TC from 'schemata-ts/Transcoder'

const Schema = S.Strict({
  foo: S.Union(S.NonEmptyString, S.Boolean),
  bar: S.Array({ minLength: 2, maxLength: 5 })(S.Tuple(S.Natural, S.UUID(5))),
  baz: S.ParseBase64Json(S.UnknownRecord),
  qaz: S.Optional(S.UnknownArray),
})

const transcoder = TC.deriveTranscoder(Schema)

const result = transcoder.decode({
  quux: 'baz',
  bar: [[-1, 'not-a-uuid']],
  baz: '{"age":42}',
})

const expectedError = `  ┌ Error at key quux:
  └─ Unexpected value: \`baz\`
  ┌ Error at key bar:
  ├─ Expected Array[2,5]<[Integer<0,>, UUID version 5]> but got \`Array(1)\`
  ├─ Error at index 0:
  ├──── Error at index 0:
  ├──────── Expected Integer<0,> but got \`-1\`
  ├──── Error at index 1:
  └──────── Expected UUID version 5 but got \`not-a-uuid\`
  ┌ Error at key baz:
  └─ Expected Base64, but ran into serialization error: \`SyntaxError: Unexpected token j in JSON at position 0\`; got {"age":42}
  ┌ Error at key foo:
  ├─ Error at union member \`boolean\`:
  ├──── Expected boolean but got \`undefined\`
  ├─ Error at union member \`string<1,>\`:
  └──── Expected string<1,> but got \`undefined\``

describe('transcode errors', () => {
  if (E.isRight(result)) {
    throw new Error('Expected a left')
  }
  test('drawTree', () => {
    const mockError = result.left
    expect(drawTree(mockError)).toBe(expectedError)
  })
})
