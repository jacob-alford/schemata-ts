import * as SC from '../../src/internal/SchemaBase'
import { getGuard } from '../../src/interpreters'
import * as WithOptional from '../../src/schemables/WithOptional'

describe('WithOptional', () => {
  test('Guard and Schema', () => {
    const Guard = getGuard(WithOptional.Schema(SC.String))
    expect(Guard.is('a')).toBe(true)
    expect(Guard.is(undefined)).toBe(true)
    expect(Guard.is(1)).toBe(false)
  })
})
