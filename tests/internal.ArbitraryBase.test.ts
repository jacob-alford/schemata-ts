import { pipe } from 'fp-ts/function'
import * as fc from 'fast-check'
import * as Arb from '../src/internal/ArbitraryBase'
import { isPositiveFloat } from '../src/number/PositiveFloat'

describe('ArbitraryBase', () => {
  describe('constructors', () => {
    test('literal', () => {
      fc.assert(
        fc.property(Arb.literal('a', 'b', 'c'), str => {
          expect(['a', 'b', 'c']).toContain(str)
        })
      )
    })
  })
  describe('primitives', () => {
    test('string', () => {
      fc.assert(
        fc.property(Arb.string, str => {
          expect(typeof str).toBe('string')
        })
      )
    })
    test('number', () => {
      fc.assert(
        fc.property(Arb.number, num => {
          expect(typeof num).toBe('number')
        })
      )
    })
    test('boolean', () => {
      fc.assert(
        fc.property(Arb.boolean, bool => {
          expect(typeof bool).toBe('boolean')
        })
      )
    })
    test('UnknownArray', () => {
      fc.assert(
        fc.property(Arb.UnknownArray, arr => {
          expect(Array.isArray(arr)).toBe(true)
        })
      )
    })
    test('UnknownRecord', () => {
      fc.assert(
        fc.property(Arb.UnknownRecord, rec => {
          expect(typeof rec).toBe('object')
        })
      )
    })
  })
  describe('combinators', () => {
    test('refine', () => {
      fc.assert(
        fc.property(pipe(Arb.number, Arb.refine(isPositiveFloat)), num => {
          expect(num).toBeGreaterThan(0)
        })
      )
    })
    test('nullable', () => {
      fc.assert(
        fc.property(Arb.nullable(Arb.number), nullableNum => {
          expect(['null', 'number']).toContain(Arb.typeOf(nullableNum))
        })
      )
    })
    test('struct', () => {
      fc.assert(
        fc.property(Arb.struct({ a: Arb.number, b: Arb.string }), obj => {
          expect(typeof obj.a).toBe('number')
          expect(typeof obj.b).toBe('string')
        })
      )
    })
    test('partial', () => {
      fc.assert(
        fc.property(Arb.partial({ a: Arb.number, b: Arb.string }), obj => {
          expect(['undefined', 'number']).toContain(typeof obj.a)
          expect(['undefined', 'string']).toContain(typeof obj.b)
        })
      )
    })
    test('record', () => {
      fc.assert(
        fc.property(Arb.record(Arb.number), obj => {
          expect(typeof obj).toBe('object')
        })
      )
    })
    test('array', () => {
      fc.assert(
        fc.property(Arb.array(Arb.number), arr => {
          expect(Array.isArray(arr)).toBe(true)
        })
      )
    })
    test('non-empty tuple', () => {
      fc.assert(
        fc.property(Arb.tuple(Arb.number, Arb.string), ([num, str]) => {
          expect(typeof num).toBe('number')
          expect(typeof str).toBe('string')
        })
      )
    })
    test('empty tuple', () => {
      fc.assert(
        fc.property(Arb.tuple(), a => {
          expect(a.length).toBe(0)
        })
      )
    })
    test('non-empty intersect > left', () => {
      fc.assert(
        fc.property(
          pipe(Arb.number, Arb.intersect(Arb.struct({ a: Arb.number }))),
          obj => {
            expect(typeof obj.a).toBe('number')
          }
        )
      )
    })
    test('non-empty intersect > right', () => {
      fc.assert(
        fc.property(
          pipe(Arb.struct({ a: Arb.number }), Arb.intersect(Arb.number)),
          obj => {
            expect(typeof obj.a).toBe('number')
          }
        )
      )
    })
    test('empty intersect', () => {
      fc.assert(
        fc.property(
          pipe(
            fc.anything(),
            Arb.refine((a): a is undefined => a === undefined),
            Arb.intersect(Arb.struct({ a: Arb.number }))
          ),
          result => {
            expect(result).toBe(undefined)
          }
        )
      )
    })
    test('sum', () => {
      type SumType = 'A' | 'B' | 'C'
      const sumType: SumType = 'A'
      fc.assert(
        fc.property(
          Arb.sum(sumType)({
            A: Arb.record(Arb.literal('A')),
            B: Arb.record(Arb.literal('B')),
            C: Arb.record(Arb.literal('C')),
          }),
          obj => {
            expect(Arb.typeOf(obj)).toBe('object')
          }
        )
      )
    })
    test('lazy', () => {
      const arb = Arb.lazy(() => Arb.number)
      fc.assert(
        fc.property(arb, num => {
          expect(typeof num).toBe('number')
        })
      )
    })
    test('lazy in Schemable1', () => {
      const arb = Arb.Schemable.lazy('', () => Arb.number)
      fc.assert(
        fc.property(arb, num => {
          expect(typeof num).toBe('number')
        })
      )
    })
    test('readonly', () => {
      fc.assert(
        fc.property(Arb.readonly(Arb.struct({ a: Arb.number })), num => {
          expect(typeof num.a).toBe('number')
        })
      )
    })
    test('union', () => {
      fc.assert(
        fc.property(Arb.union(Arb.number, Arb.string), numOrStr => {
          expect(['number', 'string']).toContain(Arb.typeOf(numOrStr))
        })
      )
    })
    test('typeOf', () => {
      expect(Arb.typeOf(null)).toBe('null')
      expect(Arb.typeOf(undefined)).toBe('undefined')
      expect(Arb.typeOf(1)).toBe('number')
      expect(Arb.typeOf('')).toBe('string')
    })
  })
})
