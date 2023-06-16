import { SchemableLambda } from 'schemata-ts/HKT'
import { WithClone } from 'schemata-ts/schemables/clone/definition'

export const structuralClone: <S extends SchemableLambda>() => WithClone<S> = () => ({
  clone: _ => Object.assign({}, _),
})
