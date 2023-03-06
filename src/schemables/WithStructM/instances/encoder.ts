/**
 * WithStructM instance for Encoder
 *
 * @since 1.3.0
 */
import { tuple } from 'fp-ts/function'
import * as Enc from 'io-ts/Encoder'
import { hasOwn } from 'schemata-ts/internal/util'
import { WithStructM } from 'schemata-ts/schemables/WithStructM/definition'
import { keyIsNotMapped } from 'schemata-ts/struct'

/**
 * @since 1.3.0
 * @category Instances
 */
export const Encoder: WithStructM<Enc.SchemableLambda> = {
  structM: (properties, params = { extraProps: 'strip' }) => {
    const keyLookup: Record<
      // -- expected key of the output object
      string,
      readonly [inputKey: string, outputKeyEncoder: Enc.Encoder<unknown, unknown>]
    > = {}
    for (const key in properties) {
      // -- ignore inherited properties
      if (!hasOwn(properties, key)) continue
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { _keyRemap, _val } = properties[key]!

      if (keyIsNotMapped(_keyRemap)) {
        keyLookup[key] = tuple(key, _val)
        continue
      }

      keyLookup[_keyRemap] = tuple(key, _val)
    }
    return {
      encode: output => {
        const result: Record<string, unknown> = {}
        for (const key in output) {
          const inputProps = keyLookup[key]

          if (
            // -- Param is extra (i.e. possible rest param)
            (!hasOwn(keyLookup, key) || inputProps === undefined) &&
            params.extraProps === 'restParam' &&
            params.restParam !== undefined
          ) {
            result[key] = params.restParam.encode(output[key])
          }

          // -- Param is extra (and additional properties are stripped)
          if (inputProps === undefined) continue

          const [inputKey, outputKeyEncoder] = inputProps

          result[inputKey] = outputKeyEncoder.encode(output[key])
        }
        return result as any
      },
    }
  },
}
