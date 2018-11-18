const assert = require('assert')
const LinkedList = require('../linked-list')

describe('LinkedList', () => {
	describe('#constructor', () => {
		it('Can initalize empty', () => {
			const list = new LinkedList()
			assert.equal(list.head, null)
			assert.equal(list.length, 0)
		})

		it('Can initialize with one item', () => {
			const list = new LinkedList('one')
			assert.equal(list.head.value, 'one')
			assert.equal(list.head.next, null)
			assert.equal(list.length, 1)
		})

		it('Can initialize with multipule items', () => {
			const list = new LinkedList('one', 'two', 'three')
			assert.equal(list.head.value, 'three')
			assert.equal(list.head.next.value, 'two')
			assert.equal(list.head.next.next.value, 'one')
			assert.equal(list.length, 3)
		})
	})

	describe('#addToHead', () => {
		let list
		beforeEach(() => {
			list = new LinkedList()
		})

		it('Can add one item', () => {
			list.addToHead('one')
			assert.equal(list.head.value, 'one')
			assert.equal(list.head.next, null)
			assert.equal(list.length, 1)
		})

		it('Can add multiple items', () => {
			list.addToHead('one', 'two', 'three')
			assert.equal(list.head.value, 'three')
			assert.equal(list.head.next.value, 'two')
			assert.equal(list.head.next.next.value, 'one')
			assert.equal(list.length, 3)
		})

		it('Can be chained', () => {
			list
				.addToHead('one')
				.addToHead('two')
				.addToHead('three')
			assert.equal(list.head.value, 'three')
			assert.equal(list.head.next.value, 'two')
			assert.equal(list.head.next.next.value, 'one')
			assert.equal(list.length, 3)
		})
	})

	describe('#removeFromHead', () => {
		let list
		before(() => {
			list = new LinkedList('one', 'two')
		})

		it('Can remove the item from the head', () => {
			list.removeFromHead()
			assert.equal(list.head.value, 'one')
			assert.equal(list.length, 1)
		})

		it('Returns the removed value', () => {
			const value = list.removeFromHead()
			assert.equal(value, 'one')
		})

		it('Returns undefinded if there is nothing to remove', () => {
			const value = list.removeFromHead()
			assert.equal(value, undefined)
		})
	})

	describe('#find', () => {
		let list
		before(() => {
			list = new LinkedList('one', 'two', 'three')
		})

		it('Can find a node', () => {
			const node = list.find('two')
			assert.equal(node.value, 'two')
		})

		it('Returns null if not found', () => {
			const node = list.find('four')
			assert.equal(node, null)
		})
	})

	describe('#remove', () => {
		let list
		before(() => {
			list = new LinkedList('one', 'two', 'three', 'four')
		})

		it('Returns the list if nothing is removed', () => {
			const res = list.remove('five')
			assert.deepEqual(res, list)
		})

		it('Removes an item', () => {
			list.remove('four')
			assert.equal(list.length, 3)
			assert.equal(list.head.value, 'three')
		})

		it('Removes items in a chain', () => {
			list
				.remove('two')
				.remove('one')
				.remove('three')
			assert.equal(list.length, 0)
			assert.equal(list.head, null)
		})

		it('Returns ths list if the list has no items', () => {
			assert.equal(list.remove('foobar'), list)
		})
	})

	describe('#map', () => {
		it('Will map with the provided function', () => {
			let list = new LinkedList('Numan')
			list = list.map(word => `Hello ${word}`)
			assert.equal(list.head.value, 'Hello Numan')
		})

		it('Will return a new list in the right order', () => {
			let list = new LinkedList(1, 2, 3, 4, 5)
			list = list.map(number => number * 2)
			assert.equal(list.head.value, 10)
			assert.equal(list.head.next.value, 8)
			assert.equal(list.head.next.next.value, 6)
			assert.equal(list.head.next.next.next.value, 4)
			assert.equal(list.head.next.next.next.next.value, 2)
		})

		it('Will return an empty list if the parameter is not a function', () => {
			const list = new LinkedList(1, 2)
			assert.deepEqual(list.map(true), new LinkedList())
		})

		it('Will return an empty list from an empty list', () => {
			const list = new LinkedList()
			assert.deepEqual(list.map(val => val), new LinkedList())
		})

		it('Does not alter the original list', () => {
			const list = new LinkedList(1, 2, 3, 4, 5, 6)
			const mapped = list.map(val => val * 2)
			assert.equal(list.head.value, 6)
			assert.equal(mapped.head.value, 12)
		})
	})

	describe('#reduce', () => {
		it('Will return null with and empty list and no accumulator', () => {
			const list = new LinkedList()
			assert.equal(list.reduce((acc, cur) => acc + cur), null)
		})

		it('Will return the accumulator with an empty list', () => {
			const list = new LinkedList()
			assert.equal(list.reduce((acc, cur) => acc + cur, 1), 1)
		})

		it('Will return null from a list if the first parameter is not a function '
			+ 'no and accumulator',
		() => {
			const list = new LinkedList(1, 2, 3)
			assert.equal(list.reduce(false), null)
		})

		it('Will return the accumulator from a list if the first parameter is '
			+ 'not a function',
		() => {
			const list = new LinkedList(1, 2, 3)
			assert.equal(list.reduce(false, 1), 1)
		})

		it('Will reduce with the function provided and no accumulator', () => {
			const list = new LinkedList(1, 2, 3, 4)
			assert.equal(list.reduce((acc, cur) => acc + cur), 10)
		})

		it('Will reduce with the function provided and include a starting '
			+ 'accumulator',
		() => {
			const list = new LinkedList(1, 2, 3, 4)
			assert.equal(list.reduce((acc, cur) => acc + cur, 5), 15)
		})

		it('Accumulator will use the head node value if accumulator is not set',
			() => {
				const reducer = (acc, cur) => acc + cur
				const numbers = new LinkedList(1, 2, 3, 4)
				assert.equal(numbers.reduce(reducer), 10)
				const strings = new LinkedList('n', 'a', 'm', 'u', 'N')
				assert.equal(strings.reduce(reducer), 'Numan')
			})

		it('Passes in the index to the reducer', () => {
			const list = new LinkedList(4, 3, 2, 1, 0)
			let i = 0
			list.reduce((acc, cur, index) => {
				assert.equal(index, i)
				i += 1
				return acc + cur
			}, 0)
		})

		it('The index starts at 0 with an initialValue', () => {
			const list = new LinkedList(1, 0)
			let i = 0
			list.reduce((acc, cur, index) => {
				if (i === 0) {
					assert.equal(index, 0)
				}
				i += 1
				return acc + cur
			}, 0)
		})

		it('The index starts at 1 without an initialValue', () => {
			const list = new LinkedList(1, 0)
			let i = 0
			list.reduce((acc, cur, index) => {
				if (i === 0) {
					assert.equal(index, 1)
				}
				i += 1
				return acc + cur
			})
		})

		it('Passes the list to the reducer', () => {
			const list = new LinkedList(1, 0)
			list.reduce((acc, cur, index, reducerList) => {
				assert.deepEqual(list.head, reducerList)
				return acc + cur
			})
		})
	})

	describe('#filter', () => {
		it('Will return an empty list from an empty list', () => {
			const list = new LinkedList()
			assert.deepEqual(list.filter(), new LinkedList())
		})

		it('Will return an empty list if parameter is not a function', () => {
			const list = new LinkedList()
			assert.deepEqual(list.filter(), new LinkedList())
		})

		it('Does not alter the original list', () => {
			const list = new LinkedList(1, 2, 3, 4, 5, 6)
			const filtered = list.filter(val => val > 3)
			assert.equal(list.length, 6)
			assert.equal(filtered.length, 3)
		})

		it('Filters the list', () => {
			const list = new LinkedList(1, 2, 3, 4, 5, 6)
			const filtered = list.filter(val => val > 3)
			assert.equal(filtered.length, 3)
		})

		it('Keeps the order of the items in the new list', () => {
			const list = new LinkedList(1, 2, 3, 4, 5, 3, 2, 1, 6)
			const filtered = list.filter(val => val > 3)
			assert.equal(filtered.head.value, 6)
			assert.equal(filtered.head.next.value, 5)
			assert.equal(filtered.head.next.next.value, 4)
			assert.equal(filtered.head.next.next.value, 4)
			assert.equal(filtered.length, 3)
		})
	})

	describe('#get', () => {
		it('Returns undefined with no length', () => {
			const list = new LinkedList()
			assert.equal(list.get(404), undefined)
		})

		it('Returns undefined if the index is not a number', () => {
			const list = new LinkedList()
			assert.equal(list.get('test'), undefined)
		})

		it('Returns undefined if the index is negative', () => {
			const list = new LinkedList()
			assert.equal(list.get(-1), undefined)
		})

		it('Returns undefined if the index is bigger than the length', () => {
			const list = new LinkedList(1, 2, 3)
			assert.equal(list.get(3), undefined)
		})

		it('Returns the head if the index is 0', () => {
			const list = new LinkedList(1, 2, 3)
			const node = list.get(0)
			assert.equal(node.value, 3)
		})

		it('Returns the proper node', () => {
			const list = new LinkedList(4, 3, 2, 1, 0)
			const node1 = list.get(1)
			const node2 = list.get(2)
			const node3 = list.get(3)
			assert.equal(node1.value, 1)
			assert.equal(node2.value, 2)
			assert.equal(node3.value, 3)
		})
	})
})
