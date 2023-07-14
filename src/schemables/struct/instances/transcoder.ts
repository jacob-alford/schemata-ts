import * as Ap from 'fp-ts/Apply'
import * as E from 'fp-ts/Either'
import { flow, pipe, tuple } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as Sg from 'fp-ts/Semigroup'
import { getKeyRemap } from 'schemata-ts/internal/struct'
import * as TC from 'schemata-ts/internal/transcoder'
import { witherRemap } from 'schemata-ts/internal/util'
import { type WithStruct } from 'schemata-ts/schemables/struct/definition'
import { remapPropertyKeys, safeIntersect } from 'schemata-ts/schemables/struct/utils'
import * as TCE from 'schemata-ts/TranscodeError'

const decodeErrorValidation = E.getApplicativeValidation(TCE.Semigroup)
const apSecond = Ap.apSecond(decodeErrorValidation)

const validateObject: (
  name: string,
) => (
  u: unknown,
) => E.Either<TCE.TranscodeErrors, Record<string | number | symbol, unknown>> =
  name => u => {
    if (u === null || typeof u !== 'object' || Array.isArray(u)) {
      return TC.failure(TC.transcodeErrors(TC.typeMismatch(name, u)))
    }
    return TC.success(u as Record<string | number | symbol, unknown>)
  }

export const StructTranscoder: WithStruct<TC.SchemableLambda> = {
  struct: (properties, extraProps = 'strip') => {
    const lookupByOutputKey = remapPropertyKeys(properties)

    return {
      decode: (u): E.Either<TCE.TranscodeErrors, any> =>
        pipe(
          validateObject('object')(u),
          E.chain(u => {
            // --- decode all known properties of an object's own non-inherited properties
            const outKnown = pipe(
              properties,
              witherRemap(TCE.Semigroup)((k, prop) => {
                const inputKey = k as string

                const { schemable, semigroup } = prop

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
                    result => O.some([result, outputKey, semigroup]),
                  ),
                )
              }),
            )

            if (extraProps === 'strip') return outKnown

            // -- if extra props are not allowed, return a failure on keys not specified in properties
            return pipe(
              u,
              witherRemap(TCE.Semigroup)((key, value) => {
                if (properties[key as string] === undefined) {
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
          }),
        ),
      encode: output => {
        return pipe(
          output as Record<string, unknown>,
          witherRemap(TCE.Semigroup)((key, outputAtKey) => {
            const unionMembers = lookupByOutputKey[key]

            // -- Param is extra (and additional properties are stripped)
            if (unionMembers === undefined || !Array.isArray(unionMembers))
              return E.right(O.zero()) as any

            for (const { member, guard, inputKey, semigroup } of unionMembers) {
              if (guard.is(outputAtKey)) {
                return pipe(
                  member.encode(outputAtKey),
                  E.map(result => O.some(tuple(result, inputKey, semigroup))),
                )
              }
            }

            return TC.failure(
              TC.transcodeErrors(
                TC.errorAtKey(
                  key,
                  TC.transcodeErrors(
                    ...((unionMembers.length === 1
                      ? RNEA.of(
                          TC.typeMismatch(RNEA.head(unionMembers).name, outputAtKey),
                        )
                      : pipe(
                          unionMembers,
                          RNEA.mapWithIndex((i, { name }) =>
                            TC.errorAtUnionMember(
                              i,
                              TC.transcodeErrors(TC.typeMismatch(name, outputAtKey)),
                            ),
                          ),
                        )) as any),
                  ),
                ),
              ),
            )
          }),
          _ => _ as any,
        )
      },
    }
  },
  record: (key, codomain, expectedName = 'object', semigroup = Sg.last()) => ({
    decode: flow(
      validateObject(expectedName),
      E.chain(
        witherRemap(TCE.Semigroup)((k, u) =>
          pipe(
            Ap.sequenceT(decodeErrorValidation)(
              codomain.decode(u),
              key.decode(k),
              E.right(semigroup),
            ),
            E.map(O.some),
            _ => _ as any,
          ),
        ),
      ),
      _ => _ as E.Either<TCE.TranscodeErrors, Readonly<Record<string, any>>>,
    ),
    encode: flow(
      witherRemap(TCE.Semigroup)((k, u) =>
        pipe(
          Ap.sequenceT(decodeErrorValidation)(
            codomain.encode(u),
            key.encode(k),
            E.right(semigroup),
          ),
          E.map(O.some),
          _ => _ as any,
        ),
      ),
      _ => _ as E.Either<TCE.TranscodeErrors, Readonly<Record<string, any>>>,
    ),
  }),
  intersection: (x, y) => ({
    decode: flow(
      validateObject('object'),
      E.chain(u =>
        pipe(
          Ap.sequenceT(decodeErrorValidation)(x.decode(u), y.decode(u)),
          E.map(([x, y]) => safeIntersect(x, y)),
        ),
      ),
    ),
    encode: u =>
      pipe(
        Ap.sequenceT(decodeErrorValidation)(x.encode(u), y.encode(u)),
        E.map(([x, y]) => safeIntersect(x, y)),
      ),
  }),
}
