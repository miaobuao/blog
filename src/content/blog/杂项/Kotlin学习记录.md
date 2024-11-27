---
title: 'Kotlin学习记录'
date: 2021-11-22 19:26:21
tags: []
published: true
hideInList: false
feature: 
isTop: false
---


记录了kotlin基本语法


<!--more-->



## 基础语法

### 注释

Kotlin 支持单行和多行注释：

```kotlin
// 单行注释

/* 
   多行的
      块注释。
*/
```



### 定义常量与变量

可变变量定义：var 关键字

```kotlin
var <标识符> : <类型> = <初始化值>
```

不可变变量定义：val 关键字，只能赋值一次的变量(类似Java中final修饰的变量)

```kotlin
val <标识符> : <类型> = <初始化值>
```

常量与变量都可以没有初始化值,但是在**引用前必须初始化**

**编译器支持自动类型判断**,即声明时可以不指定类型,由编译器判断。

```kotlin
val a: Int = 1
val b = 1       // 系统自动推断变量类型为Int
val c: Int      // 如果不在声明时初始化则必须提供变量类型
c = 1           // 明确赋值


var x = 5        // 系统自动推断变量类型为Int
x += 1           // 变量可修改
```



### 函数定义

函数定义使用关键字 fun，参数格式为：参数 : 类型

```kotlin
fun sum(a: Int, b: Int): Int {   // 两个Int类型的形参，返回值也是Int类型（Int首字母要大写！）
    return a + b
}
```

表达式作为函数体，返回类型自动推断：

```kotlin
fun sum(a: Int, b: Int) = a + b

public fun sum(a: Int, b: Int): Int = a + b   // public修饰的方法则必须明确写出返回类型
```

无返回值的函数(类似Java中的void)：

```kotlin
// 如果是返回 Unit类型，则可以省略(对于public方法也是这样)：
fun printSum(a: Int, b: Int): Unit { // 不省略Unit
    print(a + b)
}

public fun printSum(a: Int, b: Int) { // 省略Unit
    print(a + b)
}
```



### 可变长参数函数

函数的变长参数可以用 **vararg** 关键字进行标识：

```kotlin
fun vars(vararg v:Int){
    for(vt in v){
        print(vt)
    }
}

fun main(args: Array<String>) {
    vars(1,2,3,4,5)  // 输出12345
}
```



### lambda(匿名函数)

lambda表达式使用实例：

```kotlin
fun main(args: Array<String>) {
    val sumLambda: (Int, Int) -> Int = {x,y -> x+y}
    println(sumLambda(1,2))  // 输出 3
}
```



### 字符串模板

有两种模板：

**${ 表达式 }**

**$+变量名**

```php
var a = 1
// 模板中的简单名称：
val s1 = "a is $a"   // “a is 1”

a = 2
// 模板中的表达式：
val s2 = "${s1.replace("is", "was")}, but now is $a"  // "a was 1, but now is 2"
```



### NULL检查机制

```kotlin
// 类型后面加?表示可为空
var age: String? = "23" 
// age是空则抛出空指针异常
val ages = age!!.toInt()
// age是空则 ages1 = null, 否则 ages1 = age.toInt()
val ages1 = age?.toInt()
// age为空则 ages2 = -1, 否则 ages2 = age.toInt()
val ages2 = age?.toInt() ?: -1
```

当一个引用可能为 null 值，也有可能不为 null 时, 对应的类型声明必须明确地标记成 可为 null 。

当 myFun函数 的返回值不是Int类型时，返回 null

```kotlin
fun myFun(str: String): Int? {
  // ...
}
```



### 类型检测及自动类型转换

我们可以使用 is 运算符检测一个表达式是否某类型的一个实例

```kotlin
fun myFun(obj: Any): Int? {
  if (obj is String) {
    // 做过类型判断以后，obj会被系统自动转换为String类型
    return obj.length // 这里的obj时String类型
  }

  /* 
     假如这里有代码，则这里的obj是Any类型
   	 .........
   */

  return null
}
```

Kotlin 非常智能， 如下：

```kotlin
fun myFun(obj: Any): Int? {
  // 在 `&&` 运算符的右侧, `obj` 的类型会被自动转换为 `String`
  if (obj is String && obj.length > 0)
    return obj.length
  return null
}
```

如果 &&  运算符左边是false， 则不会执行右边的判断， 所以一旦需要检验右边的真值，意味着左边必然为true，也就是说：obj是String类型。



### 区间

```kotlin
for (i in 1..4) print(i) // 输出“1234” 等同于 1 <= i && i <= 4

for (i in 4..1) print(i) // 什么都不输出

for (i in 1..4 step 2) print(i) // 使用 step 指定步长, 输出“13”

for (i in 4 downTo 1 step 2) print(i) // 从大到小遍历，输出“42”

// 使用 until 函数排除结束元素
for (i in 1 until 10) {   // i in [1, 10), 等同于 1 <= i && i < 10
     println(i)
}
```



## 数据类型

| 类型   | 位宽度 |
| :----- | :----- |
| Double | 64     |
| Float  | 32     |
| Long   | 64     |
| Int    | 32     |
| Short  | 16     |
| Byte   | 8      |



### 字面常量

- 十进制：123
- 长整型以大写的 L 结尾：123L
- 16 进制以 0x 开头：0x0F
- 2 进制以 0b 开头：0b00001011

*注意：不支持八进制*

Kotlin 同时也支持传统符号表示的浮点数值：

- Doubles 默认写法: `123.5`, `123.5e10`
- Floats 使用 f 或者 F 后缀：`123.5f`



### 相等和相同

Kotlin中没有基本数据类型， 只有被封装的数据类型， 这样可以保证不会出现空指针，数字类型也都是被封装的，所以在比较数据大小的时候存在两种不同的比较（==和===）。

其中**==**表示比较**数值大小**， **===**则表示比较对象的**地址**。

```kotlin
fun main(args: Array<String>) {
    val a: Int = 10000
    println(a === a) // true，值相等，对象地址相等

    // 经过了装箱，创建了两个不同的对象（装箱的意思是把基本类型转化成对象）
    val boxedA: Int? = a
    val anotherBoxedA: Int? = a

    //虽然经过了装箱，但是值是相等的，都是10000
    println(boxedA === anotherBoxedA) //  false，值相等，对象地址不一样
    println(boxedA == anotherBoxedA) // true，值相等
}
```

实际上，对象地址相等，值必然相等。



### 类型转化

由于不同的表示方式，较小类型并不是较大类型的子类型，较小的类型不能隐式转换为较大的类型。 这意味着在不进行显式转换的情况下我们不能把 Byte 型值赋给一个 Int 变量。

```kotlin
val b: Byte = 1 // 自动给字面量封装成Byte对象
val i: Int = b  // 错误！ b是一个Byte对象， 不能直接转换成Int对象
```

咱们可以使用对象携带的方法来进行转化：

```kotlin
val b: Byte = 1
val i: Int = b.toInt() // 显式类型转换
```

每种数据类型都有下面的这些方法，可以转化为其它的类型：

```kotlin
toByte(): Byte
toShort(): Short
toInt(): Int
toLong(): Long
toFloat(): Float
toDouble(): Double
toChar(): Char
```

有些情况下也是可以使用**自动类型转化**的，需要满足如下两个条件：

1. 可以根据上下文环境推断出正确的数据类型
2. 数学操作符会做相应的重载

例如下面是正确的：

```kotlin
val l = 1L + 3 // Long + Int 自动转成 Long
```



### 位操作符

| 运算符     | 表示含义         |
| :--------- | :--------------- |
| and(bits)  | 按位与           |
| or(bits)   | 按位或           |
| inv(bits)  | 按位非           |
| xor(bits)  | 按位异或         |
| shl(bits)  | 左移运算符       |
| shr(bits)  | 右移运算符       |
| ushr(bits) | 无符号右移运算符 |

**注意：Kotlin的位运算符只能对Int和Long两种数据类型起作用。**

举个例子🌰

```kotlin
val a = 5
val b = a shl 2 // 等同于 a.shl(2)
val c = b and a // 等同于 b.and(a)
```



### 不一样的Char

和大多数语言不一样， Kotlin的Char类型**不能直接和数字进行操作**， 而且**必须**由单引号包裹, 比如：```'a'```

所以<font color=red>**下面这种写法是错误的**</font>

```kotlin
fun check(c: Char) {
    if (c == 1) { // 类型不兼容
        // ……
    }
}
```

因为Kotlin没有基本数据类型~

字符字面值用单引号括起来: '1'。 特殊字符可以用反斜杠转义。 支持这几个转义序列：```\t```,  ``` \b```, ``` \n```, ``` \r```,  ```\'```, ```\"```,  ```\\``` 和 \$。 编码其他字符要用 Unicode 转义序列语法：```'\uFF00'```。

**咱们可以用``` toInt() ```来显式地把 Char转换成 Int**



### 布尔 Boolean

布尔用 Boolean 类型表示，它有两个值：true 和 false。

若需要可空引用布尔会被装箱。

内置的布尔运算有：

```kotlin
||  - 逻辑或
&&  - 逻辑与
!   - 逻辑非
```



### 数组

```kotlin
val a = arrayOf(1, 2, 3) // [1,2,3]
val b = Array(3, { i -> (i * 2) }) // [0,2,4]
println(a[0])    // 输出结果：1
println(b[1])    // 输出结果：2
```

除了类Array，还有```ByteArray```, ```ShortArray```, ```IntArray```，用来表示各个类型的数组，省去了装箱操作，因此效率更高，其用法同Array一样：

```kotlin
val x: IntArray = intArrayOf(1, 2, 3) // 注意大小写
x[0] = x[1] + x[2]
```

**注意：Kotlin 中数组是非协变的**
