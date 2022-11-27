import * as Cons from 'fp-ts/Console'
import { flow, pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import * as fs from 'fs'
import G from 'glob'

export interface FileSystem {
  readonly exists: (path: string) => T.Task<boolean>
  readonly readDirs: (path: string) => TE.TaskEither<Error, ReadonlyArray<string>>
  readonly readFile: (path: string) => TE.TaskEither<Error, string>
  readonly readFiles: (path: string) => TE.TaskEither<Error, ReadonlyArray<string>>
  readonly writeFile: (path: string, content: string) => TE.TaskEither<Error, void>
  readonly copyFile: (from: string, to: string) => TE.TaskEither<Error, void>
  readonly glob: (pattern: string) => TE.TaskEither<Error, ReadonlyArray<string>>
  readonly mkdir: (path: string) => TE.TaskEither<Error, void>
  readonly upsertDir: (path: string) => TE.TaskEither<Error, void>
  readonly moveFile: (from: string, to: string) => TE.TaskEither<Error, void>
  readonly isDirectory: (file: string) => TE.TaskEither<Error, boolean>
}

const readDirs = TE.taskify<
  fs.PathLike,
  { encoding: BufferEncoding; withFileTypes: true },
  NodeJS.ErrnoException,
  ReadonlyArray<fs.Dirent>
>(fs.readdir)

const readFiles = TE.taskify<
  fs.PathLike,
  { encoding: BufferEncoding; withFileTypes: false | undefined },
  NodeJS.ErrnoException,
  ReadonlyArray<string>
>(fs.readdir)

const readFile = TE.taskify<
  fs.PathLike,
  { encoding: BufferEncoding },
  NodeJS.ErrnoException,
  string
>((path, options, callback) => fs.readFile(path, options, callback))
const writeFile = TE.taskify<fs.PathLike, string, NodeJS.ErrnoException, void>(
  fs.writeFile,
)
const copyFile = TE.taskify<fs.PathLike, fs.PathLike, NodeJS.ErrnoException, void>(
  fs.copyFile,
)
const glob = TE.taskify<string, Error, ReadonlyArray<string>>(G)
const mkdirTE = TE.taskify(fs.mkdir)
const moveFile = TE.taskify<fs.PathLike, fs.PathLike, NodeJS.ErrnoException, void>(
  fs.rename,
)
const access = TE.taskify(fs.access)

const isDirectory = flow(
  TE.taskify<fs.PathLike, NodeJS.ErrnoException, fs.Stats>(fs.stat),
  TE.map(stat => stat.isDirectory()),
)

export const fileSystem: FileSystem = {
  isDirectory,
  exists: flow(
    access,
    TE.match(
      () => false,
      () => true,
    ),
  ),
  readDirs: path =>
    pipe(
      readDirs(path, { encoding: 'utf-8', withFileTypes: true }),
      TE.map(
        flow(
          RA.filterMap(dir =>
            pipe(
              dir,
              O.fromPredicate(dir => dir.isDirectory()),
              O.map(dir => dir.name),
            ),
          ),
        ),
      ),
    ),
  readFile: path => readFile(path, { encoding: 'utf-8' }),
  readFiles: path => readFiles(path, { encoding: 'utf-8', withFileTypes: false }),
  writeFile,
  copyFile,
  glob,
  mkdir: flow(
    mkdirTE,
    TE.map(() => undefined),
  ),
  upsertDir: flow(
    mkdirTE,
    TE.map(() => void 0),
    TE.alt(() => TE.right(void 0)),
  ),
  moveFile,
}

export const fileSystemTest: FileSystem = {
  isDirectory: () => TE.right(false),
  exists: flow(
    Cons.log,
    T.fromIO,
    T.map(() => true),
  ),
  readDirs: flow(
    Cons.log,
    TE.fromIO,
    TE.bimap(
      e => new Error(String(e)),
      () => [],
    ),
  ),
  readFile: flow(
    Cons.log,
    TE.fromIO,
    TE.bimap(
      e => new Error(String(e)),
      () => '',
    ),
  ),
  readFiles: flow(
    Cons.log,
    TE.fromIO,
    TE.bimap(
      e => new Error(String(e)),
      () => ['ASCII.ts', 'ASCII.test.ts'],
    ),
  ),
  writeFile: flow(
    Cons.log,
    TE.fromIO,
    TE.bimap(
      e => new Error(String(e)),
      () => void 0,
    ),
  ),
  copyFile: flow(
    Cons.log,
    TE.fromIO,
    TE.bimap(
      e => new Error(String(e)),
      () => void 0,
    ),
  ),
  glob: flow(
    Cons.log,
    TE.fromIO,
    TE.bimap(
      e => new Error(String(e)),
      () => [],
    ),
  ),
  mkdir: flow(
    Cons.log,
    TE.fromIO,
    TE.bimap(
      e => new Error(String(e)),
      () => void 0,
    ),
  ),
  upsertDir: flow(
    Cons.log,
    TE.fromIO,
    TE.bimap(
      e => new Error(String(e)),
      () => void 0,
    ),
  ),
  moveFile: flow(
    Cons.log,
    TE.fromIO,
    TE.bimap(
      e => new Error(String(e)),
      () => void 0,
    ),
  ),
}
