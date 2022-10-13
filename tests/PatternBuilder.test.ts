import fc from 'fast-check'
import { pipe } from 'fp-ts/function'
import * as PB from '../src/PatternBuilder'

describe('PatternBuilder', () => {
  const pattern: PB.Pattern = pipe(
    PB.exactString('foo'),
    PB.then(PB.atLeastOne()(PB.char('z'))),
    PB.subgroup,
    PB.maybe,
    PB.then(pipe(PB.anything, PB.anyNumber({ greedy: true }))),
    PB.then(PB.characterClass(true, ['a', 'z'])),
    PB.then(PB.characterClass(false, ['0', '4'], ['Q', 'T'])),
    PB.subgroup,
    PB.or(PB.exactString('bar'))
  )

  it('can create RegExps', () => {
    const actual = PB.regexFromPattern(pattern).source

    expect(actual).toEqual('^(((foo)z+?)?.*[^a-z][0-4Q-T])|(bar)$')
  })

  it('can create Arbitraries', () => {
    const arbitrary = PB.arbitraryFromPattern(pattern)

    // woof, bad testing practices ahead, but I'm not sure of a better way to test Arbitraries
    const regex = PB.regexFromPattern(pattern)

    fc.assert(fc.property(arbitrary, s => regex.test(s)))
  })
})
