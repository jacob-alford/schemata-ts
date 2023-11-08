---
title: SetFromArray
nav_order: 77
parent: schemata
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
export declare const SetFromArray: <A>(ordA: Ord<A>) => <O>(sA: Schema<O, A>) => Schema<readonly O[], ReadonlySet<A>>
```

Added in v1.3.0
