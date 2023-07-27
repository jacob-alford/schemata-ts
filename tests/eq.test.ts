import * as fc from 'fast-check'
import { BooleanAlgebra as B } from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import * as S from 'schemata-ts'
import * as Arb from 'schemata-ts/Arbitrary'
import * as Eq from 'schemata-ts/Eq'

const UUID5 = S.UUID(5)
const UUID4 = S.UUID(4)

const PersonSchema2pk = S.Struct({
  foo: S.String(),
  bar: S.Natural,
  id_1: UUID5,
  id_2: UUID4,
})

type Person2pk = S.OutputOf<typeof PersonSchema2pk>

const personArb = Arb.deriveArbitrary(PersonSchema2pk).arbitrary(fc)

const eqUuid5 = Eq.deriveEq(UUID5)
const eqUuid4 = Eq.deriveEq(UUID4)

const id1Eq: Eq.Eq<Person2pk> = pipe(
  eqUuid5,
  Eq.contramap(({ id_1 }) => id_1),
)

const id2Eq: Eq.Eq<Person2pk> = pipe(
  eqUuid4,
  Eq.contramap(({ id_2 }) => id_2),
)

const eqOverId1And2 = Eq.and(id1Eq)(id2Eq)
const eqOverId1Or2 = Eq.or(id1Eq)(id2Eq)

describe('Eq', () => {
  describe('and', () => {
    test('reflexive and', () => {
      fc.assert(
        fc.property(personArb, p => {
          expect(eqOverId1And2.equals(p, p)).toBe(true)
        }),
      )
    })
    test('symmetric and', () => {
      fc.assert(
        fc.property(personArb, personArb, (p1, p2) => {
          const left = eqOverId1And2.equals(p1, p2)
          const right = eqOverId1And2.equals(p2, p1)
          expect(B.implies(left, right)).toBe(true)
          expect(B.implies(right, left)).toBe(true)
        }),
      )
    })
    test('transitive and', () => {
      fc.assert(
        fc.property(personArb, personArb, personArb, (p1, p2, p3) => {
          const left = eqOverId1And2.equals(p1, p2)
          const right = eqOverId1And2.equals(p2, p3)
          const implication = eqOverId1And2.equals(p1, p3)
          expect(B.implies(left && right, implication)).toBe(true)
        }),
      )
    })
  })
  describe('or', () => {
    test('reflexive or', () => {
      fc.assert(
        fc.property(personArb, p => {
          expect(eqOverId1Or2.equals(p, p)).toBe(true)
        }),
      )
    })
    test('symmetric or', () => {
      fc.assert(
        fc.property(personArb, personArb, (p1, p2) => {
          const left = eqOverId1Or2.equals(p1, p2)
          const right = eqOverId1Or2.equals(p2, p1)
          expect(B.implies(left, right)).toBe(true)
          expect(B.implies(right, left)).toBe(true)
        }),
      )
    })
    test('transitive or', () => {
      fc.assert(
        fc.property(personArb, personArb, personArb, (p1, p2, p3) => {
          const left = eqOverId1Or2.equals(p1, p2)
          const right = eqOverId1Or2.equals(p2, p3)
          const implication = eqOverId1Or2.equals(p1, p3)
          expect(B.implies(left && right, implication)).toBe(true)
        }),
      )
    })
  })
  describe('always', () => {
    test('reflexive always', () => {
      fc.assert(
        fc.property(personArb, p => {
          expect(Eq.always.equals(p, p)).toBe(true)
        }),
      )
    })
    test('symmetric always', () => {
      fc.assert(
        fc.property(personArb, personArb, (p1, p2) => {
          const left = Eq.always.equals(p1, p2)
          const right = Eq.always.equals(p2, p1)
          expect(B.implies(left, right)).toBe(true)
          expect(B.implies(right, left)).toBe(true)
        }),
      )
    })
    test('transitive always', () => {
      fc.assert(
        fc.property(personArb, personArb, personArb, (p1, p2, p3) => {
          const left = Eq.always.equals(p1, p2)
          const right = Eq.always.equals(p2, p3)
          const implication = Eq.always.equals(p1, p3)
          expect(B.implies(left && right, implication)).toBe(true)
        }),
      )
    })
  })
})
