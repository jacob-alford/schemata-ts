---
title: JsonSerializer.ts
nav_order: 22
parent: Modules
---

## JsonSerializer overview

Interprets a schema to encode a domain object, print it safely to Json, and stringify it.

Added in v1.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Interpreters](#interpreters)
  - [getJsonSerializer](#getjsonserializer)
- [Model](#model)
  - [JsonSerializer (interface)](#jsonserializer-interface)

---

# Interpreters

## getJsonSerializer

Interprets a schema to encode a domain object, print it safely to Json, and stringify it.

**Signature**

```ts
export declare const getJsonSerializer: <E, A>(schema: SchemaExt<E, A>) => JsonSerializer<A>
```

Added in v1.1.0

# Model

## JsonSerializer (interface)

**Signature**

```ts
export interface JsonSerializer<A> {
  readonly print: (a: A) => E.Either<PrintError, JsonString>
}
```

Added in v1.1.0
