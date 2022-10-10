import * as Cons from 'fp-ts/Console'
import * as Color from 'colorette'
import { pipe, tuple } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RTE from 'fp-ts/ReaderTaskEither'
import * as Str from 'fp-ts/string'
import * as TE from 'fp-ts/TaskEither'
import { fileSystem } from './FS'
import { cli } from './CLI'
import { run } from './run'
import { Build } from './build'

type Primitive = 'string' | 'number' | 'date'
type ModuleWithExtension = string

const camelFromPascal: (s: string) => string = s =>
  `${Str.toLowerCase(s.slice(0, 1))}${s.slice(1, s.length)}`

const getLowercaseModules: Build<
  ReadonlyArray<readonly [Primitive, ModuleWithExtension]>
> = C =>
  pipe(
    TE.Do,
    TE.chainFirstIOK(() => Cons.log('Discovering files...')),
    TE.apS('date', pipe(C.readFiles('./src/date'))),
    TE.apS('number', pipe(C.readFiles('./src/number'))),
    TE.apS('string', pipe(C.readFiles('./src/string'))),
    TE.map(({ string: s, number: n, date: d }) => [
      ...pipe(
        s,
        RA.map(name => tuple('string' as const, name))
      ),
      ...pipe(
        n,
        RA.map(name => tuple('number' as const, name))
      ),
      ...pipe(
        d,
        RA.map(name => tuple('date' as const, name))
      ),
    ])
  )

const renameToLowercase: (prim: Primitive, name: ModuleWithExtension) => Build<void> =
  (prim, name) => C =>
    pipe(
      C.exec(`git mv src/${prim}/${name} src/${prim}/${camelFromPascal(name)}`),
      TE.chainFirstIOK(() =>
        Cons.log(Color.green(`✔️ Renamed ${name} to ${camelFromPascal(name)}`))
      )
    )

const main: Build<void> = pipe(
  getLowercaseModules,
  RTE.chainFirst(
    RA.traverse(RTE.ApplicativePar)(([prim, name]) => renameToLowercase(prim, name))
  ),
  RTE.chainIOK(() => Cons.log(Color.green('Done!')))
)

run(
  main({
    ...fileSystem,
    ...cli,
  })
)
