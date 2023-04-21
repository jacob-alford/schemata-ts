import * as Ap from 'fp-ts/Apply'
import * as E from 'fp-ts/Either'
import { pipe, tuple } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as TCE from 'schemata-ts/TranscodeError'
import * as TC from 'schemata-ts/internal/Transcoder'
import { witherSM } from 'schemata-ts/internal/util'
import { WithStructM } from 'schemata-ts/schemables/WithStructM/definition'
import { getKeyRemap } from 'schemata-ts/struct'

const decodeErrorValidation = E.getApplicativeValidation(TCE.Semigroup)
const apSecond = Ap.apSecond(decodeErrorValidation)

export const WithStructMTranscoder: WithStructM<TC.SchemableLambda> = {
  structM: (properties, params = { extraProps: 'strip' }) => ({
    decode: (u): any => {
      // --- typeof returns 'object' for null and arrays
      if (u === null || typeof u !== 'object' || Array.isArray(u)) {
        return D.failure(TC.transcodeErrors(TC.typeMismatch('object', u)))
      }

      // --- decode all known properties of an object's own non-inherited properties
      const outKnown = pipe(
        properties,
        witherSM(TCE.Semigroup)((key, prop) => {
          const inputVal: unknown = (u as any)[key]
          const newKey = pipe(
            getKeyRemap(prop),
            O.getOrElse(() => key as string),
          )
          return pipe(
            prop.decode(inputVal),
            E.bimap(
              keyErrors => TC.transcodeErrors(TC.errorAtKey(key as string, keyErrors)),
              result => O.some([result, newKey]),
            ),
          )
        }),
      )

      if (params.extraProps === 'strip') return outKnown

      // -- if extra props are not allowed, return a failure on keys not specified in properties
      if (params.extraProps === 'error') {
        return pipe(
          u,
          witherSM(TCE.Semigroup)((key, value) => {
            if (properties[key] === undefined) {
              return D.failure(
                D.decodeErrors(
                  D.errorAtKey(
                    key as string,
                    TC.transcodeErrors(TC.unexpectedValue(value)),
                  ),
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
            witherSM(TCE.Semigroup)((inputKey, inputValue) => {
              const knownPropAtKey = properties[inputKey]

              // -- If the input key is not a known property key (i.e. it was not specified in the struct) decode it with the rest parameter
              if (knownPropAtKey === undefined)
                return pipe(
                  rest.decode(inputValue),
                  E.bimap(
                    errs => TC.transcodeErrors(TC.errorAtKey(inputKey, errs)),
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
