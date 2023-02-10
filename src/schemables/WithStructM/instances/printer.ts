/**
 * WithStructM instance for Printer
 *
 * @since 1.3.0
 */
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as P from 'schemata-ts/base/PrinterBase'
import { hasOwn, witherS } from 'schemata-ts/internal/util'
import * as PE from 'schemata-ts/PrintError'
import { WithStructM2 } from 'schemata-ts/schemables/WithStructM/definition'
import { keyIsNotMapped } from 'schemata-ts/struct'

/**
 * @since 1.3.0
 * @category Instances
 */
export const Printer: WithStructM2<P.URI> = {
  structM: (properties, params = { extraProps: 'strip' }) => {
    const printersByKey: Record<string, P.Printer<unknown, unknown>['codomainToJson']> =
      {}
    const printersByMappedKey: Record<
      string,
      P.Printer<unknown, unknown>['domainToJson']
    > = {}
    for (const k in properties) {
      if (!hasOwn(properties, k)) continue
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { _keyRemap, _val } = properties[k]!
      printersByKey[k] = _val.codomainToJson
      printersByMappedKey[keyIsNotMapped(_keyRemap) ? k : _keyRemap] = _val.domainToJson
    }
    return {
      domainToJson: witherS(PE.semigroupPrintingError)((k, val) => {
        if (hasOwn(printersByMappedKey, k) && printersByMappedKey[k] !== undefined) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return pipe(printersByMappedKey[k]!(val), E.map(O.some))
        }

        return params.extraProps === 'restParam' && params.restParam !== undefined
          ? pipe(params.restParam.domainToJson(val), E.map(O.some))
          : E.right(O.none)
      }),
      codomainToJson: witherS(PE.semigroupPrintingError)((k, val) => {
        if (hasOwn(printersByKey, k) && printersByKey[k] !== undefined) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return pipe(printersByKey[k]!(val), E.map(O.some))
        }

        return params.extraProps === 'restParam' && params.restParam !== undefined
          ? pipe(params.restParam.codomainToJson(val), E.map(O.some))
          : E.right(O.none)
      }),
    } as any
  },
}
