const assert = require('assert')
const BinaryTree = require('../binary-tree')

describe('BinaryTree', () => {
	describe('#constructor', () => {
		it('Can initialize and empty tree', () => {
			const tree = new BinaryTree()
			assert.equal(tree.head, null)
			assert.deepEqual(tree, { head: null })
		})

		it('Can initialize with one item', () => {
			const tree = new BinaryTree(50)
			assert.equal(tree.head.value, 50)
		})

		it('Can initialize with multiple items', () => {
			const tree = new BinaryTree(50, 25, 75, 100)
			assert.equal(tree.head.value, 50)
			assert.equal(tree.head.left.value, 25)
			assert.equal(tree.head.right.value, 75)
			assert.equal(tree.head.right.right.value, 100)
		})
	})

	describe('#insert', () => {
		let tree
		before(() => {
			tree = new BinaryTree()
		})

		it('Can add one item', () => {
			tree.insert(50)
			assert.equal(tree.head.value, 50)
		})

		it('Can add multiple items', () => {
			tree.insert(50, 25, 75, 100)
			assert.equal(tree.head.value, 50)
			assert.equal(tree.head.left.value, 25)
			assert.equal(tree.head.right.value, 75)
			assert.equal(tree.head.right.right.value, 100)
		})

		it('Can be chained', () => {
			tree
				.insert(50)
				.insert(25)
				.insert(75)
				.insert(100)
			assert.equal(tree.head.value, 50)
			assert.equal(tree.head.left.value, 25)
			assert.equal(tree.head.right.value, 75)
			assert.equal(tree.head.right.right.value, 100)
		})

		it('Insert nodes in the correct location', () => {
			tree.insert(50, 25, 75, 100)
			assert.equal(tree.head.value, 50)
			assert.equal(tree.head.left.value, 25)
			assert.equal(tree.head.right.value, 75)
			assert.equal(tree.head.right.right.value, 100)
		})
	})

	describe('#depthFirstSearch', () => {
		let tree

		before(() => {
			tree = new BinaryTree(50, 25, 75, 100)
		})

		it('Will find a node in a tree', () => {
			const node = tree.depthFirstSearch(75)
			assert(node.value, 75)
		})

		it('Returns undefined when a node is not found', () => {
			const node = tree.depthFirstSearch(404)
			assert.equal(node, undefined)
		})

		it.skip('Depth first traversal', () => {
			// need a way to validate the stack in the
			// function call, spy or stub maybe
		})
	})

	describe('#breadthFirstSearch', () => {
		let tree

		before(() => {
			tree = new BinaryTree(50, 25, 75, 100)
		})

		it('Will find a node in a tree', () => {
			const node = tree.breadthFirstSearch(75)
			assert(node.value, 75)
		})

		it('Returns undefined when a node is not found', () => {
			const node = tree.breadthFirstSearch(404)
			assert.equal(node, undefined)
		})

		it.skip('Breadth first traversal', () => {
			// need a way to validate the queue in the
			// function call, spy or stub maybe
		})
	})
})
