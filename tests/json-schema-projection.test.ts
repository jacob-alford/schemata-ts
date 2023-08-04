import { pipe } from 'fp-ts/function'
import * as S from 'schemata-ts'

import { runStandardTestSuite } from '../test-utils/test-suite'

const Schema = pipe(
  S.Record(
    S.NonEmptyString,
    pipe(
      S.Struct({
        arr: pipe(S.NonEmptyArray(S.NonPositiveInt), S.Annotate({ readOnly: true })),
        tup: pipe(
          S.Tuple(
            pipe(S.NonNegativeFloat, S.Annotate({ title: 'non-negative float' })),
            pipe(S.Natural, S.Annotate({ deprecated: true })),
          ),
          S.Annotate({ deprecated: false, references: undefined }),
        ),
      }),
      S.Annotate({
        description: 'Inner record',
        references: {
          foo: S.ParseJsonString(
            pipe(
              S.Tuple(
                pipe(
                  S.String(),
                  S.Annotate({
                    references: undefined,
                  }),
                ),
              ),
              S.Annotate({
                references: {
                  bar: S.Tuple(S.String()),
                },
              }),
            ),
          ),
        },
      }),
    ),
  ),
  S.Annotate({
    title: 'Outer record',
  }),
)

runStandardTestSuite(Schema, () => ({
  jsonSchema: {
    type: 'object',
    title: 'Outer record',
    additionalProperties: {
      $defs: {
        foo: {
          type: 'string',
          contentMediaType: 'application/json',
          contentSchema: {
            type: 'array',
            items: [
              {
                type: 'string',
              },
            ],
            minItems: 1,
            maxItems: 1,
            $defs: {
              bar: {
                items: [
                  {
                    type: 'string',
                  },
                ],
                maxItems: 1,
                minItems: 1,
                type: 'array',
              },
            },
          },
        },
      },
      type: 'object',
      description: 'Inner record',
      properties: {
        arr: {
          type: 'array',
          items: {
            type: 'integer',
            maximum: 0,
            minimum: -9007199254740991,
          },
          minItems: 1,
        },
        tup: {
          type: 'array',
          items: [
            {
              type: 'number',
              title: 'non-negative float',
              minimum: 0,
              maximum: 1.7976931348623157e308,
            },
            {
              type: 'integer',
              minimum: 0,
            },
          ],
          maxItems: 2,
          minItems: 2,
        },
      },
      required: ['arr', 'tup'],
    },
    required: [],
    properties: {},
    propertyNames: {
      minLength: 1,
      type: 'string',
    },
  },
  jsonSchema2007: {
    type: 'object',
    title: 'Outer record',
    additionalProperties: {
      definitions: {
        foo: {
          type: 'string',
          contentMediaType: 'application/json',
          contentSchema: {
            type: 'array',
            items: [
              {
                type: 'string',
              },
            ],
            minItems: 1,
            maxItems: 1,
            definitions: {
              bar: {
                items: [
                  {
                    type: 'string',
                  },
                ],
                maxItems: 1,
                minItems: 1,
                type: 'array',
              },
            },
          },
        },
      },
      type: 'object',
      description: 'Inner record',
      properties: {
        arr: {
          type: 'array',
          items: {
            type: 'integer',
            maximum: 0,
            minimum: -9007199254740991,
          },
          minItems: 1,
        },
        tup: {
          type: 'array',
          items: [
            {
              type: 'number',
              title: 'non-negative float',
              minimum: 0,
              maximum: 1.7976931348623157e308,
            },
            {
              type: 'integer',
              minimum: 0,
            },
          ],
          maxItems: 2,
          minItems: 2,
        },
      },
      required: ['arr', 'tup'],
    },
    required: [],
    properties: {},
    propertyNames: {
      minLength: 1,
      type: 'string',
    },
  },
  jsonSchema2020: {
    type: 'object',
    title: 'Outer record',
    additionalProperties: {
      $defs: {
        foo: {
          type: 'string',
          contentMediaType: 'application/json',
          contentSchema: {
            type: 'array',
            prefixItems: [
              {
                type: 'string',
              },
            ],
            items: false,
            minItems: 1,
            maxItems: 1,
            $defs: {
              bar: {
                prefixItems: [
                  {
                    type: 'string',
                  },
                ],
                items: false,
                maxItems: 1,
                minItems: 1,
                type: 'array',
              },
            },
          },
        },
      },
      type: 'object',
      description: 'Inner record',
      properties: {
        arr: {
          type: 'array',
          items: {
            type: 'integer',
            maximum: 0,
            minimum: -9007199254740991,
          },
          minItems: 1,
        },
        tup: {
          type: 'array',
          items: false,
          prefixItems: [
            {
              type: 'number',
              title: 'non-negative float',
              minimum: 0,
              maximum: 1.7976931348623157e308,
            },
            {
              type: 'integer',
              minimum: 0,
            },
          ],
          maxItems: 2,
          minItems: 2,
        },
      },
      required: ['arr', 'tup'],
    },
    required: [],
    properties: {},
    propertyNames: {
      minLength: 1,
      type: 'string',
    },
  },
}))()
