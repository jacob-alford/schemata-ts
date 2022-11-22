import * as SC from '../src/base/SchemaBase'
import * as I from '../src/interpreters'
import * as fc from 'fast-check'

describe('interpreters', () => {
  test('getArbitrary', () => {
    const arb = I.getArbitrary(SC.String)
    fc.assert(
      fc.property(arb, str => {
        expect(typeof str).toBe('string')
      }),
    )
  })
  test('getDecoder', () => {
    const decoder = I.getDecoder(SC.String)
    expect(decoder.decode('foo')).toEqual({ _tag: 'Right', right: 'foo' })
  })
  test('getEncoder', () => {
    const encoder = I.getEncoder(SC.String)
    expect(encoder.encode('foo')).toEqual('foo')
  })
  test('getEq', () => {
    const eq = I.getEq(SC.String)
    expect(eq.equals('foo', 'foo')).toBe(true)
  })
  test('getGuard', () => {
    const guard = I.getGuard(SC.String)
    expect(guard.is('foo')).toBe(true)
  })
})
