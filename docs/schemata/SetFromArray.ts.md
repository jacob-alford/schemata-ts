---
title: schemata/SetFromArray.ts
nav_order: 65
parent: Modules
---

## SetFromArray overview

Added in v1.3.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [SetFromArray](#setfromarray)

---

# Combinators

## SetFromArray

An array input that's converted to a ReadonlySet.

**Signature**

```ts
export declare const SetFromArray: <A>(ordA: Ord<A>) => <O>(sA: any) => any
```

Added in v1.3.0
