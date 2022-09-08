import { fold } from 'fp-ts/Either'
import { TaskEither } from 'fp-ts/TaskEither'

export function run<A>(eff: TaskEither<Error, A>): void {
  eff()
    .then(
      fold(
        e => {
          throw e
        },
        () => {
          process.exitCode = 0
        }
      )
    )
    .catch(e => {
      console.error(e)

      process.exitCode = 1
    })
}
