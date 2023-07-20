## Json Schema (Draft 7, 2019-09, and 2020-12)

Schemata-ts can derive a json-schema for interoperability with other json-schema libraries.

```ts
import { deriveJsonSchema } from 'schemata-ts/JsonSchema'

const personJsonSchema2007 = deriveJsonSchema(PersonSchema, 'Draft-07')
const personJsonSchema2019 = deriveJsonSchema(PersonSchema)
const personJsonSchema2020 = deriveJsonSchema(PersonSchema, '2020-12')
```
