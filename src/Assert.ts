/** @since 2.2.0 */
import * as E from 'fp-ts/Either'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { type Schema } from 'schemata-ts/Schema'
import { drawTree, safeShow } from 'schemata-ts/TranscodeError'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { deriveTypeString } from 'schemata-ts/TypeString'

/**
 * A trait which will throw an error for when a value does not match a schema
 *
 * @since 2.2.0
 * @category Models
 */
export interface Assert<T> {
  readonly assert: (output: unknown) => asserts output is T
}

/**
 * A trait which will throw an error for when an expected "output" value does not match a
 * schema's output type
 *
 * @since 2.2.0
 * @category Interpreters
 */
export const deriveAssert = <I, O>(schema: Schema<I, O>): Assert<O> => {
  const guard = deriveGuard(schema)
  const [, name] = deriveTypeString(schema)
  return {
    assert: (output): asserts output is O => {
      if (!guard.is(output)) {
        throw new TypeError(`Expected ${name}, but got ${safeShow(output)}`)
      }
    },
  }
}

/**
 * A trait which will throw an error for when an expected "input" value does not match a
 * schema's input type
 *
 * @since 2.2.0
 * @category Interpreters
 */
export const deriveInputAssert = <I, O>(schema: Schema<I, O>): Assert<I> => {
  const guard = deriveInputGuard(schema)
  const [name] = deriveTypeString(schema)
  return {
    assert: (input): asserts input is I => {
      if (!guard.is(input)) {
        throw new TypeError(`Expected ${name}, but got ${safeShow(input)}`)
      }
    },
  }
}

/**
 * A trait which will throw an error for when an expected "input" value does not match a
 * schema's input type
 *
 * Unlike `deriveInputAssert`, this will include the error tree in the error message
 *
 * @since 2.2.0
 * @category Interpreters
 */
export const deriveInputAssertTree = <I, O>(schema: Schema<I, O>): Assert<I> => {
  const transcoder = deriveTranscoder(schema)
  const [name] = deriveTypeString(schema)
  return {
    assert: (input): asserts input is I => {
      const result = transcoder.decode(input)
      if (E.isLeft(result)) {
        throw new TypeError(
          `Expected ${name}, but received the following errors:\n${drawTree(result.left, {
            showHeading: false,
          })}`,
        )
      }
    },
  }
}
