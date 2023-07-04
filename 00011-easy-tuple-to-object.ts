// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const tupleMix = [1, '2', 3, '4'] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4' }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>


// ============= Solution =============
type TupleToObject<T extends readonly(string|number)[]> = {[ P in T[number]] : P }

// ============= Explaination =============
// extends readonly(string|number)[] because the array contains readonly string and readonly number elements due to as const
// T[number] represents the type of the elements in the array T. For example, if T is ['red', 'blue', 'green'], then T[number] is 'red' | 'blue' | 'green'.
// [P in T[number]] is a mapped type that iterates over each element (P) in the type T[number].


