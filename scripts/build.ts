import type * as RTE from 'fp-ts/ReaderTaskEither'

import { type CLI } from './CLI'
import { type FileSystem } from './FS'

export interface Build<A> extends RTE.ReaderTaskEither<FileSystem & CLI, Error, A> {}
