import * as ts from 'typescript'
import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'

const _ = ts.factory

export const makeModuleStarImport: (
  name: string,
  path: string,
) => ts.ImportDeclaration = (name, path) =>
  _.createImportDeclaration(
    undefined,
    _.createImportClause(
      false,
      undefined,
      _.createNamespaceImport(_.createIdentifier(name)),
    ),
    _.createStringLiteral(path),
    undefined,
  )

export const makeDestructureImport: (
  destructuredElements: ReadonlyArray<string>,
  path: string,
) => ts.ImportDeclaration = (destructuredElements, path) =>
  _.createImportDeclaration(
    undefined,
    _.createImportClause(
      false,
      undefined,
      _.createNamedImports(
        pipe(
          destructuredElements,
          RA.map(el => _.createImportSpecifier(false, undefined, _.createIdentifier(el))),
        ),
      ),
    ),
    _.createStringLiteral(path),
    undefined,
  )
