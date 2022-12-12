import * as A from 'fp-ts/Array'
import * as Eq from 'fp-ts/Eq'
import { HKT, Kind, URIS } from 'fp-ts/HKT'
import * as Str from 'fp-ts/string'

interface Schemables1<S extends URIS> {}
interface Schemables<S> {}

type Req1 = keyof Schemables1<URIS>
type Req = keyof Schemables<unknown>

type Schemable1<S extends URIS, Reqs extends keyof Schemables1<S>> = {
  [K in Reqs]: Schemables1<S>[K]
}
type Schemable<S, Reqs extends keyof Schemables<S>> = {
  [K in Reqs]: Schemables<S>[K]
}

interface Schema<Reqs extends keyof Schemables<unknown>, A> {
  <S>(S: Schemable<S, Reqs>): HKT<S, A>
}

export function interpreter<S extends URIS, R extends Req1>(
  S: Schemable1<S, R>,
): <A>(schema: Schema<R, A>) => Kind<S, A>
export function interpreter<R extends Req, S>(
  S: Schemable<S, R>,
): <A>(schema: Schema<R, A>) => HKT<S, A>
export function interpreter<R extends Req, S>(
  S: Schemable<S, R>,
): <A>(schema: Schema<R, A>) => HKT<S, A> {
  return schema => schema(S)
}

// const composeInstancesUncurried: {
//   <S extends URIS, A extends Array<Req1>>(
//     ...args: { [K in keyof A]: Schemable1<S, A[K]> }
//   ): Schemable1<S, A[number]>
//   <S, A extends Array<Req>>(...args: { [K in keyof A]: Schemable<S, A[K]> }): Schemable<
//     S,
//     A[number]
//   >
// } = (...args: any[]) => args.reduce((a, n) => ({ ...a, ...n }), {}) as any

const composeInstances: {
  <S extends URIS>(): <A extends Array<Req>>(
    ...args: { [K in keyof A]: Schemable1<S, A[K]> }
  ) => Schemable1<S, A[number]>
  <S>(): <A extends Array<Req>>(
    ...args: { [K in keyof A]: Schemable<S, A[K]> }
  ) => Schemable<S, A[number]>
} =
  () =>
  (...args: any[]) =>
    args.reduce((a, n) => ({ ...a, ...n }), {}) as any

// String schema
const RequiresString = Symbol()
type RequiresString = typeof RequiresString
interface Schemables1<S extends URIS> {
  [RequiresString]: Kind<S, string>
}
interface Schemables<S> {
  [RequiresString]: HKT<S, string>
}
const String: Schema<RequiresString, string> = s => s[RequiresString]
const createStringInstance: {
  <S extends URIS>(sStr: Kind<S, string>): Schemable1<S, RequiresString>
  <S>(sStr: HKT<S, string>): Schemable<S, RequiresString>
} = <S>(sStr: HKT<S, string>): Schemable<S, RequiresString> => ({
  [RequiresString]: sStr,
})

// Array schema
const RequiresArray = Symbol()
type RequiresArray = typeof RequiresArray
interface Schemables1<S extends URIS> {
  [RequiresArray]: <A>(s: Kind<S, A>) => Kind<S, A[]>
}
interface Schemables<S> {
  [RequiresArray]: <A>(s: HKT<S, A>) => HKT<S, A[]>
}
const Array: <RA extends Req, A>(s: Schema<RA, A>) => Schema<RequiresArray | RA, A[]> =
  fa => s =>
    s[RequiresArray](fa(s))
const createArrayInstance: {
  <S extends URIS>(sArr: Schemables1<S>[RequiresArray]): Schemable1<S, RequiresArray>
  <S>(sArr: Schemables<S>[RequiresArray]): Schemable<S, RequiresArray>
} = <S>(sArr: Schemables<S>[RequiresArray]): Schemable<S, RequiresArray> => ({
  [RequiresArray]: sArr,
})

// Struct schema
const RequiresStruct = Symbol()
type RequiresStruct = typeof RequiresStruct
interface Schemables1<S extends URIS> {
  [RequiresStruct]: <A>(kinds: { [K in keyof A]: Kind<S, A[K]> }) => Kind<
    S,
    { readonly [K_1 in keyof A]: A[K_1] }
  >
}
interface Schemables<S> {
  [RequiresStruct]: <A>(kinds: { [K in keyof A]: HKT<S, A[K]> }) => HKT<
    S,
    { readonly [K_1 in keyof A]: A[K_1] }
  >
}
const Struct: <A, B extends { [K in keyof A]: Schema<Req, A[K]> }>(
  properties: B,
) => Schema<
  | RequiresStruct
  | {
      [K in keyof B]: B[K] extends Schema<infer R, infer _A> ? R : never
    }[keyof B],
  { [K in keyof B]: B[K] extends Schema<infer _R, infer A> ? A : never }
> =
  properties =>
  // @ts-expect-error -- cannot know existence of other schemables here
  s => {
    const out = {} as any
    for (const k in properties) {
      out[k] = properties[k](
        // @ts-expect-error -- cannot know existence of other schemables here
        s,
      )
    }
    return s[RequiresStruct](out)
  }
function createStructInstance<S extends URIS>(
  sStruct: Schemables1<S>[RequiresStruct],
): Schemable1<S, RequiresStruct>
function createStructInstance<S>(
  sStruct: Schemables<S>[RequiresStruct],
): Schemable<S, RequiresStruct>
function createStructInstance<S>(
  sStruct: Schemables<S>[RequiresStruct],
): Schemable<S, RequiresStruct> {
  return { [RequiresStruct]: sStruct }
}

const Foo = Struct({
  foo: String,
  bar: String,
  baz: Array(String),
})

const composeInstEq = composeInstances<Eq.URI>()

const EqInst = composeInstEq(
  createStringInstance<Eq.URI>(Str.Eq),
  createArrayInstance<Eq.URI>(A.getEq),
  createStructInstance<Eq.URI>(Eq.struct),
)

const foo = interpreter(EqInst)(Foo)

console.log(
  foo.equals({ foo: 'a', bar: 'd', baz: ['c'] }, { foo: 'a', bar: 'b', baz: ['c'] }),
)

console.log(
  foo.equals({ foo: 'a', bar: 'b', baz: ['c'] }, { foo: 'a', bar: 'b', baz: ['c'] }),
)
