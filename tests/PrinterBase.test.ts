import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import * as P from '../src/base/PrinterBase'

describe('PrinterBase', () => {
  test('literal', () => {
    const printer = P.literal('foo', 'bar')
    expect(printer.print('foo')).toStrictEqual(E.right('foo'))
    expect(printer.print('bar')).toStrictEqual(E.right('bar'))
  })
  test('string', () => {
    const printer = P.string
    expect(printer.print('foo')).toStrictEqual(E.right('foo'))
  })
  test('number', () => {
    const printer = P.number
    expect(printer.print(1)).toStrictEqual(E.right(1))
  })
  it('captures infinite values', () => {
    const printer = P.number
    expect(printer.print(Infinity)).toStrictEqual(E.left(new P.InfiniteValue()))
    expect(printer.print(-Infinity)).toStrictEqual(E.left(new P.InfiniteValue()))
  })
  test('boolean', () => {
    const printer = P.boolean
    expect(printer.print(true)).toStrictEqual(E.right(true))
  })
  test('UnknownArray', () => {
    const printer = P.UnknownArray
    expect(printer.print([1, 2, 3, null])).toStrictEqual(E.right([1, 2, 3, null]))
    expect(printer.printLeft([1, 2, 3])).toStrictEqual(E.right([1, 2, 3]))
  })
  it('captures infinite values in an unknown array', () => {
    const printer = P.UnknownArray
    expect(printer.print([1, Infinity, 3])).toStrictEqual(
      E.left(new P.ErrorAtIndex(1, new P.InfiniteValue())),
    )
  })
  it('captures circular references in an unknown array', () => {
    const a: any = [1]
    a[1] = a
    const printer = P.UnknownArray
    expect(printer.print(a)).toStrictEqual(
      E.left(new P.ErrorAtIndex(1, new P.CircularReference(a[1]))),
    )
    expect(printer.printLeft(a)).toStrictEqual(
      E.left(new P.ErrorAtIndex(1, new P.CircularReference(a[1]))),
    )
  })
  it('concats error groups', () => {
    const e1 = new P.ErrorGroup([new P.NotANumber()])
    const e2 = new P.ErrorGroup([new P.InfiniteValue()])
    expect(P.semigroupPrintingError.concat(e1, e2)).toStrictEqual(
      new P.ErrorGroup([new P.NotANumber(), new P.InfiniteValue()]),
    )
    expect(P.semigroupPrintingError.concat(new P.NotANumber(), e2)).toStrictEqual(
      new P.ErrorGroup([new P.NotANumber(), new P.InfiniteValue()]),
    )
  })
  it('captures invalid values', () => {
    const printer = P.UnknownArray
    const s = Symbol()
    expect(printer.print([undefined, () => '', s, 0n])).toStrictEqual(
      E.left(
        new P.ErrorGroup([
          new P.ErrorAtIndex(0, new P.InvalidValue(undefined)),
          new P.ErrorAtIndex(1, new P.InvalidValue(expect.any(Function))),
          new P.ErrorAtIndex(2, new P.InvalidValue(s)),
          new P.ErrorAtIndex(3, new P.InvalidValue(0n)),
        ]),
      ),
    )
  })
  test('UnknownRecord', () => {
    const printer = P.UnknownRecord
    expect(printer.print({ bar: 2, foo: 1 })).toStrictEqual(
      E.right({
        bar: 2,
        foo: 1,
      }),
    )
    expect(printer.printLeft({ bar: 2, foo: 1 })).toStrictEqual(
      E.right({
        bar: 2,
        foo: 1,
      }),
    )
  })
  it('returns circular reference for an obviously circular reference', () => {
    const a: any = {
      a: 1,
    }
    a.b = a
    const printer = P.UnknownRecord
    expect(printer.print(a)).toStrictEqual(
      E.left(new P.ErrorAtKey('b', new P.CircularReference(a.b))),
    )
    expect(printer.printLeft(a)).toStrictEqual(
      E.left(new P.ErrorAtKey('b', new P.CircularReference(a.b))),
    )
  })
  it('returns unknown error for mutually circular record', () => {
    const printer = P.UnknownRecord
    const a: any = {
      a: 1,
    }
    const b: any = {
      b: 2,
      a,
    }
    a.b = b
    expect(printer.print(a)).toStrictEqual(
      E.left(new P.ErrorAtKey('b', new P.UnknownError(expect.any(Error)))),
    )
  })
  test('refine', () => {
    const printer = pipe(
      P.number,
      P.refine((n): n is typeof NaN => Number.isNaN(n), ''),
    )
    expect(printer.print(NaN)).toStrictEqual(E.left(new P.NotANumber()))
  })
  test('nullable', () => {
    const printer = P.nullable(P.string)
    expect(printer.print(null)).toStrictEqual(E.right(null))
    expect(printer.print('foo')).toStrictEqual(E.right('foo'))
    expect(printer.printLeft(null)).toStrictEqual(E.right(null))
    expect(printer.printLeft('foo')).toStrictEqual(E.right('foo'))
  })
  test('struct', () => {
    const printer = P.struct({
      foo: P.string,
      bar: P.number,
    })
    expect(printer.print({ foo: 'foo', bar: 1 })).toStrictEqual(
      E.right({ foo: 'foo', bar: 1 }),
    )
    expect(printer.printLeft({ foo: 'foo', bar: 1 })).toStrictEqual(
      E.right({ foo: 'foo', bar: 1 }),
    )
  })
  it('captures context decoding structs', () => {
    const printer = P.struct({
      foo: P.string,
      bar: P.number,
    })
    expect(printer.print({ foo: 'foo', bar: NaN })).toStrictEqual(
      E.left(new P.ErrorAtKey('bar', new P.NotANumber())),
    )
    expect(printer.printLeft({ foo: 'foo', bar: NaN })).toStrictEqual(
      E.left(new P.ErrorAtKey('bar', new P.NotANumber())),
    )
  })
  it('captures circular references', () => {
    type A = {
      b: number
      c: A
    }
    const a = {
      b: 1,
    } as any
    a.c = a
    const printer: P.Printer<A, A> = P.struct({
      b: P.number,
      c: P.lazy('', () => printer),
    })
    expect(printer.print(a)).toStrictEqual(
      E.left(new P.ErrorAtKey('c', new P.CircularReference(a.c))),
    )
    expect(printer.printLeft(a)).toStrictEqual(
      E.left(new P.ErrorAtKey('c', new P.CircularReference(a.c))),
    )
  })
  test('partial', () => {
    const printer = P.partial({
      foo: P.string,
      bar: P.number,
    })
    expect(printer.print({ foo: 'foo', bar: 1 })).toStrictEqual(
      E.right({ foo: 'foo', bar: 1 }),
    )
    expect(printer.print({ foo: 'foo' })).toStrictEqual(E.right({ foo: 'foo' }))
    expect(printer.printLeft({ foo: 'foo', bar: 1 })).toStrictEqual(
      E.right({ foo: 'foo', bar: 1 }),
    )
    expect(printer.printLeft({ foo: 'foo' })).toStrictEqual(E.right({ foo: 'foo' }))
  })
  it('catches basic circularity in records', () => {
    type A = {
      a: 1
      b: A
    }
    const a: any = {
      a: 1,
    }
    a.b = a
    const printer: P.Printer<A, A> = P.partial({
      a: P.number,
      b: P.lazy('', () => printer),
    })
    expect(printer.print(a)).toStrictEqual(
      E.left(new P.ErrorAtKey('b', new P.CircularReference(a.b))),
    )
    expect(printer.printLeft(a)).toStrictEqual(
      E.left(new P.ErrorAtKey('b', new P.CircularReference(a.b))),
    )
  })
  test('record', () => {
    const printer = P.record(P.string)
    expect(printer.print({ foo: 'foo', bar: 'bar' })).toStrictEqual(
      E.right({ foo: 'foo', bar: 'bar' }),
    )
  })
  test('record catches printing errors', () => {
    const printer = P.record(P.number)
    expect(printer.print({ foo: 1, bar: NaN })).toStrictEqual(
      E.left(new P.ErrorAtKey('bar', new P.NotANumber())),
    )
    expect(printer.printLeft({ foo: 1, bar: NaN })).toStrictEqual(
      E.left(new P.ErrorAtKey('bar', new P.NotANumber())),
    )
  })
  test('array', () => {
    const printer = P.array(P.string)
    expect(printer.print(['foo', 'bar'])).toStrictEqual(E.right(['foo', 'bar']))
    expect(printer.printLeft(['foo', 'bar'])).toStrictEqual(E.right(['foo', 'bar']))
  })
  test('array captures printing errors', () => {
    const printer = P.array(P.number)
    expect(printer.print([1, NaN])).toStrictEqual(
      E.left(new P.ErrorAtIndex(1, new P.NotANumber())),
    )
    expect(printer.printLeft([1, NaN])).toStrictEqual(
      E.left(new P.ErrorAtIndex(1, new P.NotANumber())),
    )
  })
  test('tuple', () => {
    const printer = P.tuple(P.string, P.number)
    expect(printer.print(['foo', 1])).toStrictEqual(E.right(['foo', 1]))
    expect(printer.printLeft(['foo', 1])).toStrictEqual(E.right(['foo', 1]))
  })
  test('intersect', () => {
    const printer = pipe(
      P.struct({ foo: P.literal('bar') }),
      P.intersect(P.struct({ bar: P.number })),
    )
    expect(printer.print({ foo: 'bar', bar: 1 })).toStrictEqual(
      E.right({ foo: 'bar', bar: 1 }),
    )
    expect(printer.printLeft({ foo: 'bar', bar: 1 })).toStrictEqual(
      E.right({ foo: 'bar', bar: 1 }),
    )
  })
  it('returns invalid value for empty intersection', () => {
    const printer = pipe(P.number, P.intersect(P.string))
    expect(printer.print(0 as never)).toStrictEqual(E.left(new P.InvalidValue(undefined)))
    expect(printer.printLeft(0 as never)).toStrictEqual(
      E.left(new P.InvalidValue(undefined)),
    )
  })
  test('sum', () => {
    const printer = P.sum('type')({
      foo: P.struct({ type: P.literal('foo'), foo: P.string }),
      bar: P.struct({ type: P.literal('bar'), bar: P.number }),
    })
    expect(printer.print({ type: 'foo', foo: 'bar' })).toStrictEqual(
      E.right({ type: 'foo', foo: 'bar' }),
    )
    expect(printer.print({ type: 'bar', bar: 1 })).toStrictEqual(
      E.right({ type: 'bar', bar: 1 }),
    )
    expect(printer.printLeft({ type: 'foo', foo: 'bar' })).toStrictEqual(
      E.right({ type: 'foo', foo: 'bar' }),
    )
    expect(printer.printLeft({ type: 'bar', bar: 1 })).toStrictEqual(
      E.right({ type: 'bar', bar: 1 }),
    )
  })
  test('lazy', () => {
    const printer = P.lazy('', () => P.string)
    expect(printer.print('foo')).toStrictEqual(E.right('foo'))
    expect(printer.printLeft('foo')).toStrictEqual(E.right('foo'))
  })
  it('stringifies recursion', () => {
    type A = {
      a: string
      b: B
    }
    type B = {
      c: A | null
      d: number
    }
    const printerA: P.Printer<A, A> = P.lazy('', () =>
      P.struct({
        a: P.string,
        b: printerB,
      }),
    )
    const printerB: P.Printer<B, B> = P.lazy('', () =>
      P.struct({
        c: P.nullable(printerA),
        d: P.number,
      }),
    )
    expect(
      printerA.print({ a: 'foo', b: { c: { a: 'foo', b: { c: null, d: 2 } }, d: 1 } }),
    ).toStrictEqual(
      E.right({ a: 'foo', b: { c: { a: 'foo', b: { c: null, d: 2 } }, d: 1 } }),
    )
  })
  test('readonly', () => {
    const printer = P.readonly(P.string)
    expect(printer.print('foo')).toStrictEqual(E.right('foo'))
  })
})
