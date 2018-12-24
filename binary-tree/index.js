const BinaryTreeNode = require('./binary-tree-node')

/** Represents a BinaryTree */
module.exports = class BinaryTree {
	/**
	 * @constructor
	 * @param {any} values
	 * @example
	 * const tree = new BirnaryTree(5, 4, 3, 6, 7, 10)
	 */
	constructor(...values) {
		this.head = null
		this.insert(...values)
	}

	/**
	 * Can add one or many items and can be chained
	 * @param {any} values
	 * @example
	 * const tree = new BirnaryTree()
	 * tree.insert(1, 2, 3)
	 */
	insert(...values) {
		values.forEach(value => this._insertSingleValue(value))
		return this
	}

	/**
	 * add one item
	 * @param {any} value
	 */
	_insertSingleValue(value) {
		if (!this.head) {
			this.head = new BinaryTreeNode(value)
			return this
		}

		let currentNode = this.head
		while (currentNode) {
			if (value < currentNode.value) {
				if (currentNode.left) {
					currentNode = currentNode.left
				} else {
					currentNode.left = new BinaryTreeNode(value)
				}
			} else if (value > currentNode.value) {
				if (currentNode.right) {
					currentNode = currentNode.right
				} else {
					currentNode.right = new BinaryTreeNode(value)
				}
			} else {
				return this
			}
		}
		return this
	}

	/**
	 * Delete a value and replace it with the
	 * in-order predecessor or the in-order successor
	 * @param {any} value - to delete
	 * @param {boolean} inOrderSuccesssor - use in-order successor even if null
	 */
	delete(value, inOrderSuccesssor = false) {
		let node = this.head
		if (node.value === value) {
			this.head = null
			return this
		}

		let parent = node
		if (value < node.value) {
			node = node.left
		} else {
			node = node.right
		}

		let replacement = null
		while (node) {
			if (node.value === value) {
				if (node.left && node.right) {
					replacement = inOrderSuccesssor ? node.right : node.left
				}

				if (!replacement && (node.left || node.right)) {
					replacement = node.left || node.right
				}

				if (value < parent.value) {
					parent.left = replacement
				} else {
					parent.right = replacement
				}

				return this
			}

			parent = node
			if (value < node.value) {
				node = node.left
			} else {
				node = node.right
			}
		}

		return this
	}

	/**
	 * return the found node or null
	 * @param {any} value
	 */
	find(value) {
		let node = this.head
		while (node) {
			if (node.value === value) {
				return node
			}

			if (value < node.value) {
				node = node.left
			} else {
				node = node.right
			}
		}
		return null
	}

	/**
	 * get the left most node
	 */
	min() {
		return this._getFarthestNode('left')
	}

	/**
	 * get the right most node
	 */
	max() {
		return this._getFarthestNode('right')
	}

	/**
	 * return the farthest node or null
	 * @param {string} side
	 */
	_getFarthestNode(side = 'left') {
		let node = this.head
		while (node) {
			if (!node[side]) {
				return node
			}
			node = node[side]
		}
		return null
	}
}
