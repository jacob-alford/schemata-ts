---
title: schemata/Union.ts
nav_order: 70
parent: Modules
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
export declare const Union: <T extends RNEA.ReadonlyNonEmptyArray<any>>(
  ...members: T
) => IncludesExtension<T, any> extends true ? any : any
```

Added in v2.0.0
