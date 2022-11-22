import * as D from '../src/Decoder'
import * as SC from '../src/SchemaExt'
import * as Cons from 'fp-ts/Console'
import * as E from 'fp-ts/Either'
import * as RTE from 'fp-ts/ReaderTaskEither'
import * as RA from 'fp-ts/ReadonlyArray'
import { CLI, cli } from './CLI'
import { FileSystem, fileSystem } from './FS'
import { checkTestModuleUniqueness, makeTestFile } from './generator-helpers'
import { run } from './run'
import { pipe } from 'fp-ts/function'

interface Build<A> extends RTE.ReaderTaskEither<FileSystem & CLI, Error, A> {}

const writeToDisk: (path: string) => (contents: string) => Build<void> =
  path => contents => C =>
    C.writeFile(path, contents)

const format: Build<void> = C => C.exec('yarn format')

const Args = SC.make(S => S.tuple(S.literal('string', 'number'), S.string))

const decodeArgs = SC.interpreter(D.Schemable)(Args)

const main: Build<void> = pipe(
  process.argv,
  RA.dropLeft(2),
  decodeArgs.decode,
  E.mapLeft(E.toError),
  RTE.fromEither,
  RTE.filterOrElse(
    ([, module]) => /^[A-Z]/g.test(module),
    () => new Error('Module name must be capitalized'),
  ),
  RTE.bindTo('args'),
  RTE.chainFirstIOK(({ args: [, module] }) =>
    Cons.log(`Checking that ${module} doesn't already exist...`),
  ),
  RTE.chainFirst(({ args: [, module] }) => checkTestModuleUniqueness(module)),
  RTE.chainFirstIOK(({ args: [, module] }) =>
    Cons.log(`Generating ${module}.test.ts...`),
  ),
  RTE.bind('moduleContents', ({ args: [primitive, module] }) =>
    RTE.of(makeTestFile(primitive, module)),
  ),
  RTE.chainFirstIOK(({ args: [primitive, module] }) =>
    Cons.log(`Writing ${primitive}/${module}.test.ts to disk`),
  ),
  RTE.chain(({ args: [primitive, module], moduleContents }) =>
    pipe(moduleContents, writeToDisk(`./tests/${primitive}/${module}.test.ts`)),
  ),
  RTE.chainFirstIOK(() => Cons.log('Formatting with Prettier...')),
  RTE.apFirst(format),
  RTE.chainFirstIOK(() => Cons.log('Done!')),
)

run(
  main({
    ...fileSystem,
    ...cli,
  }),
)
