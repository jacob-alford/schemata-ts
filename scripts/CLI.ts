import * as child_process from 'child_process'
import { left, right } from 'fp-ts/Either'
import * as TE from 'fp-ts/TaskEither'

export interface CLI {
  exec: (cmd: string, args?: child_process.ExecOptions) => TE.TaskEither<Error, void>
}

export const cli: CLI = {
  exec: (cmd, args) => () =>
    new Promise(resolve => {
      child_process.exec(cmd, args, err => {
        if (err !== null) {
          return resolve(left(err))
        }

        return resolve(right(undefined))
      })
    }),
}
