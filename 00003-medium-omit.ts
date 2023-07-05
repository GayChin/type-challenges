// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}


// ============= Your Code Here =============
type MyOmit<T, K extends keyof T> = {[P in keyof T as P extends K ? never : P] : T[P]};


// ============= Explaination =============
// K extends keyof T ensure K is a subtype/key of T
// P in keyof T as P extends K, assign each key in T as P, and checks if P is equal to K
// If equal, returns never, else returns P
// T[P] retrieves type from object T using P 