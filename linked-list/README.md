# Linked List

## Introduction
A linked list is a collection of data, where each node points to the next node
instead of using their placement in memory. The most basic form of a linked list
is a `Singly Linked List` where the node contains only a `value` and `next` propery.

## API
- [new Constructor](#new-constructor)
- [unshift](#addtohead)
- [shift](#removefromhead)
- [find](#find)
- [remove](#remove)
- [map](#map)
- [reduce](#reduce)
- [filter](#filter)
- [get](#get)

### `new` Constructor
Initialize a new LinkedList, excepts no values, one value, or multiple values
```js
const emptyList = new LinkedList()
const oneItemList = new LinkedList('one')
const multiItemList = new LinkedList('two', 'one', 'zero')
```

### `unshift`
Can add one or many items and can be chained
```js
const list = new LinkedList()
list.unshift(1)

list
  .addTohead(2)
  .addTohead(3)
  .addTohead(4)

list.unshift(5, 6, 7)
```

### `shift`
Returns the removed value or undefinded if there is nothing to remove
```js
const list = new LinkedList('two', 'one', 'zero')
const node = list.shift()
```

### `find`
Find and returns a node or returns null if not found
```js
const list = new LinkedList('two', 'one', 'zero')
const node = list.find('one')
```

### `remove`
Removes an item and returns the list
```js
let list = new LinkedList('two', 'one', 'zero')
list = list.remove('one')
```

### `map`
Creates a new list with the results of calling a provided function on every element in the calling list
```js
let list = new LinkedList(1, 2, 3, 4, 5)
list = list.map(number => number * 2)
```

### `reduce`
Executes a reducer function on each value of the list resulting in a single output value.
The reducer function has four parameters:
- Accumulator: accumulates the callback's return values
- Current Value: the value being processed
- Current Index: Starts at 0 with an initialValue, 1 otherwise.
- Source: the list being reduced
```js
const list = new LinkedList(1, 2, 3, 4)
const total = list.reduce((acc, cur) => acc + cur) // 10
```

### `filter`
Creates a new List with all elements that pass the test implemented by the provided function
```js
const list = new LinkedList(1, 2, 3, 4, 5, 3, 2, 1, 6)
const filtered = list.filter(val => val > 3)
```

### `get`
Returns a node at the provided index
```js
const list = new LinkedList('two', 'one', 'zero')
const node = list.get(0)
```
