import * as E from 'fp-ts/Either'

import * as Enc from '../../src/base/EncoderBase'
import * as Eq_ from '../../src/base/EqBase'
import * as G from '../../src/base/GuardBase'
import * as SC from '../../src/base/SchemaBase'
import * as TD from '../../src/base/TaskDecoderBase'
import * as t from '../../src/base/TypeBase'
import * as D from '../../src/Decoder'
import { interpret } from '../../src/Schema'
import {
  Encoder,
  Eq,
  Guard,
  Schema,
  TaskDecoder,
  Type,
} from '../../test-utils/schemable-exports/WithInvariant'

describe('WithInvariant', () => {
  test('Decoder', () => {
    const S = Schema<Date>(
      { is: (a: unknown): a is Date => a instanceof Date },
      'Date',
    )<string>(
      a => new Date(a),
      a => a.toISOString(),
    )(SC.String)
    const decoder = interpret(D.Schemable)(S)
    const test = new Date()
    expect(decoder.decode(test.toISOString())).toStrictEqual(E.right(test))
  })
  test('Guard', () => {
    const g = Guard.imap<Date>(
      { is: (a: unknown): a is Date => a instanceof Date },
      'Date',
    )<string>(
      a => new Date(a),
      a => a.toISOString(),
    )(G.string)
    const test = new Date()
    expect(g.is(test)).toBe(true)
  })
  test('Encoder', () => {
    const enc = Encoder.imap<Date>(
      { is: (a: unknown): a is Date => a instanceof Date },
      'Date',
    )<string>(
      a => new Date(a),
      a => a.toISOString(),
    )(Enc.Schemable.string)

    const test = new Date()
    expect(enc.encode(test)).toEqual(test.toISOString())
  })
  test('Eq', () => {
    const eq = Eq.imap<Date>(
      { is: (a: unknown): a is Date => a instanceof Date },
      'Date',
    )<string>(
      a => new Date(a),
      a => a.toISOString(),
    )(Eq_.string)
    const test = new Date()
    expect(eq.equals(test, test)).toBe(true)
  })
  test('TaskDecoder', async () => {
    const td = TaskDecoder.imap<Date>(
      { is: (a: unknown): a is Date => a instanceof Date },
      'Date',
    )<string>(
      a => new Date(a),
      a => a.toISOString(),
    )(TD.string)
    const test = new Date()
    expect(await td.decode(test.toISOString())()).toStrictEqual(E.right(test))
  })
  describe('Type', () => {
    test('guard', () => {
      const type = Type.imap<Date>(
        { is: (a: unknown): a is Date => a instanceof Date },
        'Date',
      )<string>(
        a => new Date(a),
        a => a.toISOString(),
      )(t.string)
      const test = new Date()
      expect(type.is(test)).toBe(true)
    })
    test('decoder', () => {
      const type = Type.imap<Date>(
        { is: (a: unknown): a is Date => a instanceof Date },
        'Date',
      )<string>(
        a => new Date(a),
        a => a.toISOString(),
      )(t.string)
      const test = new Date()
      expect(type.decode(test.toISOString())).toStrictEqual({
        _tag: 'Right',
        right: test,
      })
    })
  })
})
