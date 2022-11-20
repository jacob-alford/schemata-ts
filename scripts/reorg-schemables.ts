import * as Cons from 'fp-ts/Console'
// import * as Color from 'colorette'
import {
  unsafeCoerce,
  flow,
  // identity,
  pipe,

  // tuple
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

const stripExtension: (s: `With${string}`) => `With${string}` = unsafeCoerce(
  Str.slice(0, -3),
)

type SchemableInstance<L, U> = readonly [lowercaseName: L, uppercaseName: U]

type SchemableFiles =
  | SchemableInstance<'arbitrary', 'Arbitrary'>
  | SchemableInstance<'decoder', 'Decoder'>
  | SchemableInstance<'encoder', 'Encoder'>
  | SchemableInstance<'eq', 'Eq'>
  | SchemableInstance<'guard', 'Guard'>
  | SchemableInstance<'schema', 'Schema'>
  | SchemableInstance<'task-decoder', 'TaskDecoder'>
  | SchemableInstance<'type', 'Type'>

const schemableFiles: ReadonlyArray<SchemableFiles> = [
  ['arbitrary', 'Arbitrary'],
  ['decoder', 'Decoder'],
  ['encoder', 'Encoder'],
  ['eq', 'Eq'],
  ['guard', 'Guard'],
  ['schema', 'Schema'],
  ['task-decoder', 'TaskDecoder'],
  ['type', 'Type'],
]

const correctRelativeImports: (repeat: number, s: string) => string = (repeat, s) =>
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

const getSchemables: Build<ReadonlyArray<File>> = C =>
  pipe(
    C.readFiles('./src/schemables'),
    TE.chain(
      RA.wither(TE.ApplicativePar)(
        flow(
          TE.of,
          TE.bindTo('module'),
          TE.bind('isDirectory', ({ module }) =>
            C.isDirectory(`./src/schemables/${module}`),
          ),
          TE.bind('contents', ({ module, isDirectory }) =>
            !isDirectory
              ? pipe(C.readFile(`./src/schemables/${module}`), TE.map(O.some))
              : TE.of(O.none),
          ),
          TE.map(({ module, contents }) =>
            pipe(
              contents,
              O.bindTo('contents'),
              O.bind('module', () =>
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
    TE.chainFirst(
      TE.traverseArray(({ module, contents }) =>
        pipe(
          C.mkdir(`./src/schemables/${module}`),
          TE.chainFirst(() => C.mkdir(`./src/schemables/${module}/instances`)),
          TE.chainFirst(() =>
            C.writeFile(
              `./src/schemables/${module}/definition.ts`,
              correctRelativeImports(2, contents),
            ),
          ),
          TE.chainFirst(() =>
            pipe(
              schemableFiles,
              TE.traverseArray(([file]) =>
                C.writeFile(
                  `./src/schemables/${module}/instances/${file}.ts`,
                  correctRelativeImports(3, contents),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
    TE.map(RA.filterMap(({ contents }) => pipe(contents, Str.split('\n'), pluckImports))),
  )

const main: Build<void> = pipe(getSchemables, RTE.chainIOK(Cons.log))

run(
  main({
    ...fileSystem,
    ...cli,
  }),
)
