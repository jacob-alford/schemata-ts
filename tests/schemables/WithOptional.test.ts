import * as SC from '../../src/base/SchemaBase'
import { getGuard } from '../../src/interpreters'
import * as WithOptional from '../../test-utils/schemable-exports/WithOptional'

describe('WithOptional', () => {
  test('Guard and Schema', () => {
    const Guard = getGuard(WithOptional.Schema(SC.String))
    expect(Guard.is('a')).toBe(true)
    expect(Guard.is(undefined)).toBe(true)
    expect(Guard.is(1)).toBe(false)
  })
})
