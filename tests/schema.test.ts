import * as S from 'schemata-ts'

describe('isSchema', () => {
  test('returns true for Schema', () => {
    expect(S.isSchema(S.String())).toBe(true)
  })
  test('returns false for non-Schema', () => {
    expect(S.isSchema('foo')).toBe(false)
    expect(S.isSchema(null)).toBe(false)
    expect(S.isSchema(undefined)).toBe(false)
    expect(S.isSchema([1, 2, 3])).toBe(false)
  })
})
