// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]


// ============= Your Code Here =============
type MyExclude<T, U> = T extends U ? never : T;


// ============= Explanation =============
// This is another way of using extends
// This feature is aka distributive conditional types
// It happens when you use a conditional type with a union type as input
// This allow conditional types to automatically distribute over union types (evaluate each type in union type based on the conditonal statement) 
// The result will be a union type
// Using test case 1,  T is 'a' | 'b' | 'c', U is 'a', since T is a union type and MyExclude is a conditional type, the criteria for DCT to occur is fulfilled
// 'a' is part of 'a' therefore a is not kept
// 'b' is not part of 'a' therefore b is kept
// 'c' is not part of 'a' therefore c is kept
// The result type is union type of 'b'|'c'


