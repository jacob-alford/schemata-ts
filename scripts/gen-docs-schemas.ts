import * as fc from 'fast-check'
import * as E from 'fp-ts/Either'
import { flow, pipe, tuple } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as Ord from 'fp-ts/Ord'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Sg from 'fp-ts/Semigroup'
import * as Str from 'fp-ts/string'
import * as TE from 'fp-ts/TaskEither'
import path from 'path'

import * as S from '../src'
import { deriveArbitrary } from '../src/Arbitrary'
import { type Build } from './build'
import { SCHEMA_OUT_DIR, SCHEMA_SRC_DIR } from './docs-config'

const makeSchemaDocsLink = (file: string): string =>
  `https://jacob-alford.github.io/schemata-ts/schemata/${file}.ts.html`
const makeSchemaSourceLink = (file: string): string =>
  `https://github.com/jacob-alford/schemata-ts/tree/main/src/schemata/${file}.ts`

const removeExt = (file: string): string => file.replace(/\.[^/.]+$/, '')

const ordCategory: Ord.Ord<readonly [string, string]> = pipe(
  Str.Ord,
  Ord.contramap(([cat]) => cat),
)

const stringExamples = (schema: S.Schema<string, string>): string =>
  pipe(
    fc.sample(
      deriveArbitrary(schema)
        .arbitrary(fc)
        .map(s => s.trim().replaceAll(/\s/g, '').replaceAll('`', ''))
        .filter(s => s.length > 5 && s !== ''),
      3,
    ),
    RA.intercalate(Str.Monoid)(', '),
    _ => ` e.g:  \`${_}\``,
  )

const makeExamples: (category: string, file: string, schema: unknown) => string = (
  category,
  file,
  schema,
) => {
  if (category !== 'String') return ''
  switch (file) {
    case 'UUID':
      return stringExamples(S.UUID('any') as any)
    case 'CamelCaseString':
      return ' e.g:  `Camel_case-string` → `camelCaseString`'
    default:
      return S.isSchema(schema) ? stringExamples(schema as any) : ''
  }
}

const categoryTemplate = (
  cat: string,
  files: RNEA.ReadonlyNonEmptyArray<string>,
) => `### ${cat} (${files.length})
${pipe(
  files,
  RNEA.foldMap(Sg.intercalate('\n')(Str.Semigroup))(
    file =>
      `* ${file} ([docs](${makeSchemaDocsLink(file)})) ([source](${makeSchemaSourceLink(
        file,
      )}))${makeExamples(cat, file, (S as any)[file])}`,
  ),
)}`

const schemaTemplate = (
  schemas: RNEA.ReadonlyNonEmptyArray<[string, RNEA.ReadonlyNonEmptyArray<string>]>,
): string => `---
title: schemata
nav_order: 1
parent: schemata
has_children: true
---

${pipe(
  schemas,
  RNEA.foldMap(Sg.intercalate('\n\n')(Str.Semigroup))(([cat, files]) =>
    categoryTemplate(cat, files),
  ),
)}`

export const genSchemas: Build<void> = _ =>
  pipe(
    _.readFiles(path.resolve(SCHEMA_SRC_DIR)),
    TE.chain(
      RA.wither(TE.ApplicativePar)(file =>
        pipe(
          _.readFile(path.resolve(SCHEMA_SRC_DIR, file)),
          TE.map(O.fromPredicate(() => file !== 'index.ts')),
          TE.chainEitherK(
            O.traverse(E.Applicative)(content =>
              pipe(
                content.split('\n'),
                RA.findLastMap(line =>
                  pipe(
                    O.fromNullable(line.match(/@category\b(.*)\b/)),
                    O.chain(RA.head),
                    O.map(categoryString =>
                      tuple(
                        categoryString.replace('@category ', '').trim(),
                        removeExt(file),
                      ),
                    ),
                  ),
                ),
                E.fromOption(() => new Error(`No category found for ${file}`)),
              ),
            ),
          ),
        ),
      ),
    ),
    TE.chain(
      flow(
        RNEA.fromReadonlyArray,
        TE.fromOption(() => new Error('No schemata found')),
      ),
    ),
    TE.chain(
      flow(
        RNEA.sort(ordCategory),
        RNEA.groupBy(([cat]) => cat),
        RR.collect(Str.Ord)((k, v) =>
          tuple(
            k,
            pipe(
              v,
              RNEA.map(([, file]) => file),
            ),
          ),
        ),
        RNEA.fromReadonlyArray,
        TE.fromOption(() => new Error('No schemata found')),
      ),
    ),
    TE.map(schemaTemplate),
    TE.chainFirst(schemaDocs =>
      _.writeFile(path.resolve(SCHEMA_OUT_DIR, 'index.md'), schemaDocs),
    ),
    TE.asUnit,
  )
