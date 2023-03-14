import { expectTypeOf } from 'expect-type'
import * as E from 'fp-ts/Either'
import { pipe, tuple } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as TE from 'fp-ts/TaskEither'
import { camelCase } from 'schemata-ts/internal/camelcase'
import { CamelCase } from 'type-fest'

import {
  base64Encode,
  forIn,
  urlifyBase64,
  witherS,
  witherTaskParSM,
} from '../src/internal/util'
import { zipN } from '../test-utils'

type CamelCaseFst<T extends ReadonlyArray<readonly [string, string]>> = {
  [K in keyof T]: CamelCase<T[K][0], { preserveConsecutiveUppercase: false }>
}
type Snd<T extends ReadonlyArray<readonly [string, string]>> = {
  [K in keyof T]: T[K][1]
}

describe('camelCase', () => {
  describe('type-fest type helper tests', () => {
    const testCases = [
      ['FooBar', 'fooBar'],
      ['foo-bar', 'fooBar'],
      ['foo-bar-abc-123', 'fooBarAbc123'],
      ['foo bar', 'fooBar'],
      ['foo_bar', 'fooBar'],
      ['foobar', 'foobar'],
      ['foo-bar_abc xyzBarFoo', 'fooBarAbcXyzBarFoo'],
      ['-webkit-animation', 'webkitAnimation'],
      ['--very-prefixed', 'veryPrefixed'],
      ['foo____bar', 'fooBar'],
      ['FOO', 'foo'],
      ['foo', 'foo'],
      ['FOO_BAR', 'fooBar'],
      ['FOO-BAR', 'fooBar'],
      // non-matching camelcase tests
      ['IDs', 'iDs'],
      ['FooIDs', 'fooIDs'],
      ['foo.bar', 'foo.bar'], // <-- not handling period separators
      ['..foo..bar..', '..foo..bar..'], // <-- not handling period separators
      ['.', '.'], // <-- not handling period separators
      ['..', '..'], // <-- not handling period separators
    ] as const
    type TestCases = typeof testCases
    type Inputs = CamelCaseFst<TestCases>
    type Results = Snd<TestCases>
    expectTypeOf<Inputs>().toEqualTypeOf<Results>()
    test.each(testCases)('should convert %s to %s', (input, expected) => {
      expect(camelCase(input)).toBe(expected)
    })
  })
  describe('camelcase npm test cases', () => {
    const testCases = [
      ['foo', 'foo'],
      ['foo-bar', 'fooBar'],
      ['foo-bar-baz', 'fooBarBaz'],
      ['foo--bar', 'fooBar'],
      ['--foo-bar', 'fooBar'],
      ['--foo--bar', 'fooBar'],
      ['FOO-BAR', 'fooBar'],
      ['FOÈ-BAR', 'foèBar'],
      ['-foo-bar-', 'fooBar'],
      ['--foo--bar--', 'fooBar'],
      ['foo-1', 'foo1'],
      ['foo_bar', 'fooBar'],
      ['__foo__bar__', 'fooBar'],
      ['foo bar', 'fooBar'],
      ['  foo  bar  ', 'fooBar'],
      ['-', ''],
      [' - ', ''],
      ['fooBar', 'fooBar'],
      ['fooBar-baz', 'fooBarBaz'],
      ['foìBar-baz', 'foìBarBaz'],
      ['fooBarBaz-bazzy', 'fooBarBazBazzy'],
      ['FBBazzy', 'fbBazzy'],
      ['F', 'f'],
      ['FooBar', 'fooBar'],
      ['Foo', 'foo'],
      ['FOO', 'foo'],
      ['--', ''],
      ['', ''],
      ['_', ''],
      [' ', ''],
      ['--', ''],
      ['  ', ''],
      ['__', ''],
      ['--__--_--_', ''],
      ['foo bar?', 'fooBar?'],
      ['foo bar!', 'fooBar!'],
      ['foo bar$', 'fooBar$'],
      ['foo-bar#', 'fooBar#'],
      ['XMLHttpRequest', 'xmlHttpRequest'],
      ['AjaxXMLHttpRequest', 'ajaxXmlHttpRequest'],
      ['Ajax-XMLHttpRequest', 'ajaxXmlHttpRequest'],
      ['mGridCol6@md', 'mGridCol6@md'],
      ['A::a', 'a::a'],
      ['Hello1World', 'hello1World'],
      ['Hello11World', 'hello11World'],
      ['hello1world', 'hello1World'],
      ['Hello1World11foo', 'hello1World11Foo'],
      ['Hello1', 'hello1'],
      ['hello1', 'hello1'],
      ['1Hello', '1Hello'],
      ['1hello', '1Hello'],
      ['h2w', 'h2W'],
      ['розовый_пушистый-единороги', 'розовыйПушистыйЕдинороги'],
      ['розовый_пушистый-единороги', 'розовыйПушистыйЕдинороги'],
      ['РОЗОВЫЙ_ПУШИСТЫЙ-ЕДИНОРОГИ', 'розовыйПушистыйЕдинороги'],
      ['桑德在这里。', '桑德在这里。'],
      ['桑德在这里。', '桑德在这里。'],
      ['桑德_在这里。', '桑德在这里。'],
    ] as const
    type TestCases = typeof testCases
    type Inputs = CamelCaseFst<TestCases>
    type Results = Snd<TestCases>
    expectTypeOf<Inputs>().toEqualTypeOf<Results>()
    test.each(testCases)('should convert %s to %s', (input, expected) => {
      expect(camelCase(input)).toBe(expected)
    })
  })
})

describe('witherTaskParSM', () => {
  it('skips unenumerable properties', async () => {
    const tester = jest.fn()
    const obj = {
      a: 1,
    }
    Object.defineProperty(obj, 'b', {
      value: 2,
    })
    const result = pipe(
      obj,
      witherTaskParSM(RA.getMonoid())((k, value) => {
        tester(value)
        return TE.right(O.some(tuple(value, k)))
      }),
    )
    expect(tester).toHaveBeenCalledTimes(1)
    expect(await result()).toStrictEqual(E.right({ a: 1 }))
  })
  it('skips inherited properties', async () => {
    const tester = jest.fn()
    const obj = {
      a: 1,
      __proto__: {
        b: 2,
      },
    }
    const result = pipe(
      obj,
      witherTaskParSM(RA.getMonoid())((k, value) => {
        tester(value)
        return TE.right(O.some([value, k]))
      }),
    )
    expect(tester).toHaveBeenCalledTimes(1)
    expect(await result()).toStrictEqual(E.right({ a: 1 }))
  })
  it('skips indices on none', async () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    }
    const result = pipe(
      obj,
      witherTaskParSM(RA.getMonoid())((k, value) => {
        return value === 2 ? TE.right(O.none) : TE.right(O.some([value, k]))
      }),
    )
    expect(await result()).toStrictEqual(E.right({ a: 1, c: 3 }))
  })
  it('no longer fails fast', async () => {
    const tester = jest.fn()
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    }
    const result = pipe(
      obj,
      witherTaskParSM(RA.getMonoid<string>())((k, value) => {
        tester(value)
        return value >= 2 ? TE.left(['fail']) : TE.right(O.some([value, k]))
      }),
    )
    expect(await result()).toStrictEqual(E.left(['fail', 'fail']))
  })
})

describe('traverseESO', () => {
  it('skips unenumerable properties', () => {
    const tester = jest.fn()
    const obj = {
      a: 1,
    }
    Object.defineProperty(obj, 'b', {
      value: 2,
    })
    const result = pipe(
      obj,
      witherS(RA.getMonoid())((_, value) => {
        tester(value)
        return E.right(O.some(value))
      }),
    )
    expect(tester).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual(E.right({ a: 1 }))
  })
  it('skips inherited properties', () => {
    const tester = jest.fn()
    const obj = {
      a: 1,
      __proto__: {
        b: 2,
      },
    }
    const result = pipe(
      obj,
      witherS(RA.getMonoid())((_, value) => {
        tester(value)
        return E.right(O.some(value))
      }),
    )
    expect(tester).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual(E.right({ a: 1 }))
  })
  it('skips indices on none', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    }
    const result = pipe(
      obj,
      witherS(RA.getMonoid())((_, value) => {
        return value === 2 ? E.right(O.none) : E.right(O.some(value))
      }),
    )
    expect(result).toStrictEqual(E.right({ a: 1, c: 3 }))
  })
  it('no longer fails fast', () => {
    const tester = jest.fn()
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    }
    const result = pipe(
      obj,
      witherS(RA.getMonoid<string>())((_, value) => {
        tester(value)
        return value >= 2 ? E.left(['fail']) : E.right(O.some(value))
      }),
    )
    expect(result).toStrictEqual(E.left(['fail', 'fail']))
  })
})

describe('forIn', () => {
  it("doesn't iterate over inherited properties", () => {
    const a = { a: 1, b: 2 }
    const b = Object.create(a)
    b.c = 3
    const eff = jest.fn<void, [string, number]>(() => void 0)
    forIn((k, v) => () => eff(k, v))(b)()
    expect(eff).toHaveBeenCalledTimes(1)
    expect(eff).toHaveBeenCalledWith('c', 3)
  })
  it("doesn't iterate over nonenumerable properties", () => {
    const a = { a: 1, b: 2 }
    Object.defineProperty(a, 'c', {
      value: 3,
      enumerable: false,
    })
    const eff = jest.fn<void, [string, number]>(() => void 0)
    forIn((k, v) => () => eff(k, v))(a)()
    expect(eff).toHaveBeenCalledTimes(2)
    expect(eff).toHaveBeenCalledWith('a', 1)
    expect(eff).toHaveBeenCalledWith('b', 2)
  })
})

describe('base64Encode', () => {
  it('should encode a string', () => {
    expect(base64Encode('hello')).toBe('aGVsbG8=')
  })
})

describe('urlifyBase64', () => {
  it('should replace =', () => {
    expect(urlifyBase64('=aGVsbG8=')).toBe('aGVsbG8')
  })
  it('should replace +', () => {
    expect(urlifyBase64('+aGVsbG8+')).toBe('-aGVsbG8-')
  })
  it('should replace /', () => {
    expect(urlifyBase64('/aGVsbG8/')).toBe('_aGVsbG8_')
  })
})

describe('zipN', () => {
  it("doesn't zip empty", () => {
    expect(zipN([], [1, 2], [true, false, true])).toStrictEqual([])
  })
  it('zips 2', () => {
    expect(zipN([1, 2, 3], ['a', 'b', 'c', 'd'])).toStrictEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ])
    expect(zipN([1, 2, 3, 4], ['a', 'b', 'c'])).toStrictEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ])
  })
  it('zips 3', () => {
    expect(zipN([1, 2, 3], ['a', 'b', 'c', 'd'], [true, false, true])).toStrictEqual([
      [1, 'a', true],
      [2, 'b', false],
      [3, 'c', true],
    ])
    expect(zipN([1, 2, 3, 4], ['a', 'b', 'c'], [true, false, true, false])).toStrictEqual(
      [
        [1, 'a', true],
        [2, 'b', false],
        [3, 'c', true],
      ],
    )
  })
  it('zips 4', () => {
    expect(
      zipN([1, 2, 3], ['a', 'b', 'c', 'd'], [true, false, true], ['x', 'y', 'z', 'w']),
    ).toStrictEqual([
      [1, 'a', true, 'x'],
      [2, 'b', false, 'y'],
      [3, 'c', true, 'z'],
    ])
    expect(
      zipN([1, 2, 3, 4], ['a', 'b', 'c'], [true, false, true, false], ['x', 'y', 'z']),
    ).toStrictEqual([
      [1, 'a', true, 'x'],
      [2, 'b', false, 'y'],
      [3, 'c', true, 'z'],
    ])
  })
})
