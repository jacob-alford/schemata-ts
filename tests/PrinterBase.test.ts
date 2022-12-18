import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import * as P from '../src/base/PrinterBase'
import * as PE from '../src/PrintingError'

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
    expect(printer.print(Infinity)).toStrictEqual(E.left(new PE.InfiniteValue()))
    expect(printer.print(-Infinity)).toStrictEqual(E.left(new PE.InfiniteValue()))
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
      E.left(new PE.ErrorAtIndex(1, new PE.InfiniteValue())),
    )
  })
  it('captures circular references in an unknown array', () => {
    const a: any = [1]
    a[1] = a
    const printer = P.UnknownArray
    expect(printer.print(a)).toStrictEqual(
      E.left(new PE.ErrorAtIndex(1, new PE.CircularReference(a[1]))),
    )
    expect(printer.printLeft(a)).toStrictEqual(
      E.left(new PE.ErrorAtIndex(1, new PE.CircularReference(a[1]))),
    )
  })
  it('concats error groups', () => {
    const e1 = new PE.ErrorGroup([new PE.NotANumber()])
    const e2 = new PE.ErrorGroup([new PE.InfiniteValue()])
    expect(PE.semigroupPrintingError.concat(e1, e2)).toStrictEqual(
      new PE.ErrorGroup([new PE.NotANumber(), new PE.InfiniteValue()]),
    )
    expect(PE.semigroupPrintingError.concat(new PE.NotANumber(), e2)).toStrictEqual(
      new PE.ErrorGroup([new PE.NotANumber(), new PE.InfiniteValue()]),
    )
  })
  it('captures invalid values', () => {
    const printer = P.UnknownArray
    const s = Symbol()
    expect(printer.print([undefined, () => '', s, 0n])).toStrictEqual(
      E.left(
        new PE.ErrorGroup([
          new PE.ErrorAtIndex(0, new PE.InvalidValue(undefined)),
          new PE.ErrorAtIndex(1, new PE.InvalidValue(expect.any(Function))),
          new PE.ErrorAtIndex(2, new PE.InvalidValue(s)),
          new PE.ErrorAtIndex(3, new PE.InvalidValue(0n)),
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
      E.left(new PE.ErrorAtKey('b', new PE.CircularReference(a.b))),
    )
    expect(printer.printLeft(a)).toStrictEqual(
      E.left(new PE.ErrorAtKey('b', new PE.CircularReference(a.b))),
    )
  })
  it('returns circular reference for mutually circular record', () => {
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
      E.left(new PE.ErrorAtKey('b', new PE.CircularReference(b))),
    )
  })
  test('refine', () => {
    const printer = pipe(
      P.number,
      P.refine((n): n is typeof NaN => Number.isNaN(n), ''),
    )
    expect(printer.print(NaN)).toStrictEqual(E.left(new PE.NotANumber()))
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
      E.left(new PE.ErrorAtKey('bar', new PE.NotANumber())),
    )
    expect(printer.printLeft({ foo: 'foo', bar: NaN })).toStrictEqual(
      E.left(new PE.ErrorAtKey('bar', new PE.NotANumber())),
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
      E.left(new PE.ErrorAtKey('c', new PE.CircularReference(a.c))),
    )
    expect(printer.printLeft(a)).toStrictEqual(
      E.left(new PE.ErrorAtKey('c', new PE.CircularReference(a.c))),
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
  it('catches basic circularity in partial', () => {
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
      E.left(new PE.ErrorAtKey('b', new PE.CircularReference(a.b))),
    )
    expect(printer.printLeft(a)).toStrictEqual(
      E.left(new PE.ErrorAtKey('b', new PE.CircularReference(a.b))),
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
      E.left(new PE.ErrorAtKey('bar', new PE.NotANumber())),
    )
    expect(printer.printLeft({ foo: 1, bar: NaN })).toStrictEqual(
      E.left(new PE.ErrorAtKey('bar', new PE.NotANumber())),
    )
  })
  test('record catches circularity', () => {
    const a: any = {
      a: 1,
    }
    a.b = a
    // Not sure if this is actually possible without type casting
    // but it's a good test case anyway
    const printer = P.record(P.lazy('', () => printer)) as any
    expect(printer.print(a)).toStrictEqual(
      E.left(new PE.ErrorAtKey('b', new PE.CircularReference(a.b))),
    )
    expect(printer.printLeft(a)).toStrictEqual(
      E.left(new PE.ErrorAtKey('b', new PE.CircularReference(a.b))),
    )
  })
  test('array', () => {
    const printer = P.array(P.string)
    expect(printer.print(['foo', 'bar'])).toStrictEqual(E.right(['foo', 'bar']))
    expect(printer.printLeft(['foo', 'bar'])).toStrictEqual(E.right(['foo', 'bar']))
  })
  test('array captures printing errors', () => {
    const printer = P.array(P.number)
    expect(printer.print([1, NaN, Infinity])).toStrictEqual(
      E.left(
        new PE.ErrorGroup([
          new PE.ErrorAtIndex(1, new PE.NotANumber()),
          new PE.ErrorAtIndex(2, new PE.InfiniteValue()),
        ]),
      ),
    )
    expect(printer.printLeft([1, NaN, -Infinity])).toStrictEqual(
      E.left(
        new PE.ErrorGroup([
          new PE.ErrorAtIndex(1, new PE.NotANumber()),
          new PE.ErrorAtIndex(2, new PE.InfiniteValue()),
        ]),
      ),
    )
  })
  test('array captures circularity', () => {
    const a: any = [1]
    a.push(a)
    const printer = P.array(P.lazy('', () => printer)) as any
    expect(printer.print(a)).toStrictEqual(
      E.left(new PE.ErrorAtIndex(1, new PE.CircularReference(a[1]))),
    )
    expect(printer.printLeft(a)).toStrictEqual(
      E.left(new PE.ErrorAtIndex(1, new PE.CircularReference(a[1]))),
    )
  })
  test('tuple', () => {
    const printer = P.tuple(P.string, P.number)
    expect(printer.print(['foo', 1])).toStrictEqual(E.right(['foo', 1]))
    expect(printer.printLeft(['foo', 1])).toStrictEqual(E.right(['foo', 1]))
  })
  test('tuple captures printing errors', () => {
    const printer = P.tuple(P.string, P.number)
    expect(printer.print(['foo', NaN])).toStrictEqual(
      E.left(new PE.ErrorAtIndex(1, new PE.NotANumber())),
    )
    expect(printer.printLeft(['foo', NaN])).toStrictEqual(
      E.left(new PE.ErrorAtIndex(1, new PE.NotANumber())),
    )
  })
  test('tuple captures circularity', () => {
    const a: any = [1]
    a.push(a)
    const printer = P.tuple(
      P.number,
      P.lazy('', () => printer),
    ) as any
    expect(printer.print(a)).toStrictEqual(
      E.left(new PE.ErrorAtIndex(1, new PE.CircularReference(a[1]))),
    )
    expect(printer.printLeft(a)).toStrictEqual(
      E.left(new PE.ErrorAtIndex(1, new PE.CircularReference(a[1]))),
    )
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
    expect(printer.print(0 as never)).toStrictEqual(
      E.left(new PE.InvalidValue(undefined)),
    )
    expect(printer.printLeft(0 as never)).toStrictEqual(
      E.left(new PE.InvalidValue(undefined)),
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
