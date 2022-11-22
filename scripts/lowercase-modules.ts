import * as Color from 'colorette'
import * as Cons from 'fp-ts/Console'
import { flow, pipe, tuple } from 'fp-ts/function'
import * as RTE from 'fp-ts/ReaderTaskEither'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as Str from 'fp-ts/string'
import * as TE from 'fp-ts/TaskEither'

import { Build } from './build'
import { cli } from './CLI'
import { fileSystem } from './FS'
import { run } from './run'

type Primitive = 'string' | 'number' | 'date'
type ModuleWithExtension = string

const isUppercase: (s: string) => boolean = s => /^[A-Z]/.test(s)

const isAllCaps: (s: string) => boolean = flow(
  Str.split('.'),
  RNEA.head,
  name => name === name.toUpperCase(),
)

const camelFromPascal: (s: string) => string = s =>
  isAllCaps(s)
    ? s.toLowerCase()
    : `${Str.toLowerCase(s.slice(0, 1))}${s.slice(1, s.length)}`

const getUppercaseModules: (
  subdir: string,
) => Build<ReadonlyArray<readonly [Primitive, ModuleWithExtension]>> = subdir => C =>
  pipe(
    TE.Do,
    TE.chainFirstIOK(() => Cons.log(`Checking ${subdir} for uppercase modules...`)),
    TE.apS('date', pipe(C.readFiles(`./${subdir}/date`))),
    TE.apS('number', pipe(C.readFiles(`./${subdir}/number`))),
    TE.apS('string', pipe(C.readFiles(`./${subdir}/string`))),
    TE.map(({ string: s, number: n, date: d }) =>
      pipe(
        [
          ...pipe(
            s,
            RA.map(name => tuple('string' as const, name)),
          ),
          ...pipe(
            n,
            RA.map(name => tuple('number' as const, name)),
          ),
          ...pipe(
            d,
            RA.map(name => tuple('date' as const, name)),
          ),
        ],
        RA.filter(([, name]) => isUppercase(name)),
      ),
    ),
  )

const renameToLowercase: (
  subdir: string,
) => (mod: readonly [Primitive, ModuleWithExtension]) => Build<void> =
  subdir =>
  ([prim, name]) =>
  C =>
    pipe(
      C.exec(
        `git mv ${subdir}/${prim}/${name} ${subdir}/${prim}/${camelFromPascal(name)}`,
      ),
      TE.chainFirstIOK(() =>
        Cons.log(
          Color.green(
            `✔️ Renamed ${subdir}/${prim}/${name} to ${subdir}/${prim}/${camelFromPascal(
              name,
            )}`,
          ),
        ),
      ),
    )

const main: Build<void> = pipe(
  RTE.Do,
  RTE.apS('modules', getUppercaseModules('src')),
  RTE.apS('testModules', getUppercaseModules('tests')),
  RTE.chainFirst(({ modules }) =>
    pipe(modules, RA.traverse(RTE.ApplicativeSeq)(renameToLowercase('src'))),
  ),
  RTE.chainFirst(({ testModules }) =>
    pipe(testModules, RA.traverse(RTE.ApplicativeSeq)(renameToLowercase('tests'))),
  ),
  RTE.chainIOK(() => Cons.log(Color.green('Done!'))),
)

run(
  main({
    ...fileSystem,
    ...cli,
  }),
)
