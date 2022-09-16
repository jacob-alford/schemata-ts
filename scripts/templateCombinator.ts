import * as ts from 'typescript'
import * as Cons from 'fp-ts/Console'
import { flow, pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as RTE from 'fp-ts/ReaderTaskEither'
import * as Str from 'fp-ts/string'
import * as Json from 'fp-ts/Json'
import * as TE from 'fp-ts/TaskEither'
import { FileSystem, fileSystem } from './FS'
import { cli, CLI } from './CLI'
import { run } from './run'
import { makeDestructureImport, makeModuleStarImport } from './ts-helpers'
import { D, SC } from '../src/.'

interface Build<A> extends RTE.ReaderTaskEither<FileSystem & CLI, Error, A> {}

const _ = ts.factory

const sinceAndCategory: (category: string, version: string) => ts.JSDoc = (
  category,
  version
) => _.createJSDocComment(`@since ${version}\n\n@category ${category}`)

const makeCombinatorModule: (
  primitive: 'string' | 'number',
  name: string,
  packageVersion: string
) => string = (primitive, name, packageVersion) => {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
  const sourceFile = ts.createSourceFile(
    `${module}.ts`,
    '',
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  )

  const primitiveModule: [string, string, number] =
    primitive === 'string'
      ? ['Str', 'string', ts.SyntaxKind.StringKeyword]
      : ['Num', 'number', ts.SyntaxKind.NumberKeyword]

  return pipe(
    [
      _.createJSDocComment(`TODO: Add module comment\n\n@since ${packageVersion}`),
      makeDestructureImport(['Kind', 'Kind2', 'URIS', 'URIS2', 'HKT'], 'fp-ts/HKT'),
      makeModuleStarImport('D', 'io-ts/Decoder'),
      makeModuleStarImport('Eq_', 'fp-ts/Eq'),
      makeModuleStarImport('G', 'io-ts/Guard'),
      makeModuleStarImport(primitiveModule[0], `fp-ts/${primitiveModule[1]}`),
      makeModuleStarImport('TD', 'io-ts/TaskDecoder'),
      makeModuleStarImport('t', 'io-ts/Type'),
      makeDestructureImport(['pipe'], 'fp-ts/function'),
      sinceAndCategory('Internal', packageVersion),
      _.createInterfaceDeclaration(
        undefined,
        _.createIdentifier(`${name}Brand`),
        undefined,
        undefined,
        [
          _.createPropertySignature(
            [_.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
            _.createIdentifier(name),
            undefined,
            _.createTypeOperatorNode(
              ts.SyntaxKind.UniqueKeyword,
              _.createKeywordTypeNode(ts.SyntaxKind.SymbolKeyword)
            )
          ),
        ]
      ),
      _.createJSDocComment(
        `TODO: Add module comment\n\n@since ${packageVersion}\n@category Model`
      ),
      _.createTypeAliasDeclaration(
        [_.createModifier(ts.SyntaxKind.ExportKeyword)],
        _.createIdentifier(name),
        undefined,
        _.createIntersectionTypeNode([
          _.createKeywordTypeNode(primitiveModule[2]),
          _.createTypeReferenceNode(_.createIdentifier(`${name}Brand`), undefined),
        ])
      ),
      sinceAndCategory('Model', packageVersion),
      _.createTypeAliasDeclaration(
        [_.createModifier(ts.SyntaxKind.ExportKeyword)],
        _.createIdentifier('SchemableParams'),
        [
          _.createTypeParameterDeclaration(
            undefined,
            _.createIdentifier('S'),
            undefined,
            undefined
          ),
        ],
        _.createTypeReferenceNode(_.createIdentifier('HKT'), [
          _.createTypeReferenceNode(_.createIdentifier('S'), undefined),
          _.createTypeReferenceNode(_.createIdentifier(name), undefined),
        ])
      ),
      sinceAndCategory('Model', packageVersion),
      _.createTypeAliasDeclaration(
        [_.createModifier(ts.SyntaxKind.ExportKeyword)],
        _.createIdentifier('SchemableParams1'),
        [
          _.createTypeParameterDeclaration(
            undefined,
            _.createIdentifier('S'),
            _.createTypeReferenceNode(_.createIdentifier('URIS'), undefined),
            undefined
          ),
        ],
        _.createTypeReferenceNode(_.createIdentifier('Kind'), [
          _.createTypeReferenceNode(_.createIdentifier('S'), undefined),
          _.createTypeReferenceNode(_.createIdentifier(name), undefined),
        ])
      ),
      sinceAndCategory('Model', packageVersion),
      _.createTypeAliasDeclaration(
        [_.createModifier(ts.SyntaxKind.ExportKeyword)],
        _.createIdentifier('SchemableParams2C'),
        [
          _.createTypeParameterDeclaration(
            undefined,
            _.createIdentifier('S'),
            _.createTypeReferenceNode(_.createIdentifier('URIS2'), undefined),
            undefined
          ),
        ],
        _.createTypeReferenceNode(_.createIdentifier('Kind2'), [
          _.createTypeReferenceNode(_.createIdentifier('S'), undefined),
          _.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword),
          _.createTypeReferenceNode(_.createIdentifier(name), undefined),
        ])
      ),
      sinceAndCategory('Refinements', packageVersion),
      _.createVariableStatement(
        [_.createModifier(ts.SyntaxKind.ExportKeyword)],
        _.createVariableDeclarationList(
          [
            _.createVariableDeclaration(
              _.createIdentifier(`is${name}`),
              undefined,
              undefined,
              _.createArrowFunction(
                undefined,
                undefined,
                [
                  _.createParameterDeclaration(
                    undefined,
                    undefined,
                    _.createIdentifier('s'),
                    undefined,
                    _.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
                    undefined
                  ),
                ],
                _.createTypePredicateNode(
                  undefined,
                  's',
                  _.createTypeReferenceNode(name)
                ),
                _.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                _.createBlock(
                  [
                    _.createThrowStatement(
                      _.createNewExpression(_.createIdentifier('Error'), undefined, [
                        _.createStringLiteral('not implemented'),
                      ])
                    ),
                  ],
                  true
                )
              )
            ),
          ],
          ts.NodeFlags.Const
        )
      ),
      sinceAndCategory('Instances', packageVersion),
      _.createVariableStatement(
        [_.createModifier(ts.SyntaxKind.ExportKeyword)],
        _.createVariableDeclarationList(
          [
            _.createVariableDeclaration(
              _.createIdentifier('Decoder'),
              undefined,
              _.createTypeReferenceNode(_.createIdentifier('SchemableParams2C'), [
                _.createTypeReferenceNode(
                  _.createQualifiedName(
                    _.createIdentifier('D'),
                    _.createIdentifier('URI')
                  ),
                  undefined
                ),
              ]),
              _.createCallExpression(_.createIdentifier('pipe'), undefined, [
                _.createPropertyAccessExpression(
                  _.createIdentifier('D'),
                  _.createIdentifier(primitiveModule[1])
                ),
                _.createCallExpression(
                  _.createPropertyAccessExpression(
                    _.createIdentifier('D'),
                    _.createIdentifier('refine')
                  ),
                  undefined,
                  [_.createIdentifier(`is${name}`), _.createStringLiteral(name)]
                ),
              ])
            ),
          ],
          ts.NodeFlags.Const
        )
      ),
      sinceAndCategory('Instances', packageVersion),
      _.createVariableStatement(
        [_.createModifier(ts.SyntaxKind.ExportKeyword)],
        _.createVariableDeclarationList(
          [
            _.createVariableDeclaration(
              _.createIdentifier('Eq'),
              undefined,
              _.createTypeReferenceNode(_.createIdentifier('SchemableParams1'), [
                _.createTypeReferenceNode(
                  _.createQualifiedName(
                    _.createIdentifier('Eq_'),
                    _.createIdentifier('URI')
                  ),
                  undefined
                ),
              ]),
              _.createPropertyAccessExpression(
                _.createIdentifier(primitiveModule[0]),
                _.createIdentifier('Eq')
              )
            ),
          ],
          ts.NodeFlags.Const
        )
      ),
      sinceAndCategory('Instances', packageVersion),
      _.createVariableStatement(
        [_.createModifier(ts.SyntaxKind.ExportKeyword)],
        _.createVariableDeclarationList(
          [
            _.createVariableDeclaration(
              _.createIdentifier('Guard'),
              undefined,
              _.createTypeReferenceNode(_.createIdentifier('SchemableParams1'), [
                _.createTypeReferenceNode(
                  _.createQualifiedName(
                    _.createIdentifier('G'),
                    _.createIdentifier('URI')
                  ),
                  undefined
                ),
              ]),
              _.createCallExpression(_.createIdentifier('pipe'), undefined, [
                _.createPropertyAccessExpression(
                  _.createIdentifier('G'),
                  _.createIdentifier(primitiveModule[1])
                ),
                _.createCallExpression(
                  _.createPropertyAccessExpression(
                    _.createIdentifier('G'),
                    _.createIdentifier('refine')
                  ),
                  undefined,
                  [_.createIdentifier(`is${name}`)]
                ),
              ])
            ),
          ],
          ts.NodeFlags.Const
        )
      ),
      sinceAndCategory('Instances', packageVersion),
      _.createVariableStatement(
        [_.createModifier(ts.SyntaxKind.ExportKeyword)],
        _.createVariableDeclarationList(
          [
            _.createVariableDeclaration(
              _.createIdentifier('TaskDecoder'),
              undefined,
              _.createTypeReferenceNode(_.createIdentifier('SchemableParams2C'), [
                _.createTypeReferenceNode(
                  _.createQualifiedName(
                    _.createIdentifier('TD'),
                    _.createIdentifier('URI')
                  ),
                  undefined
                ),
              ]),
              _.createCallExpression(_.createIdentifier('pipe'), undefined, [
                _.createPropertyAccessExpression(
                  _.createIdentifier('TD'),
                  _.createIdentifier('string')
                ),
                _.createCallExpression(
                  _.createPropertyAccessExpression(
                    _.createIdentifier('TD'),
                    _.createIdentifier('refine')
                  ),
                  undefined,
                  [_.createIdentifier(`is${name}`), _.createStringLiteral(name)]
                ),
              ])
            ),
          ],
          ts.NodeFlags.Const
        )
      ),
      sinceAndCategory('Instances', packageVersion),
      _.createVariableStatement(
        [_.createModifier(ts.SyntaxKind.ExportKeyword)],
        _.createVariableDeclarationList(
          [
            _.createVariableDeclaration(
              _.createIdentifier('Type'),
              undefined,
              _.createTypeReferenceNode(_.createIdentifier('SchemableParams1'), [
                _.createTypeReferenceNode(
                  _.createQualifiedName(
                    _.createIdentifier('t'),
                    _.createIdentifier('URI')
                  ),
                  undefined
                ),
              ]),
              _.createCallExpression(_.createIdentifier('pipe'), undefined, [
                _.createPropertyAccessExpression(
                  _.createIdentifier('t'),
                  _.createIdentifier('string')
                ),
                _.createCallExpression(
                  _.createPropertyAccessExpression(
                    _.createIdentifier('t'),
                    _.createIdentifier('refine')
                  ),
                  undefined,
                  [_.createIdentifier(`is${name}`), _.createStringLiteral(name)]
                ),
              ])
            ),
          ],
          ts.NodeFlags.Const
        )
      ),
    ],
    _.createNodeArray,
    nodes => printer.printList(ts.ListFormat.MultiLine, nodes, sourceFile),
    Str.replace(/\/\*\*/gm, '\n/**')
  )
}

const PackageJson = SC.make(S =>
  S.struct({
    version: S.string,
  })
)

const decodePackageJson = SC.interpreter(D.Schemable)(PackageJson)

const getPackageJson: Build<SC.TypeOf<typeof PackageJson>> = C =>
  pipe(
    C.readFile('package.json'),
    TE.chainEitherK(
      flow(
        Json.parse,
        E.mapLeft(() => new Error('Unable to parse package.json'))
      )
    ),
    TE.chainEitherKW(
      flow(
        decodePackageJson.decode,
        E.mapLeft(() => new Error('Package.json does not match expected shape'))
      )
    )
  )

const checkModuleUniqueness: (module: string) => Build<ReadonlyArray<string>> =
  module => C =>
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
      ),
      TE.map(({ date, number, string }) => [...date, ...number, ...string]),
      TE.filterOrElse(
        flow(
          RA.findFirst(
            existingModule => Str.toLowerCase(existingModule) === Str.toLowerCase(module)
          ),
          O.isNone
        ),
        () => new Error(`Module ${module} already exists`)
      )
    )

const writeToDisk: (path: string) => (contents: string) => Build<void> =
  path => contents => C =>
    C.writeFile(path, contents)

const format: Build<void> = C => C.exec('yarn format')

const main: Build<void> = pipe(
  process.argv,
  RA.dropLeft(2),
  RTE.fromPredicate(
    (args): args is [string, string] => args.length === 2,
    () =>
      new Error(
        'Must provide primitive type (string | number), and capitalized module name (SafeDate)'
      )
  ),
  RTE.filterOrElse(
    (args): args is ['string' | 'number', string] =>
      args[0] === 'string' || args[0] === 'number',
    () => new Error('Primitive must be one of "string", or "number"')
  ),
  RTE.filterOrElse(
    ([, module]) => /^[A-Z]/g.test(module),
    () => new Error('Module name must be capitalized')
  ),
  RTE.bindTo('args'),
  RTE.chainFirstIOK(() => Cons.log("Checking that module doesn't already exist...")),
  RTE.chainFirst(({ args: [, module] }) => checkModuleUniqueness(module)),
  RTE.chainFirstIOK(() => Cons.log('Getting package version...')),
  RTE.bind('packageVersion', () => getPackageJson),
  RTE.chainFirstIOK(({ args: [, module] }) => Cons.log(`Generating ${module}.ts...`)),
  RTE.bind(
    'moduleContents',
    ({ args: [primitive, module], packageVersion: { version } }) =>
      RTE.of(makeCombinatorModule(primitive, module, version))
  ),
  RTE.chainFirstIOK(({ args: [primitive, module] }) =>
    Cons.log(`Writing ${primitive}/${module}.ts to disk`)
  ),
  RTE.chain(({ args: [primitive, module], moduleContents }) =>
    pipe(moduleContents, writeToDisk(`./src/${primitive}/${module}.ts`))
  ),
  RTE.chainFirstIOK(() => Cons.log('Formatting with Prettier...')),
  RTE.chainFirst(() => format),
  RTE.chainFirstIOK(() => Cons.log('Done!'))
)

run(
  main({
    ...fileSystem,
    ...cli,
  })
)
