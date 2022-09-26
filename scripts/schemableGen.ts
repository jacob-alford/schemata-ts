import * as ts from 'typescript'
import * as Cons from 'fp-ts/Console'
import { flow, pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as RTE from 'fp-ts/ReaderTaskEither'
import * as Str from 'fp-ts/string'
import * as TE from 'fp-ts/TaskEither'
import { FileSystem, fileSystem } from './FS'
import { cli, CLI } from './CLI'
import { run } from './run'
import { makeDestructureImport, makeModuleStarImport } from './ts-helpers'

interface Build<A> extends RTE.ReaderTaskEither<FileSystem & CLI, Error, A> {}

const _ = ts.factory

/**
 * Types that are injected into SchemableExt, follows:
 *
 * Category: List TypeName
 */
type SchemableCombinators = {
  date: ReadonlyArray<string>
  number: ReadonlyArray<string>
  string: ReadonlyArray<string>
}

// #region SchemableExt

export const schemableExtHeaderComment: ts.JSDoc = _.createJSDocComment(
  `The extended Schemable typeclass\n\n**Warning: DO NOT EDIT, this module is autogenerated**\n\n@since 0.0.1`
)

type Suffix = '' | '1' | '2' | '2C'

const suffixToURIS = (suffix: Suffix) => {
  switch (suffix) {
    case '':
      return undefined
    case '1':
      return _.createTypeReferenceNode(_.createIdentifier('URIS'))
    case '2':
      return _.createTypeReferenceNode(_.createIdentifier('URIS2'))
    case '2C':
      return _.createTypeReferenceNode(_.createIdentifier('URIS2'))
  }
}

export const makeSchemableExtTypeclass: (
  combinators: SchemableCombinators,
  suffix: Suffix
) => ts.InterfaceDeclaration = (combinators, suffix) =>
  _.createInterfaceDeclaration(
    [_.createModifier(ts.SyntaxKind.ExportKeyword)],
    _.createIdentifier(`SchemableExt${suffix}`),
    [
      _.createTypeParameterDeclaration(
        undefined,
        _.createIdentifier('S'),
        suffixToURIS(suffix),
        undefined
      ),
    ],
    [
      _.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
        _.createExpressionWithTypeArguments(
          _.createIdentifier(`Schemable${suffix === '' ? 'HKT2' : suffix}`),
          [
            _.createTypeReferenceNode(_.createIdentifier('S'), undefined),
            ...(suffix === '2C'
              ? [_.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)]
              : []),
          ]
        ),
      ]),
    ],
    [
      ...pipe(
        combinators.number,
        RA.map(combinator =>
          _.createPropertySignature(
            [_.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
            _.createIdentifier(combinator),
            undefined,
            _.createTypeReferenceNode(
              _.createQualifiedName(
                _.createIdentifier(combinator),
                _.createIdentifier(`SchemableParams${suffix}`)
              ),
              [_.createTypeReferenceNode(_.createIdentifier('S'), undefined)]
            )
          )
        )
      ),
      ...pipe(
        combinators.string,
        RA.map(combinator =>
          _.createPropertySignature(
            [_.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
            _.createIdentifier(combinator),
            undefined,
            _.createTypeReferenceNode(
              _.createQualifiedName(
                _.createIdentifier(combinator),
                _.createIdentifier(`SchemableParams${suffix}`)
              ),
              [_.createTypeReferenceNode(_.createIdentifier('S'), undefined)]
            )
          )
        )
      ),
      ...pipe(
        combinators.date,
        RA.map(combinator =>
          _.createPropertySignature(
            [_.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
            _.createIdentifier(combinator),
            undefined,
            _.createTypeReferenceNode(
              _.createQualifiedName(
                _.createIdentifier(combinator),
                _.createIdentifier(`SchemableParams${suffix}`)
              ),
              [_.createTypeReferenceNode(_.createIdentifier('S'), undefined)]
            )
          )
        )
      ),
    ]
  )

/** Generate TS code for SchemableExt.ts */
const makeSchemableExtContents: (
  schemableCombinators: SchemableCombinators
) => string = combinators => {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
  const sourceFile = ts.createSourceFile(
    `${module}.ts`,
    '',
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  )

  return pipe(
    [
      schemableExtHeaderComment,
      makeDestructureImport(['URIS', 'URIS2'], 'fp-ts/HKT'),
      makeDestructureImport(['Schemable1', 'Schemable2C'], 'io-ts/Schemable'),
      makeDestructureImport(['Schemable2', 'SchemableHKT2'], './internal/Schemable2'),

      _.createJSDocComment('number'),
      ...pipe(
        combinators.number,
        RA.map(combinator => makeModuleStarImport(combinator, `./number/${combinator}`))
      ),
      _.createJSDocComment('string'),
      ...pipe(
        combinators.string,
        RA.map(combinator => makeModuleStarImport(combinator, `./string/${combinator}`))
      ),
      _.createJSDocComment('date'),
      ...pipe(
        combinators.date,
        RA.map(combinator => makeModuleStarImport(combinator, `./date/${combinator}`))
      ),

      instanceComment,
      makeSchemableExtTypeclass(combinators, ''),

      instanceComment,
      makeSchemableExtTypeclass(combinators, '1'),

      instanceComment,
      makeSchemableExtTypeclass(combinators, '2'),

      instanceComment,
      makeSchemableExtTypeclass(combinators, '2C'),
    ],
    _.createNodeArray,
    nodes => printer.printList(ts.ListFormat.MultiLine, nodes, sourceFile),
    Str.replace(/\/\*\*/gm, '\n/**')
  )
}

// #endregion

/**
 * Different typeclasses which express a Schemable instance, follows:
 *
 * ["InstanceName", "I", "Schemable"] where index 0 is the proper name of the instance and
 * index 1 is the module accessor, and index 2 is the arity of the SchemableInstance
 */
export type SchemableTypeclasses =
  | ['Decoder', 'D', 'SchemableExt2C', '0.0.1']
  | ['Eq', 'Eq', 'SchemableExt1', '0.0.1']
  | ['Guard', 'G', 'SchemableExt1', '0.0.1']
  | ['TaskDecoder', 'TD', 'SchemableExt2C', '0.0.1']
  | ['Type', 't', 'SchemableExt1', '0.0.1']
  | ['Encoder', 'Enc', 'SchemableExt2', '0.0.3']
  | ['Arbitrary', 'Arb', 'SchemableExt1', '0.0.3']

// #region Typeclass modules

export const moduleHeaderComment: (module: string, version: string) => ts.JSDoc = (
  module,
  version
) =>
  _.createJSDocComment(
    `SchemableExt instances for ${module}\n\n**Warning: DO NOT EDIT, this module is autogenerated**\n\n@since ${version}`
  )

export const instanceComment: ts.JSDoc = _.createJSDocComment(
  `@since 0.0.1\n@category Instances`
)

const makeSchemableInstance: (
  tc: SchemableTypeclasses
) => (schemableCombinators: SchemableCombinators) => ts.VariableStatement =
  ([instanceName, accessor, schemableInstance]) =>
  schemableCombinators =>
    _.createVariableStatement(
      [_.createModifier(ts.SyntaxKind.ExportKeyword)],
      _.createVariableDeclarationList(
        [
          _.createVariableDeclaration(
            _.createIdentifier('Schemable'),
            undefined,
            _.createTypeReferenceNode(_.createIdentifier(schemableInstance), [
              _.createTypeReferenceNode(
                _.createQualifiedName(
                  _.createIdentifier(accessor),
                  _.createIdentifier('URI')
                ),
                undefined
              ),
            ]),
            _.createObjectLiteralExpression(
              [
                _.createSpreadAssignment(
                  _.createPropertyAccessExpression(
                    _.createIdentifier(accessor),
                    _.createIdentifier('Schemable')
                  )
                ),
                ...pipe(
                  schemableCombinators.number,
                  RA.map(schemableCombinatorName =>
                    _.createPropertyAssignment(
                      _.createIdentifier(schemableCombinatorName),
                      _.createPropertyAccessExpression(
                        _.createIdentifier(schemableCombinatorName),
                        _.createIdentifier(instanceName)
                      )
                    )
                  )
                ),
                ...pipe(
                  schemableCombinators.string,
                  RA.map(schemableCombinatorName =>
                    _.createPropertyAssignment(
                      _.createIdentifier(schemableCombinatorName),
                      _.createPropertyAccessExpression(
                        _.createIdentifier(schemableCombinatorName),
                        _.createIdentifier(instanceName)
                      )
                    )
                  )
                ),
                ...pipe(
                  schemableCombinators.date,
                  RA.map(schemableCombinatorName =>
                    _.createPropertyAssignment(
                      _.createIdentifier(schemableCombinatorName),
                      _.createPropertyAccessExpression(
                        _.createIdentifier(schemableCombinatorName),
                        _.createIdentifier(instanceName)
                      )
                    )
                  )
                ),
              ],
              true
            )
          ),
        ],
        ts.NodeFlags.Const
      )
    )

/** Generate TS code for Decoder, Eq, Guard, TaskDecoder, Type, or Encoder */
const makeSchemableInstanceModuleContents: (
  typeclass: SchemableTypeclasses
) => (combinators: SchemableCombinators) => string = typeclass => combinators => {
  const [module, accessor, schemableInstance] = typeclass

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
  const sourceFile = ts.createSourceFile(
    `${module}.ts`,
    '',
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  )

  return pipe(
    [
      moduleHeaderComment(module, typeclass[3]),
      accessor === 'Enc'
        ? makeModuleStarImport(accessor, `./internal/EncoderBase`)
        : accessor === 'Arb'
        ? makeModuleStarImport(accessor, `./internal/ArbitraryBase`)
        : makeModuleStarImport(accessor, `io-ts/${module}`),
      makeDestructureImport([schemableInstance], './SchemableExt'),
      _.createJSDocComment('number'),
      ...pipe(
        combinators.number,
        RA.map(combinator => makeModuleStarImport(combinator, `./number/${combinator}`))
      ),
      _.createJSDocComment('string'),
      ...pipe(
        combinators.string,
        RA.map(combinator => makeModuleStarImport(combinator, `./string/${combinator}`))
      ),
      _.createJSDocComment('date'),
      ...pipe(
        combinators.date,
        RA.map(combinator => makeModuleStarImport(combinator, `./date/${combinator}`))
      ),
      instanceComment,
      makeSchemableInstance(typeclass)(combinators),
    ],
    _.createNodeArray,
    nodes => printer.printList(ts.ListFormat.MultiLine, nodes, sourceFile),
    Str.replace(/\/\*\*/gm, '\n/**')
  )
}

const writeToDisk: (path: string) => (contents: string) => Build<void> =
  path => contents => C =>
    C.writeFile(path, contents)

// #endregion

/** Retrieve modules found in category folders */
const getSchemableCombinators: Build<SchemableCombinators> = C =>
  pipe(
    TE.Do,
    TE.apS(
      'date',
      pipe(C.readFiles('./src/date'), TE.map(RA.map(flow(Str.split('.'), RNEA.head))))
    ),
    TE.apS(
      'number',
      pipe(C.readFiles('./src/number'), TE.map(RA.map(flow(Str.split('.'), RNEA.head))))
    ),
    TE.apS(
      'string',
      pipe(C.readFiles('./src/string'), TE.map(RA.map(flow(Str.split('.'), RNEA.head))))
    )
  )

const schemableTypeclasses: ReadonlyArray<SchemableTypeclasses> = [
  ['Decoder', 'D', 'SchemableExt2C', '0.0.1'],
  ['Eq', 'Eq', 'SchemableExt1', '0.0.1'],
  ['Guard', 'G', 'SchemableExt1', '0.0.1'],
  ['TaskDecoder', 'TD', 'SchemableExt2C', '0.0.1'],
  ['Type', 't', 'SchemableExt1', '0.0.1'],
  ['Encoder', 'Enc', 'SchemableExt2', '0.0.3'],
  ['Arbitrary', 'Arb', 'SchemableExt1', '0.0.3'],
]

const main: Build<void> = pipe(
  getSchemableCombinators,
  RTE.bindTo('combinators'),
  RTE.chainFirstIOK(() => Cons.log('Writing `Schemable` instance modules...')),
  RTE.chainFirst(({ combinators }) =>
    pipe(
      schemableTypeclasses,
      RTE.traverseArray(typeclass =>
        pipe(
          combinators,
          makeSchemableInstanceModuleContents(typeclass),
          writeToDisk(`./src/${typeclass[0]}.ts`),
          RTE.chainFirstIOK(() => Cons.log(`  - Writing src/${typeclass[0]}.ts...`))
        )
      )
    )
  ),
  RTE.chainFirstIOK(() => Cons.log('Writing `SchemableExt`...')),
  RTE.chainFirst(({ combinators }) =>
    pipe(makeSchemableExtContents(combinators), writeToDisk(`./src/SchemableExt.ts`))
  ),
  RTE.chainIOK(() => Cons.log('Done!'))
)

run(
  main({
    ...fileSystem,
    ...cli,
  })
)
