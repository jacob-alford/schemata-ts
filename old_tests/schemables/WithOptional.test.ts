import * as SC from '../../src/base/SchemaBase'
import { getGuard } from '../../src/Guard'
import * as WithOptional from '../../test-utils-old/schemable-exports/WithOptional'

describe('WithOptional', () => {
  test('Guard and Schema', () => {
    const Guard = getGuard(WithOptional.Schema(SC.String))
    expect(Guard.is('a')).toBe(true)
    expect(Guard.is(undefined)).toBe(true)
    expect(Guard.is(1)).toBe(false)
  })
})
