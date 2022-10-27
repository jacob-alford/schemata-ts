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
        PB.times(3)(PB.non(PB.lower))
      )
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
        [255, 256]
      )
    ),
    PB.subgroup,
    PB.or(PB.atLeast(2)(PB.exactString('bar')))
  )

  it('can create RegExps', () => {
    const actual = PB.regexFromPattern(pattern)

    expect(actual.source).toEqual(
      "^(((foo){5,9}z+?y+)?.*.*?.*?[^a-z]{3}[0-4A#-'Q-T\\x1f-\\x2d\\x5e-\\x7f\\xff-\\u0100])|(bar){2,}$"
    )
    expect(actual.flags).toEqual('')
  })

  it('can create case-insensitive RegExps', () => {
    const actual = PB.regexFromPattern(pattern, true)

    expect(actual.source).toEqual(
      "^(((foo){5,9}z+?y+)?.*.*?.*?[^a-z]{3}[0-4A#-'Q-T\\x1f-\\x2d\\x5e-\\x7f\\xff-\\u0100])|(bar){2,}$"
    )
    expect(actual.flags).toEqual('i')
  })

  it('can create Arbitraries', () => {
    const arbitrary = PB.arbitraryFromPattern(pattern)

    // woof, bad testing practices ahead, but I'm not sure of a better way to test Arbitraries
    const regex = PB.regexFromPattern(pattern)

    fc.assert(fc.property(arbitrary, s => regex.test(s)))
  })
})
