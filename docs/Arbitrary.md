## Fast-Check Arbitraries

Schemata-ts can also derive fast-check arbitraries for property-based testing and generating randomized examples.

```ts
import * as fc from 'fast-check'
import { deriveArbitrary } from 'schemata-ts/Arbitrary'

const personArbitrary = deriveArbitrary(PersonSchema).arbitrary(fc)
```
