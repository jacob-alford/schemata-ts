import * as Color from 'colorette'
import * as Cons from 'fp-ts/Console'
import { pipe } from 'fp-ts/function'
import * as RTE from 'fp-ts/ReaderTaskEither'
import path from 'path'

import { type Build } from './build'
import { cli } from './CLI'
import { TEMP_DIR } from './docs-config'
import { fileSystem } from './FS'
import { genDocs } from './gen-docs'
import { docsPack } from './gen-docs-pack'
import { genSchemas } from './gen-docs-schemas'
import { run } from './run'

const cleanup: Build<void> = _ =>
  _.exec(`rm -rf ${path.resolve('./docs/modules')} ${path.resolve(TEMP_DIR)}`)

const info: (s: string) => Build<void> = s => RTE.fromIO(Cons.info(s))

const main: Build<void> = pipe(
  RTE.Do,
  RTE.tap(() => info(Color.cyan('\n\n📄 Generating docs...\n'))),
  RTE.tap(() => genDocs),
  RTE.tap(() => info(Color.cyan('🧠 Generating schemata index file...\n'))),
  RTE.tap(() => genSchemas),
  RTE.tap(() => info(Color.cyan('📦 Packing docs...\n'))),
  RTE.tap(() => docsPack),
  RTE.tap(() => info(Color.cyan('🧹 Cleaning up...\n'))),
  RTE.tap(() => cleanup),
  RTE.tap(() => info(Color.green('\n\n✅ Docs generated!\n\n'))),
  RTE.asUnit,
)

run(
  main({
    ...cli,
    ...fileSystem,
  }),
)
