import { type SchemableLambda } from 'schemata-ts/HKT'
import { type WithClone } from 'schemata-ts/schemables/clone/definition'

export const structuralClone: <S extends SchemableLambda>() => WithClone<S> = () => ({
  clone: _ => Object.assign({}, _),
})
