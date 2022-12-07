---
title: schemables/WithUnknownContainers/definition.ts
nav_order: 134
parent: Modules
---

## definition overview

Re-export of `WithUnknownContainers` from `io-ts/Schemable/WithUnknownContainers`

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [WithUnknownContainers1](#withunknowncontainers1)
  - [WithUnknownContainers2 (interface)](#withunknowncontainers2-interface)
  - [WithUnknownContainers2C](#withunknowncontainers2c)
  - [WithUnknownContainersHKT2 (interface)](#withunknowncontainershkt2-interface)

---

# Model

## WithUnknownContainers1

**Signature**

```ts
export declare const WithUnknownContainers1: any
```

Added in v1.0.0

## WithUnknownContainers2 (interface)

**Signature**

```ts
export interface WithUnknownContainers2<S extends URIS2> {
  readonly UnknownArray: Kind2<S, Array<unknown>, Array<unknown>>
  readonly UnknownRecord: Kind2<S, Record<string, unknown>, Record<string, unknown>>
}
```

Added in v1.0.0

## WithUnknownContainers2C

**Signature**

```ts
export declare const WithUnknownContainers2C: any
```

Added in v1.0.0

## WithUnknownContainersHKT2 (interface)

**Signature**

```ts
export interface WithUnknownContainersHKT2<S> {
  readonly UnknownArray: HKT2<S, Array<unknown>, Array<unknown>>
  readonly UnknownRecord: HKT2<S, Record<string, unknown>, Record<string, unknown>>
}
```

Added in v1.0.0
