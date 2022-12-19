/**
 * Turns nested error structures into a readable format
 *
 * @since 1.1.0
 */
import { pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'

// import * as DE from './DecodeError'
import { matchOn } from './internal/match'
import * as PE from './PrintError'

// -------------------------------------------------------------------------------------
// Model
// -------------------------------------------------------------------------------------

/**
 * @since 1.1.0
 * @category Model
 */
export type ReporterParams = {
  /** Controls the character placed in between top-level groups */
  readonly groupSeparator?: string

  /** Controls the character placed before error messages */
  readonly indentString?: (depth: number) => string
}

/**
 * Turn a nested error structure into a readable format
 *
 * @since 1.1.0
 * @category Model
 */
export type ErrorReporter<E> = (error: E) => RNEA.ReadonlyNonEmptyArray<string>

// -------------------------------------------------------------------------------------
// Constructors
// -------------------------------------------------------------------------------------

/** @internal */
type ErrorTree = Terminus | Branch

/** @internal */
class Terminus {
  constructor(readonly error: string) {}
}

/** @internal */
class Branch {
  constructor(
    readonly error: string,
    readonly children: RNEA.ReadonlyNonEmptyArray<ErrorTree>,
  ) {}
}

/** @internal */
const printErrorToTree: (err: PE.PrintError) => ErrorTree = matchOn('_tag')({
  ErrorGroup: ({ errors }) =>
    new Branch('Errors', pipe(errors, RNEA.map(printErrorToTree))),
  NamedError: ({ expected, error }) =>
    new Branch(`Expected: ${expected}, but received `, [printErrorToTree(error)]),
  InvalidValue: ({ value }) => new Terminus(`Invalid value: ${value}`),
  ErrorAtIndex: ({ index, error }) =>
    new Branch(`Error at index ${index}: `, [printErrorToTree(error)]),
  ErrorAtKey: ({ key, error }) =>
    new Branch(`Error at key \`${key}\`: `, [printErrorToTree(error)]),
  CircularReference: () => new Terminus('[Circular Reference]'),
})

/**
 * `ErrorReporter` for `PrintError`
 *
 * @since 1.1.0
 * @category Constructors
 * @example
 *   import * as PE from 'schemata-ts/PrintError'
 *   import { printErrorReporter } from 'schemata-ts/ErrorReporter'
 *
 *   const error = new PE.ErrorGroup([
 *     new PE.ErrorAtKey(
 *       'realNumber',
 *       new PE.NamedError('Infinte Value', new PE.InvalidValue(Infinity)),
 *     ),
 *     new PE.ErrorAtKey(
 *       'integers',
 *       new PE.ErrorGroup([
 *         new PE.ErrorAtIndex(1, new PE.InvalidValue(NaN)),
 *         new PE.ErrorAtIndex(
 *           2,
 *           new PE.NamedError('Finite Number', new PE.InvalidValue(Infinity)),
 *         ),
 *       ]),
 *     ),
 *     new PE.ErrorAtKey('activeStatus', new PE.InvalidValue(undefined)),
 *   ])
 *
 *   assert.deepStrictEqual(printErrorReporter(error), [
 *     '— Errors',
 *     '  — Error at key `realNumber`: ',
 *     '    — Expected: Infinte Value, but received ',
 *     '      — Invalid value: Infinity',
 *     '  — Error at key `integers`: ',
 *     '    — Errors',
 *     '      — Error at index 1: ',
 *     '        — Invalid value: NaN',
 *     '      — Error at index 2: ',
 *     '        — Expected: Finite Number, but received ',
 *     '          — Invalid value: Infinity',
 *     '  — Error at key `activeStatus`: ',
 *     '    — Invalid value: undefined',
 *   ])
 */
export const printErrorReporter: ErrorReporter<PE.PrintError> = error => {
  const go =
    (depth: number) =>
    (tree: ErrorTree): RNEA.ReadonlyNonEmptyArray<string> =>
      tree instanceof Terminus
        ? RNEA.of(`${' '.repeat(depth * 2)}— ${tree.error}`)
        : pipe(
            RNEA.of(`${' '.repeat(depth * 2)}— ${tree.error}`),
            RNEA.concat(pipe(tree.children, RNEA.chain(go(depth + 1)))),
          )

  return pipe(printErrorToTree(error), go(0))
}
