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
	 * Remove a value and replace it with the
	 * in-order predecessor or the in-order successor
	 * @param {any} value - to remove
	 * @param {boolean} useInOrderSuccessor - use the right node if both are available
	 */
	remove(value, useInOrderSuccessor = false) {
		let node = this.head
		let parent = null
		let replacement = null
		while (node) {
			if (value === node.value) {
				if (!node.left && !node.right) {
					if (parent && value < parent.value) {
						parent.left = null
					} else if (parent) {
						parent.right = null
					} else {
						this.head = null
					}
				} else if (node.left && !node.right) {
					if (parent && value < parent.value) {
						parent.left = node.left
					} else if (parent) {
						parent.right = node.left
					} else {
						this.head = node.left
					}
				} else if (node.right && !node.left) {
					if (parent && value < parent.value) {
						parent.left = node.right
					} else if (parent) {
						parent.right = node.right
					} else {
						this.head = node.right
					}
				} else {
					if (useInOrderSuccessor) {
						replacement = this._getFarthestNode('left', node.right)
					} else {
						replacement = this._getFarthestNode('right', node.left)
					}

					this.remove(replacement.value)
					node.value = replacement.value
				}

				return this
			}

			if (value < node.value) {
				parent = node
				node = node.left
			} else {
				parent = node
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

	/** get the left most node */
	min() {
		return this._getFarthestNode('left')
	}

	/** get the right most node */
	max() {
		return this._getFarthestNode('right')
	}

	/**
	 * return the farthest node or null
	 * @param {string} side
	 * @param {binaryTreeNode} startNode
	 */
	_getFarthestNode(child = 'left', startNode) {
		let node = this.head
		if (startNode !== undefined) {
			node = startNode
		}

		while (node) {
			if (!node[child]) {
				return node
			}
			node = node[child]
		}
		return null
	}
}
