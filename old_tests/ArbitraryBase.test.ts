import * as fc from 'fast-check'
import { pipe } from 'fp-ts/function'

import * as Arb from '../src/Arbitrary'
import * as G from '../src/Guard'
import { typeOf } from '../src/internal/util'
import * as SC from '../src/Schema'
import { PositiveFloat } from '../src/schemata/number/PositiveFloat'
import { Arbitrary as WithInvariant } from '../test-utils/schemable-exports/WithInvariant'

const isPositiveFloat = SC.interpret(G.Schemable)(PositiveFloat).is

describe('ArbitraryBase', () => {
  describe('constructors', () => {
    test('literal', () => {
      fc.assert(
        fc.property(Arb.literal('a', 'b', 'c').arbitrary(fc), str => {
          expect(['a', 'b', 'c']).toContain(str)
        }),
      )
    })
  })
  describe('primitives', () => {
    test('string', () => {
      fc.assert(
        fc.property(Arb.string.arbitrary(fc), str => {
          expect(typeof str).toBe('string')
        }),
      )
    })
    test('number', () => {
      fc.assert(
        fc.property(Arb.number.arbitrary(fc), num => {
          expect(typeof num).toBe('number')
        }),
      )
    })
    test('boolean', () => {
      fc.assert(
        fc.property(Arb.boolean.arbitrary(fc), bool => {
          expect(typeof bool).toBe('boolean')
        }),
      )
    })
    test('UnknownArray', () => {
      fc.assert(
        fc.property(Arb.UnknownArray.arbitrary(fc), arr => {
          expect(Array.isArray(arr)).toBe(true)
        }),
      )
    })
    test('UnknownRecord', () => {
      fc.assert(
        fc.property(Arb.UnknownRecord.arbitrary(fc), rec => {
          expect(typeof rec).toBe('object')
        }),
      )
    })
  })
  describe('combinators', () => {
    test('refine', () => {
      fc.assert(
        fc.property(
          pipe(Arb.number, Arb.refine(isPositiveFloat, '')).arbitrary(fc),
          num => {
            expect(num).toBeGreaterThan(0)
          },
        ),
      )
    })
    test('nullable', () => {
      fc.assert(
        fc.property(Arb.nullable(Arb.number).arbitrary(fc), nullableNum => {
          expect(['null', 'number']).toContain(typeOf(nullableNum))
        }),
      )
    })
    test('struct', () => {
      fc.assert(
        fc.property(Arb.struct({ a: Arb.number, b: Arb.string }).arbitrary(fc), obj => {
          expect(typeof obj.a).toBe('number')
          expect(typeof obj.b).toBe('string')
        }),
      )
    })
    test('partial', () => {
      fc.assert(
        fc.property(Arb.partial({ a: Arb.number, b: Arb.string }).arbitrary(fc), obj => {
          expect(['undefined', 'number']).toContain(typeof obj.a)
          expect(['undefined', 'string']).toContain(typeof obj.b)
        }),
      )
    })
    test('record', () => {
      fc.assert(
        fc.property(Arb.record(Arb.number).arbitrary(fc), obj => {
          expect(typeof obj).toBe('object')
        }),
      )
    })
    test('array', () => {
      fc.assert(
        fc.property(Arb.array(Arb.number).arbitrary(fc), arr => {
          expect(Array.isArray(arr)).toBe(true)
        }),
      )
    })
    test('non-empty tuple', () => {
      fc.assert(
        fc.property(Arb.tuple(Arb.number, Arb.string).arbitrary(fc), ([num, str]) => {
          expect(typeof num).toBe('number')
          expect(typeof str).toBe('string')
        }),
      )
    })
    test('empty tuple', () => {
      fc.assert(
        fc.property(Arb.tuple().arbitrary(fc), a => {
          expect(a.length).toBe(0)
        }),
      )
    })
    test('non-empty intersect > left', () => {
      fc.assert(
        fc.property(
          pipe(Arb.number, Arb.intersect(Arb.struct({ a: Arb.number }))).arbitrary(fc),
          obj => {
            expect(typeof obj.a).toBe('number')
          },
        ),
      )
    })
    test('non-empty intersect > right', () => {
      fc.assert(
        fc.property(
          pipe(Arb.struct({ a: Arb.number }), Arb.intersect(Arb.number)).arbitrary(fc),
          obj => {
            expect(typeof obj.a).toBe('number')
          },
        ),
      )
    })
    test('empty intersect', () => {
      fc.assert(
        fc.property(
          pipe(
            { arbitrary: (_fc: typeof fc) => _fc.anything() },
            Arb.refine((a): a is undefined => a === undefined, ''),
            Arb.intersect(Arb.struct({ a: Arb.number })),
          ).arbitrary(fc),
          result => {
            expect(result).toBe(undefined)
          },
        ),
      )
    })
    test('sum', () => {
      const sum = Arb.sum('tag')
      const arb = sum({
        a: Arb.struct({ tag: Arb.literal('a'), a: Arb.string }),
        b: Arb.struct({ tag: Arb.literal('b'), b: Arb.number }),
      }).arbitrary(fc)
      fc.assert(
        fc.property(arb, obj => {
          expect(typeOf(obj)).toBe('object')
        }),
      )
    })
    test('lazy', () => {
      const arb = Arb.lazy(() => Arb.number).arbitrary(fc)
      fc.assert(
        fc.property(arb, num => {
          expect(typeof num).toBe('number')
        }),
      )
    })
    test('lazy in Schemable1', () => {
      const arb = Arb.Schemable.lazy('', () => Arb.number).arbitrary(fc)
      fc.assert(
        fc.property(arb, num => {
          expect(typeof num).toBe('number')
        }),
      )
    })
    test('readonly', () => {
      fc.assert(
        fc.property(Arb.readonly(Arb.struct({ a: Arb.number })).arbitrary(fc), num => {
          expect(typeof num.a).toBe('number')
        }),
      )
    })
    test('union', () => {
      fc.assert(
        fc.property(Arb.union(Arb.number, Arb.string).arbitrary(fc), numOrStr => {
          expect(['number', 'string']).toContain(typeOf(numOrStr))
        }),
      )
    })
    test('typeOf', () => {
      expect(typeOf(null)).toBe('null')
      expect(typeOf(undefined)).toBe('undefined')
      expect(typeOf(1)).toBe('number')
      expect(typeOf('')).toBe('string')
    })
    test('WithInvariant', () => {
      const getDate = WithInvariant.imap(
        { is: (d): d is Date => d instanceof Date },
        'number',
      )<number>(
        n => new Date(n),
        d => d.getTime(),
      )

      fc.assert(
        fc.property(
          getDate({
            arbitrary: fc =>
              fc.integer({ min: -8_640_000_000_000_000, max: 8_640_000_000_000_000 }),
          }).arbitrary(fc),
          a => {
            expect(Number.isNaN(a.getTime())).toBe(false)
          },
        ),
      )
    })
  })
})
