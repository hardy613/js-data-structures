module.exports = class LinkedList {
	/**
	 * #constructor
	 *	Can initalize empty
	 *	Can initialize with one item
	 *	Can initialize with multipule items
	 */
	constructor(...values) {
		this.head = null
		this.length = 0
		return this.addToHead(...values)
	}

	/**
	 * #_addSingleValueToHead
	 *	Can add one item
	 *	increments list length
	 */
	_addSingleValueToHead(value) {
		const node = { value }
		node.next = this.head
		this.head = node
		this.length += 1
	}

	/**
	 * #addToHead
	 *	Can add one item
	 *	Can add multiple items
	 *	Can be chained
	 */
	addToHead(...values) {
		values.forEach(value => this._addSingleValueToHead(value))
		return this
	}

	/**
	 * #removeFromHead
	 *	Can remove the item from the head
	 *	Returns the removed value
	 *	Returns undefinded if there is nothing to remove
	 */
	removeFromHead() {
		if (this.length === 0) {
			return undefined
		}

		const { value } = this.head
		this.head = this.head.next
		this.length -= 1
		return value
	}

	/**
	 * #find
	 *	Can find a node
	 *	Returns null if not found
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
	 * #remove
	 *	Returns the list if nothing is removed
	 *	Removes an item
	 *	Removes items in a chain
	 *	Returns the list if the list has no items
	 */
	remove(value) {
		if (this.length === 0) {
			return this
		}

		if (this.head.value === value) {
			this.removeFromHead()
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
	 * #map
	 *	Will map with the provided function
	 *	Will return a new list in the right order
	 *	Will return an empty list if the parameter is not a function
	 *	Will return an empty list from an empty list
	 *	Does not alter the original list
	 */
	map(func = () => {}) {
		if (this.length === 0 || typeof func !== 'function') {
			return new LinkedList()
		}

		const _map = (node, list) => {
			if (node.next) {
				_map(node.next, list)
			}
			return list.addToHead(func(node.value))
		}
		return _map(this.head, new LinkedList())
	}

	/**
	 * #reduce
	 *	Will return null with and empty list and no accumulator
	 *	Will return the accumulator with an empty list
	 *	Will return null with a list if:
	 *  	the first parameter is not a function no and accumulator
	 *	Will return the accumulator with a list if:
	 *		the first parameter is not a function
	 *	Will reduce with the function provided and no accumulator
	 *	Will reduce with the function provided and include a starting accumulator
	 *	Accumulator will use the head node value, if not set
	 */
	reduce(func = () => {}, accumulator) {
		if (this.length === 0 || typeof func !== 'function') {
			return typeof accumulator !== 'undefined' ? accumulator : null
		}
		let node = this.head
		let acc = accumulator
		while (node) {
			if (typeof acc === 'undefined') {
				acc = node.value
				node = node.next
			}
			acc = func(acc, node.value)
			node = node.next
		}
		return acc
	}

	/**
	 * #filter
	 *	Will return an empty list from an empty list
	 *	Will return an empty list if parameter is not a function
	 *	Does not alter the original list
	 *	Filters the list
	 *	Keeps the order of the items in the new list
	 */
	filter(func = () => {}) {
		if (this.length === 0 || typeof func !== 'function') {
			return new LinkedList()
		}

		const _filter = (node, list) => {
			if (node.next) {
				_filter(node.next, list)
			}

			if (func(node.value)) {
				return list.addToHead(node.value)
			}
			return list
		}
		return _filter(this.head, new LinkedList())
	}
}
