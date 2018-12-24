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

	describe('#delete', () => {
		let tree
		before(() => {
			tree = new BinaryTree()
		})

		it('returns the same tree if the value is not found', () => {
			tree
				.insert(50)
				.insert(25)
				.insert(75)
				.insert(100)
			const clone = Object.assign(
				Object.create(
					Object.getPrototypeOf(tree),
				),
				tree,
			)

			tree.delete(404)
			assert.deepEqual(tree, clone)
		})

		it('returns an empty tree if the node value matches the head', () => {
			tree
				.insert(50)
				.insert(25)
				.insert(75)
				.insert(100)
			tree.delete(50)
			assert.strictEqual(tree.head, null)
		})

		it('replaces with the in-order predecessor when useIOS=false', () => {
			tree
				.insert(11)
				.insert(6)
				.insert(19)
				.insert(4)
				.insert(8)
				.insert(17)
				.insert(43)
				.insert(5)
				.insert(10)
				.insert(31)
				.insert(49)

			tree.delete(43)
			assert.strictEqual(tree.head.right.right.value, 31)
		})

		it('replaces with the in-order successor when useIOS=true', () => {
			tree
				.insert(11)
				.insert(6)
				.insert(19)
				.insert(4)
				.insert(8)
				.insert(17)
				.insert(43)
				.insert(5)
				.insert(10)
				.insert(31)
				.insert(49)

			tree.delete(19, true)
			assert.strictEqual(tree.head.right.right.value, 43)
		})

		it('replaces with the left or right node if only one is set', () => {
			tree
				.insert(11)
				.insert(6)
				.insert(19)
				.insert(4)
				.insert(8)
				.insert(17)
				.insert(43)
				.insert(5)
				.insert(10)
				.insert(31)
				.insert(49)

			tree.delete(4)
			assert.strictEqual(tree.head.left.left.value, 5)
		})
	})

	describe('#find', () => {
		it('finds a value', () => {
			const tree = new BinaryTree(11, 6, 19, 4, 8, 17, 43, 5, 10, 31, 49)
			assert.strictEqual(tree.find(17).value, 17)
		})

		it('returns null if not found', () => {
			const tree = new BinaryTree(11, 6, 19, 4, 8, 17, 43, 5, 10, 31, 49)
			assert.strictEqual(tree.find(404), null)
		})
	})

	describe('#min', () => {
		it('gets the min value', () => {
			const tree = new BinaryTree(11, 6, 19, 4, 8, 17, 43, 5, 10, 31, 49)
			assert.strictEqual(tree.min().value, 4)
		})

		it('returns null if there is no list', () => {
			const tree = new BinaryTree()
			assert.strictEqual(tree.min(), null)
		})
	})

	describe('#max', () => {
		it('gets the max value', () => {
			const tree = new BinaryTree(11, 6, 19, 4, 8, 17, 43, 5, 10, 31, 49)
			assert.strictEqual(tree.max().value, 49)
		})

		it('returns null if there is no list', () => {
			const tree = new BinaryTree()
			assert.strictEqual(tree.max(), null)
		})
	})
})
