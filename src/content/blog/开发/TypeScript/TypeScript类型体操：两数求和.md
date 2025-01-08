---
title: TypeScript 类型体操：两数求和
date: 2025-01-05 02:56:26
tags: [TypeScript]
---

# TypeScript 类型体操：两数求和

给定一个数组 arr 和一个数字 target，我们要判断能否从 arr 中取出两个数，通过加法得到 target。

## 结果展示

```typescript
type ToTuple<
	L extends number,
	A extends Array<any> = [],
> = A['length'] extends L ? A : ToTuple<L, [...A, any]>

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

type res2 = Sub<10, 7> // 3
type res3 = FirstElement<[1, 2, 3]> // 1
type res4 = TailElements<[1, 2, 3]> // [2, 3]
type res6 = TwoSum<[1, 2, 3], 6> // true
type res7 = TwoSum<[1, 2, 3], 7> // false
```

## 思路

看不懂？没关系，先用编程语言实现一下类似的逻辑，找找思路：

```typescript
function twoSum(arr: number[], target: number): boolean {
	return arr.some((el) => arr.includes(target - el))
}
```

很简单对吧，只要 `arr` 里存在 `target - el` 就返回 true。

那为什么写成类型就变得如此复杂？让我们一步一步来看！

首先，为了计算 `target - el`，我们需要实现一个减法类型 `Sub`。

由于 TypeScript 中的加减法可以用数组的长度来间接得到，我们不得不写一个 `ToTuple` 来把数字转化成对应长度的数组。

为了判断数组中是否存在 `target - el`，我们还需要完成一个 `Include` 类型。

## 实现

### ToTuple

在 TypeScript 中，直接进行数字运算是不可能的，但我们可以通过数组的长度来模拟数字。因此，我们使用递归的方式构建一个长度为 L 的数组 A，当 A['length'] 达到 L 时，递归结束，返回数组 A。

```ts
type ToTuple<
	L extends number,
	A extends Array<any> = [],
> = A['length'] extends L ? A : ToTuple<L, [...A, any]>
```

### Sub

我们利用 ToTuple 将数字 A 和 B 转换为相应长度的数组，然后通过模式匹配 `ToTuple<A>` 是否可以分解为 `[...ToTuple<B>, ...infer Tail]`，从而确定 A - B 的结果为 Tail['length']

```ts
type Sub<A extends number, B extends number> =
	ToTuple<A> extends [...ToTuple<B>, ...infer Tail] ? Tail['length'] : -1
```

### FirstElement & TailElements

FirstElement 和 TailElements 分别用于提取数组的第一个元素和剩余元素。

通过模式匹配，FirstElement 提取数组的第一个元素，而 TailElements 则提取数组除第一个元素外的所有元素。

```ts
type FirstElement<A extends Array<any>> = A extends [infer F, ...infer Tail]
	? F
	: never

type TailElements<A extends Array<any>> = A extends [infer F, ...infer Tail]
	? Tail
	: never
```

### MapSub

通过递归处理数组中的每个元素，使用 Sub 计算 B 与每个元素的差值，并将结果存储在新的数组中。之所以计算 B 与每个元素的差，而不是把每个元素都减去B，是因为在之后使用的时候，B 是 Target，大于数组中的任何一个元素，而Sub只能计算 A > B 的情况，因此只能计算 B 与每个元素的差。

```ts

type MapSub<A extends any[], B extends number> = A['length'] extends 0
	? []
	: [Sub<B, FirstElement<A>>, ...MapSub<TailElements<A>, B>]
```

### Include

通过递归遍历数组，逐个比较元素，如果找到了目标元素则返回 true，否则返回 false。

```ts
type Include<A extends any[], B extends any> = A['length'] extends 0
	? false
	: FirstElement<A> extends B
		? true
		: Include<TailElements<A>, B>
```

### 最后，TwoSum

通过递归检查数组中的每个元素 el，计算 Target - el 的结果，并检查 Arr 中是否包含该结果。如果找到匹配对，则返回 true，否则继续递归检查。

```ts
type TwoSum<
	Arr extends Array<number>,
	Target extends number,
	Rest extends number[] = Arr,
> = Rest['length'] extends 0
	? false
	: Include<MapSub<Arr, Target>, FirstElement<Rest>> extends true
		? true
		: TwoSum<Arr, Target, TailElements<Rest>>
```
