# 基本的なJavaScriptの構文

## 変数の宣言

基本的には、保守性を高めるために`const`を使う。
count変数などは`let`を使う必要がある。
`var`はバグの温床になりがちなので、出来る限り避けること！

```JavaScript
const A = 0;
let B = 0;
var C = 0;
```

| | 上書き | 再宣言 |
| ---- | :----: | :----: |
| var | ◯ | ◯ |
| let | ◯ | × |
| const | × | × |

## if文

他のメジャーな言語と特に変化なし

```JavaScript
if (条件) {

} else if (条件) {

} else {

}
```

### 三項演算子

1行で<strong>簡単な</strong>条件分岐を書きたいとき
複雑な処理を書くと、明日の自分すら忘れるので素直にif文を書くこと。

```JavaScript
// <条件> ? <trueの時の処理> : <falseの時の処理>
console.log(num % 2 == 0 ? "偶数です" : "奇数です")

// Result
//
// num = 2 の場合
// 偶数です
//
// num = 3 の場合
// 奇数です
```

## for文

素のfor文を使うことはほぼない。
基本的に`forEach`か`map`,`filter`を使う。

```JavaScript
for (let i=0; i < 5; i++) {
  console.log(i)
}
// Result
//
// 0
// 1
// 2
// 3
// 4
```

## forEach, map, filterとは

全て配列に対するメソッド(関数)であり、returnされるものがそれぞれ異なる。

* forEach -> void(何も返さない)
* map, filter -> 新しい配列を返す(元の配列は壊れない)

### 1. forEach

配列の要素1つ1つを使って何かを処理したいとき

```JavaScript
const A = [1,2,3,4,5]

A.forEach((element, index) => {
  //element, indexは好きな変数名でも可
  //indexは省略可(ただし頻出)
  console.log(element * index)
})

// Result
//
// 0
// 2
// 6
// 12
// 20
```

## 2. map

要素の値を使って新しい配列を作りたいときに使う。
他にも、Reactならではの使い方として、JSX要素を返すことも可能。

```JavaScript
const Array = [1,2,3,4,5,6]

const newArray = Array.map((element, i) => (
  element * element
))
console.log(newArray)

// Result
// [1,4,9,16,25,36]

```

```JavaScript
const Array = ["JavaScript", "Python", "Java", "C" ]
//------------------------------------
return (
  <div>
    <p>興味のある言語</p>
    <ul>
    {Array.map((element) => (
      <li>{element}</li>
    ))}
    </ul>
  </div>
)

// Result
//
// ---略---
// <ul>
//  <li>JavaScript</li>
//  <li>Python</li>
//  <li>Java</li>
//  <li>C</li>
// <ul>
// ---略---
//
// と同じように表示される。
```

## 3. filter

基本は`map`と同じで、条件を加えたいときに使う。
配列の要素を順番に処理し、条件に当てはまるもののみを抽出して<strong>新しい配列</strong>を生成する

```JavaScript
const nums = [1, 2, 5, 8, 12]
const multiples2 = nums.filter((num) => num % 2 == 0) //偶数
console.log(multiples2)
// Result
// [2, 8, 12]
```
