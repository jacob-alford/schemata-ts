import * as RTE from 'fp-ts/ReaderTaskEither'

import { CLI } from './CLI'
import { FileSystem } from './FS'

export interface Build<A> extends RTE.ReaderTaskEither<FileSystem & CLI, Error, A> {}
