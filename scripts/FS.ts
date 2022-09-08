import * as TE from 'fp-ts/TaskEither'
import * as T from 'fp-ts/Task'
import { flow } from 'fp-ts/function'
import * as fs from 'fs'
import G from 'glob'

export interface FileSystem {
  readonly exists: (path: string) => T.Task<boolean>
  readonly readFile: (path: string) => TE.TaskEither<Error, string>
  readonly writeFile: (path: string, content: string) => TE.TaskEither<Error, void>
  readonly copyFile: (from: string, to: string) => TE.TaskEither<Error, void>
  readonly glob: (pattern: string) => TE.TaskEither<Error, ReadonlyArray<string>>
  readonly mkdir: (path: string) => TE.TaskEither<Error, void>
  readonly moveFile: (from: string, to: string) => TE.TaskEither<Error, void>
}

const readFile = TE.taskify<
  fs.PathLike,
  { encoding: BufferEncoding },
  NodeJS.ErrnoException,
  string
>((path, options, callback) => fs.readFile(path, options, callback))
const writeFile = TE.taskify<fs.PathLike, string, NodeJS.ErrnoException, void>(
  fs.writeFile
)
const copyFile = TE.taskify<fs.PathLike, fs.PathLike, NodeJS.ErrnoException, void>(
  fs.copyFile
)
const glob = TE.taskify<string, Error, ReadonlyArray<string>>(G)
const mkdirTE = TE.taskify(fs.mkdir)
const moveFile = TE.taskify<fs.PathLike, fs.PathLike, NodeJS.ErrnoException, void>(
  fs.rename
)
const access = TE.taskify(fs.access)

export const fileSystem: FileSystem = {
  exists: flow(
    access,
    TE.match(
      () => false,
      () => true
    )
  ),
  readFile: path => readFile(path, { encoding: 'utf-8' }),
  writeFile,
  copyFile,
  glob,
  mkdir: flow(
    mkdirTE,
    TE.map(() => undefined)
  ),
  moveFile,
}
