import * as assert from 'assert'
import * as PB from '../../src/PatternBuilder'
  import { pipe } from 'fp-ts/function'

  const digit = PB.characterClass(false, ['0', '9'])

  const areaCode = pipe(
    pipe(
      PB.char('('),
      PB.then(PB.times(3)(digit)),
      PB.then(PB.char(')')),
      PB.then(PB.maybe(PB.char(' '))),
    ),
    PB.or(PB.times(3)(digit)),
    PB.subgroup,
  )

  const prefix = PB.times(3)(digit)

  const lineNumber = PB.times(4)(digit)

  export const usPhoneNumber = pipe(
    areaCode,
    PB.then(pipe(PB.char('-'), PB.maybe)),
    PB.then(prefix),
    PB.then(PB.char('-')),
    PB.then(lineNumber),
  )

  assert.equal(PB.regexFromPattern(usPhoneNumber).test('(123) 456-7890'), true)
  assert.equal(PB.regexFromPattern(usPhoneNumber).test('(123)456-7890'), true)
  assert.equal(PB.regexFromPattern(usPhoneNumber).test('123-456-7890'), true)
  assert.equal(PB.regexFromPattern(usPhoneNumber).test('1234567890'), false)
