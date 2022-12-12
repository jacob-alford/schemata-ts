---
title: schemables/WithJson/definition.ts
nav_order: 78
parent: Modules
---

## definition overview

A basal schemable for Json and JsonString

Added in v1.0.2

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [JsonString (type alias)](#jsonstring-type-alias)
  - [WithJson1 (interface)](#withjson1-interface)
  - [WithJson2 (interface)](#withjson2-interface)
  - [WithJson2C (interface)](#withjson2c-interface)
  - [WithJsonHKT2 (interface)](#withjsonhkt2-interface)

---

# Model

## JsonString (type alias)

A valid Json string

**Signature**

```ts
export type JsonString = Branded<string, JsonStringBrand>
```

Added in v1.0.2

## WithJson1 (interface)

**Signature**

```ts
export interface WithJson1<S extends URIS> {
  /**
   * @since 1.0.2
   * @category Model
   */
  readonly json: Kind<S, J.Json>
  /**
   * @since 1.0.2
   * @category Model
   */
  readonly jsonString: Kind<S, JsonString>
}
```

Added in v1.0.2

## WithJson2 (interface)

**Signature**

```ts
export interface WithJson2<S extends URIS2> {
  /**
   * @since 1.0.2
   * @category Model
   */
  readonly json: Kind2<S, J.Json, J.Json>
  /**
   * @since 1.0.2
   * @category Model
   */
  readonly jsonString: Kind2<S, string, JsonString>
}
```

Added in v1.0.2

## WithJson2C (interface)

**Signature**

```ts
export interface WithJson2C<S extends URIS2, E> {
  /**
   * @since 1.0.2
   * @category Model
   */
  readonly json: Kind2<S, E, J.Json>
  /**
   * @since 1.0.2
   * @category Model
   */
  readonly jsonString: Kind2<S, E, JsonString>
}
```

Added in v1.0.2

## WithJsonHKT2 (interface)

**Signature**

```ts
export interface WithJsonHKT2<S> {
  /**
   * @since 1.0.2
   * @category Model
   */
  readonly json: HKT2<S, J.Json, J.Json>
  /**
   * @since 1.0.2
   * @category Model
   */
  readonly jsonString: HKT2<S, string, JsonString>
}
```

Added in v1.0.2
