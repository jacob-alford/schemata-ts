import * as ts from 'typescript'
import * as Cons from 'fp-ts/Console'
import { flow, pipe, tuple, unsafeCoerce } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
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

type Schemable = [name: `With${string}`, path: string]

// #region SchemableExt

export const schemableExtHeaderComment: ts.JSDoc = _.createJSDocComment(
  `The extended Schemable typeclass\n\n**Warning: DO NOT EDIT, this module is autogenerated**\n\n@since 1.0.0`,
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
  schemables: ReadonlyArray<Schemable>,
  suffix: Suffix,
) => ts.InterfaceDeclaration = (schemables, suffix) =>
  _.createInterfaceDeclaration(
    [_.createModifier(ts.SyntaxKind.ExportKeyword)],
    _.createIdentifier(`SchemableExt${suffix}`),
    [
      _.createTypeParameterDeclaration(
        undefined,
        _.createIdentifier('S'),
        suffixToURIS(suffix),
        undefined,
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
          ],
        ),
        ...pipe(
          schemables,
          RA.map(([schemable]) =>
            _.createExpressionWithTypeArguments(
              _.createIdentifier(`${schemable}${suffix === '' ? 'HKT2' : suffix}`),
              [
                _.createTypeReferenceNode(_.createIdentifier('S'), undefined),
                ...(suffix === '2C'
                  ? [_.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)]
                  : []),
              ],
            ),
          ),
        ),
      ]),
    ],
    [],
  )

/** Generate TS code for SchemableExt.ts */
const makeSchemableExtContents: (
  schemables: ReadonlyArray<Schemable>,
) => string = schemables => {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
  const sourceFile = ts.createSourceFile(
    `${module}.ts`,
    '',
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS,
  )

  return pipe(
    [
      schemableExtHeaderComment,
      makeDestructureImport(['URIS', 'URIS2'], 'fp-ts/HKT'),
      makeDestructureImport(['Schemable1', 'Schemable2C'], 'io-ts/Schemable'),
      makeDestructureImport(['Schemable2', 'SchemableHKT2'], './base/SchemableBase'),
      ...pipe(
        schemables,
        RA.map(([schemable, path]) =>
          makeDestructureImport(
            [`${schemable}1`, `${schemable}2`, `${schemable}2C`, `${schemable}HKT2`],
            path,
          ),
        ),
      ),

      instanceComment,
      makeSchemableExtTypeclass(schemables, ''),

      instanceComment,
      makeSchemableExtTypeclass(schemables, '1'),

      instanceComment,
      makeSchemableExtTypeclass(schemables, '2'),

      instanceComment,
      makeSchemableExtTypeclass(schemables, '2C'),
    ],
    _.createNodeArray,
    nodes => printer.printList(ts.ListFormat.MultiLine, nodes, sourceFile),
    Str.replace(/\/\*\*/gm, '\n/**'),
  )
}

// #endregion

type SchemableTypeclass<
  Name extends string,
  Accessor extends string,
  Arity extends `SchemableExt${'1' | '2' | '2C'}`,
  Version extends string,
> = [name: Name, accessor: Accessor, arity: Arity, version: Version]

/** Different typeclasses which express a Schemable instance */
export type SchemableTypeclasses =
  | SchemableTypeclass<'Decoder', 'D', 'SchemableExt2C', '1.0.0'>
  | SchemableTypeclass<'Eq', 'Eq', 'SchemableExt1', '1.0.0'>
  | SchemableTypeclass<'Guard', 'G', 'SchemableExt1', '1.0.0'>
  | SchemableTypeclass<'TaskDecoder', 'TD', 'SchemableExt2C', '1.0.0'>
  | SchemableTypeclass<'Type', 't', 'SchemableExt1', '1.0.0'>
  | SchemableTypeclass<'Encoder', 'Enc', 'SchemableExt2', '1.0.0'>
  | SchemableTypeclass<'Arbitrary', 'Arb', 'SchemableExt1', '1.0.0'>

// #region Typeclass modules

export const moduleHeaderComment: (module: string, version: string) => ts.JSDoc = (
  module,
  version,
) =>
  _.createJSDocComment(
    `SchemableExt instances for ${module}\n\n**Warning: DO NOT EDIT, this module is autogenerated**\n\n@since ${version}`,
  )

export const instanceComment: ts.JSDoc = _.createJSDocComment(
  `@since 1.0.0\n@category Instances`,
)

const makeInstanceTypeExport: (tc: SchemableTypeclasses) => ts.ExportDeclaration = ([
  typeclassName,
]) =>
  _.createExportDeclaration(
    undefined,
    true,
    _.createNamedExports([
      _.createExportSpecifier(false, undefined, _.createIdentifier(typeclassName)),
    ]),
    _.createStringLiteral(`./base/${typeclassName}Base`),
    undefined,
  )

const makeSchemableInstance: (
  tc: SchemableTypeclasses,
  schemables: ReadonlyArray<Schemable>,
) => ts.VariableStatement = ([instanceName, accessor, schemableInstance], schemables) =>
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
                _.createIdentifier('URI'),
              ),
              undefined,
            ),
          ]),
          _.createObjectLiteralExpression(
            [
              _.createSpreadAssignment(
                _.createPropertyAccessExpression(
                  _.createIdentifier(accessor),
                  _.createIdentifier('Schemable'),
                ),
              ),
              ...pipe(
                schemables,
                RA.map(([schemable]) =>
                  _.createSpreadAssignment(
                    _.createPropertyAccessExpression(
                      _.createIdentifier(schemable),
                      _.createIdentifier(instanceName),
                    ),
                  ),
                ),
              ),
            ],
            true,
          ),
        ),
      ],
      ts.NodeFlags.Const,
    ),
  )

/** Generate TS code for Decoder, Eq, Guard, TaskDecoder, Type, or Encoder */
const makeSchemableInstanceModuleContents: (
  typeclass: SchemableTypeclasses,
  schemables: ReadonlyArray<Schemable>,
) => string = (typeclass, schemables) => {
  const [module, accessor, schemableInstance, sinceVersion] = typeclass

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
  const sourceFile = ts.createSourceFile(
    `${module}.ts`,
    '',
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS,
  )

  return pipe(
    [
      moduleHeaderComment(module, sinceVersion),
      makeInstanceTypeExport(typeclass),
      makeModuleStarImport(accessor, `./base/${module}Base`),
      makeDestructureImport([schemableInstance], './SchemableExt'),
      _.createJSDocComment('schemables'),
      ...pipe(
        schemables,
        RA.map(([schemable]) =>
          makeModuleStarImport(schemable, `./schemables/${schemable}`),
        ),
      ),
      instanceComment,
      makeSchemableInstance(typeclass, schemables),
    ],
    _.createNodeArray,
    nodes => printer.printList(ts.ListFormat.MultiLine, nodes, sourceFile),
    Str.replace(/\/\*\*/gm, '\n/**'),
  )
}

const writeToDisk: (path: string) => (contents: string) => Build<void> =
  path => contents => C =>
    C.writeFile(path, contents)

// #endregion

/** Strips JSDoc comment's leading ** and trailing * */
export const extractJSDocHeaderTextFromFileContents: (
  fileContents: string,
) => string = fileContents =>
  pipe(
    fileContents,
    Str.split('*/'),
    RNEA.head,
    Str.split('/**'),
    RNEA.tail,
    RA.head,
    O.getOrElse(() => ''),
  )

/** Extracts module name, e.g. ASCII.ts -> ASCII */
const getModuleName: (file: string) => string = flow(Str.split('.'), RNEA.head)

const getSchemableName: (schmable: `With${string}`) => `With${string}` =
  unsafeCoerce(getModuleName)

const getSchemables: Build<ReadonlyArray<Schemable>> = C =>
  pipe(
    C.readFiles('./src/schemables'),
    TE.chain(
      TE.traverseArray<string, `With${string}`, Error>(
        TE.fromPredicate(
          (file): file is `With${string}` => file.length > 4 && file.startsWith('With'),
          file => E.toError(`File ${file} does not start with \`With\``),
        ),
      ),
    ),
    TE.map(
      RA.map(file => {
        const schemable = getSchemableName(file)
        return tuple(schemable, `./schemables/${schemable}`)
      }),
    ),
  )

const schemableTypeclasses: ReadonlyArray<SchemableTypeclasses> = [
  ['Decoder', 'D', 'SchemableExt2C', '1.0.0'],
  ['Eq', 'Eq', 'SchemableExt1', '1.0.0'],
  ['Guard', 'G', 'SchemableExt1', '1.0.0'],
  ['TaskDecoder', 'TD', 'SchemableExt2C', '1.0.0'],
  ['Type', 't', 'SchemableExt1', '1.0.0'],
  ['Encoder', 'Enc', 'SchemableExt2', '1.0.0'],
  ['Arbitrary', 'Arb', 'SchemableExt1', '1.0.0'],
]

const format: Build<void> = C => C.exec('yarn format')

const main: Build<void> = pipe(
  getSchemables,
  RTE.bindTo('schemables'),
  RTE.chainFirstIOK(() => Cons.log('Writing `Schemable` instance modules...')),
  RTE.chainFirst(({ schemables }) =>
    pipe(
      schemableTypeclasses,
      RTE.traverseArray(typeclass =>
        pipe(
          makeSchemableInstanceModuleContents(typeclass, schemables),
          writeToDisk(`./src/${typeclass[0]}.ts`),
          RTE.chainFirstIOK(() => Cons.log(`  - Writing src/${typeclass[0]}.ts...`)),
        ),
      ),
    ),
  ),
  RTE.chainFirstIOK(() => Cons.log('Writing `SchemableExt`...')),
  RTE.chainFirst(({ schemables }) =>
    pipe(makeSchemableExtContents(schemables), writeToDisk(`./src/SchemableExt.ts`)),
  ),
  RTE.chainFirstIOK(() => Cons.log('Formatting with Prettier...')),
  RTE.apFirst(format),
  RTE.chainIOK(() => Cons.log('Done!')),
)

run(
  main({
    ...fileSystem,
    ...cli,
  }),
)
