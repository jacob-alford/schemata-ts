---
title: schemables/WithRefine/definition.ts
nav_order: 123
parent: Modules
---

## definition overview

Re-export of `WithRefine` from `io-ts/Schemable/WithRefine`

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [WithRefine1](#withrefine1)
  - [WithRefine2 (interface)](#withrefine2-interface)
  - [WithRefine2C](#withrefine2c)
  - [WithRefineHKT2 (interface)](#withrefinehkt2-interface)

---

# Model

## WithRefine1

**Signature**

```ts
export declare const WithRefine1: any
```

Added in v1.0.0

## WithRefine2 (interface)

**Signature**

```ts
export interface WithRefine2<S extends URIS2> {
  readonly refine: <A, B extends A>(
    refinement: Refinement<A, B>,
    id: string
  ) => <O>(from: Kind2<S, O, A>) => Kind2<S, O, B>
}
```

Added in v1.0.0

## WithRefine2C

**Signature**

```ts
export declare const WithRefine2C: any
```

Added in v1.0.0

## WithRefineHKT2 (interface)

**Signature**

```ts
export interface WithRefineHKT2<S> {
  readonly refine: <A, B extends A>(
    refinement: Refinement<A, B>,
    id: string
  ) => <O>(from: HKT2<S, O, A>) => HKT2<S, O, B>
}
```

Added in v1.0.0
