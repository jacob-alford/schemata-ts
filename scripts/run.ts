import * as Color from 'colorette'
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
        },
      ),
    )
    .catch(e => {
      console.error(`\n❌ ${Color.red(e)}\n\n`)

      process.exitCode = 1
    })
}
