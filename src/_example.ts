import { getDecoder } from './_Decoder'
import { Array, Boolean, Number, String, Struct } from './schemables/primitives'

const Person = Struct({
  name: String,
  age: Number,
  isAlive: Boolean,
  favoriteColors: Array(String),
})

const decodePerson = getDecoder(Person)

export const result = decodePerson.decode({
  name: 'John',
  age: 42,
  isAlive: true,
  favoriteColors: ['red', 'green', 'blue'],
})
