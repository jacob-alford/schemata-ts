import * as Cons from 'fp-ts/Console'
import * as E from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/function'
import * as J from 'fp-ts/Json'
import * as RTE from 'fp-ts/ReaderTaskEither'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import * as path from 'path'

import { type CLI, cli } from './CLI'
import { type FileSystem, fileSystem } from './FS'
import { run } from './run'

interface Build<A> extends RTE.ReaderTaskEither<FileSystem & CLI, Error, A> {}

export const checkDist: Build<void> = C =>
  pipe(
    C.exists('dist'),
    T.chain(exists => (exists ? C.exec('rm -rf dist') : TE.of(undefined))),
    TE.chain(() => C.mkdir('dist')),
  )

export const copyPackageJson: Build<void> = C =>
  pipe(
    C.readFile('./package.json'),
    TE.chain(s => TE.fromEither(pipe(J.parse(s), E.mapLeft(E.toError)))),
    TE.map(json => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const clone = Object.assign({}, json as any, {
        main: './index.js',
        module: './_esm/index.mjs',
        exports: {
          '.': {
            types: './index.d.ts',
            node: './index.js',
            import: './_esm/index.mjs',
            require: './index.js',
          },
          './*': {
            types: './*.d.ts',
            node: './*.js',
            import: './_esm/*.mjs',
            require: './*.js',
          },
        },
        publishConfig: {
          access: 'public',
        },
        typesVersions: {
          '*': {
            '*': ['./*.d.ts'],
          },
        },
      })

      delete clone.scripts
      delete clone.files
      delete clone.devDependencies

      return clone
    }),
    TE.chain(json => C.writeFile('./dist/package.json', JSON.stringify(json, null, 2))),
  )

/* See: https://gitlab.com/simspace-oss/xio/-/blob/dev/scripts/pack.ts */
export const rewriteSourceMap: (
  content: string,
  path: string,
) => TE.TaskEither<Error, string> = (content, path_) =>
  pipe(
    TE.fromEither(pipe(J.parse(content), E.mapLeft(E.toError))),
    TE.chainEitherK(json => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const clone = Object.assign({}, json as any) as Readonly<
        Record<string, ReadonlyArray<string>>
      >
      const dir = path.dirname(path_)
      return pipe(
        clone,
        RR.mapWithIndex((k, v) =>
          k === 'sources'
            ? v.map(source => {
                let clone = `${source}`
                if (path_.match(/dist\/_(.+)\//)) {
                  clone = clone.replace(/(.*)\.\.\/src(.*)/gm, '$1src$2')
                } else {
                  clone = clone.replace(/(.*)\.\.\/\.\.\/src(.*)/gm, '$1src$2')
                }
                clone = path.posix.relative(dir, path.posix.join(dir, clone))
                return clone.startsWith('.') ? clone : './' + clone
              })
            : v,
        ),
        E.tryCatchK(clone => JSON.stringify(clone, null, 2), E.toError),
      )
    }),
  )

export const FILES: ReadonlyArray<string> = ['LICENSE', 'README.md']

export const copyMetaFiles: Build<ReadonlyArray<void>> = C =>
  pipe(
    FILES,
    TE.traverseReadonlyArrayWithIndex((_, from) =>
      C.copyFile(from, path.resolve('dist', from)),
    ),
  )

export const copyBuildFiles: Build<void> = C =>
  pipe(
    C.mkdir(`./dist/src`),
    TE.chain(() => C.exec('cp -r ./src/* ./dist/src')),

    /* Copy build/esm to dist/_esm */
    TE.chain(() => C.mkdir('./dist/_esm')),
    TE.chain(() => C.exec('cp -r ./build/mjs/* ./dist/_esm')),

    /* Copy build/cjs to dist */
    TE.chain(() => C.exec('cp -r ./build/cjs/* ./dist')),

    /* Copy types to dist */
    TE.chain(() => C.exec('cp -r ./build/dts/* ./dist')),
  )

export const overwriteSourceMaps: Build<void> = C =>
  pipe(
    C.glob('dist/**/*.map'),
    TE.chain(
      flow(
        RA.map(path_ =>
          pipe(
            C.readFile(path_),
            TE.chain(content => rewriteSourceMap(content, path_)),
            TE.chain(content => C.writeFile(path_, content)),
          ),
        ),
        TE.sequenceArray,
      ),
    ),
    TE.map(() => undefined),
  )

const main: Build<void> = pipe(
  checkDist,
  RTE.chain(() => copyPackageJson),
  RTE.chain(() => copyMetaFiles),
  RTE.chain(() => copyBuildFiles),
  RTE.chain(() => overwriteSourceMaps),
  RTE.chainFirstIOK(() => Cons.log('Done!')),
)

run(
  main({
    ...fileSystem,
    ...cli,
  }),
)
