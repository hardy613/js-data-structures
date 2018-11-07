const BinaryTreeNode = require('./binary-tree-node')

module.exports = class BinaryTree {
	constructor(...values) {
		this.head = null
		this.insert(...values)
	}

	insert(...values) {
		values.forEach(value => this._insertSingleValue(value))
		return this
	}

	_insertSingleValue(value) {
		if (!this.head) {
			this.head = new BinaryTreeNode(value)
			return this
		}

		let currentNode = this.head
		const node = new BinaryTreeNode(value)

		while (currentNode) {
			if (node.value < currentNode.value) {
				if (currentNode.left) {
					currentNode = currentNode.left
				} else {
					currentNode.left = node
				}
			} else if (node.value > currentNode.value) {
				if (currentNode.right) {
					currentNode = currentNode.right
				} else {
					currentNode.right = node
				}
			} else {
				break
			}
		}
		return this
	}

	depthFirstSearch(value) {
		const stack = []
		let foundNode
		stack.push(this.head)

		while (stack.length) {
			const node = stack.pop()

			if (node.value === value) {
				foundNode = node
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

	breadthFristSearch(value) {
		const stack = []
		let foundNode
		stack.push(this.head)

		while (stack.length) {
			const node = stack.shift()

			if (node.value === value) {
				foundNode = node
			}

			if (node.left && !foundNode) {
				stack.push(node.left)
			}

			if (node.right && !foundNode) {
				stack.push(node.right)
			}
		}

		return foundNode
	}
}
