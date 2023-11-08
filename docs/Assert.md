---
title: Assert.ts
nav_order: 2
permalink: /assert/
---

## Assert overview

Added in v2.2.0

---

<h2 class="text-delta">Table of contents</h2>

- [Interpreters](#interpreters)
  - [deriveAssert](#deriveassert)
  - [deriveInputAssert](#deriveinputassert)
  - [deriveInputAssertTree](#deriveinputasserttree)
- [Models](#models)
  - [Assert (interface)](#assert-interface)

---

# Interpreters

## deriveAssert

A trait which will throw an error for when an expected "output" value does not match a
schema's output type

**Signature**

```ts
export declare const deriveAssert: <I, O>(schema: Schema<I, O>) => Assert<O>
```

Added in v2.2.0

## deriveInputAssert

A trait which will throw an error for when an expected "input" value does not match a
schema's input type

**Signature**

```ts
export declare const deriveInputAssert: <I, O>(schema: Schema<I, O>) => Assert<I>
```

Added in v2.2.0

## deriveInputAssertTree

A trait which will throw an error for when an expected "input" value does not match a
schema's input type

Unlike `deriveInputAssert`, this will include the error tree in the error message

**Signature**

```ts
export declare const deriveInputAssertTree: <I, O>(schema: Schema<I, O>) => Assert<I>
```

Added in v2.2.0

# Models

## Assert (interface)

A trait which will throw an error for when a value does not match a schema

**Signature**

```ts
export interface Assert<T> {
  readonly assert: (output: unknown) => asserts output is T
}
```

Added in v2.2.0
