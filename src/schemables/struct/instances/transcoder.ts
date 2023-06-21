import * as Ap from 'fp-ts/Apply'
import * as E from 'fp-ts/Either'
import { pipe, tuple } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as Sg from 'fp-ts/Semigroup'
import * as TC from 'schemata-ts/internal/transcoder'
import { witherRemap } from 'schemata-ts/internal/util'
import { type WithStruct } from 'schemata-ts/schemables/struct/definition'
import { remapPropertyKeys } from 'schemata-ts/schemables/struct/utils'
import { getKeyRemap } from 'schemata-ts/struct'
import * as TCE from 'schemata-ts/TranscodeError'

const decodeErrorValidation = E.getApplicativeValidation(TCE.Semigroup)
const apSecond = Ap.apSecond(decodeErrorValidation)

export const StructTranscoder: WithStruct<TC.SchemableLambda> = {
  struct: (properties, extraProps = 'strip') => {
    const lookupByOutputKey = remapPropertyKeys(properties)

    return {
      decode: (u): E.Either<TCE.TranscodeErrors, any> => {
        // --- typeof returns 'object' for null and arrays
        if (u === null || typeof u !== 'object' || Array.isArray(u)) {
          return TC.failure(TC.transcodeErrors(TC.typeMismatch('object', u)))
        }

        // --- decode all known properties of an object's own non-inherited properties
        const outKnown = pipe(
          properties,
          witherRemap(
            TCE.Semigroup,
            Sg.last(),
          )((k, prop) => {
            const inputKey = k as string

            const { schemable } = prop

            const inputVal: unknown = (u as any)[inputKey]

            const outputKey = pipe(
              getKeyRemap(schemable),
              O.getOrElse(() => inputKey),
            )

            return pipe(
              schemable.decode(inputVal),
              E.bimap(
                keyErrors =>
                  TC.transcodeErrors(TC.errorAtKey(inputKey as string, keyErrors)),
                result => O.some([result, outputKey]) as any,
              ),
            )
          }),
        )

        if (extraProps === 'strip') return outKnown

        // -- if extra props are not allowed, return a failure on keys not specified in properties
        return pipe(
          u,
          witherRemap(
            TCE.Semigroup,
            Sg.last(),
          )((key, value) => {
            if (properties[key] === undefined) {
              return TC.failure(
                TC.transcodeErrors(
                  TC.errorAtKey(
                    key as string,
                    TC.transcodeErrors(TC.unexpectedValue(value)),
                  ),
                ),
              )
            }
            return E.right(O.zero()) as any
          }),
          apSecond(outKnown),
        )
      },
      encode: output => {
        return pipe(
          output as Record<string, unknown>,
          witherRemap(
            TCE.Semigroup,
            Sg.last(),
          )((key, outputAtKey) => {
            const unionMembers = lookupByOutputKey[key]

            // -- Param is extra (and additional properties are stripped)
            if (unionMembers === undefined) return E.right(O.zero())

            for (const { member, guard, inputKey } of unionMembers) {
              if (guard.is(outputAtKey)) {
                return pipe(
                  member.encode(outputAtKey),
                  E.map(result => O.some(tuple(result, inputKey))),
                )
              }
            }

            // this shouldn't ever happen,
            // if there's a key which does not match a guard in the union of guards
            // we have no idea of knowing how to encode it
            return E.right(O.zero()) as any
          }),
          _ => _ as any,
        )
      },
    }
  },
}
