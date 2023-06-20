import { type ReadonlyNonEmptyArray } from 'fp-ts/lib/ReadonlyNonEmptyArray'

import * as DE from '../src/DecodeError'

describe('DecodeError', () => {
  test('drawTree', () => {
    const testError: ReadonlyNonEmptyArray<DE.DecodeError> = [
      new DE.TypeMismatch('string', 1),
      new DE.UnexpectedValue(2),
      new DE.ErrorAtIndex(3, [
        new DE.TypeMismatch('string', 4),
        new DE.UnexpectedValue(5),
        new DE.ErrorAtKey('key', [
          new DE.TypeMismatch('string', 6),
          new DE.UnexpectedValue(7),
          new DE.ErrorAtUnionMember(8, [
            new DE.TypeMismatch('string', 9),
            new DE.UnexpectedValue(10),
          ]),
        ]),
      ]),
    ]
    expect(DE.drawTree(testError)).toEqual('huh')
  })
})
