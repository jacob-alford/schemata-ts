import * as fc from 'fast-check'

import { getArbitrary } from '../src/Arbitrary'
import * as SC from '../src/base/SchemaBase'
import { getDecoder } from '../src/internal/Decoder'
import { getEncoder } from '../src/Encoder'
import { getEq } from '../src/Eq'
import { getGuard } from '../src/Guard'

describe('interpreters', () => {
  test('getArbitrary', () => {
    const arb = getArbitrary(SC.String).arbitrary(fc)
    fc.assert(
      fc.property(arb, str => {
        expect(typeof str).toBe('string')
      }),
    )
  })
  test('getDecoder', () => {
    const decoder = getDecoder(SC.String)
    expect(decoder.decode('foo')).toEqual({ _tag: 'Right', right: 'foo' })
  })
  test('getEncoder', () => {
    const encoder = getEncoder(SC.String)
    expect(encoder.encode('foo')).toEqual('foo')
  })
  test('getEq', () => {
    const eq = getEq(SC.String)
    expect(eq.equals('foo', 'foo')).toBe(true)
  })
  test('getGuard', () => {
    const guard = getGuard(SC.String)
    expect(guard.is('foo')).toBe(true)
  })
})
