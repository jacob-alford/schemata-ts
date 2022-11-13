import fc from 'fast-check'
import { pipe } from 'fp-ts/function'
import * as PB from '../src/PatternBuilder'

describe('PatternBuilder', () => {
  const pattern: PB.Pattern = pipe(
    PB.exactString('foo'),
    PB.between(5, 9),
    PB.then(PB.atLeastOne()(PB.char('z'))),
    PB.then(PB.atLeastOne({ greedy: true })(PB.char('y'))),
    PB.subgroup,
    PB.maybe,
    PB.then(
      PB.sequence(
        pipe(PB.anything, PB.anyNumber({ greedy: true })),
        pipe(PB.anything, PB.anyNumber({ greedy: false })),
        pipe(PB.anything, PB.anyNumber()),
        PB.times(3)(PB.non(PB.lower)),
      ),
    ),
    PB.then(
      PB.characterClass(
        false,
        ['0', '4'],
        'A',
        [35, 39],
        ['Q', 'T'],
        [31, 45],
        [94, 127],
        [255, 256],
      ),
    ),
    PB.subgroup,
    PB.or(PB.atLeast(2)(PB.exactString('bar'))),
  )

  it('can create RegExps', () => {
    const actual = PB.regexFromPattern(pattern)

    expect(actual.source).toEqual(
      "^((((foo){5,9}z+?y+)?.*.*?.*?[^a-z]{3}[0-4A#-'Q-T\\x1f-\\x2d\\x5e-\\x7f\\xff-\\u0100])|(bar){2,})$",
    )
    expect(actual.flags).toEqual('')
  })

  it('can create case-insensitive RegExps', () => {
    const actual = PB.regexFromPattern(pattern, true)

    expect(actual.source).toEqual(
      "^((((foo){5,9}z+?y+)?.*.*?.*?[^a-z]{3}[0-4A#-'Q-T\\x1f-\\x2d\\x5e-\\x7f\\xff-\\u0100])|(bar){2,})$",
    )
    expect(actual.flags).toEqual('i')
  })

  it('can create Arbitraries', () => {
    const arbitrary = PB.arbitraryFromPattern(pattern)

    // woof, bad testing practices ahead, but I'm not sure of a better way to test Arbitraries
    const regex = PB.regexFromPattern(pattern)

    fc.assert(fc.property(arbitrary, s => regex.test(s)))
  })

  describe('integerRange', () => {
    describe('one digit ranges', () => {
      test('1-9', () => {
        const pattern = PB.integerRange(1, 9)
        const actual = PB.regexFromPattern(pattern)
        expect(actual.source).toEqual('^([1-9])$')
      })

      test('5-7', () => {
        const pattern = PB.integerRange(5, 7)
        const actual = PB.regexFromPattern(pattern)
        expect(actual.source).toEqual('^([5-7])$')
      })
    })

    describe('two digit ranges', () => {
      test('10-99', () => {
        const pattern = PB.integerRange(10, 99)
        const actual = PB.regexFromPattern(pattern)
        expect(actual.source).toEqual('^(1\\d|[2-8]\\d|9\\d)$')
      })

      test('41-74', () => {
        const pattern = PB.integerRange(41, 74)
        const actual = PB.regexFromPattern(pattern)
        for (let i = 10; i < 100; i++) {
          if (i >= 41 && i <= 74) {
            expect([i.toString(), actual.test(i.toString())]).toEqual([
              i.toString(),
              true,
            ])
          } else {
            expect([i.toString(), actual.test(i.toString())]).toEqual([
              i.toString(),
              false,
            ])
          }
        }
        // expect(actual.source).toEqual('^(4[1-9]|[5-6]\\d|7[0-4])$')
      })
    })

    describe('three digit ranges', () => {
      test('100-999', () => {
        const pattern = PB.integerRange(100, 999)
        const actual = PB.regexFromPattern(pattern)
        expect(actual.source).toEqual(
          '^(1(0\\d|[1-8]\\d|9\\d)|[2-8]\\d\\d|9(0\\d|[1-8]\\d|9\\d))$',
        )
      })

      test('421-734', () => {
        const pattern = PB.integerRange(421, 734)
        const actual = PB.regexFromPattern(pattern)

        for (let i = 100; i < 1000; i++) {
          if (i >= 421 && i <= 734) {
            expect([i.toString(), actual.test(i.toString())]).toEqual([
              i.toString(),
              true,
            ])
          } else {
            expect([i.toString(), actual.test(i.toString())]).toEqual([
              i.toString(),
              false,
            ])
          }
        }
      })
    })

    describe('mixed digit ranges', () => {
      test('5-226', () => {
        const pattern = PB.integerRange(5, 226)
        const actual = PB.regexFromPattern(pattern)

        for (let i = 1; i < 500; i++) {
          if (i >= 5 && i <= 226) {
            expect([i.toString(), actual.test(i.toString())]).toEqual([
              i.toString(),
              true,
            ])
          } else {
            expect([i.toString(), actual.test(i.toString())]).toEqual([
              i.toString(),
              false,
            ])
          }
        }
      })

      test('arbitrary ranges', () => {
        fc.assert(
          fc.property(
            fc.tuple(
              fc.integer({ min: 0, max: 200 }),
              fc.integer({ min: 1, max: 799 }),
              fc.array(fc.integer({ min: 0, max: 1000 }), {
                minLength: 1,
                maxLength: 100,
              }),
            ),
            ([min, addition, checks]) => {
              const pattern = PB.integerRange(min, min + addition)
              const actual = PB.regexFromPattern(pattern)
              return checks.every(n =>
                n >= min && n <= min + addition
                  ? actual.test(n.toString())
                  : !actual.test(n.toString()),
              )
            },
          ),
        )
      })
    })
  })
})
