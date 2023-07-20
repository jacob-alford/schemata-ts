import { pipe } from 'fp-ts/function'
import type * as RTE from 'fp-ts/ReaderTaskEither'
import * as TE from 'fp-ts/TaskEither'
import path from 'path'

import { type CLI, cli } from './CLI'
import { type FileSystem, fileSystem } from './FS'
import { run } from './run'

interface Build<A> extends RTE.ReaderTaskEither<CLI & FileSystem, Error, A> {}

const packDocks: Build<void> = _ =>
  pipe(
    TE.Do,
    TE.chainFirst(() => _.upsertDir(path.resolve('./docs/schemata'))),
    TE.chainFirst(() =>
      _.exec(`mv ${path.resolve('./docs/modules')}/* ${path.resolve('./docs')}`),
    ),
    TE.chainFirst(() => _.exec(`rm -rf ${path.resolve('./docs/modules')}`)),
    TE.chainFirst(() =>
      pipe(
        _.readFile(path.resolve('./README.md')),
        TE.chain(file =>
          _.writeFile(
            path.resolve('./docs/index.md'),
            `---
title: Home
permalink: /
has_children: false
nav_order: 1
---\n\n${file}`,
          ),
        ),
      ),
    ),
    TE.asUnit,
  )

run(
  packDocks({
    ...cli,
    ...fileSystem,
  }),
)
