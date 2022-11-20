import * as Cons from 'fp-ts/Console'
// import * as Color from 'colorette'
import {
  unsafeCoerce,
  flow,
  // identity,
  pipe,

  // tuple
} from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RTE from 'fp-ts/ReaderTaskEither'
import * as Str from 'fp-ts/string'
import * as TE from 'fp-ts/TaskEither'
import { fileSystem } from './FS'
import { cli } from './CLI'
import { run } from './run'
import { Build } from './build'

const stripExtension: (s: `With${string}`) => `With${string}` = unsafeCoerce(
  Str.slice(0, -3),
)

type SchemableFiles =
  | 'arbitrary'
  | 'decoder'
  | 'encoder'
  | 'eq'
  | 'guard'
  | 'schema'
  | 'task-decoder'
  | 'type'

const schemableFiles: ReadonlyArray<SchemableFiles> = [
  'arbitrary',
  'decoder',
  'encoder',
  'eq',
  'guard',
  'schema',
  'task-decoder',
  'type',
]

const prepareContents: (repeat: number, s: string) => string = (repeat, s) =>
  s.replace(/'\.\.\//gm, `'${'../'.repeat(repeat)}`)

const getSchemables: Build<ReadonlyArray<`With${string}`>> = C =>
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
              prepareContents(2, contents),
            ),
          ),
          TE.chainFirst(() =>
            pipe(
              schemableFiles,
              TE.traverseArray(file =>
                C.writeFile(
                  `./src/schemables/${module}/instances/${file}.ts`,
                  prepareContents(3, contents),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
    TE.map(RA.map(({ module }) => module)),
  )

const main: Build<void> = pipe(getSchemables, RTE.chainIOK(Cons.log))

run(
  main({
    ...fileSystem,
    ...cli,
  }),
)
