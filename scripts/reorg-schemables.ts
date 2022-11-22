import * as ts from 'typescript'
import * as Cons from 'fp-ts/Console'
// import * as Color from 'colorette'
import {
  unsafeCoerce,
  flow,
  // identity,
  pipe,
  tuple,
} from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RTE from 'fp-ts/ReaderTaskEither'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as Str from 'fp-ts/string'
import * as TE from 'fp-ts/TaskEither'
import { tailRec } from 'fp-ts/ChainRec'
import { fileSystem } from './FS'
import { cli } from './CLI'
import { run } from './run'
import { Build } from './build'

const _ = ts.factory

const stripExtension: (s: `With${string}`) => `With${string}` = unsafeCoerce(
  Str.slice(0, -3),
)

type SchemableInstance<L, U> = readonly [lowercaseName: L, uppercaseName: U]

type SchemableInstances =
  | SchemableInstance<'arbitrary', 'Arbitrary'>
  | SchemableInstance<'decoder', 'Decoder'>
  | SchemableInstance<'encoder', 'Encoder'>
  | SchemableInstance<'eq', 'Eq'>
  | SchemableInstance<'guard', 'Guard'>
  | SchemableInstance<'schema', 'Schema'>
  | SchemableInstance<'task-decoder', 'TaskDecoder'>
  | SchemableInstance<'type', 'Type'>

const schemableInstances: ReadonlyArray<SchemableInstances> = [
  ['arbitrary', 'Arbitrary'],
  ['decoder', 'Decoder'],
  ['encoder', 'Encoder'],
  ['eq', 'Eq'],
  ['guard', 'Guard'],
  ['schema', 'Schema'],
  ['task-decoder', 'TaskDecoder'],
  ['type', 'Type'],
]

const correctRelativeImports: (repeat: number) => (s: string) => string = repeat => s =>
  s.replace(/'\.\.\//gm, `'${'../'.repeat(repeat)}`)

type File = RNEA.ReadonlyNonEmptyArray<string>

const pluckImports: (file: File) => O.Option<File> = file => {
  type Params = {
    readonly file: File
    readonly cursor: number
    readonly out: ReadonlyArray<string>
  }

  const go: (params: Params) => E.Either<Params, O.Option<File>> = ({
    file,
    cursor,
    out,
  }) =>
    pipe(file, RA.lookup(cursor), line =>
      O.isNone(line)
        ? E.right(O.none)
        : line.value === ''
        ? E.right(RNEA.fromReadonlyArray(out))
        : E.left({
            file,
            cursor: cursor + 1,
            out: [...out, line.value],
          }),
    )

  return tailRec({ file, cursor: 0, out: [] }, go)
}

const pluckInstance: (
  file: File,
) => (instance: SchemableInstances[1]) => O.Option<File> = file => instance => {
  type Params = {
    readonly hasEncounteredInstance: boolean
    readonly file: File
    readonly cursor: number
    readonly out: ReadonlyArray<string>
  }

  const go: (params: Params) => E.Either<Params, O.Option<File>> = ({
    hasEncounteredInstance,
    file,
    cursor,
    out,
  }) =>
    pipe(file, RA.lookup(cursor), line => {
      /* Stream ended */
      if (O.isNone(line)) return E.right(O.none)

      /* Instance has been exhausted */
      if (hasEncounteredInstance && line.value === '')
        return E.right(RNEA.fromReadonlyArray(out))

      /* If instance has just been encountered */
      if (line.value.startsWith(`export const ${instance}`))
        return E.left({
          hasEncounteredInstance: true,
          file,
          cursor: cursor + 1,
          out: ['/**', ' * @since 1.0.0', ' * @category Instances', ' */', line.value],
        })

      /* Instance is accumulating */
      if (hasEncounteredInstance)
        return E.left({
          hasEncounteredInstance,
          file,
          cursor: cursor + 1,
          out: [...out, line.value],
        })

      /* Instance has not been encountered */
      return E.left({
        hasEncounteredInstance,
        file,
        cursor: cursor + 1,
        out,
      })
    })

  return tailRec({ hasEncounteredInstance: false, file, cursor: 0, out: [] }, go)
}

const pluckDefinition: (file: File) => O.Option<File> = file => {
  type Params = {
    readonly hasEncounteredHKT2: boolean
    readonly hasEncountered2C: boolean
    readonly file: File
    readonly cursor: number
    readonly out: ReadonlyArray<string>
  }

  const go: (params: Params) => E.Either<Params, O.Option<File>> = ({
    hasEncounteredHKT2,
    hasEncountered2C,
    file,
    cursor,
    out,
  }) =>
    pipe(file, RA.lookup(cursor), line => {
      /* Stream ended */
      if (O.isNone(line)) return E.right(O.none)

      /* Definitions have been exhausted */
      if (hasEncountered2C && line.value === '')
        return E.right(RNEA.fromReadonlyArray(out))

      /* If instance has just been encountered */
      if (!hasEncounteredHKT2 && line.value.startsWith(`export interface With`))
        return E.left({
          hasEncounteredHKT2: true,
          hasEncountered2C,
          file,
          cursor: cursor + 1,
          out: ['/**', ' * @since 1.0.0', ' * @category Model', ' */', line.value],
        })

      /* Final defintion has just been encountered */
      if (!hasEncountered2C && line.value.includes('2C<S extends URIS2'))
        return E.left({
          hasEncounteredHKT2,
          hasEncountered2C: true,
          file,
          cursor: cursor + 1,
          out: [...out, line.value],
        })

      /* Instance is accumulating */
      if (hasEncounteredHKT2)
        return E.left({
          hasEncounteredHKT2,
          hasEncountered2C,
          file,
          cursor: cursor + 1,
          out: [...out, line.value],
        })

      /* Instance has not been encountered */
      return E.left({
        hasEncounteredHKT2,
        hasEncountered2C,
        file,
        cursor: cursor + 1,
        out,
      })
    })

  return tailRec(
    {
      hasEncounteredHKT2: false,
      hasEncountered2C: false,
      file,
      cursor: 0,
      out: [],
    },
    go,
  )
}

type SchemableFile = {
  readonly module: `With${string}`
  readonly contents: File
}

const getSchemableFiles: Build<ReadonlyArray<SchemableFile>> = C =>
  pipe(
    C.readFiles('./src/schemables'),
    TE.chain(
      RA.wither(TE.ApplicativePar)(module =>
        pipe(
          C.isDirectory(`./src/schemables/${module}`),
          TE.chain(isDirectory =>
            !isDirectory
              ? pipe(C.readFile(`./src/schemables/${module}`), TE.map(O.some))
              : TE.of(O.none),
          ),
          TE.map(
            flow(
              O.map(Str.split('\n')),
              O.bindTo('contents'),
              O.apS(
                'module',
                pipe(
                  module,
                  O.fromPredicate((module): module is `With${string}` =>
                    module.startsWith('With'),
                  ),
                  O.map(stripExtension),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  )

type SchemableArtifacts = SchemableFile & {
  readonly imports: File
  readonly definition: File
  readonly instances: ReadonlyArray<readonly [SchemableInstances, File]>
}

const getSchemableArtifacts: (
  schemableFiles: ReadonlyArray<SchemableFile>,
) => Build<ReadonlyArray<SchemableArtifacts>> = schemableFiles => () =>
  pipe(
    schemableFiles,
    E.traverseArray(
      flow(
        E.right,
        E.bind('imports', ({ contents, module }) =>
          pipe(
            pluckImports(contents),
            E.fromOption(() => E.toError(`Could not extract imports from ${module}`)),
          ),
        ),
        E.bind('definition', ({ module, contents }) =>
          pipe(
            pluckDefinition(contents),
            E.fromOption(() => E.toError(`Could not extract definition for ${module}`)),
          ),
        ),
        E.bind('instances', ({ contents, module }) =>
          pipe(
            schemableInstances,
            E.traverseArray(instance =>
              pipe(
                instance[1],
                pluckInstance(contents),
                E.fromOption(() =>
                  E.toError(`Could not extract ${instance[1]} for ${module}`),
                ),
                E.map(file => tuple(instance, file)),
              ),
            ),
          ),
        ),
      ),
    ),
    TE.fromEither,
  )

const upsertSchemablesToDisk: (
  artifacts: ReadonlyArray<SchemableArtifacts>,
) => Build<void> = artifacts => C =>
  pipe(
    artifacts,
    TE.traverseArray(({ module, imports, definition, instances }) =>
      pipe(
        /* Ensure folder exists */
        C.upsertDir(`./src/schemables/${module}`),

        /* Ensure instances folder exists */
        TE.chain(() => C.upsertDir(`./src/schemables/${module}/instances`)),

        TE.chain(() =>
          /* Write definition */
          pipe(
            C.writeFile(
              `./src/schemables/${module}/definition.ts`,
              pipe(
                imports,
                RA.concat(definition),
                RA.foldMap(Str.Monoid)(line => `${line}\n`),
                correctRelativeImports(2),
              ),
            ),

            /* Write instances */
            TE.apFirst(
              pipe(
                instances,
                TE.traverseArray(([instanceFileName, instance]) =>
                  C.writeFile(
                    `./src/schemables/${module}/instances/${instanceFileName[0]}.ts`,
                    pipe(
                      imports,
                      RA.concat(instance),
                      RA.foldMap(Str.Monoid)(line => `${line}\n`),
                      correctRelativeImports(3),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
    TE.map(() => void 0),
  )

const makeExportsFile: (
  name: `With${string}`,
  instances: ReadonlyArray<SchemableInstances>,
) => string = name => {
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
      ...pipe(
        schemableInstances,
        RA.map(([instanceFileName, instance]) =>
          _.createExportDeclaration(
            undefined,
            false,
            _.createNamespaceExport(_.createIdentifier(instance)),
            _.createStringLiteral(
              `../src/schemables/${name}/instances/${instanceFileName}`,
            ),
            undefined,
          ),
        ),
      ),
    ],
    _.createNodeArray,
    nodes => printer.printList(ts.ListFormat.MultiLine, nodes, sourceFile),
    Str.replace(/\/\*\*/gm, '\n/**'),
    Str.replace(/export/gm, '\nexport'),
  )
}

const makeSchemableBarrelExports: (
  artifacts: ReadonlyArray<SchemableArtifacts>,
) => Build<void> = artifacts => C =>
  pipe(
    artifacts,
    TE.traverseArray(({ module, instances }) =>
      pipe(
        C.writeFile(
          `./tests/schemable-exports/${module}.ts`,
          makeExportsFile(
            module,
            pipe(
              instances,
              RA.map(([instance]) => instance),
            ),
          ),
        ),
      ),
    ),
    TE.map(() => void 0),
  )

const main: Build<void> = pipe(
  getSchemableFiles,
  RTE.chain(getSchemableArtifacts),
  RTE.chainFirst(upsertSchemablesToDisk),
  RTE.chainFirst(makeSchemableBarrelExports),
  RTE.map(RA.foldMap(Str.Monoid)(({ module }) => `Wrote ${module} artifacts.\n`)),
  RTE.chainIOK(Cons.log),
)

run(
  main({
    ...fileSystem,
    ...cli,
  }),
)
