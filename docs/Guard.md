## Type Guards

Type guards are used by Typescript to narrow the type of a value to something concrete. From a schema you can derive a type guard using the following import and `deriveTypeGuard`.

```ts
import { deriveTypeGuard, type Guard } from 'schemata-ts/Guard'

const guardPerson: Guard<Person> = deriveTypeGuard(PersonSchema)
```
