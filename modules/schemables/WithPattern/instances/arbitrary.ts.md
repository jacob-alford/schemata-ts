---
title: schemables/WithPattern/instances/arbitrary.ts
nav_order: 116
parent: Modules
---

## arbitrary overview

Schemable construction based on Regex combinators

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Instances](#instances)
  - [Arbitrary](#arbitrary)
- [utils](#utils)
  - [arbitraryFromPattern](#arbitraryfrompattern)

---

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: WithPattern1<'Arbitrary'>
```

Added in v1.0.0

# utils

## arbitraryFromPattern

Construct a `fast-check` `Arbitrary` instance from a given `Pattern`.

**Signature**

```ts
export declare const arbitraryFromPattern: (pattern: PB.Pattern) => Arb.Arbitrary<string>
```

Added in v1.0.0
