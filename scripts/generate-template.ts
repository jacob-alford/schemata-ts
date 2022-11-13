import * as ts from 'typescript'
import * as Cons from 'fp-ts/Console'
import * as Color from 'colorette'
import { flow, pipe } from 'fp-ts/function'
import { draw as drawDecodeError } from 'io-ts/Decoder'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RTE from 'fp-ts/ReaderTaskEither'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as Str from 'fp-ts/string'
import * as Json from 'fp-ts/Json'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import { fileSystem } from './FS'
import { cli } from './CLI'
import { run } from './run'
import { makeDestructureImport, makeModuleStarImport } from './ts-helpers'
import { D, SC } from '../src/.'
import { checkTestModuleUniqueness, makeTestFile } from './generator-helpers'
import { Build } from './build'

const _ = ts.factory

const sinceAndCategory: (category: string, version: string) => ts.JSDoc = (
  category,
  version,
) => _.createJSDocComment(`@since ${version}\n\n@category ${category}`)

const capitalize: (s: string) => string = s =>
  `${Str.toUpperCase(s.slice(0, 1))}${s.slice(1, s.length)}`

const makeCombinatorModule: (
  primitive: 'string' | 'number',
  name: string,
  packageVersion: string,
) => string = (primitive, name, packageVersion) => {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
  const sourceFile = ts.createSourceFile(
    `${module}.ts`,
    '',
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS,
  )

  const primitiveModule: [string, string, number, string] =
    primitive === 'string'
      ? ['Str', 'string', ts.SyntaxKind.StringKeyword, 's']
      : ['N', 'number', ts.SyntaxKind.NumberKeyword, 'n']

  return pipe(
    [
      _.createJSDocComment(`TODO: Add module comment\n\n@since ${packageVersion}`),
      makeDestructureImport(['Kind', 'Kind2', 'URIS', 'URIS2', 'HKT2'], 'fp-ts/HKT'),
      makeModuleStarImport('D', 'io-ts/Decoder'),
      makeModuleStarImport('Enc', 'io-ts/Encoder'),
      makeModuleStarImport('Eq_', 'fp-ts/Eq'),
      makeModuleStarImport('G', 'io-ts/Guard'),
      makeModuleStarImport(primitiveModule[0], `fp-ts/${primitiveModule[1]}`),
      makeModuleStarImport('TD', 'io-ts/TaskDecoder'),
      makeModuleStarImport('t', 'io-ts/Type'),
      makeModuleStarImport('Arb', '../internal/ArbitraryBase'),
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
              _.createKeywordTypeNode(ts.SyntaxKind.SymbolKeyword),
            ),
          ),
        ],
      ),
      _.createJSDocComment(
        `TODO: Add module comment\n\n@since ${packageVersion}\n@category Model`,
      ),
      _.createTypeAliasDeclaration(
        [_.createModifier(ts.SyntaxKind.ExportKeyword)],
        _.createIdentifier(name),
        undefined,
        _.createIntersectionTypeNode([
          _.createKeywordTypeNode(primitiveModule[2]),
          _.createTypeReferenceNode(_.createIdentifier(`${name}Brand`), undefined),
        ]),
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
            undefined,
          ),
        ],
        _.createTypeReferenceNode(_.createIdentifier('HKT2'), [
          _.createTypeReferenceNode(_.createIdentifier('S'), undefined),
          _.createTypeReferenceNode(_.createIdentifier(primitive), undefined),
          _.createTypeReferenceNode(_.createIdentifier(name), undefined),
        ]),
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
            undefined,
          ),
        ],
        _.createTypeReferenceNode(_.createIdentifier('Kind'), [
          _.createTypeReferenceNode(_.createIdentifier('S'), undefined),
          _.createTypeReferenceNode(_.createIdentifier(name), undefined),
        ]),
      ),
      sinceAndCategory('Model', packageVersion),
      _.createTypeAliasDeclaration(
        [_.createModifier(ts.SyntaxKind.ExportKeyword)],
        _.createIdentifier('SchemableParams2'),
        [
          _.createTypeParameterDeclaration(
            undefined,
            _.createIdentifier('S'),
            _.createTypeReferenceNode(_.createIdentifier('URIS2'), undefined),
            undefined,
          ),
        ],
        _.createTypeReferenceNode(_.createIdentifier('Kind2'), [
          _.createTypeReferenceNode(_.createIdentifier('S'), undefined),
          _.createTypeReferenceNode(_.createIdentifier(primitive), undefined),
          _.createTypeReferenceNode(_.createIdentifier(name), undefined),
        ]),
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
            undefined,
          ),
        ],
        _.createTypeReferenceNode(_.createIdentifier('Kind2'), [
          _.createTypeReferenceNode(_.createIdentifier('S'), undefined),
          _.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword),
          _.createTypeReferenceNode(_.createIdentifier(name), undefined),
        ]),
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
                    _.createIdentifier(primitiveModule[3]),
                    undefined,
                    _.createKeywordTypeNode(primitiveModule[2]),
                    undefined,
                  ),
                ],
                _.createTypePredicateNode(
                  undefined,
                  primitiveModule[3],
                  _.createTypeReferenceNode(name),
                ),
                _.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                _.createBlock(
                  [
                    _.createThrowStatement(
                      _.createNewExpression(_.createIdentifier('Error'), undefined, [
                        _.createStringLiteral('not implemented'),
                      ]),
                    ),
                  ],
                  true,
                ),
              ),
            ),
          ],
          ts.NodeFlags.Const,
        ),
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
                    _.createIdentifier('URI'),
                  ),
                  undefined,
                ),
              ]),
              _.createCallExpression(_.createIdentifier('pipe'), undefined, [
                _.createPropertyAccessExpression(
                  _.createIdentifier('D'),
                  _.createIdentifier(primitiveModule[1]),
                ),
                _.createCallExpression(
                  _.createPropertyAccessExpression(
                    _.createIdentifier('D'),
                    _.createIdentifier('refine'),
                  ),
                  undefined,
                  [_.createIdentifier(`is${name}`), _.createStringLiteral(name)],
                ),
              ]),
            ),
          ],
          ts.NodeFlags.Const,
        ),
      ),
      sinceAndCategory('Instances', packageVersion),
      _.createVariableStatement(
        [_.createModifier(ts.SyntaxKind.ExportKeyword)],
        _.createVariableDeclarationList(
          [
            _.createVariableDeclaration(
              _.createIdentifier('Encoder'),
              undefined,
              _.createTypeReferenceNode(_.createIdentifier('SchemableParams2'), [
                _.createTypeReferenceNode(
                  _.createQualifiedName(
                    _.createIdentifier('Enc'),
                    _.createIdentifier('URI'),
                  ),
                  undefined,
                ),
              ]),
              _.createCallExpression(
                _.createPropertyAccessExpression(
                  _.createIdentifier('Enc'),
                  _.createIdentifier('id'),
                ),
                undefined,
                [],
              ),
            ),
          ],
          ts.NodeFlags.Const,
        ),
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
                    _.createIdentifier('URI'),
                  ),
                  undefined,
                ),
              ]),
              _.createPropertyAccessExpression(
                _.createIdentifier(primitiveModule[0]),
                _.createIdentifier('Eq'),
              ),
            ),
          ],
          ts.NodeFlags.Const,
        ),
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
                    _.createIdentifier('URI'),
                  ),
                  undefined,
                ),
              ]),
              _.createCallExpression(_.createIdentifier('pipe'), undefined, [
                _.createPropertyAccessExpression(
                  _.createIdentifier('G'),
                  _.createIdentifier(primitiveModule[1]),
                ),
                _.createCallExpression(
                  _.createPropertyAccessExpression(
                    _.createIdentifier('G'),
                    _.createIdentifier('refine'),
                  ),
                  undefined,
                  [_.createIdentifier(`is${name}`)],
                ),
              ]),
            ),
          ],
          ts.NodeFlags.Const,
        ),
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
                    _.createIdentifier('URI'),
                  ),
                  undefined,
                ),
              ]),
              _.createCallExpression(_.createIdentifier('pipe'), undefined, [
                _.createPropertyAccessExpression(
                  _.createIdentifier('TD'),
                  _.createIdentifier(primitiveModule[1]),
                ),
                _.createCallExpression(
                  _.createPropertyAccessExpression(
                    _.createIdentifier('TD'),
                    _.createIdentifier('refine'),
                  ),
                  undefined,
                  [_.createIdentifier(`is${name}`), _.createStringLiteral(name)],
                ),
              ]),
            ),
          ],
          ts.NodeFlags.Const,
        ),
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
                    _.createIdentifier('URI'),
                  ),
                  undefined,
                ),
              ]),
              _.createCallExpression(_.createIdentifier('pipe'), undefined, [
                _.createPropertyAccessExpression(
                  _.createIdentifier('t'),
                  _.createIdentifier(primitiveModule[1]),
                ),
                _.createCallExpression(
                  _.createPropertyAccessExpression(
                    _.createIdentifier('t'),
                    _.createIdentifier('refine'),
                  ),
                  undefined,
                  [_.createIdentifier(`is${name}`), _.createStringLiteral(name)],
                ),
              ]),
            ),
          ],
          ts.NodeFlags.Const,
        ),
      ),
      sinceAndCategory('Instances', packageVersion),
      _.createVariableStatement(
        [_.createModifier(ts.SyntaxKind.ExportKeyword)],
        _.createVariableDeclarationList(
          [
            _.createVariableDeclaration(
              _.createIdentifier('Arbitrary'),
              undefined,
              _.createTypeReferenceNode(_.createIdentifier('SchemableParams1'), [
                _.createTypeReferenceNode(
                  _.createQualifiedName(
                    _.createIdentifier('Arb'),
                    _.createIdentifier('URI'),
                  ),
                  undefined,
                ),
              ]),
              _.createCallExpression(_.createIdentifier('pipe'), undefined, [
                _.createPropertyAccessExpression(
                  _.createIdentifier('Arb'),
                  _.createIdentifier(primitiveModule[1]),
                ),
                _.createCallExpression(
                  _.createPropertyAccessExpression(
                    _.createIdentifier('Arb'),
                    _.createIdentifier('refine'),
                  ),
                  undefined,
                  [_.createIdentifier(`is${name}`)],
                ),
              ]),
            ),
          ],
          ts.NodeFlags.Const,
        ),
      ),
    ],
    _.createNodeArray,
    nodes => printer.printList(ts.ListFormat.MultiLine, nodes, sourceFile),
    Str.replace(/\/\*\*/gm, '\n/**'),
  )
}

const PackageJson = SC.make(S =>
  S.struct({
    version: S.string,
  }),
)

const decodePackageJson = SC.interpreter(D.Schemable)(PackageJson)

const getPackageJson: Build<SC.TypeOf<typeof PackageJson>> = C =>
  pipe(
    C.readFile('package.json'),
    TE.chainEitherK(
      flow(
        Json.parse,
        E.mapLeft(() => new Error('Unable to parse package.json')),
      ),
    ),
    TE.chainEitherKW(
      flow(
        decodePackageJson.decode,
        E.mapLeft(() => new Error('Package.json does not match expected shape')),
      ),
    ),
  )

const checkModuleUniqueness: (module: string) => Build<ReadonlyArray<string>> =
  module => C =>
    pipe(
      TE.Do,
      TE.apS(
        'date',
        pipe(C.readFiles('./src/date'), TE.map(RA.map(flow(Str.split('.'), RNEA.head)))),
      ),
      TE.apS(
        'number',
        pipe(
          C.readFiles('./src/number'),
          TE.map(RA.map(flow(Str.split('.'), RNEA.head))),
        ),
      ),
      TE.apS(
        'string',
        pipe(
          C.readFiles('./src/string'),
          TE.map(RA.map(flow(Str.split('.'), RNEA.head))),
        ),
      ),
      TE.map(({ date, number, string }) => [...date, ...number, ...string]),
      TE.filterOrElse(
        flow(
          RA.findFirst(
            existingModule => Str.toLowerCase(existingModule) === Str.toLowerCase(module),
          ),
          O.isNone,
        ),
        () => new Error(`Module ${module} already exists`),
      ),
    )

const writeToDisk: (path: string) => (contents: string) => Build<void> =
  path => contents => C =>
    C.writeFile(path, contents)

const format: Build<void> = C => C.exec('yarn format')

const Args = SC.make(S => S.tuple(S.literal('string', 'number'), S.string))

const decodeArgs = SC.interpreter(D.Schemable)(Args)

const delay = (n: number) => () => pipe(T.of(void 0), T.delay(n))

const main: Build<void> = pipe(
  process.argv,
  RA.dropLeft(2),
  decodeArgs.decode,
  E.mapLeft(flow(drawDecodeError, E.toError)),
  RTE.fromEither,
  RTE.filterOrElse(
    ([, module]) => /^[a-z]/g.test(module),
    () => new Error('Module name must be lowercase'),
  ),
  RTE.bindTo('args'),
  RTE.chainFirstIOK(({ args: [primitive, module] }) =>
    Cons.log(
      Color.whiteBright(`\n\n💻 Generating ${Color.bold(module)} ${primitive} module`),
    ),
  ),
  RTE.chainFirstTaskK(delay(600)),
  RTE.chainFirstIOK(() =>
    Cons.log(Color.cyan("\n🔎 Checking that module doesn't already exist...")),
  ),
  RTE.chainFirstTaskK(delay(400)),
  RTE.chainFirst(({ args: [, module] }) => checkModuleUniqueness(module)),
  RTE.chainFirstIOK(() =>
    Cons.log(Color.cyan("🔎 Checking that test module doesn't already exist...")),
  ),
  RTE.chainFirstTaskK(delay(400)),
  RTE.chainFirst(({ args: [, module] }) => checkTestModuleUniqueness(module)),
  RTE.chainFirstIOK(() => Cons.log(Color.cyan('\n📦 Getting package version...'))),
  RTE.chainFirstTaskK(delay(400)),
  RTE.apS('packageVersion', getPackageJson),
  RTE.chainFirstIOK(({ args: [, module] }) =>
    Cons.log(Color.cyan(`\n🖊️  Generating ${module}...`)),
  ),
  flow(
    RTE.chainFirstTaskK(delay(400)),

    RTE.bind(
      'moduleContents',
      ({ args: [primitive, module], packageVersion: { version } }) =>
        RTE.of(makeCombinatorModule(primitive, capitalize(module), version)),
    ),
    RTE.chainFirstIOK(({ args: [, module] }) =>
      Cons.log(Color.cyan(`🖊️  Generating ${module} test file...`)),
    ),
    RTE.chainFirstTaskK(delay(400)),
    RTE.bind('testModuleContents', ({ args: [primitive, module] }) =>
      RTE.of(makeTestFile(primitive, module)),
    ),
    RTE.chainFirstIOK(({ args: [primitive, module] }) =>
      Cons.log(Color.cyan(`\n💾 Writing ./src/${primitive}/${module}.ts to disk`)),
    ),
    RTE.chainFirstTaskK(delay(400)),
    flow(
      RTE.chainFirst(({ args: [primitive, module], moduleContents }) =>
        pipe(moduleContents, writeToDisk(`./src/${primitive}/${module}.ts`)),
      ),
      RTE.chainFirstIOK(({ args: [primitive, module] }) =>
        Cons.log(Color.cyan(`💾 Writing ./tests/${primitive}/${module}.test.ts to disk`)),
      ),
      RTE.chainFirstTaskK(delay(400)),
      RTE.chain(({ args: [primitive, module], testModuleContents }) =>
        pipe(testModuleContents, writeToDisk(`./tests/${primitive}/${module}.test.ts`)),
      ),
      RTE.chainFirstIOK(() => Cons.log(Color.cyan('\n💅 Formatting with Prettier...'))),
      RTE.chainFirstTaskK(delay(400)),
      flow(
        RTE.chainFirst(() => format),
        RTE.chainFirstIOK(() => Cons.log(Color.green('\n\nDone!'))),
      ),
    ),
  ),
)

run(
  main({
    ...fileSystem,
    ...cli,
  }),
)
