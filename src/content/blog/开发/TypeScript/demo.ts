type ToTuple<
	L extends number,
	A extends Array<any> = [],
> = A['length'] extends L ? A : ToTuple<L, [...A, any]>

type Sum<A extends number, B extends number> = [
	...ToTuple<A>,
	...ToTuple<B>,
]['length']

type Sub<A extends number, B extends number> =
	ToTuple<A> extends [...ToTuple<B>, ...infer Tail] ? Tail['length'] : -1

type FirstElement<A extends Array<any>> = A extends [infer F, ...infer Tail]
	? F
	: never

type TailElements<A extends Array<any>> = A extends [infer F, ...infer Tail]
	? Tail
	: never

type MapSub<A extends any[], B extends number> = A['length'] extends 0
	? []
	: [Sub<B, FirstElement<A>>, ...MapSub<TailElements<A>, B>]

type Include<A extends any[], B extends any> = A['length'] extends 0
	? false
	: FirstElement<A> extends B
		? true
		: Include<TailElements<A>, B>

type TwoSum<
	Arr extends Array<number>,
	Target extends number,
	Rest extends number[] = Arr,
> = Rest['length'] extends 0
	? false
	: Include<MapSub<Arr, Target>, FirstElement<Rest>> extends true
		? true
		: TwoSum<Arr, Target, TailElements<Rest>>

type res1 = Sum<12, 23> // 35
type res2 = Sub<10, 7> // 3
type res3 = FirstElement<[1, 2, 3]> // 1
type res4 = TailElements<[1, 2, 3]> // [2, 3]
type res6 = TwoSum<[1, 2, 3], 6> // true
type res7 = TwoSum<[1, 2, 3], 7> // false
