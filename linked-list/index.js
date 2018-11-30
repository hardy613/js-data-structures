/** Represents a LinkedList */
module.exports = class LinkedList {
	/**
	 * @constructor
	 * @param {any} values - The values to save in the list
	 * @example
	 * const list = new LinkedList('two', 'one', 'zero')
	 */
	constructor(...values) {
		this.head = null
		this.length = 0
		return this.unshift(...values)
	}

	/**
	 * Can add one item and increments list length
	 * @param {any} value - The value to save in the list
	 */
	_unshiftOneValue(value) {
		const node = { value }
		node.next = this.head
		this.head = node
		this.length += 1
	}

	/**
	 * Can add one or many items and can be chained
	 * @param {any} values - The values to save in the list
	 */
	unshift(...values) {
		values.forEach(value => this._unshiftOneValue(value))
		return this
	}

	/**
	 * Returns the removed value or undefinded if there is
	 * nothing to remove
	 */
	shift() {
		if (this.length === 0) {
			return null
		}
		const { value } = this.head
		this.head = this.head.next
		this.length -= 1
		return value
	}

	/**
	 * Find and returns a node
	 * or returns null if not found
	 * @param {any} value - the value to find
	 */
	find(value) {
		let node = this.head
		while (node) {
			if (node.value === value) {
				return node
			}
			node = node.next
		}
		return node
	}

	/**
	 * Removes an item and returns the list
	 * @param {any} value - the value to remove
	 */
	remove(value) {
		if (this.length === 0) {
			return this
		}

		if (this.head.value === value) {
			this.shift()
			return this
		}
		let prevNode = this.head
		let node = prevNode.next
		while (node) {
			if (node.value === value) {
				break
			}
			prevNode = node
			node = node.next
		}

		if (node === null) {
			return this
		}
		prevNode.next = node.next
		this.length -= 1
		return this
	}

	/**
	 * Creates a new list with the results of calling a
	 * provided function on every element in the calling list.
	 * The Provided function has three arguments
	 * - currentValue - The current element being processed in the array
	 * - index - The index of the current element being processed in the array
	 * - array - The array map was called upon
	 * @param {function} func - the provided function
	 * @example
	 * let list = new LinkedList(1, 2, 3, 4, 5)
	 * list = list.mapRecursive(number => number * 2)
	 */
	mapRecursive(func = () => {}) {
		if (this.length === 0 || typeof func !== 'function') {
			return new LinkedList()
		}
		let i = -1
		const _map = (node, list) => {
			if (node.next) {
				_map(node.next, list)
			}
			i += 1
			return list.unshift(func(node.value, i, this.head))
		}
		return _map(this.head, new LinkedList())
	}

	/**
	 * Creates a new list with the results of calling a
	 * provided function on every element in the calling list.
	 * The Provided function has three arguments
	 * - currentValue - The current element being processed in the array
	 * - index - The index of the current element being processed in the array
	 * - array - The array map was called upon
	 * @param {function} func - the provided function
	 * @example
	 * let list = new LinkedList(1, 2, 3, 4, 5)
	 * list = list.mapRecursive(number => number * 2)
	 */
	map(func = () => {}) {
		if (this.length === 0 || typeof func !== 'function') {
			return new LinkedList()
		}
		const list = new LinkedList()
		let node = this.head
		let i = 0
		while (node) {
			list.unshift(func(node.value, i, this.head))
			i += 1
			node = node.next
		}
		return list
	}

	/**
	 * Executes a reducer function on each value of the list
	 * resulting in a single output value.
	 * The reducer function has four parameters:
	 * - Accumulator - accumulates the callback's return values
	 * - Current Value - the value being processed
	 * - Current Index - Starts at 0 with an initialValue, 1 otherwise.
	 * - Source - the list being reduced
	 * @param {function} func - the reducer
	 * @param {any} initialValue - the starting value
	 * @example
	 * const list = new LinkedList(1, 2, 3, 4)
	 * const total = list.reduce((acc, cur) => acc + cur) // 10
	 */
	reduce(func = () => {}, initialValue) {
		if (this.length === 0 || typeof func !== 'function') {
			return typeof initialValue !== 'undefined' ? initialValue : null
		}
		let node = this.head
		let acc = initialValue
		let i = 0
		while (node) {
			if (typeof acc === 'undefined') {
				acc = node.value
				node = node.next
				i += 1
			}
			acc = func(acc, node.value, i, this.head)
			node = node.next
			i += 1
		}
		return acc
	}

	/**
	 * Creates a new List with all elements that pass the test
	 * implemented by the provided function
	 * The provided funtion has three arguments
	 * - element - The current element being processed in the array
	 * - index - The index of the current element being processed in the array
	 * - array - The array filter was called upon.
	 * @param {function} func - the provided function
	 * @example
	 * const list = new LinkedList(1, 2, 3, 4, 5, 3, 2, 1, 6)
	 * const filtered = list.filter(val => val > 3)
	 */
	filterRecursive(func = () => {}) {
		if (this.length === 0 || typeof func !== 'function') {
			return new LinkedList()
		}
		let i = -1
		const _filter = (node, list) => {
			if (node.next) {
				_filter(node.next, list)
			}
			i += 1
			if (func(node.value, i, this.head)) {
				return list.unshift(node.value)
			}
			return list
		}
		return _filter(this.head, new LinkedList())
	}

	/**
	 * Creates a new List with all elements that pass the test
	 * implemented by the provided function
	 * The provided funtion has three arguments
	 * - element - The current element being processed in the array
	 * - index - The index of the current element being processed in the array
	 * - array - The array filter was called upon.
	 * @param {function} func - the provided function
	 * @example
	 * const list = new LinkedList(1, 2, 3, 4, 5, 3, 2, 1, 6)
	 * const filtered = list.filter(val => val > 3)
	 */
	filter(func = () => {}) {
		if (this.length === 0 || typeof func !== 'function') {
			return new LinkedList()
		}
		const list = new LinkedList()
		let node = this.head
		let i = 0
		while (node) {
			if (func(node.value, i, this.head)) {
				list.unshift(node.value)
			}
			i += 1
			node = node.next
		}
		return list
	}

	/**
	 * Returns a node at the provided index
	 * @params {number} index - the location of the node to return
	 * @example
	 * const list = new LinkedList('two', 'one', 'zero')
	 * const node = list.get(0) // node.value === 'zero'
	 */
	get(index = 0) {
		if (this.length === 0 || Number.isNaN(index)
			|| index < 0 || this.length <= index) {
			return null
		}

		if (index === 0) {
			return this.head
		}
		let node = this.head.next
		let i = 1
		while (node) {
			if (i === index) {
				return node
			}
			node = node.next
			i += 1
		}
		return null
	}
}
