---
title: Union
nav_order: 80
parent: schemata
---

## Union overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Union](#union)

---

# Combinators

## Union

Represents a union of different types. **Note: Union items ought to be mutually
exclusive**. To mitigate this, union items are first sorted from most complex to least
complex, and in the case of transcoder and guard the first match is kept.

**Signature**

```ts
export declare const Union: <T extends RNEA.ReadonlyNonEmptyArray<Schema<any, any>>>(
  ...members: T
) => IncludesExtension<T, ImplicitOptional> extends true
  ? ImplicitOptional & Schema<TupleToUnion<Inputs<T>>, TupleToUnion<Outputs<T>>>
  : Schema<TupleToUnion<Inputs<T>>, TupleToUnion<Outputs<T>>>
```

Added in v2.0.0
