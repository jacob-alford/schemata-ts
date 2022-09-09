// import * as ts from 'typescript'
import * as Cons from 'fp-ts/Console'
import { pipe } from 'fp-ts/function'
import * as RTE from 'fp-ts/ReaderTaskEither'
import * as TE from 'fp-ts/TaskEither'
import { FileSystem, fileSystem } from './FS'
import { cli, CLI } from './CLI'
import { run } from './run'

interface Build<A> extends RTE.ReaderTaskEither<FileSystem & CLI, Error, A> {}

// const _ = ts.factory

/**
 * Types that are injected into SchemableExt, follows:
 *
 * Category: List TypeName
 */
type SchemableCombinators = {
  date: ReadonlyArray<string>
  number: ReadonlyArray<string>
  string: ReadonlyArray<string>
}

/** Generate TS code for SchemableExt.ts */
declare const makeSchemableExtContents: (
  schemableCombinators: SchemableCombinators
) => Build<string>

/** Write SchemableExt.ts contents to file system */
declare const writeSchemableExt: (contents: string) => Build<void>

/**
 * Different typeclasses which express a Schemable instance, follows:
 *
 * ["InstanceName", "I"] where index 0 is the proper name of the instance and index 1 is
 * the module accessor
 */
type SchemableTypeclasses =
  | ['Decoder', 'D', 'SchemableExt2C']
  | ['Eq', 'Eq', 'Schemable1']
  | ['Guard', 'G', 'Schemable1']
  | ['TaskDecoder', 'TD', 'SchemableExt2C']
  | ['Type', 't', 'Schemable1']

/** Generate TS code for Decoder, Eq, Guard, TaskDecoder, or Type */
declare const makeSchemableInstanceModuleContents: (
  typeclass: SchemableTypeclasses
) => (schemableCombinators: SchemableCombinators) => Build<string>

/** Write Module instance to file system */
declare const writeSchemableInstanceModule: (
  typeclass: SchemableTypeclasses
) => (contents: string) => Build<void>

/** Retrieve modules found in category folders */
const getSchemableCombinators: Build<SchemableCombinators> = C =>
  pipe(
    TE.Do,
    TE.apS('date', C.readFiles('./src/date')),
    TE.apS('number', C.readFiles('./src/number')),
    TE.apS('string', C.readFiles('./src/string'))
  )

const schemableTypeclasses: ReadonlyArray<SchemableTypeclasses> = [
  ['Decoder', 'D', 'SchemableExt2C'],
  ['Eq', 'Eq', 'Schemable1'],
  ['Guard', 'G', 'Schemable1'],
  ['TaskDecoder', 'TD', 'SchemableExt2C'],
  ['Type', 't', 'Schemable1'],
]

const main: Build<void> = pipe(
  getSchemableCombinators,
  RTE.chainFirst(schemableCombinators =>
    pipe(makeSchemableExtContents(schemableCombinators), RTE.chain(writeSchemableExt))
  ),
  RTE.chain(schemableCombinators =>
    pipe(
      schemableTypeclasses,
      RTE.traverseReadonlyArrayWithIndex((_, typeclass) =>
        pipe(
          schemableCombinators,
          makeSchemableInstanceModuleContents(typeclass),
          RTE.chain(writeSchemableInstanceModule(typeclass))
        )
      )
    )
  ),
  RTE.chainFirstIOK(Cons.log),
  RTE.chainIOK(() => Cons.log('Done!'))
)

run(
  main({
    ...fileSystem,
    ...cli,
  })
)
