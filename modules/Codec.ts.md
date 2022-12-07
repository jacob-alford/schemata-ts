---
title: Codec.ts
nav_order: 11
parent: Modules
---

## Codec overview

A Codec is a combined Decoder, Encoder, and Guard.

Added in v1.0.1

---

<h2 class="text-delta">Table of contents</h2>

- [Interpreters](#interpreters)
  - [getCodec](#getcodec)
- [Model](#model)
  - [Codec (interface)](#codec-interface)

---

# Interpreters

## getCodec

**Signature**

```ts
export declare const getCodec: <E, A>(schema: SchemaExt<E, A>) => Codec<E, A>
```

Added in v1.0.1

# Model

## Codec (interface)

A Codec is a combined Decoder, Encoder, and Guard.

**Signature**

```ts
export interface Codec<E, A> extends Decoder<unknown, A>, Encoder<E, A>, Guard<unknown, A> {}
```

Added in v1.0.1
