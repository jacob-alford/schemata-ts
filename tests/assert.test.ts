import * as S from 'schemata-ts'
import {
  deriveAssert,
  deriveInputAssert,
  deriveInputAssertTree,
} from 'schemata-ts/Assert'
import { type Integer } from 'schemata-ts/integer'

const Schema = S.Struct({
  foo: S.Union(S.NonEmptyString, S.Boolean),
  bar: S.Array(S.Tuple(S.Natural, S.UUID(5)), { minLength: 2, maxLength: 5 }),
  baz: S.Record(S.String(), S.Boolean),
  qaz: S.Optional(S.UnknownArray),
})

type Input = S.InputOf<typeof Schema>
type Output = S.OutputOf<typeof Schema>

describe('Assert', () => {
  it('should not assert', () => {
    const output: Output = {
      foo: ' ' as S.NonEmptyString,
      bar: [
        [1 as Integer<0>, S.isoUUID<5>().wrap('00000000-0000-5000-8000-000000000000')],
        [2 as Integer<0>, S.isoUUID<5>().wrap('00000000-0000-5000-8000-000000000000')],
      ],
      baz: { foo: true },
      qaz: undefined,
    }

    const assert = deriveAssert(Schema)

    expect(() => assert.assert(output)).not.toThrow()
  })

  it('should assert', () => {
    const output: Output = {
      foo: true,
      bar: [
        [1 as Integer<0>, S.isoUUID<5>().wrap('00000000-0000-5000-8000-000000000000')],
      ],
      baz: { foo: true },
      qaz: undefined,
    }

    output.qaz = [output]

    const assert = deriveAssert(Schema)

    expect(() => assert.assert(output)).toThrow(
      new TypeError(
        'Expected { bar: Array[2,5]<[Integer<0,>, UUID version 5]>, baz: Record<string, boolean>, foo: string<1,> | boolean, qaz?: Array<unknown>? },' +
          ' but got {"foo":true,"bar":[[1,"00000000-0000-5000-8000-000000000000"]],"baz":{"foo":true},"qaz":["[Circular object]"]}',
      ),
    )
  })
})

describe('deriveInputAssert', () => {
  it('should not assert', () => {
    const input: Input = {
      foo: ' ' as S.NonEmptyString,
      bar: [
        [1 as Integer<0>, '00000000-0000-5000-8000-000000000000'],
        [2 as Integer<0>, '00000000-0000-5000-8000-000000000000'],
      ],
      baz: { foo: true },
      qaz: undefined,
    }

    const assert = deriveInputAssert(Schema)

    expect(() => assert.assert(input)).not.toThrow()
  })

  it('should assert', () => {
    const input: Input = {
      foo: true,
      bar: [[1 as Integer<0>, '00000000-0000-5000-8000-000000000000']],
      baz: { foo: true },
      qaz: undefined,
    }

    input.qaz = [input]

    const assert = deriveInputAssert(Schema)

    expect(() => assert.assert(input)).toThrow(
      new TypeError(
        'Expected { bar: Array[2,5]<[Integer<0,>, UUID version 5]>, baz: Record<string, boolean>, foo: string<1,> | boolean, qaz?: Array<unknown>? }, ' +
          'but got {"foo":true,"bar":[[1,"00000000-0000-5000-8000-000000000000"]],"baz":{"foo":true},"qaz":["[Circular object]"]}',
      ),
    )
  })
})

describe('deriveTreeInputAssert', () => {
  it('should not assert', () => {
    const input: Input = {
      foo: ' ' as S.NonEmptyString,
      bar: [
        [1 as Integer<0>, '00000000-0000-5000-8000-000000000000'],
        [2 as Integer<0>, '00000000-0000-5000-8000-000000000000'],
      ],
      baz: { foo: true },
      qaz: undefined,
    }

    const assert = deriveInputAssertTree(Schema)

    expect(() => assert.assert(input)).not.toThrow()
  })

  it('should assert', () => {
    const input: Input = {
      foo: true,
      bar: [[1 as Integer<0>, '00000000-0000-5000-8000-000000000000']],
      baz: { foo: true },
      qaz: undefined,
    }

    input.qaz = [input]

    const assert = deriveInputAssertTree(Schema)

    expect(() => assert.assert(input)).toThrow(
      new TypeError(
        'Expected { bar: Array[2,5]<[Integer<0,>, UUID version 5]>, baz: Record<string, boolean>, foo: string<1,> | boolean, qaz?: Array<unknown>? }, ' +
          'but received the following errors:\n' +
          '┌ at key bar:\n' +
          '└── Expected Array[2,5]<[Integer<0,>, UUID version 5]> but got "Array(1)"',
      ),
    )
  })
})
