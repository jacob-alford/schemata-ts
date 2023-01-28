/**
 * WithStructM instance for Decoder
 *
 * @since 1.3.0
 */
import * as Ap from 'fp-ts/Apply'
import * as E from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as DE from 'io-ts/DecodeError'
import * as D from 'io-ts/Decoder'
import * as FS from 'io-ts/FreeSemigroup'
import { hasOwn, witherSM } from 'schemata-ts/internal/util'
import {
  isOptionalFlag,
  isRequiredFlag,
  keyIsNotMapped,
  structTools,
  WithStructM2C,
} from 'schemata-ts/schemables/WithStructM/definition'

const decodeErrorValidation = E.getApplicativeValidation(DE.getSemigroup<string>())
const apSecond = Ap.apSecond(decodeErrorValidation)

/**
 * @since 1.3.0
 * @category Instances
 */
export const Decoder: WithStructM2C<D.URI, unknown> = {
  structM: (getProperties, params = { extraProps: 'strip' }) => ({
    decode: flow(
      D.UnknownRecord.decode,
      E.chain(u => {
        const config = params
        const properties = getProperties(structTools)
        const outKnown = pipe(
          properties,
          witherSM(DE.getSemigroup<string>())((key, { _flag, _keyRemap, _val }) => {
            const val: unknown = (u as any)[key]
            // -- If the input _does not_ have a specified property key _and_ that key is required: return a key failure
            if (!hasOwn(u, key) && isRequiredFlag(_flag)) {
              return E.left(
                FS.of(
                  DE.key(
                    key as string,
                    DE.required,
                    FS.of(DE.leaf(val, 'Missing Required Property')),
                  ),
                ),
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
                error =>
                  FS.of(
                    DE.key(
                      key as string,
                      isOptionalFlag(_flag) ? DE.optional : DE.required,
                      error,
                    ),
                  ),
                result => O.some([result, keyIsNotMapped(_keyRemap) ? key : _keyRemap]),
              ),
            )
          }),
        )

        // -- If parameters are set to strip additional properties, return just the decoded known properties
        if (config.extraProps === 'strip') return outKnown

        // -- if extra props are not allowed, return a failure on keys not specified in properties
        if (config.extraProps === 'error') {
          return pipe(
            u,
            witherSM(DE.getSemigroup<string>())(key => {
              if (!hasOwn(properties, key)) {
                return E.left(FS.of(DE.leaf(key, `Unexpected Property Key`)))
              }
              return E.right(O.none)
            }),
            E.mapLeft(errs =>
              FS.of(DE.wrap('Encountered Unexpected Property Keys: ', errs)),
            ),
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
              witherSM(DE.getSemigroup<string>())((inputKey, inputValue) => {
                // -- If the input key is not a known property key (i.e. it was not specified in the struct) decode it with the rest parameter
                if (!hasOwn(properties, inputKey) || properties[inputKey] === undefined)
                  return pipe(
                    rest.decode(inputValue),
                    E.bimap(
                      err => FS.of(DE.key(inputKey as string, DE.optional, err)),
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
  }),
}
