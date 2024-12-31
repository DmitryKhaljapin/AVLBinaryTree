class TreeNode {
    value: number
    left: TreeNode | null = null
    right: TreeNode | null = null
    height: number = 0;
    
    constructor(value: number) {
        this.value = value;
    }
}

class AVLBinaryTree {
    root: TreeNode | null = null;
    add(value: number, treeNode: TreeNode | null = this.root ) {
        if (this.root === null) return this.root = new TreeNode(value);
        if (value >= treeNode.value) {
            if (treeNode.right === null) treeNode.right = new TreeNode(value);
            else this.add(value, treeNode.right);
        }
        else {
            if (treeNode.left === null) treeNode.left = new TreeNode(value);
            else this.add(value, treeNode.left);
        }
        this.updateTreeNodeHeight(treeNode);
        this.balance(treeNode);
    }

    search(value: number, treeNode: TreeNode = this.root) {
        if (treeNode === null) return null;
        if (treeNode.value === value) return treeNode;
        if (value > treeNode.value) return this.search(value, treeNode.right);
        if (value < treeNode.value) return this.search(value, treeNode.left);
    }

    getTreeNodeHeight(treeNode: TreeNode | null) {
        if(treeNode === null) return -1;
        return treeNode.height;
    }

    updateTreeNodeHeight(treeNode: TreeNode) {
        treeNode.height = Math.max(this.getTreeNodeHeight(treeNode.left), this.getTreeNodeHeight(treeNode.right)) + 1;
    }

    getBalance(treeNode: TreeNode) {
        if (treeNode === null) return 0;
        return this.getTreeNodeHeight(treeNode.right) - this.getTreeNodeHeight(treeNode.left);
    }

    swapTreeNodeValues(treeNode1: TreeNode, treeNode2: TreeNode) {
        [treeNode1.value, treeNode2.value] = [treeNode2.value, treeNode1.value];
    }

    rightRotate(treeNode: TreeNode) {
        this.swapTreeNodeValues(treeNode, treeNode.left);
        const treeNodeBuffer = treeNode.right;
        treeNode.right = treeNode.left;
        treeNode.left = treeNode.right.left;
        treeNode.right.left = treeNode.right.right;
        treeNode.right.right = treeNodeBuffer;
        this.updateTreeNodeHeight(treeNode.right);
        this.updateTreeNodeHeight(treeNode);
    }

    leftRotate(treeNode: TreeNode) {
        this.swapTreeNodeValues(treeNode, treeNode.right);
        const treeNodeBuffer = treeNode.left;
        treeNode.left = treeNode.right;
        treeNode.right = treeNode.left.right;
        treeNode.right.left = treeNode.right.right;
        treeNode.left.right = treeNode.left.left;
        treeNode.left.left = treeNodeBuffer;
        this.updateTreeNodeHeight(treeNode.left);
        this.updateTreeNodeHeight(treeNode);
    }

    balance(treeNode: TreeNode) {
        const balance = this.getBalance(treeNode);
        if (balance === -2) {
            if (this.getBalance(treeNode.left) === 1) this.leftRotate(treeNode.left);
            this.rightRotate(treeNode);
        }
        else if (balance === 2) {
            if (this.getBalance(treeNode.right) === -1) this.rightRotate(treeNode.right);
            this.leftRotate(treeNode);
        }
    }

    getMaxTreeNode(treeNode: TreeNode = this.root) {
        if (treeNode === null) return null;
        if (treeNode.right === null) return treeNode;
        this.getMaxTreeNode(treeNode.right);
    }

    getMinTreeNode(treeNode: TreeNode = this.root) {
        if (treeNode === null) return null;
        if (treeNode.left === null) return treeNode;
        this.getMinTreeNode(treeNode.left);
    }

    printTreeInOrder(treeNode: TreeNode = this.root) {
        if (treeNode === null) return;
        this.printTreeInOrder(treeNode.left);
        console.log(treeNode.value);
        this.printTreeInOrder(treeNode.right);
    }
};

const binaryTree = new AVLBinaryTree();

binaryTree.add(6);
binaryTree.add(2);
binaryTree.add(7);
binaryTree.add(9);
binaryTree.add(5);
binaryTree.add(1); 
binaryTree.add(11);

binaryTree.printTreeInOrder();
console.log(binaryTree);