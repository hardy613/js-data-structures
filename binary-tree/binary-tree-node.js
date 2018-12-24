/** Represents a Node in a BrinaryTree */
module.exports = class BinaryTreeNode {
	/**
	 * @constructor
	 * @param {any} value
	 * @example
	 * const node = new BirnaryTreeNode(5)
	 */
	constructor(value) {
		this.value = value
		this.left = null
		this.right = null
	}
}
