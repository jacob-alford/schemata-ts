import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as DE from 'io-ts/DecodeError'
import * as FSg from 'io-ts/FreeSemigroup'

import { getCodec } from '../src/Codec'
import { isParseError, ParseError } from '../src/JsonDeserializer'
import * as PE from '../src/PrintError'
import * as S from '../src/schemata'

describe('Codec', () => {
  describe('getCodec', () => {
    test('decoding', () => {
      const codec = getCodec(S.FloatFromString())
      expect(codec.decode('1')).toEqual({ _tag: 'Right', right: 1 })
    })
    test('encoding', () => {
      const codec = getCodec(S.FloatFromString())
      expect(codec.encode(1 as S.TypeOf<ReturnType<typeof S.Float>>)).toEqual('1')
    })
    test('guarding', () => {
      const codec = getCodec(S.FloatFromString())
      expect(codec.is(1)).toEqual(true)
    })
    describe('printing', () => {
      it('prints a valid object', () => {
        const schema = S.Struct({
          realNumber: S.Float(),
          integers: S.NonEmptyArray(S.Int()),
          activeStatus: S.OptionFromNullable(S.Boolean),
          id: S.NonEmptyString,
        })
        const codec = getCodec(schema)
        const value: S.TypeOf<typeof schema> = {
          realNumber: 1.1 as any,
          integers: [1, 2, 3] as any,
          activeStatus: O.some(true),
          id: '1' as any,
        }
        expect(codec.print(value)).toStrictEqual(
          E.right(
            JSON.stringify(Object.assign({}, value, { activeStatus: true }), null, 2),
          ),
        )
      })
      it('returns all the errors for invalid objects', () => {
        const schema = S.Struct({
          realNumber: S.Float(),
          integers: S.NonEmptyArray(S.Int()),
          activeStatus: S.OptionFromUndefined(S.Boolean),
          id: S.NonEmptyString,
        })
        const codec = getCodec(schema)
        const value: S.TypeOf<typeof schema> = {
          realNumber: Infinity as any,
          /**
           * This `1.1` won't be an error, because decoders aren't run against types which
           * have already been decoded
           */
          integers: [1.1, NaN, -Infinity] as any,
          activeStatus: O.none,
          /* Same here */
          id: '' as any,
        }
        expect(codec.print(value)).toStrictEqual(
          E.left(
            new PE.ErrorGroup([
              new PE.ErrorAtKey(
                'realNumber',
                new PE.NamedError('Finite Number', new PE.InvalidValue(Infinity)),
              ),
              new PE.ErrorAtKey(
                'integers',
                new PE.ErrorGroup([
                  new PE.ErrorAtIndex(
                    1,
                    new PE.NamedError('Valid Number', new PE.InvalidValue(NaN)),
                  ),
                  new PE.ErrorAtIndex(
                    2,
                    new PE.NamedError('Finite Number', new PE.InvalidValue(-Infinity)),
                  ),
                ]),
              ),
            ]),
          ),
        )
      })
    })
    describe('parsing', () => {
      test('isParseError', () => {
        expect(isParseError(new ParseError('error!'))).toBe(true)
        expect(isParseError(FSg.of(DE.leaf(null, 'number')))).toBe(false)
      })
      it('parses a valid object', () => {
        const schema = S.Struct({
          realNumber: S.Float(),
          integers: S.NonEmptyArray(S.Int()),
          activeStatus: S.OptionFromNullable(S.Boolean),
          id: S.NonEmptyString,
        })
        const codec = getCodec(schema)
        const value: S.InputOf<typeof schema> = {
          realNumber: 1.1,
          integers: [1, 2, 3],
          activeStatus: null,
          id: '1',
        }
        const parsed = codec.parse(JSON.stringify(value, null, 2))
        expect(parsed).toStrictEqual(
          E.right({
            realNumber: 1.1,
            integers: [1, 2, 3],
            activeStatus: O.none,
            id: '1',
          }),
        )
      })
      it('returns all the errors for invalid objects', () => {
        const schema = S.Struct({
          realNumber: S.Float(),
          integers: S.NonEmptyArray(S.Int()),
          activeStatus: S.OptionFromNullable(S.Boolean),
          id: S.NonEmptyString,
        })
        const codec = getCodec(schema)
        const value: S.InputOf<typeof schema> = {
          realNumber: Infinity,
          integers: [1.1, NaN, 3],
          activeStatus: false,
          id: '',
        }
        const parsed = codec.parse(JSON.stringify(value, null, 2))
        expect(parsed).toStrictEqual(
          E.left(
            FSg.concat(
              FSg.concat(
                FSg.of(
                  DE.key('realNumber', DE.required, FSg.of(DE.leaf(null, 'number'))),
                ),
                FSg.of(
                  DE.key(
                    'integers',
                    DE.required,
                    FSg.concat(
                      FSg.of(DE.index(0, DE.optional, FSg.of(DE.leaf(1.1, 'int')))),
                      FSg.of(DE.index(1, DE.optional, FSg.of(DE.leaf(null, 'number')))),
                    ),
                  ),
                ),
              ),
              FSg.of(DE.key('id', DE.required, FSg.of(DE.leaf('', 'NonEmptyString')))),
            ),
          ),
        )
      })
      it('returns a parsing error for invalid json', () => {
        const schema = S.Struct({
          realNumber: S.Float(),
          integers: S.NonEmptyArray(S.Int()),
          activeStatus: S.OptionFromNullable(S.Boolean),
          id: S.NonEmptyString,
        })
        const codec = getCodec(schema)
        /* double quotes only */
        const parsed = codec.parse("{'realNumber': 1.1}")
        expect(parsed).toStrictEqual(E.left(new ParseError(expect.any(Error))))
      })
    })
  })
})
