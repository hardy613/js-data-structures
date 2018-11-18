const assert = require('assert')
const BinaryTree = require('../binary-tree')

describe('BinaryTree', () => {
	describe('#constructor', () => {
		it('Can initialize and empty tree', () => {
			const tree = new BinaryTree()
			assert.strictEqual(tree.head, null)
			assert.deepEqual(tree, { head: null })
		})

		it('Can initialize with one item', () => {
			const tree = new BinaryTree(50)
			assert.ok(tree.head.value, 50)
		})

		it('Can initialize with multiple items', () => {
			const tree = new BinaryTree(50, 25, 75, 100)
			assert.ok(tree.head.value, 50)
			assert.ok(tree.head.left.value, 25)
			assert.ok(tree.head.right.value, 75)
			assert.ok(tree.head.right.right.value, 100)
		})
	})

	describe('#insert', () => {
		let tree
		before(() => {
			tree = new BinaryTree()
		})

		it('Can add one item', () => {
			tree.insert(50)
			assert.ok(tree.head.value, 50)
		})

		it('Can add multiple items', () => {
			tree.insert(50, 25, 75, 100)
			assert.ok(tree.head.value, 50)
			assert.ok(tree.head.left.value, 25)
			assert.ok(tree.head.right.value, 75)
			assert.ok(tree.head.right.right.value, 100)
		})

		it('Can be chained', () => {
			tree
				.insert(50)
				.insert(25)
				.insert(75)
				.insert(100)
			assert.ok(tree.head.value, 50)
			assert.ok(tree.head.left.value, 25)
			assert.ok(tree.head.right.value, 75)
			assert.ok(tree.head.right.right.value, 100)
		})

		it('Insert nodes in the correct location', () => {
			tree.insert(50, 25, 75, 100)
			assert.ok(tree.head.value, 50)
			assert.ok(tree.head.left.value, 25)
			assert.ok(tree.head.right.value, 75)
			assert.ok(tree.head.right.right.value, 100)
		})
	})
})
