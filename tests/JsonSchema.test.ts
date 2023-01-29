import * as fc from 'fast-check'
import * as Str from 'fp-ts/string'
import { Draft04, Draft06, Draft07 } from 'json-schema-library'

import { getArbitrary } from '../src/Arbitrary'
import * as base from '../src/base/JsonSchemaBase'
import { getJsonSchema } from '../src/JsonSchema'
import * as S from '../src/schemata'

describe('JsonSchema', () => {
  describe('guards', () => {
    test('isJsonEmpty', () => {
      expect(base.isJsonEmpty(base.emptySchema)).toBe(true)
      expect(base.isJsonEmpty({})).toBe(true)
    })
    test('isJsonString', () => {
      expect(base.isJsonString(base.makeStringSchema())).toBe(true)
      expect(base.isJsonString({ type: 'string' })).toBe(true)
    })
    test('isJsonNumber', () => {
      expect(base.isJsonNumber(base.makeNumberSchema())).toBe(true)
      expect(base.isJsonNumber({ type: 'number' })).toBe(true)
    })
    test('isJsonNull', () => {
      expect(base.isJsonNull(base.nullSchema)).toBe(true)
      expect(base.isJsonNull({ type: 'null', const: null })).toBe(true)
    })
    test('isJsonInteger', () => {
      expect(base.isJsonInteger(base.makeIntegerSchema())).toBe(true)
      expect(base.isJsonInteger({ type: 'integer' })).toBe(true)
    })
    test('isJsonBoolean', () => {
      expect(base.isJsonBoolean(base.booleanSchema)).toBe(true)
      expect(base.isJsonBoolean({ type: 'boolean' })).toBe(true)
    })
    test('isJsonLiteral', () => {
      expect(base.isJsonLiteral(base.makeLiteralSchema('string'))).toBe(true)
      expect(base.isJsonLiteral({ type: 'string', const: 'string' })).toBe(true)
    })
    test('isJsonArray', () => {
      expect(base.isJsonArray(base.makeArraySchema()(base.emptySchema))).toBe(true)
      expect(base.isJsonArray({ type: 'array', items: {} })).toBe(true)
    })
    test('isJsonStruct', () => {
      expect(
        base.isJsonStruct(base.makeStructSchema({ a: base.makeStringSchema() })),
      ).toBe(true)
      expect(
        base.isJsonStruct({
          type: 'object',
          properties: { a: { type: 'string' } },
          required: [],
        }),
      ).toBe(true)
    })
    test('isJsonRecord', () => {
      expect(base.isJsonRecord(base.makeRecordSchema(base.makeStringSchema()))).toBe(true)
      expect(
        base.isJsonRecord({ type: 'object', additionalProperties: { type: 'string' } }),
      ).toBe(true)
    })
    test('isJsonExclude', () => {
      expect(
        base.isJsonExclude({
          not: {
            const: 5,
          },
        }),
      ).toBe(true)
    })
    test('isJsonUnion', () => {
      expect(
        base.isJsonUnion(
          base.makeUnionSchema(base.makeStringSchema(), base.makeNumberSchema()),
        ),
      ).toBe(true)
      expect(
        base.isJsonUnion({
          oneOf: [{ type: 'string' }, { type: 'number' }],
        }),
      ).toBe(true)
    })
    test('isJsonIntersection', () => {
      expect(
        base.isJsonIntersection(
          base.makeIntersectionSchema(base.makeStringSchema())(base.makeNumberSchema()),
        ),
      ).toBe(true)
      expect(
        base.isJsonIntersection({
          allOf: [{ type: 'string' }, { type: 'number' }],
        }),
      ).toBe(true)
    })
  })

  describe('derivation', () => {
    const testSchema = S.Readonly(
      S.Struct({
        literal: S.Literal('string', 5, true, null),
        nully: S.Nullable(S.Int({ min: 0, max: 1 })),
        partial: S.Partial({
          optNull: S.OptionFromNullable(S.Float({ min: 0, max: 1 })),
          optUndefined: S.OptionFromUndefined(S.Float({ min: 0, max: 1 })),
        }),
        rec: S.Record(S.CreditCard),
        arr: S.Array(S.Json.jsonString),

        tup: S.Tuple(S.JsonFromString, S.Number),
        sum: S.Sum('type')({
          a: S.Struct({ type: S.Literal('a'), a: S.Boolean }),
          b: S.Struct({ type: S.Literal('b'), b: S.Lazy('Sum[b].b', () => S.Natural) }),
        }),
        intersection: S.Intersection(S.Struct({ a: S.NonPositiveInt }))(
          S.Struct({ b: S.NonNegativeFloat, c: S.NonPositiveFloat }),
        ),
        date: S.Date.dateFromString,
        isoDate: S.DateFromIsoString(),
        map: S.Map(Str.Ord, S.String, S.Float()),
        int: S.Int(),
        option: S.Option(69420, S.Number),
        singularSum: S.Sum('type')({
          a: S.Struct({
            type: S.Literal('a'),
            a: S.NonEmptyArray(
              S.Padding.padRight(
                { by: 'ExactLength', exactLength: 1 },
                '*',
              )(
                S.Padding.padRight(
                  { by: 'MaxLength', maxLength: 2 },
                  '=',
                )(
                  S.Padding.padLeft(
                    { by: 'MaxLength', maxLength: 3 },
                    '=',
                  )(
                    S.Padding.padLeft(
                      { by: 'ExactLength', exactLength: 4 },
                      '=',
                    )(
                      S.Padding.padRight(
                        { by: 'ExactLength', exactLength: () => 0 },
                        '&',
                      )(
                        S.Padding.padRight(
                          { by: 'MaxLength', maxLength: () => 0 },
                          '=',
                        )(
                          S.Padding.padLeft(
                            { by: 'MaxLength', maxLength: () => 0 },
                            '=',
                          )(
                            S.Padding.padLeft(
                              { by: 'ExactLength', exactLength: () => 0 },
                              '=',
                            )(S.String),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          }),
        }),
      }),
    )
    const testValue = base.stripIdentity(getJsonSchema(testSchema)) as any
    test('struct', () => {
      expect(testValue.type).toBe('object')
      expect(testValue.required).toStrictEqual([
        'literal',
        'nully',
        'partial',
        'rec',
        'arr',
        'tup',
        'sum',
        'intersection',
        'date',
        'isoDate',
        'map',
        'int',
        'option',
        'singularSum',
      ])
    })
    test('literal', () => {
      expect(testValue.properties.literal).toStrictEqual({
        oneOf: [
          { type: 'string', const: 'string' } as any,
          { type: 'number', const: 5 },
          { type: 'boolean', const: true },
          { type: 'null', const: null },
        ],
      })
    })
    test('nullable', () => {
      expect(testValue.properties.nully).toStrictEqual({
        oneOf: [
          { type: 'integer', minimum: 0, maximum: 1 },
          { type: 'null', const: null },
        ],
      })
    })
    test('partial', () => {
      expect(testValue.properties.partial).toStrictEqual({
        type: 'object',
        properties: {
          optNull: {
            oneOf: [
              { type: 'number', minimum: 0, maximum: 1 },
              { type: 'null', const: null },
            ],
          },
          optUndefined: {},
        },
        required: [],
      })
    })
    test('record', () => {
      expect(testValue.properties.rec).toStrictEqual({
        type: 'object',
        properties: {},
        required: [],
        additionalProperties: {
          description: 'CreditCard',
          type: 'string',
          pattern:
            '^(4(\\d{12}|\\d{15})|(5[1-5]\\d{4}|(222)[1-9]\\d{2}|(22)[3-9]\\d{3}|(2)[3-6]\\d{4}|(27)[01]\\d{3}|(2720)\\d{2})\\d{10}|3[47]\\d{13}|(3(0([0-5]\\d{5}|(95)\\d{4})|[89]\\d{6})\\d{8,11}|(36)\\d{6}\\d{6,11})|((6011)(0[5-9]\\d{2}|[2-4]\\d{3}|(74)\\d{2}|(7)[7-9]\\d{2}|(8)[6-9]\\d{2}|(9)\\d{3})|(64)[4-9]\\d{5}|(650)[0-5]\\d{4}|(65060)[1-9]\\d{2}|(65061)[1-9]\\d{2}|(6506)[2-9]\\d{3}|(650)[7-9]\\d{4}|(65)[1-9]\\d{5})\\d{8,11}|((352)[89]\\d{4}|(35)[3-8]\\d{5})\\d{8,11}|(((60)|(65)|(81)|(82))\\d{14}|(508)\\d{14})|(62)(2((12)[6-9]\\d{2}|1[3-9]\\d{3}|[2-8]\\d|(9)[01]\\d{3}|(92)[0-5]\\d{2})|[4-6]\\d{5}|(8)[2-8]\\d{4})\\d{8,11})$',
        },
      })
    })
    test('array', () => {
      expect(testValue.properties.arr).toStrictEqual({
        type: 'array',
        items: {
          type: 'string',
          contentMediaType: 'application/json',
        },
      })
    })
    test('tuple', () => {
      expect(testValue.properties.tup).toStrictEqual({
        type: 'array',
        items: [
          {
            type: 'string',
            contentMediaType: 'application/json',
          },
          {
            type: 'number',
          },
        ],
        minItems: 2,
        maxItems: 2,
      })
    })
    test('sum', () => {
      expect(testValue.properties.sum).toStrictEqual({
        oneOf: [
          {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                const: 'a',
              },
              a: {
                type: 'boolean',
              },
            },
            required: ['type', 'a'],
          },
          {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                const: 'b',
              },
              b: {
                type: 'integer',
                maximum: 9007199254740991,
                minimum: 0,
              },
            },
            required: ['type', 'b'],
          },
        ],
      })
    })
    test('date', () => {
      expect(testValue.properties.date).toStrictEqual({
        type: 'string',
        format: 'date',
      })
    })
    test('isoDate', () => {
      expect(testValue.properties.isoDate).toStrictEqual({
        type: 'string',
        description: 'IsoDateString',
        pattern:
          '^(((\\d{4}|[+\\x2d]\\d{6})-((0[1-9])|(1[0-2]))-((0[1-9])|(1\\d|[2]\\d|3[0-1]))|((\\d{4}|[+\\x2d]\\d{6})-((0[1-9])|(1[0-2])))|\\d{4}|[+\\x2d]\\d{6})(T| )(((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d)):((0\\d)|(1\\d|[2-4]\\d|5\\d))\\.(\\d+?)|((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d)):((0\\d)|(1\\d|[2-4]\\d|5\\d))|((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d)))(Z|[+\\x2d]((0\\d)|(1\\d|2[0-3])):((0\\d)|(1\\d|[2-4]\\d|5\\d))))$',
      })
    })
    test('intersection', () => {
      expect(testValue.properties.intersection).toStrictEqual({
        allOf: [
          {
            type: 'object',
            properties: {
              a: {
                type: 'integer',
                maximum: 0,
                minimum: -9007199254740991,
              },
            },
            required: ['a'],
          },
          {
            type: 'object',
            properties: {
              b: {
                type: 'number',
                maximum: 1.7976931348623157e308,
                minimum: 0,
              },
              c: {
                type: 'number',
                maximum: 0,
                minimum: -1.7976931348623157e308,
              },
            },
            required: ['b', 'c'],
          },
        ],
      })
    })
    test('map', () => {
      expect(testValue.properties.map).toStrictEqual({
        type: 'array',
        items: {
          type: 'array',
          items: [
            {
              type: 'string',
            },
            {
              type: 'number',
              maximum: 1.7976931348623157e308,
              minimum: -1.7976931348623157e308,
            },
          ],
          minItems: 2,
          maxItems: 2,
        },
      })
    })
    test('int', () => {
      expect(testValue.properties.int).toStrictEqual({
        type: 'integer',
        maximum: 9007199254740991,
        minimum: -9007199254740991,
      })
    })
    test('option', () => {
      expect(testValue.properties.option).toStrictEqual({
        allOf: [
          {
            not: {
              const: 69420,
            },
          },
          {
            type: 'number',
          },
        ],
      })
    })
    test('singularSum', () => {
      expect(testValue.properties.singularSum).toStrictEqual({
        type: 'object',
        properties: {
          type: {
            type: 'string',
            const: 'a',
          },
          a: {
            type: 'array',
            items: {
              allOf: [
                {
                  type: 'string',
                  maxLength: 1,
                  minLength: 1,
                },
                {
                  allOf: [
                    {
                      type: 'string',
                      maxLength: 2,
                    },
                    {
                      allOf: [
                        {
                          type: 'string',
                          maxLength: 3,
                        },
                        {
                          allOf: [
                            {
                              type: 'string',
                              maxLength: 4,
                              minLength: 4,
                            },
                            {
                              allOf: [
                                {
                                  type: 'string',
                                },
                                {
                                  allOf: [
                                    {
                                      type: 'string',
                                    },
                                    {
                                      allOf: [
                                        {
                                          type: 'string',
                                        },
                                        {
                                          allOf: [
                                            {
                                              type: 'string',
                                            },
                                            {
                                              type: 'string',
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
        required: ['type', 'a'],
      })
    })
  })

  describe('externally valid', () => {
    const testSchema = S.Readonly(
      S.Struct({
        literal: S.Literal('string', 5, true, null),
        nully: S.Nullable(S.Int({ min: 0, max: 1 })),
        rec: S.Record(S.CreditCard),
        arr: S.Array(S.Json.jsonString),

        tup: S.Tuple(S.Number, S.Number),
        sum: S.Sum('type')({
          a: S.Struct({ type: S.Literal('a'), a: S.Boolean }),
          b: S.Struct({ type: S.Literal('b'), b: S.Lazy('Sum[b].b', () => S.Natural) }),
        }),
        intersection: S.Intersection(S.Struct({ a: S.NonPositiveInt }))(
          S.Struct({ b: S.NonNegativeFloat, c: S.NonPositiveFloat }),
        ),
        int: S.Int(),
      }),
    )
    const jsonSchema = getJsonSchema(testSchema)
    const arbitrary = getArbitrary(testSchema).arbitrary(fc)
    it('validates for version 4', () => {
      const v4 = new Draft04(jsonSchema)
      fc.assert(
        fc.property(arbitrary, value => {
          expect(v4.isValid(value)).toBe(true)
        }),
      )
    })
    it('validates for version 6', () => {
      const v6 = new Draft06(jsonSchema)
      fc.assert(
        fc.property(arbitrary, value => {
          expect(v6.isValid(value)).toBe(true)
        }),
      )
    })
    it('validates for version 7', () => {
      const v7 = new Draft07(jsonSchema)
      fc.assert(
        fc.property(arbitrary, value => {
          expect(v7.isValid(value)).toBe(true)
        }),
      )
    })
  })
})
