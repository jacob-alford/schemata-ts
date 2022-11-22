import * as SC from '../../src/base/SchemaBase'
import * as WithOptional from '../../test-utils/schemable-exports/WithOptional'
import { getGuard } from '../../src/interpreters'

describe('WithOptional', () => {
  test('Guard and Schema', () => {
    const Guard = getGuard(WithOptional.Schema(SC.String))
    expect(Guard.is('a')).toBe(true)
    expect(Guard.is(undefined)).toBe(true)
    expect(Guard.is(1)).toBe(false)
  })
})
