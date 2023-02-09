/**
 * WithStructM instance for Type
 *
 * @deprecated
 * @since 1.3.0
 */
import * as Ap from 'fp-ts/Apply'
import * as A from 'fp-ts/Array'
import * as E from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { failure, Type as Type_, unknown, ValidationError } from 'io-ts'
import * as t from 'io-ts/Type'
import { hasOwn, witherSM } from 'schemata-ts/internal/util'
import { WithStructM1 } from 'schemata-ts/schemables/WithStructM/definition'
import { Encoder } from 'schemata-ts/schemables/WithStructM/instances/encoder'
import { Guard } from 'schemata-ts/schemables/WithStructM/instances/guard'
import { isOptionalFlag, isRequiredFlag, keyIsNotMapped } from 'schemata-ts/struct'

const decodeErrorValidation = E.getApplicativeValidation(
  A.getSemigroup<ValidationError>(),
)
const apSecond = Ap.apSecond(decodeErrorValidation)

/**
 * @deprecated
 * @since 1.3.0
 * @category Instances
 */
export const Type: WithStructM1<t.URI> = {
  structM: (properties, params = { extraProps: 'strip' }) =>
    new Type_(
      `mappedStruct`,
      Guard.structM(properties, params).is as any,
      flow(
        t.UnknownRecord.decode,
        E.chain(u => {
          const config = params
          const outKnown = pipe(
            properties,
            witherSM(A.getSemigroup<ValidationError>())(
              (key, { _flag, _keyRemap, _val }): any => {
                const val: unknown = (u as any)[key]
                // -- If the input _does not_ have a specified property key _and_ that key is required: return a key failure
                if (!hasOwn(u, key) && isRequiredFlag(_flag)) {
                  return failure(
                    val,
                    [{ key: key as string, type: unknown }],
                    'Missing Required Property',
                  )
                }

                // -- If the input _does not_ have a specified property key _and_ that key is optional: filter that property out
                if ((!hasOwn(u, key) || val === undefined) && isOptionalFlag(_flag)) {
                  return E.right(O.none)
                }

                // -- If the input _does_ have a specified property key: validate it
                return pipe(
                  _val.decode(val),
                  E.bimap(
                    A.concat<ValidationError>([
                      {
                        value: val,
                        context: [{ key: key as string, type: _val }],
                        message: 'Failed to decode property',
                      },
                    ]),
                    result =>
                      O.some([result, keyIsNotMapped(_keyRemap) ? key : _keyRemap]),
                  ),
                )
              },
            ),
          )

          // -- If parameters are set to strip additional properties, return just the decoded known properties
          if (config.extraProps === 'strip') return outKnown

          // -- if extra props are not allowed, return a failure on keys not specified in properties
          if (config.extraProps === 'error') {
            return pipe(
              u,
              witherSM(A.getSemigroup<ValidationError>())((key, val) => {
                if (!hasOwn(properties, key)) {
                  return failure(
                    val,
                    [{ key: key as string, type: unknown }],
                    'Encountered additional property',
                  )
                }
                return E.right(O.none) as any
              }),
              apSecond(outKnown),
            )
          }

          const rest = config.restParam
          if (rest === undefined) return outKnown

          return pipe(
            outKnown,
            E.chain(knownResult =>
              pipe(
                u,
                witherSM(A.getSemigroup<ValidationError>())((inputKey, inputValue) => {
                  // -- If the input key is not a known property key (i.e. it was not specified in the struct) decode it with the rest parameter
                  if (!hasOwn(properties, inputKey) || properties[inputKey] === undefined)
                    return pipe(
                      rest.decode(inputValue),
                      E.bimap(
                        A.concat<ValidationError>([
                          {
                            value: inputValue,
                            context: [{ key: inputKey, type: rest }],
                            message: 'Rest param failed to decode',
                          },
                        ]),
                        result => O.some([result, inputKey]),
                      ),
                    )

                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  const { _keyRemap } = properties[inputKey]!

                  // -- If the input key is a known property key (i.e. it was specified in the struct) keep its more precise value
                  return keyIsNotMapped(_keyRemap)
                    ? E.right(O.some([knownResult[inputKey], inputKey]))
                    : E.right(O.some([knownResult[_keyRemap], _keyRemap]))
                }),
              ),
            ),
          )
        }),
        a => a as any,
      ),
      Encoder.structM(properties, params).encode,
    ) as any,
}
