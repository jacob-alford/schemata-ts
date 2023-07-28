---
title: Arbitrary.ts
nav_order: 1
permalink: /arbitrary/
---

## Arbitrary overview

FastCheck Arbitrary's derivable from Schemata-ts schemas. Arbitrary's can even generate
`pattern` schema thanks to Kuvio.

Arbitrary's require an additional method call `arbitrary` which prevents runtime errors
when fast-check isn't present.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Interpreters](#interpreters)
  - [deriveArbitrary](#derivearbitrary)
- [Model](#model)
  - [Arbitrary (interface)](#arbitrary-interface)
- [URI](#uri)
  - [URI](#uri-1)
  - [URI (type alias)](#uri-type-alias)

---

# Interpreters

## deriveArbitrary

Derive a fast-check arbitrary from a schemata-ts schema

**Signature**

```ts
export declare const deriveArbitrary: Interpreter<SchemableLambda>
```

Added in v2.0.0

# Model

## Arbitrary (interface)

**Signature**

```ts
export interface Arbitrary<A> {
  readonly arbitrary: (fc: typeof FastCheck) => FastCheck.Arbitrary<A>
}
```

Added in v1.0.0

# URI

## URI

**Signature**

```ts
export declare const URI: 'Arbitrary'
```

Added in v1.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v1.0.0
