import * as Ap from 'fp-ts/Apply'
import { flow, pipe, tuple } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as Sg from 'fp-ts/Semigroup'
import * as TE from 'fp-ts/TaskEither'
import { getKeyRemap } from 'schemata-ts/internal/struct'
import * as TC from 'schemata-ts/internal/transcoder'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { witherRemapPar } from 'schemata-ts/internal/util'
import { type WithStruct } from 'schemata-ts/schemables/struct/definition'
import {
  getValidateObject,
  remapPropertyKeys,
  safeIntersect,
} from 'schemata-ts/schemables/struct/utils'
import * as TCE from 'schemata-ts/TranscodeError'

const apSecond = Ap.apSecond(TCP.applicativeValidationPar)

const validateObject = getValidateObject(TE.MonadThrow)

export const StructTranscoderPar: WithStruct<TCP.SchemableLambda> = {
  struct: (
    properties,
    // istanbul ignore next
    extraProps = 'strip',
    // istanbul ignore next
    wholeName = 'object',
  ) => {
    const lookupByOutputKey = remapPropertyKeys(properties)

    return {
      decode: (u): TE.TaskEither<TCE.TranscodeErrors, any> => {
        // --- typeof returns 'object' for null and arrays
        if (u === null || typeof u !== 'object' || Array.isArray(u)) {
          return TCP.failure(TC.transcodeErrors(TC.typeMismatch(wholeName, u)))
        }

        // --- decode all known properties of an object's own non-inherited properties
        const outKnown = pipe(
          properties,
          witherRemapPar(TCE.Semigroup)((k, prop) => {
            const inputKey = k as string

            const { schemable, semigroup } = prop

            const inputVal: unknown = (u as any)[inputKey]

            const outputKey = pipe(
              getKeyRemap(schemable),
              O.getOrElse(() => inputKey),
            )

            return pipe(
              schemable.decode(inputVal),
              TE.bimap(
                keyErrors =>
                  TC.transcodeErrors(TC.errorAtKey(inputKey as string, keyErrors)),
                result => O.some(tuple(result, outputKey, semigroup)),
              ),
            )
          }),
        )

        if (typeof extraProps !== 'string') {
          return pipe(
            TE.Do,
            TE.apS('known', outKnown),
            TCP.apS(
              'rest',
              pipe(
                u,
                witherRemapPar(TCE.Semigroup)((key, value) => {
                  if (properties[key as string] === undefined) {
                    return pipe(
                      extraProps.decode(value),
                      TE.bimap(
                        errs => TC.transcodeErrors(TC.errorAtKey(key as string, errs)),
                        _ => O.some(tuple(_, key, Sg.last())),
                      ),
                    )
                  }
                  return TE.right(O.zero())
                }),
              ),
            ),
            TE.map(({ known, rest }) => safeIntersect(known, rest)),
          )
        }

        if (extraProps === 'strip') return outKnown

        // -- if extra props are not allowed, return a failure on keys not specified in properties
        return pipe(
          u,
          witherRemapPar(TCE.Semigroup)((key, value) => {
            if (properties[key] === undefined) {
              return TCP.failure(
                TC.transcodeErrors(
                  TC.errorAtKey(
                    key as string,
                    TC.transcodeErrors(TC.unexpectedValue(value)),
                  ),
                ),
              )
            }
            return TE.right(O.none)
          }),
          apSecond(outKnown),
        )
      },
      encode: output => {
        return pipe(
          output as Record<string, unknown>,
          witherRemapPar(TCE.Semigroup)((key, outputAtKey) => {
            const unionMembers = lookupByOutputKey[key]

            // -- Param is extra (and additional properties are stripped)
            if (unionMembers === undefined || !Array.isArray(unionMembers)) {
              if (typeof extraProps !== 'string') {
                return pipe(
                  extraProps.encode(outputAtKey),
                  TE.map(result => O.some(tuple(result, key, Sg.last()))),
                )
              }
              return TE.right(O.zero()) as any
            }

            for (const { member, guard, inputKey, semigroup } of unionMembers) {
              if (guard.is(outputAtKey)) {
                return pipe(
                  member.encode(outputAtKey),
                  TE.map(result => O.some(tuple(result, inputKey, semigroup))),
                )
              }
            }

            return TCP.failure(
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
  record: (key, codomain, expectedName, semigroup) => ({
    decode: flow(
      validateObject(expectedName),
      TE.chain(
        witherRemapPar(TCE.Semigroup)((k, u) =>
          pipe(
            Ap.sequenceT(TCP.applicativeValidationPar)(
              codomain.decode(u),
              key.decode(k),
              TE.right(semigroup),
            ),
            TE.map(O.some),
            _ => _ as any,
          ),
        ),
      ),
      _ => _ as TE.TaskEither<TCE.TranscodeErrors, Readonly<Record<string, any>>>,
    ),
    encode: flow(
      witherRemapPar(TCE.Semigroup)((k, u) =>
        pipe(
          Ap.sequenceT(TCP.applicativeValidationPar)(
            codomain.encode(u),
            key.encode(k),
            TE.right(semigroup),
          ),
          TE.map(O.some),
          _ => _ as any,
        ),
      ),
      _ => _ as TE.TaskEither<TCE.TranscodeErrors, Readonly<Record<string, any>>>,
    ),
  }),
  intersection: (x, y) => ({
    decode: flow(
      validateObject('object'),
      TE.chain(u =>
        pipe(
          Ap.sequenceT(TCP.applicativeValidationPar)(x.decode(u), y.decode(u)),
          TE.map(([x, y]) => safeIntersect(x, y)),
        ),
      ),
    ),
    encode: u =>
      pipe(
        Ap.sequenceT(TCP.applicativeValidationPar)(x.encode(u), y.encode(u)),
        TE.map(([x, y]) => safeIntersect(x, y)),
      ),
  }),
}
