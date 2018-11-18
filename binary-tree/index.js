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

	search(value) {
		if (!this.head) {
			return undefined
		}

		let node = this.head
		while (node) {
			if (node.value === value) {
				return node
			}

			if (value < node.value) {
				node = node.left
			} else if (value > node.value) {
				node = node.right
			}
		}
		return undefined
	}
}
