// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]

// @ts-expect-error
type error = MyAwaited<number>


// ============= Your Code Here =============

type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer U> 
? U extends PromiseLike<any> 
  ? MyAwaited<U>
  : U
: never

// ============= Explanation =============
// T extends PromiseLike<unknown> enforces that T must be a promise like type
// T extends PromiseLike<infer U> means if T is a promise like type that resolves to a type U, the infer keyword captures the resolved type
// Conditional type checks if U is a promise like type, if it is then the MyAwaited<U> is recursively applied to U


