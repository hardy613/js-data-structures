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

	describe('#remove', () => {
		it('returns the same tree if nothing is in the tree', () => {
			const tree = new BinaryTree()
			const newTree = tree.remove(404)
			assert.strictEqual(tree, newTree)
		})

		it('removes nothing if its not in the tree', () => {
			const tree = new BinaryTree(5, 4, 6)
			const newTree = tree.remove(404)
			assert.strictEqual(tree, newTree)
		})

		it('removes and replaces correctly', () => {
			const tree = new BinaryTree(5, 1, 7, 2, 3, 20, 11, 10, 13, 12, 14)
			tree.remove(11, true)
			assert.strictEqual(tree.head.right.right.left.value, 12)
			assert.strictEqual(tree.head.right.right.left.right.value, 13)
			assert.strictEqual(tree.head.right.right.left.right.right.value, 14)
		})

		it('can be chained', () => {
			const tree = new BinaryTree(5, 1, 7, 2)
			tree
				.remove(5)
				.remove(1)
				.remove(7)
				.remove(2)
			assert.strictEqual(tree.head, null)
		})

		describe('##as a leaf', () => {
			it('removes from the head', () => {
				const tree = new BinaryTree(5)
				tree.remove(5)
				assert.strictEqual(tree.head, null)
			})

			it('removes a right child leaf', () => {
				const tree = new BinaryTree(5, 1, 7, 2, 3, 15, 13, 10, 14, 8)
				tree.remove(3)
				assert.strictEqual(tree.head.left.right.right, null)
				assert.strictEqual(tree.head.left.right.value, 2)
			})

			it('removes a left child leaf', () => {
				const tree = new BinaryTree(5, 1, 7, 2, 3, 15, 13, 10, 14, 8)
				tree.remove(8)
				assert.strictEqual(tree.head.right.right.left.left.left, null)
				assert.strictEqual(tree.head.right.right.left.left.value, 10)
			})
		})

		describe('##with one branch on the left', () => {
			it('removes from the head', () => {
				const tree = new BinaryTree(5, 1)
				tree.remove(5)
				assert.strictEqual(tree.head.value, 1)
				assert.strictEqual(tree.head.left, null)
			})

			it('replaces properly when less than the parent value', () => {
				const tree = new BinaryTree(5, 1, 7, 2, 3, 15, 13, 10, 14, 8)
				tree.remove(10)
				assert.strictEqual(tree.head.right.right.left.left.value, 8)
				assert.strictEqual(tree.head.right.right.left.left.left, null)
			})

			it('replaces properly when greater than the parent value', () => {
				const tree = new BinaryTree(5, 1, 7, 2, 3, 20, 13, 18, 9, 14)
				tree.remove(18)
				assert.strictEqual(tree.head.right.right.left.right.value, 14)
				assert.strictEqual(tree.head.right.right.left.right.left, null)
			})
		})

		describe('##with one branch on the right', () => {
			it('removes from the head', () => {
				const tree = new BinaryTree(5, 6)
				tree.remove(5)
				assert.strictEqual(tree.head.value, 6)
				assert.strictEqual(tree.head.right, null)
			})

			it('replaces properly when less than the parent value', () => {
				const tree = new BinaryTree(5, 1, 7, 2, 3, 15, 13, 10, 14, 8)
				tree.remove(10)
				assert.strictEqual(tree.head.right.right.left.left.value, 8)
				assert.strictEqual(tree.head.right.right.left.left.left, null)
			})

			it('replaces properly when greater than the parent value', () => {
				const tree = new BinaryTree(5, 1, 7, 2, 3, 15, 13, 10, 14, 8)
				tree.remove(2)
				assert.strictEqual(tree.head.left.right.value, 3)
				assert.strictEqual(tree.head.left.right.right, null)
			})
		})

		describe('##with two branches', () => {
			it('removes from the head', () => {
				const tree = new BinaryTree(5, 4, 6)
				tree.remove(5)
				assert.strictEqual(tree.head.value, 4)
				assert.strictEqual(tree.head.left, null)
				assert.strictEqual(tree.head.right.value, 6)
			})

			it('removes from the head, uses right branch when useInOrderSuccessor is true',
				() => {
					const tree = new BinaryTree(5, 4, 6)
					tree.remove(5, true)
					assert.strictEqual(tree.head.value, 6)
					assert.strictEqual(tree.head.right, null)
					assert.strictEqual(tree.head.left.value, 4)
				})

			it('removes a child node', () => {
				const tree = new BinaryTree(5, 1, 7, 2, 3, 15, 13, 10, 14, 8)
				tree.remove(13)
				assert.strictEqual(tree.head.right.right.left.value, 10)
				assert.strictEqual(tree.head.right.right.left.left.value, 8)
				assert.strictEqual(tree.head.right.right.left.right.value, 14)
			})

			it('removes a child node, uses right branch when useInOrderSuccessor is true',
				() => {
					const tree = new BinaryTree(5, 1, 7, 2, 3, 15, 13, 10, 14, 8)
					tree.remove(13, true)
					assert.strictEqual(tree.head.right.right.left.value, 14)
					assert.strictEqual(tree.head.right.right.left.right, null)
				})
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
