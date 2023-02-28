import { pipe } from 'fp-ts/function'
import * as Iso from 'schemata-ts/iso'

const isoBooleanNumber = Iso.make(
  (a: boolean): number => (a ? 1 : 0),
  x => x === 1,
)

const isoNumberStruct = Iso.make(
  (a: number): { a: number } => ({ a }),
  x => x.a,
)

describe('iso', () => {
  test('imap', () => {
    const isoBooleanString = pipe(isoBooleanNumber, Iso.imap(String, parseFloat))
    expect(isoBooleanString.get(true)).toEqual('1')
    expect(isoBooleanString.reverseGet('0')).toEqual(false)
  })
  test('compose', () => {
    const isoBooleanStruct = pipe(isoBooleanNumber, Iso.compose(isoNumberStruct))
    expect(isoBooleanStruct.get(true)).toEqual({ a: 1 })
    expect(isoBooleanStruct.reverseGet({ a: 0 })).toEqual(false)
  })
  test('id', () => {
    const isoBooleanBoolean = pipe(isoBooleanNumber, Iso.compose(Iso.id()))
    expect(isoBooleanBoolean.get(true)).toEqual(1)
    expect(isoBooleanBoolean.reverseGet(0)).toEqual(false)
  })
})
