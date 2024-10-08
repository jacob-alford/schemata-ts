import * as E from 'fp-ts/Either'
import * as S from 'schemata-ts'
import { drawTree } from 'schemata-ts/TranscodeError'
import * as TC from 'schemata-ts/Transcoder'
import * as util from 'util'

const Schema = S.Strict({
  foo: S.Union(S.NonEmptyString, S.Boolean),
  bar: S.Array(S.Tuple(S.Natural, S.UUID(5)), { minLength: 2, maxLength: 5 }),
  baz: S.ParseBase64Json(S.UnknownRecord),
  qaz: S.Optional(S.UnknownArray),
})

const transcoder = TC.deriveTranscoder(Schema)

const result = transcoder.decode({
  quux: 'baz',
  bar: [[-1, 'not-a-uuid']],
  baz: '{"age":42}',
})

const expectedErrorLines = [
  'Encountered 7 transcode errors:',
  '┌ at key quux:',
  '└── Unexpected value: "baz"',
  '┌ at key bar:',
  '├── Expected Array[2,5]<[Integer<0,>, UUID version 5]> but got "Array(1)"',
  '├── at index 0:',
  '├─── at index 0:',
  '├──── Expected Integer<0,> but got -1',
  '├─── at index 1:',
  '└──── Expected UUID version 5 but got "not-a-uuid"',
  '┌ at key baz:',
  expect.stringContaining(
    '└── Expected Base64, but ran into serialization error: SyntaxError:',
  ),
  '┌ at key foo:',
  '├── at union member `boolean`:',
  '├─── Expected boolean but got undefined',
  '├── at union member `string<1,>`:',
  '└─── Expected string<1,> but got undefined',
]

describe('transcode errors', () => {
  if (E.isRight(result)) {
    throw new Error('Expected a left')
  }
  test('drawTree', () => {
    const mockError = result.left

    expect(drawTree(mockError).split('\n')).toStrictEqual(expectedErrorLines)
  })
  test('struct > array error', () => {
    const result = transcoder.decode([])
    if (E.isRight(result)) {
      throw new Error('Expected a left')
    }
    const mockError = result.left
    expect(drawTree(mockError)).toBe(
      `Encountered 1 transcode error:
─ Expected { bar: Array[2,5]<[Integer<0,>, UUID version 5]>, baz: Base64, foo: string<1,> | boolean, qaz?: Array<unknown>? } but got []`,
    )
  })
  test('single error', () => {
    const testErorr = TC.transcodeErrors(TC.typeMismatch('string', 42))
    expect(drawTree(testErorr, { showHeading: true })).toBe(
      `Encountered 1 transcode error:\n─ Expected string but got 42`,
    )
  })
  test('multiple simple errors', () => {
    const testErorr = TC.transcodeErrors(
      TC.typeMismatch('string', 42),
      TC.typeMismatch('number', 'foo'),
    )
    expect(drawTree(testErorr, { showHeading: false })).toBe(
      `─ Expected string but got 42\n─ Expected number but got "foo"`,
    )
  })
  it('shows big ints', () => {
    const testError = TC.transcodeErrors(TC.typeMismatch('string', 42n))
    expect(drawTree(testError, { showHeading: false })).toBe(
      `─ Expected string but got 42n`,
    )
  })
  it('shows ciruclar structures', () => {
    const obj: any = {}
    obj.obj = obj
    const testError = TC.transcodeErrors(TC.typeMismatch('string', obj))
    expect(drawTree(testError, { showHeading: false })).toBe(
      `─ Expected string but got {"obj":"[Circular object]"}`,
    )
  })
  it('shows circular arrays', () => {
    const arr: any = []
    arr[1] = arr
    const testError = TC.transcodeErrors(TC.typeMismatch('string', arr))
    expect(drawTree(testError, { showHeading: false })).toBe(
      `─ Expected string but got [null,"[Circular Array]"]`,
    )
  })
  it('shows maps', () => {
    const testError = TC.transcodeErrors(TC.typeMismatch('string', new Map()))
    expect(drawTree(testError, { showHeading: false })).toBe(
      `─ Expected string but got Map(0)`,
    )
  })
  it('shows sets', () => {
    const testError = TC.transcodeErrors(TC.typeMismatch('string', new Set()))
    expect(drawTree(testError, { showHeading: false })).toBe(
      `─ Expected string but got Set(0)`,
    )
  })
  it('shows functions', () => {
    const testError = TC.transcodeErrors(
      TC.typeMismatch('string', function Foo() {
        void 0
      }),
    )
    expect(drawTree(testError, { showHeading: false })).toBe(
      `─ Expected string but got [Function Foo]`,
    )
  })
  it('shows anonymous functions', () => {
    const testError = TC.transcodeErrors(
      TC.typeMismatch('string', function () {
        void 0
      }),
    )
    expect(drawTree(testError, { showHeading: false })).toBe(
      `─ Expected string but got [Function (anonymous)]`,
    )
  })
  it('shows symbols', () => {
    const testError = TC.transcodeErrors(
      TC.typeMismatch('string', Symbol('Foo')),
      TC.typeMismatch('string', Symbol()),
      TC.typeMismatch('string', Symbol.for('NS: Foo')),
    )
    expect(drawTree(testError, { showHeading: false })).toBe(
      `─ Expected string but got Symbol(Foo)
─ Expected string but got Symbol()
─ Expected string but got Symbol(NS: Foo)`,
    )
  })
  it('handles bad numbers', () => {
    const testError = TC.transcodeErrors(
      TC.typeMismatch('string', NaN),
      TC.typeMismatch('string', Infinity),
      TC.typeMismatch('string', -Infinity),
    )
    expect(drawTree(testError, { showHeading: false })).toBe(
      `─ Expected string but got NaN
─ Expected string but got Infinity
─ Expected string but got -Infinity`,
    )
  })
  it('handles deep bigints', () => {
    const testError = TC.transcodeErrors(
      TC.typeMismatch('string', { foo: { bar: { baz: 42n } } }),
    )
    expect(drawTree(testError, { showHeading: false })).toBe(
      `─ Expected string but got {"foo":{"bar":{"baz":"42n"}}}`,
    )
  })
  describe('introspection', () => {
    test('JSON.stringify', () => {
      expect(JSON.parse(JSON.stringify(result.left)).split('\n')).toStrictEqual(
        expectedErrorLines,
      )
    })
    test('toString', () => {
      expect(result.left.toString().split('\n')).toStrictEqual(expectedErrorLines)
    })
    test('inspect', () => {
      expect(util.inspect(result.left).split('\n')).toStrictEqual(expectedErrorLines)
    })
  })
})
