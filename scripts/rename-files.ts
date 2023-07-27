import { paramCase } from 'change-case'
import * as Color from 'colorette'
import * as Cons from 'fp-ts/Console'
import { pipe } from 'fp-ts/function'
import * as RTE from 'fp-ts/ReaderTaskEither'
import * as RA from 'fp-ts/ReadonlyArray'
import * as TE from 'fp-ts/TaskEither'

import { type Build } from './build'
import { cli } from './CLI'
import { fileSystem } from './FS'
import { run } from './run'

type Directory = string

const renameDir: (s: string) => string = s => paramCase(s.replace(/^With(.*)$/, '$1'))

const getDirectories: (subdir: string) => Build<ReadonlyArray<Directory>> = subdir => C =>
  pipe(
    TE.Do,
    TE.chainFirstIOK(() => Cons.log(`Checking ${subdir} for schemables...`)),
    TE.chain(() => C.readDirs(`./${subdir}`)),
  )

const renameSchemable: (subdir: string) => (dir: Directory) => Build<void> =
  subdir => dir => C =>
    pipe(
      C.exec(`git mv ./${subdir}/${dir} ./${subdir}/${renameDir(dir)}`),
      TE.chainFirstIOK(() =>
        Cons.log(
          Color.green(`✔️ Renamed ${subdir}/${dir} to ${subdir}/${renameDir(dir)}`),
        ),
      ),
    )

const main: Build<void> = pipe(
  RTE.Do,
  RTE.apS('directories', getDirectories('src/schemables')),
  RTE.chainFirst(({ directories }) =>
    pipe(directories, RA.traverse(RTE.ApplicativeSeq)(renameSchemable('src/schemables'))),
  ),
  RTE.chainIOK(() => Cons.log(Color.green('Done!'))),
)

run(
  main({
    ...fileSystem,
    ...cli,
  }),
)
