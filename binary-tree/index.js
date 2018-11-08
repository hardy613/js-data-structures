const BinaryTreeNode = require('./binary-tree-node')

module.exports = class BinaryTree {
	/**
	 * #constructor
	 *	Can initialize and empty tree
	 *	Can initialize with one item
	 *	Can initialize with multiple items
	 */
	constructor(...values) {
		this.head = null
		this.insert(...values)
	}

	/**
	 * #insert
	 *	Can add one item
	 *	Can add multiple items
	 *	Can be chained
	 *	Insert nodes in the correct location
	 */
	insert(...values) {
		values.forEach(value => this._insertSingleValue(value))
		return this
	}

	/**
	 * #_insertSingleValue
	 *	Can add one item
	 *	Insert nodes in the correct location
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

	depthFirstSearch(value) {
		let stack = []
		let foundNode
		stack.push(this.head)

		while (stack.length) {
			const node = stack.pop()

			if (node.value === value) {
				foundNode = node
				stack = []
			}

			if (node.right && !foundNode) {
				stack.push(node.right)
			}

			if (node.left && !foundNode) {
				stack.push(node.left)
			}
		}

		return foundNode
	}

	breadthFirstSearch(value) {
		let queue = []
		let foundNode
		queue.push(this.head)

		while (queue.length) {
			const node = queue.shift()

			if (node.value === value) {
				foundNode = node
				queue = []
			}

			if (node.left && !foundNode) {
				queue.push(node.left)
			}

			if (node.right && !foundNode) {
				queue.push(node.right)
			}
		}

		return foundNode
	}
}
