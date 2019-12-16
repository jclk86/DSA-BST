// supports 3 operations: insert, remove, and find.
class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  // Binary search trees take the concept of binary trees 1 step further.All of the nodes in the left -
  // hand branch of a node are guaranteed to have lower values than the node itself, and all of the nodes in the right - hand
  //  branch of a node are guaranteed to have a higher value than the node itself.

  // starts at root level, and recursively calls insert on whichever node it travels to
  // to check key value. Treats successive nodes as root.
  // An example of the best case would be inserting the root only, which would be O(1)
  // worst case is O(n) when tree skews left or right

  // summary: If this is null, set this.key and this.value to newKey and newValue.
  // If there is key: if newKey is less than this.key, then first check if there is a this.left. If not, then create that new node
  // via new BST(newKey, newValue, this). If there is, then recursively call the this.left.insert to go through the conditionals again to see
  // if it keeps needing to move on.
  // ELSE if newKey > this.key and if this.right == null... do the same as you did for left but for right.
  insert(newKey, newValue) {
    if (this.key === null) {
      this.key = newKey;
      this.value = newValue;
    } else if (newKey < this.key) {
      if (this.left == null) {
        // "this" is the node you are on and it becomes the parent.
        // and you make a node at the empty left holder for a node.
        this.left = new BinarySearchTree(newKey, newValue, this); // the if statement above moves this to the left, and then you recursively call this.left as the root now
      } else {
        // if not null, then recursively call
        this.left.insert(newKey, newValue);
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(newKey, newValue);
      } else {
        this.right.insert(newKey, newValue);
      }
    }
  }
  // O(log(n))... worst is skewed right or left, then it becomes O(n)
  // if searchKey === this.key, return this.value.
  // if searchKey < this.key && there is a left, then RETURN this.left.find(searchKey)
  // continue with else if to else {throw error}
  find(searchKey) {
    if (searchKey === this.key) {
      return this.value;
    } else if (searchKey < this.key && this.left) {
      return this.left.find(searchKey);
    } else if (searchKey > this.key && this.right) {
      return this.right.find(searchKey);
    } else {
      throw new Error("Key Error");
    }
  }
  // trickier case. Removing node leaf (simplest), node with 1 child, or node with two children
  // if leaf, just cut the branch, which i suppose is deleting the parents right or left
  // if the node to delete has a single child, you make the parent of the node you are deleting point to
  // the child of the node you are deleting. So you essentially skip one, just like with linked lists. Grandparent points to child and
  // grandparent becomes parent. It looks to take on the former postion of its original parent -- right or left.
  // For removal from a tree, you can use similar logic to insertion and retrieval to show that the best case is O(1), the average case is O(log(n)),
  // and the worst case is O(n).
  // likely to use it with find()

  //
  remove(removeKey) {
    if (removeKey == this.key) {
      // check if key to be removed has left and/or right children
      // if only a single child, either on right or left, this.parent.left/right = grandchild
      //if both, find the minimum value in the RIGHT subtree's children, which is the left-most subtree
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        // remove duplicate, since this node now has key = sucessor.key
        successor.remove(sucessor.key); // whichever one was the findMind()
        // below the node is already changed to the new one.
        // so the new "ROOT (min of the right)"
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (removeKey < this.key && this.left) {
      this.left.remove(removeKey);
    } else if (removeKey > this.key && this.right) {
      this.right.remove(removeKey);
    } else {
      throw new Error("Key Error");
    }
  }
  //used to find the node you want to use to replace a node that has children. If the node you are replacing has a parent
  // then you need to wire up the references from the parent to the replacement node, and the replacement node
  // back to the parent. Otherwise, if the node is a root node then you simply copy over the properties of
  // the replacement node.
  // also, must retain PROPERTIES.
  _replaceWith(node) {
    // the node equals this.left or this.right
    if (this.parent) {
      // if node is the same as parent's left
      // this is parent is the parent of the node you are getting rid of
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent; // now you reassigned the current node to the child node and then assigning grandparent as parent
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  // used to find the minimum value from the right subtree. When you are removing a node from the tree that has 2 children,
  // you want to replace the node with the smallest node from the right subtree.
  // only works on the right subtree
  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

module.exports = BinarySearchTree;
