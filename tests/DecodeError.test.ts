import * as S from 'fp-ts/string'
import * as DE from 'io-ts/DecodeError'
import * as FSg from 'io-ts/FreeSemigroup'

import { foldMap, foldMapFlat } from '../src/DecodeError'

describe('DecodeError', () => {
  describe('foldMap', () => {
    const mapError = foldMap(S.Semigroup)<string>({
      Leaf: (got, err) => `Expected ${err}, but Received ${got}; `,
      Key: (key, kind, errors) => `At property key ${key} (${kind}): ${errors}`,
      Index: (index, kind, errors) => `At index ${index} (${kind}): ${errors}`,
      Member: (index, errors) => `At Union Member ${index}: ${errors}`,
      Lazy: (_, errors) => errors,
      Wrap: (error, errors) => `${error}; ${errors}`,
    })
    it('folds a Key', () => {
      const error = DE.key('foo', DE.required, FSg.of(DE.leaf(null, 'baz')))
      expect(mapError(FSg.of(error))).toEqual(
        'At property key foo (required): Expected baz, but Received null; ',
      )
    })
    it('folds an Index', () => {
      const error = DE.index(0, DE.required, FSg.of(DE.leaf(null, 'baz')))
      expect(mapError(FSg.of(error))).toEqual(
        'At index 0 (required): Expected baz, but Received null; ',
      )
    })
    it('folds a Member', () => {
      const error = DE.member(0, FSg.of(DE.leaf(null, 'baz')))
      expect(mapError(FSg.of(error))).toEqual(
        'At Union Member 0: Expected baz, but Received null; ',
      )
    })
    test('lazy', () => {
      const error = DE.lazy('foo', FSg.of(DE.leaf(null, 'baz')))
      expect(mapError(FSg.of(error))).toEqual('Expected baz, but Received null; ')
    })
    test('wrap', () => {
      const error = DE.wrap('foo', FSg.of(DE.leaf(null, 'baz')))
      expect(mapError(FSg.of(error))).toEqual('foo; Expected baz, but Received null; ')
    })
    it('flat maps multiple errors', () => {
      const error = DE.key(
        'foo',
        DE.required,
        FSg.of(
          DE.index(
            0,
            DE.required,
            FSg.concat<DE.DecodeError<string>>(
              FSg.of(DE.leaf(null, 'baz')),
              FSg.of(DE.leaf(undefined, 'bar')),
            ),
          ),
        ),
      )
      expect(mapError(FSg.of(error))).toEqual(
        'At property key foo (required): At index 0 (required): Expected baz, but Received null; Expected bar, but Received undefined; ',
      )
    })
  })
  describe('foldMapFlat', () => {
    const mapError = foldMapFlat(S.Semigroup)<string>(e => e)
    it('folds a Key', () => {
      const error = DE.key('foo', DE.required, FSg.of(DE.leaf(null, 'baz')))
      expect(mapError(FSg.of(error))).toEqual('baz')
    })
    it('folds an Index', () => {
      const error = DE.index(0, DE.required, FSg.of(DE.leaf(null, 'baz')))
      expect(mapError(FSg.of(error))).toEqual('baz')
    })
    it('folds a Member', () => {
      const error = DE.member(0, FSg.of(DE.leaf(null, 'baz')))
      expect(mapError(FSg.of(error))).toEqual('baz')
    })
    test('lazy', () => {
      const error = DE.lazy('foo', FSg.of(DE.leaf(null, 'baz')))
      expect(mapError(FSg.of(error))).toEqual('baz')
    })
    test('wrap', () => {
      const error = DE.wrap('foo', FSg.of(DE.leaf(null, 'baz')))
      expect(mapError(FSg.of(error))).toEqual('baz')
    })
  })
})
