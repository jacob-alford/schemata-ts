import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import * as P from '../src/base/PrinterBase'
import * as PE from '../src/PrintError'
import { Printer as DatePrinter } from '../src/schemables/WithDate/instances/printer'

describe('PrinterBase', () => {
  test('literal', () => {
    const printer = P.literal('foo', 'bar')
    expect(printer.domainToJson('foo')).toStrictEqual(E.right('foo'))
    expect(printer.domainToJson('bar')).toStrictEqual(E.right('bar'))
  })
  test('string', () => {
    const printer = P.string
    expect(printer.domainToJson('foo')).toStrictEqual(E.right('foo'))
  })
  test('number', () => {
    const printer = P.number
    expect(printer.domainToJson(1)).toStrictEqual(E.right(1))
  })
  it('captures infinite values', () => {
    const printer = P.number
    expect(printer.domainToJson(Infinity)).toStrictEqual(E.left(new PE.InfiniteValue()))
    expect(printer.domainToJson(-Infinity)).toStrictEqual(E.left(new PE.InfiniteValue()))
  })
  test('boolean', () => {
    const printer = P.boolean
    expect(printer.domainToJson(true)).toStrictEqual(E.right(true))
  })
  test('UnknownArray', () => {
    const printer = P.UnknownArray
    expect(printer.domainToJson([1, 2, 3, null])).toStrictEqual(E.right([1, 2, 3, null]))
    expect(printer.codomainToJson([1, 2, 3])).toStrictEqual(E.right([1, 2, 3]))
  })
  it('captures infinite values in an unknown array', () => {
    const printer = P.UnknownArray
    expect(printer.domainToJson([1, Infinity, 3])).toStrictEqual(
      E.left(new PE.ErrorAtIndex(1, new PE.InfiniteValue())),
    )
  })
  it('captures circular references in an unknown array', () => {
    const a: any = [1]
    a[1] = a
    const printer = P.UnknownArray
    expect(printer.domainToJson(a)).toStrictEqual(
      E.left(new PE.ErrorAtIndex(1, new PE.CircularReference(a[1]))),
    )
    expect(printer.codomainToJson(a)).toStrictEqual(
      E.left(new PE.ErrorAtIndex(1, new PE.CircularReference(a[1]))),
    )
  })
  it('captures suberrors in unknown arrays', () => {
    const printer = P.UnknownArray
    expect(printer.domainToJson([[NaN], 'a'])).toStrictEqual(
      E.left(new PE.ErrorAtIndex(0, new PE.ErrorAtIndex(0, new PE.NotANumber()))),
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
    expect(printer.domainToJson([undefined, () => '', s, 0n])).toStrictEqual(
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
    expect(printer.domainToJson({ bar: 2, foo: 1 })).toStrictEqual(
      E.right({
        bar: 2,
        foo: 1,
      }),
    )
    expect(printer.codomainToJson({ bar: 2, foo: 1 })).toStrictEqual(
      E.right({
        bar: 2,
        foo: 1,
      }),
    )
  })
  it("captures invalid values in an unknown record's values", () => {
    const printer = P.UnknownRecord
    expect(printer.domainToJson({ bar: 2, foo: { bar: NaN } })).toStrictEqual(
      E.left(new PE.ErrorAtKey('foo', new PE.ErrorAtKey('bar', new PE.NotANumber()))),
    )
  })
  it('returns circular reference for an obviously circular reference', () => {
    const a: any = {
      a: 1,
    }
    a.b = a
    const printer = P.UnknownRecord
    expect(printer.domainToJson(a)).toStrictEqual(
      E.left(new PE.ErrorAtKey('b', new PE.CircularReference(a.b))),
    )
    expect(printer.codomainToJson(a)).toStrictEqual(
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
    expect(printer.domainToJson(a)).toStrictEqual(
      E.left(new PE.ErrorAtKey('b', new PE.CircularReference(b))),
    )
  })
  test('refine', () => {
    const printer = pipe(
      P.number,
      P.refine((n): n is typeof NaN => Number.isNaN(n), ''),
    )
    expect(printer.domainToJson(NaN)).toStrictEqual(E.left(new PE.NotANumber()))
  })
  test('nullable', () => {
    const printer = P.nullable(P.string)
    expect(printer.domainToJson(null)).toStrictEqual(E.right(null))
    expect(printer.domainToJson('foo')).toStrictEqual(E.right('foo'))
    expect(printer.codomainToJson(null)).toStrictEqual(E.right(null))
    expect(printer.codomainToJson('foo')).toStrictEqual(E.right('foo'))
  })
  test('struct', () => {
    const printer = P.struct({
      foo: P.string,
      bar: P.number,
    })
    expect(printer.domainToJson({ foo: 'foo', bar: 1 })).toStrictEqual(
      E.right({ foo: 'foo', bar: 1 }),
    )
    expect(printer.codomainToJson({ foo: 'foo', bar: 1 })).toStrictEqual(
      E.right({ foo: 'foo', bar: 1 }),
    )
  })
  it('captures context decoding structs', () => {
    const printer = P.struct({
      foo: P.string,
      bar: P.number,
    })
    expect(printer.domainToJson({ foo: 'foo', bar: NaN })).toStrictEqual(
      E.left(new PE.ErrorAtKey('bar', new PE.NotANumber())),
    )
    expect(printer.codomainToJson({ foo: 'foo', bar: NaN })).toStrictEqual(
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
    expect(printer.domainToJson(a)).toStrictEqual(
      E.left(new PE.ErrorAtKey('c', new PE.CircularReference(a.c))),
    )
    expect(printer.codomainToJson(a)).toStrictEqual(
      E.left(new PE.ErrorAtKey('c', new PE.CircularReference(a.c))),
    )
  })
  test('PrintError guard', () => {
    expect(PE.isPrintError('PrintError kappa /s')).toBe(false)
    expect(PE.isPrintError(new PE.CircularReference('PrintError kappa /s'))).toBe(true)
    expect(
      PE.isPrintError(new PE.NamedError('PrintError kappa /s', new PE.NotANumber())),
    ).toBe(true)
    expect(
      PE.isPrintError(
        new PE.ErrorGroup([new PE.CircularReference('PrintError kappa /s')]),
      ),
    ).toBe(true)
    expect(
      PE.isPrintError(
        new PE.ErrorAtKey(
          'PrintError kappa /s',
          new PE.CircularReference('PrintError kappa /s'),
        ),
      ),
    ).toBe(true)
    expect(PE.isPrintError(new PE.ErrorAtIndex(1, new PE.NotANumber()))).toBe(true)
    expect(PE.isPrintError(new PE.NotANumber())).toBe(true)
    expect(PE.isPrintError(new PE.InfiniteValue())).toBe(true)
  })
  test('partial', () => {
    const printer = P.partial({
      foo: P.string,
      bar: P.number,
    })
    expect(printer.domainToJson({ foo: 'foo', bar: 1 })).toStrictEqual(
      E.right({ foo: 'foo', bar: 1 }),
    )
    expect(printer.domainToJson({ foo: 'foo' })).toStrictEqual(E.right({ foo: 'foo' }))
    expect(printer.codomainToJson({ foo: 'foo', bar: 1 })).toStrictEqual(
      E.right({ foo: 'foo', bar: 1 }),
    )
    expect(printer.codomainToJson({ foo: 'foo' })).toStrictEqual(E.right({ foo: 'foo' }))
  })
  it('catches basic circularity in partial', () => {
    type A = {
      a: number
      b: A
    }
    const a: any = {
      a: 1,
    }
    a.b = a
    const c = {
      a: 6,
    }
    const printer: P.Printer<Partial<A>, Partial<A>> = P.partial({
      a: P.number,
      b: P.lazy('', () => printer),
    })
    expect(printer.domainToJson(a)).toStrictEqual(
      E.left(new PE.ErrorAtKey('b', new PE.CircularReference(a.b))),
    )
    expect(printer.domainToJson(c)).toStrictEqual(E.right(c))
    expect(printer.codomainToJson(a)).toStrictEqual(
      E.left(new PE.ErrorAtKey('b', new PE.CircularReference(a.b))),
    )
    expect(printer.codomainToJson(c)).toStrictEqual(E.right(c))
  })
  test('record', () => {
    const printer = P.record(P.string)
    expect(printer.domainToJson({ foo: 'foo', bar: 'bar' })).toStrictEqual(
      E.right({ foo: 'foo', bar: 'bar' }),
    )
  })
  test('record catches printing errors', () => {
    const printer = P.record(P.number)
    expect(printer.domainToJson({ foo: 1, bar: NaN })).toStrictEqual(
      E.left(new PE.ErrorAtKey('bar', new PE.NotANumber())),
    )
    expect(printer.codomainToJson({ foo: 1, bar: NaN })).toStrictEqual(
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
    expect(printer.domainToJson(a)).toStrictEqual(
      E.left(new PE.ErrorAtKey('b', new PE.CircularReference(a.b))),
    )
    expect(printer.codomainToJson(a)).toStrictEqual(
      E.left(new PE.ErrorAtKey('b', new PE.CircularReference(a.b))),
    )
  })
  test('array', () => {
    const printer = P.array(P.string)
    expect(printer.domainToJson(['foo', 'bar'])).toStrictEqual(E.right(['foo', 'bar']))
    expect(printer.codomainToJson(['foo', 'bar'])).toStrictEqual(E.right(['foo', 'bar']))
  })
  test('array captures printing errors', () => {
    const printer = P.array(P.number)
    expect(printer.domainToJson([1, NaN, Infinity])).toStrictEqual(
      E.left(
        new PE.ErrorGroup([
          new PE.ErrorAtIndex(1, new PE.NotANumber()),
          new PE.ErrorAtIndex(2, new PE.InfiniteValue()),
        ]),
      ),
    )
    expect(printer.codomainToJson([1, NaN, -Infinity])).toStrictEqual(
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
    expect(printer.domainToJson(a)).toStrictEqual(
      E.left(new PE.ErrorAtIndex(1, new PE.CircularReference(a[1]))),
    )
    expect(printer.codomainToJson(a)).toStrictEqual(
      E.left(new PE.ErrorAtIndex(1, new PE.CircularReference(a[1]))),
    )
  })
  test('tuple', () => {
    const printer = P.tuple(P.string, P.number)
    expect(printer.domainToJson(['foo', 1])).toStrictEqual(E.right(['foo', 1]))
    expect(printer.codomainToJson(['foo', 1])).toStrictEqual(E.right(['foo', 1]))
  })
  test('tuple captures printing errors', () => {
    const printer = P.tuple(P.string, P.number)
    expect(printer.domainToJson(['foo', NaN])).toStrictEqual(
      E.left(new PE.ErrorAtIndex(1, new PE.NotANumber())),
    )
    expect(printer.codomainToJson(['foo', NaN])).toStrictEqual(
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
    expect(printer.domainToJson(a)).toStrictEqual(
      E.left(new PE.ErrorAtIndex(1, new PE.CircularReference(a[1]))),
    )
    expect(printer.codomainToJson(a)).toStrictEqual(
      E.left(new PE.ErrorAtIndex(1, new PE.CircularReference(a[1]))),
    )
  })
  test('intersect', () => {
    const printer = pipe(
      P.struct({ foo: P.literal('bar') }),
      P.intersect(P.struct({ bar: P.number })),
    )
    expect(printer.domainToJson({ foo: 'bar', bar: 1 })).toStrictEqual(
      E.right({ foo: 'bar', bar: 1 }),
    )
    expect(printer.codomainToJson({ foo: 'bar', bar: 1 })).toStrictEqual(
      E.right({ foo: 'bar', bar: 1 }),
    )
  })
  it('returns invalid value for empty intersection', () => {
    const printer = pipe(P.number, P.intersect(P.string))
    expect(printer.domainToJson(0 as never)).toStrictEqual(
      E.left(new PE.NamedError('Nonzero Intersection', new PE.InvalidValue(undefined))),
    )
    expect(printer.codomainToJson(0 as never)).toStrictEqual(
      E.left(new PE.NamedError('Nonzero Intersection', new PE.InvalidValue(undefined))),
    )
  })
  test('sum', () => {
    const printer = P.sum('type')({
      foo: P.struct({ type: P.literal('foo'), foo: P.string }),
      bar: P.struct({ type: P.literal('bar'), bar: P.number }),
    })
    expect(printer.domainToJson({ type: 'foo', foo: 'bar' })).toStrictEqual(
      E.right({ type: 'foo', foo: 'bar' }),
    )
    expect(printer.domainToJson({ type: 'bar', bar: 1 })).toStrictEqual(
      E.right({ type: 'bar', bar: 1 }),
    )
    expect(printer.codomainToJson({ type: 'foo', foo: 'bar' })).toStrictEqual(
      E.right({ type: 'foo', foo: 'bar' }),
    )
    expect(printer.codomainToJson({ type: 'bar', bar: 1 })).toStrictEqual(
      E.right({ type: 'bar', bar: 1 }),
    )
  })
  test('lazy', () => {
    const printer = P.lazy('', () => P.string)
    expect(printer.domainToJson('foo')).toStrictEqual(E.right('foo'))
    expect(printer.codomainToJson('foo')).toStrictEqual(E.right('foo'))
  })
  it('captures errors in lazy', () => {
    const printer = P.lazy('Numerosan', () =>
      pipe(
        P.number,
        P.refine((a): a is number => a !== 0, 'Nonzero'),
      ),
    )
    expect(printer.domainToJson(0)).toStrictEqual(
      E.left(
        new PE.NamedError(
          'Numerosan',
          new PE.NamedError('Nonzero', new PE.InvalidValue(0)),
        ),
      ),
    )

    const leftPrinter = P.lazy('valid date', () => DatePrinter.date)
    const date = new Date('abc')
    expect(leftPrinter.codomainToJson(date)).toStrictEqual(
      E.left(
        new PE.NamedError(
          'valid date',
          new PE.NamedError('Valid Date', new PE.InvalidValue(date)),
        ),
      ),
    )
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
      printerA.domainToJson({
        a: 'foo',
        b: { c: { a: 'foo', b: { c: null, d: 2 } }, d: 1 },
      }),
    ).toStrictEqual(
      E.right({ a: 'foo', b: { c: { a: 'foo', b: { c: null, d: 2 } }, d: 1 } }),
    )
  })
  test('readonly', () => {
    const printer = P.readonly(P.string)
    expect(printer.domainToJson('foo')).toStrictEqual(E.right('foo'))
  })
})
