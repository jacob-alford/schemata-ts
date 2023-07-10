import * as Ap from 'fp-ts/Apply'
import { flow, pipe, tuple } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as Sg from 'fp-ts/Semigroup'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import { getKeyRemap } from 'schemata-ts/internal/struct'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { witherRemapPar } from 'schemata-ts/internal/util'
import { type WithStruct } from 'schemata-ts/schemables/struct/definition'
import { remapPropertyKeys, safeIntersect } from 'schemata-ts/schemables/struct/utils'
import * as TCE from 'schemata-ts/TranscodeError'

const decodeErrorValidation = TE.getApplicativeTaskValidation(T.ApplyPar, TCE.Semigroup)
const apSecond = Ap.apSecond(decodeErrorValidation)

const validateObject: (
  name: string,
) => (
  u: unknown,
) => TE.TaskEither<TCE.TranscodeErrors, Record<string | number | symbol, unknown>> =
  name => u => {
    if (u === null || typeof u !== 'object' || Array.isArray(u)) {
      return TCP.failure(TCP.transcodeErrors(TCP.typeMismatch(name, u)))
    }
    return TCP.success(u as Record<string | number | symbol, unknown>)
  }

export const StructTranscoderPar: WithStruct<TCP.SchemableLambda> = {
  struct: (properties, extraProps = 'strip') => {
    const lookupByOutputKey = remapPropertyKeys(properties)

    return {
      decode: (u): TE.TaskEither<TCE.TranscodeErrors, any> => {
        // --- typeof returns 'object' for null and arrays
        if (u === null || typeof u !== 'object' || Array.isArray(u)) {
          return TCP.failure(TCP.transcodeErrors(TCP.typeMismatch('object', u)))
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
                  TCP.transcodeErrors(TCP.errorAtKey(inputKey as string, keyErrors)),
                result => O.some(tuple(result, outputKey, semigroup)),
              ),
            )
          }),
        )

        if (extraProps === 'strip') return outKnown

        // -- if extra props are not allowed, return a failure on keys not specified in properties
        return pipe(
          u,
          witherRemapPar(TCE.Semigroup)((key, value) => {
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
            if (unionMembers === undefined) return TE.right(O.zero())

            for (const { member, guard, inputKey, semigroup } of unionMembers) {
              if (guard.is(outputAtKey)) {
                return pipe(
                  member.encode(outputAtKey),
                  TE.map(result => O.some(tuple(result, inputKey, semigroup))),
                )
              }
            }

            return TE.right(O.zero())
          }),
          _ => _ as any,
        )
      },
    }
  },
  record: (key, codomain, expectedName = 'object', semigroup = Sg.last()) => ({
    decode: flow(
      validateObject(expectedName),
      TE.chain(
        witherRemapPar(TCE.Semigroup)((k, u) =>
          pipe(
            Ap.sequenceT(decodeErrorValidation)(
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
          Ap.sequenceT(decodeErrorValidation)(
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
          Ap.sequenceT(decodeErrorValidation)(x.decode(u), y.decode(u)),
          TE.map(([x, y]) => safeIntersect(x, y)),
        ),
      ),
    ),
    encode: u =>
      pipe(
        Ap.sequenceT(decodeErrorValidation)(x.encode(u), y.encode(u)),
        TE.map(([x, y]) => safeIntersect(x, y)),
      ),
  }),
}
