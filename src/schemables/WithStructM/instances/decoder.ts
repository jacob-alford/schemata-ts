/**
 * WithStructM instance for Decoder
 *
 * @since 1.3.0
 */
import * as Ap from 'fp-ts/Apply'
import * as E from 'fp-ts/Either'
import { pipe, tuple } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as DE from 'schemata-ts/DecodeError'
import * as D from 'schemata-ts/Decoder'
import { witherSM } from 'schemata-ts/internal/util'
import { WithStructM } from 'schemata-ts/schemables/WithStructM/definition'
import { keyIsNotMapped } from 'schemata-ts/struct'

const decodeErrorValidation = E.getApplicativeValidation(DE.Semigroup)
const apSecond = Ap.apSecond(decodeErrorValidation)

/**
 * @since 1.3.0
 * @category Instances
 */
export const Decoder: WithStructM<D.SchemableLambda> = {
  structM: (properties, params = { extraProps: 'strip' }) => ({
    decode: (u): any => {
      // --- typeof returns 'object' for null and arrays
      if (u === null || typeof u !== 'object' || Array.isArray(u)) {
        return D.failure(D.decodeErrors(D.typeMismatch('object', u)))
      }

      // --- decode all known properties of an object's own non-inherited properties
      const outKnown = pipe(
        properties,
        witherSM(DE.Semigroup)((key, prop) => {
          const { _keyRemap, _val } = prop
          const inputVal: unknown = (u as any)[key]
          return pipe(
            _val.decode(inputVal),
            E.bimap(
              keyErrors => D.decodeErrors(D.errorAtKey(key as string, keyErrors)),
              result => O.some([result, keyIsNotMapped(_keyRemap) ? key : _keyRemap]),
            ),
          )
        }),
      )

      if (params.extraProps === 'strip') return outKnown

      // -- if extra props are not allowed, return a failure on keys not specified in properties
      if (params.extraProps === 'error') {
        return pipe(
          u,
          witherSM(DE.Semigroup)((key, value) => {
            if (properties[key] === undefined) {
              return D.failure(
                D.decodeErrors(
                  D.errorAtKey(key as string, D.decodeErrors(D.unexpectedValue(value))),
                ),
              )
            }
            return E.right(O.zero<any>()) as any
          }),
          apSecond(outKnown),
        )
      }

      const rest = params.restParam
      if (rest === undefined) return outKnown

      // --- Decode rest parameters
      return pipe(
        outKnown,
        E.chain(knownResult =>
          pipe(
            u,
            witherSM(DE.Semigroup)((inputKey, inputValue) => {
              const knownPropAtKey = properties[inputKey]

              // -- If the input key is not a known property key (i.e. it was not specified in the struct) decode it with the rest parameter
              if (knownPropAtKey === undefined)
                return pipe(
                  rest.decode(inputValue),
                  E.bimap(
                    errs => D.decodeErrors(D.errorAtKey(inputKey, errs)),
                    result => O.some(tuple(result, inputKey)) as any,
                  ),
                )

              const { _keyRemap } = knownPropAtKey

              // -- If the input key is a known property key (i.e. it was specified in the struct) keep its more precise value
              return keyIsNotMapped(_keyRemap)
                ? E.right(O.some(tuple(knownResult[inputKey], inputKey)))
                : E.right(O.some(tuple(knownResult[_keyRemap], _keyRemap)))
            }),
          ),
        ),
      )
    },
  }),
}
