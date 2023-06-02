import * as Ap from 'fp-ts/Apply'
import * as E from 'fp-ts/Either'
import { pipe, tuple } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Sg from 'fp-ts/Semigroup'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { hasOwn, witherTaskParSM } from 'schemata-ts/internal/util'
import {
  GuardedPrecedentedUnionMember,
  ordGuardedPrecedentedUnionMember,
} from 'schemata-ts/schemables/guarded-union/definition'
import { WithStruct } from 'schemata-ts/schemables/struct/definition'
import { getKeyRemap } from 'schemata-ts/struct'
import * as TCE from 'schemata-ts/TranscodeError'

const decodeErrorValidation = TE.getApplicativeTaskValidation(T.ApplyPar, TCE.Semigroup)
const apSecond = Ap.apSecond(decodeErrorValidation)

export const StructTranscoderPar: WithStruct<TCP.SchemableLambda> = {
  struct: (properties, params = { extraProps: 'strip' }) => {
    type UnionItem = GuardedPrecedentedUnionMember<TCP.SchemableLambda> & {
      readonly inputKey: string
    }

    // --- a lookup table of output keys to union items
    const lookupByOutputKey_: Record<string, RNEA.ReadonlyNonEmptyArray<UnionItem>> = {}

    for (const key in properties) {
      // -- ignore inherited properties
      if (!hasOwn(properties, key)) continue

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { schemable, guard, information } = properties[key]!

      const inputKey: string = key
      const outputKey = pipe(
        getKeyRemap(schemable),
        O.getOrElse(() => inputKey),
      )

      const nextUnionItem: UnionItem = {
        member: schemable,
        guard,
        precedence: information,
        inputKey,
      }

      const outputKeyUnion = pipe(
        lookupByOutputKey_,
        RR.lookup(outputKey),
        O.fold(() => RNEA.of(nextUnionItem), RA.append(nextUnionItem)),
      )

      lookupByOutputKey_[outputKey] = outputKeyUnion
    }

    const lookupByOutputKey = pipe(
      lookupByOutputKey_,
      RR.map(RNEA.sort(ordGuardedPrecedentedUnionMember)),
    )

    return {
      decode: (u): TE.TaskEither<TCE.TranscodeErrors, any> => {
        // --- typeof returns 'object' for null and arrays
        if (u === null || typeof u !== 'object' || Array.isArray(u)) {
          return TCP.failure(TCP.transcodeErrors(TCP.typeMismatch('object', u)))
        }

        // --- decode all known properties of an object's own non-inherited properties
        const outKnown = pipe(
          properties,
          witherTaskParSM(
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
              TE.bimap(
                keyErrors =>
                  TCP.transcodeErrors(TCP.errorAtKey(inputKey as string, keyErrors)),
                result => O.some([result, outputKey]) as any,
              ),
            )
          }),
        )

        if (params.extraProps === 'strip') return outKnown

        // -- if extra props are not allowed, return a failure on keys not specified in properties
        if (params.extraProps === 'error') {
          return pipe(
            u,
            witherTaskParSM(
              TCE.Semigroup,
              Sg.last(),
            )((key, value) => {
              if (properties[key] === undefined) {
                return TCP.failure(
                  TCP.transcodeErrors(
                    TCP.errorAtKey(
                      key as string,
                      TCP.transcodeErrors(TCP.unexpectedValue(value)),
                    ),
                  ),
                )
              }
              return E.right(O.zero()) as any
            }),
            apSecond(outKnown),
          )
        }

        const rest = params.restParam
        if (rest === undefined) return outKnown

        // --- Decode rest parameters
        return pipe(
          outKnown,
          TE.chain(knownResult =>
            pipe(
              u,
              witherTaskParSM(
                TCE.Semigroup,
                Sg.last(),
              )((inputKey, inputValue) => {
                const knownPropAtKey = properties[inputKey]

                // -- If the input key is not a known property key (i.e. it was not specified in the struct) decode it with the rest parameter
                if (knownPropAtKey === undefined)
                  return pipe(
                    rest.decode(inputValue),
                    TE.bimap(
                      errs => TCP.transcodeErrors(TCP.errorAtKey(inputKey, errs)),
                      result => O.some(tuple(result, inputKey)) as any,
                    ),
                  )

                const { schemable } = knownPropAtKey

                // -- If the input key is a known property key (i.e. it was specified in the struct) keep its more precise value
                return pipe(
                  getKeyRemap(schemable),
                  O.fold(
                    () => tuple(knownResult[inputKey], inputKey),
                    _keyRemap => tuple(knownResult[_keyRemap], _keyRemap),
                  ),
                  O.some,
                  TE.right,
                )
              }),
            ),
          ),
        )
      },
      encode: output => {
        return pipe(
          output as Record<string, unknown>,
          witherTaskParSM(
            TCE.Semigroup,
            Sg.last(),
          )((key, outputAtKey) => {
            const unionMembers = lookupByOutputKey[key]
            if (
              // -- Param is extra (i.e. possible rest param)
              (!hasOwn(lookupByOutputKey, key) || unionMembers === undefined) &&
              params.extraProps === 'restParam' &&
              params.restParam !== undefined
            ) {
              return pipe(
                params.restParam.encode(outputAtKey),
                TE.map(result => O.some(tuple(result, key))),
              )
            }

            // -- Param is extra (and additional properties are stripped)
            if (unionMembers === undefined) return TE.right(O.zero())

            for (const { member, guard, inputKey } of unionMembers) {
              if (guard.is(outputAtKey)) {
                return pipe(
                  member.encode(outputAtKey),
                  TE.map(result => O.some(tuple(result, inputKey))),
                )
              }
            }

            return TE.right(O.zero()) as any
          }),
          _ => _ as any,
        )
      },
    }
  },
}
