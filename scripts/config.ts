import * as Cons from 'fp-ts/Console'
import * as E from 'fp-ts/Either'
import * as RTE from 'fp-ts/ReaderTaskEither'
import * as TE from 'fp-ts/TaskEither'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

import { FileSystem, fileSystem } from './FS'
import { run } from './run'

interface Build<A> extends RTE.ReaderTaskEither<FileSystem, Error, A> {}

const writeNpmrc: (token: string) => string = token =>
  `_authToken=${token}\nalways-auth=true`

const writeNpmIgnore: Build<void> = C =>
  pipe(
    TE.Do,
    TE.apS('gitignore', C.readFile('.gitignore')),
    TE.apS('npmIgnoreExists', TE.fromTask(C.exists('dist/.npmignore'))),
    TE.bindW('npmIgnoreContents', ({ npmIgnoreExists }) =>
      npmIgnoreExists ? pipe(C.readFile('.npmignore'), TE.map(O.some)) : TE.of(O.none)
    ),
    TE.chain(({ gitignore, npmIgnoreContents }) =>
      pipe(
        npmIgnoreContents,
        O.fold(
          () => C.writeFile('dist/.npmignore', `${gitignore}\n.npmrc`),
          npmIgnore =>
            C.writeFile('dist/.npmignore', `${gitignore}\n${npmIgnore}\n.npmrc`)
        )
      )
    )
  )

export const main: Build<void> = C =>
  pipe(
    process.env.NODE_AUTH_TOKEN,
    TE.fromNullable(E.toError('Missing NODE_AUTH_TOKEN')),
    TE.chain(token => C.writeFile('dist/.npmrc', writeNpmrc(token))),
    TE.chain(() => writeNpmIgnore(C)),
    TE.chainFirstIOK(() => Cons.log('Done!'))
  )

run(
  main({
    ...fileSystem,
  })
)
