// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}


// ============= Solution =============
type MyPick<P1, P2 extends keyof P1> = {[key in P2] : P1[key]};


// ============= Explaination =============
// We can use a map type to create our own pick utility type
// The 2nd parameter enforces a type constraint on P2, it ensures that P2 is a valid key of type P1
// {[key in P2] : P1[key]} this is a mapped type
// [key in P2] iterates over each key in P1
// P1[key] retrieves value type in P1 using key in P2 aka index access type