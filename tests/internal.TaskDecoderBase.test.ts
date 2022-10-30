import * as E from 'fp-ts/Either'
import { string, WithInvariant } from '../src/internal/TaskDecoderBase'

describe('TaskDecoder', () => {
  test('WithInvariant', async () => {
    const td = WithInvariant.imap<Date>(
      { is: (a: unknown): a is Date => a instanceof Date },
      'Date'
    )<string>(
      a => new Date(a),
      a => a.toISOString()
    )(string)
    const test = new Date()
    expect(await td.decode(test.toISOString())()).toStrictEqual(E.right(test))
  })
})
